import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use Gemini 1.5 Flash (fast + free)
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_summary(text: str) -> str:
    prompt = f"Summarize the following text in a clear and concise way:\n\n{text}"
    
    response = model.generate_content(prompt)
    return response.text.strip()
