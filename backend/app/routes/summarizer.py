from fastapi import APIRouter, Depends, HTTPException
from app.utils.auth_dependency import get_current_user
from app.services.db_service import get_db_connection
from app.services.summarizer_service import generate_summary

router = APIRouter(prefix="/summarize", tags=["Summarizer"])

@router.post("/{doc_id}")
def summarize_document(doc_id: int, user: dict = Depends(get_current_user)):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT id, content FROM documents WHERE id = %s AND user_id = (SELECT id FROM users WHERE email = %s)", (doc_id, user["email"]))
        doc = cur.fetchone()

        if not doc:
            raise HTTPException(status_code=404, detail="Document not found or not yours")

        text = doc[1]
        if not text:
            raise HTTPException(status_code=400, detail="No content found in document")

        summary = generate_summary(text)

        cur.execute("INSERT INTO summaries (document_id, summary) VALUES (%s, %s) RETURNING id", (doc_id, summary))
        summary_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {
            "message": "Summary generated successfully",
            "summary_id": summary_id,
            "document_id": doc_id,
            "summary": summary
        }
    except Exception as e:
        print("Summarization Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
