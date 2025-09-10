import os
import tempfile
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.utils.auth_dependency import get_current_user
from app.services.db_service import get_db_connection
from app.services.pdf_service import extract_text_from_pdf

router = APIRouter(prefix="/documents", tags=["documents"])

@router.post("/upload")
def upload_document(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    try:
        if not file.filename.endswith("pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed") 
    
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(file.file.read())
            tmp_path = tmp.name
    
        extracted_text = extract_text_from_pdf(tmp_path)
        os.remove(tmp_path)

        con = get_db_connection()
        cur = con.cursor()
        cur.execute(
            "INSERT INTO documents (user_id, title, content) VALUES (%s,%s,%s) RETURNING id",
            (user["id"], file.filename, extracted_text)
        )
        doc_id = cur.fetchone()[0]
        con.commit()
        cur.close()
        con.close()

        return {
            "message": "Document uploaded successfully",
            "document_id": doc_id,
            "title": file.filename,
            "preview": extracted_text[:300] + "..." if len(extracted_text) > 300 else extracted_text
        }
    except Exception as e:
        print("Upload Error: ", e)
        raise HTTPException(status_code=500, detail=str(e))
