import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./PDFTutorModule.css";

const INIT_STATE = {
  stage: "idle", // "idle" | "uploading" | "summary" | "chat"
  uploadProgress: 0,
  docId: null,
  summary: "",
  chatHistory: [],
  isTyping: false,
};

export default function PDFTutorModule() {
  const [state, setState] = useState(INIT_STATE);
  const [file, setFile] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const fileInputRef = useRef();

  // File upload (drag/drop or select)
  const startUpload = async (chosenFile) => {
    setState((s) => ({ ...s, stage: "uploading", uploadProgress: 0 }));
    setFile(chosenFile);

    const formData = new FormData();
    formData.append("file", chosenFile);
    try {
      // Fake progress bar for UX
      for (let i = 1; i <= 90; i += 15) {
        setState((s) => ({ ...s, uploadProgress: i }));
        await new Promise((res) => setTimeout(res, 80));
      }
      // Real upload
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setState((s) => ({
        ...s,
        uploadProgress: 100,
        docId: res.data.docId,
      }));
      // Get summary
      const sumRes = await axios.get(`/api/summary?docId=${res.data.docId}`);
      setState((s) => ({
        ...s,
        stage: "summary",
        summary: sumRes.data.summary,
      }));
    } catch {
      setState((s) => ({ ...s, stage: "idle", uploadProgress: 0 }));
      alert("Upload failed. Try again.");
    }
  };

  // Drag/drop
  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      startUpload(e.dataTransfer.files[0]);
    }
  };

  // Chat send
  const sendMessage = async (msg) => {
    if (!msg) return;
    const newChat = [...state.chatHistory, { from: "user", msg }];
    setState((s) => ({ ...s, chatHistory: newChat, isTyping: true }));
    setUserMessage("");
    try {
      const res = await axios.post("/api/chat", {
        docId: state.docId,
        message: msg,
      });
      setState((s) => ({
        ...s,
        chatHistory: [
          ...newChat,
          { from: "ai", msg: res.data.answer || res.data.error || "Sorry, I could not answer that." },
        ],
        isTyping: false,
        stage: "chat",
      }));
    } catch {
      setState((s) => ({
        ...s,
        chatHistory: [
          ...newChat,
          { from: "ai", msg: "Sorry, there was a connection problem." },
        ],
        isTyping: false,
        stage: "chat",
      }));
    }
  };

  return (
    <div className="pdf-tutor-root">
      <div className="w-full max-w-3xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {state.stage === "idle" && (
            <motion.div
              key="upload"
              className="upload-card"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.6 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              <div className="upload-instructions">
                <div className="upload-main-icon">📄</div>
                <div className="upload-title">
                  Please upload your study material (PDF).
                </div>
                <div className="upload-subtext">
                  I will extract the content, create a summarized overview, and be ready to answer your questions as your personal AI Tutor.
                </div>
              </div>
              
              <label
                className="upload-dropzone"
                tabIndex={0}
                htmlFor="file-upload"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
              >
                <div>
                  <span className="upload-or">Drag & drop PDF here</span>
                  <span>or <span className="upload-browse-link" onClick={() => fileInputRef.current.click()}>choose file</span></span>
                </div>
                <div className="upload-placeholder-types">.pdf only · max 10MB</div>
              </label>
              
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={(e) => e.target.files && startUpload(e.target.files[0])}
              />
            </motion.div>
          )}
          
          {state.stage === "uploading" && (
            <motion.div
              key="uploading"
              className="upload-card"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <div className="upload-instructions">
                <div className="upload-main-icon">⏳</div>
                <div className="upload-title">Uploading your PDF...</div>
              </div>
              <div className="w-full mt-4 progress-bar">
                <div className="h-3 rounded bg-slate-200">
                  <div
                    className="h-3 bg-blue-600 rounded transition-all duration-500 progress-bar-inner"
                    style={{ width: `${state.uploadProgress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-400 text-center">{state.uploadProgress}%</div>
              </div>
            </motion.div>
          )}
          
          {(state.stage === "summary" || state.stage === "chat") && (
            <motion.div
              key="summary"
              className="bg-white rounded-2xl shadow-2xl px-8 py-10 summary-card"
              initial={{ opacity: 0, x: 110 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -110 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="text-xl font-bold text-slate-900 mb-2">
                  Here is a clear summary of your document.
                </div>
                <div className="text-base text-slate-500 mb-2">
                  You can review this before asking me specific questions.
                </div>
                <details open className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <summary className="text-slate-700 font-semibold cursor-pointer">
                    Key Takeaways & Summary
                  </summary>
                  <div className="mt-2">
                    {state.summary
                      .split("\n")
                      .map((line, idx) =>
                        line.startsWith("-") ? (
                          <li key={idx} className="pl-1 list-disc list-inside">{line.slice(1).trim()}</li>
                        ) : (
                          <p key={idx} className="mb-1">{line}</p>
                        )
                      )}
                  </div>
                </details>
                <button
                  className="mt-3 px-4 py-1 bg-slate-100 border border-slate-300 rounded hover:bg-slate-200 text-sm"
                  onClick={async () => {
                    const resp = await axios.get(`/api/summary?docId=${state.docId}&refine=1`);
                    setState((s) => ({ ...s, summary: resp.data.summary }));
                  }}
                >
                  Refine Summary
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 chatbot-container">
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 mb-2">Tutor Chat</div>
                  <div className="rounded-xl border bg-slate-50 min-h-[250px] max-h-[350px] p-3 flex flex-col gap-2 overflow-y-auto"
                    style={{ minWidth: 320 }}>
                    {state.chatHistory.length === 0 && (
                      <div className="text-slate-400 text-sm text-center my-8">
                        Ask me anything from your uploaded material.<br />
                        I will explain concepts step by step, give examples, and suggest ways to learn effectively.
                      </div>
                    )}
                    {state.chatHistory.map((c, i) =>
                      <div
                        key={i}
                        className={`flex ${c.from === 'ai' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`rounded-lg px-4 py-2 ${
                          c.from === 'ai' ? 'bg-slate-200 text-slate-800' : 'bg-blue-600 text-white'
                        } max-w-[80%]`}>
                          {c.msg}
                        </div>
                      </div>
                    )}
                    {state.isTyping && (
                      <div className="flex justify-start">
                        <div className="rounded-lg bg-slate-200 px-4 py-2 text-slate-600 flex items-center gap-2">
                          <span className="animate-pulse">. . .</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      sendMessage(userMessage.trim());
                    }}
                    className="flex gap-2 mt-3"
                  >
                    <input
                      className="flex-1 border rounded px-3 py-2 text-slate-800"
                      type="text"
                      value={userMessage}
                      onChange={e => setUserMessage(e.target.value)}
                      placeholder="Type your question here..."
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      className="bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-900 transition"
                      disabled={state.isTyping}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
