from fastapi import FastAPI
from app.routes import auth, documents, summarizer

app = FastAPI(title="InsightLearn API")

app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(summarizer.router)
@app.get("/")
def root():
    return {"message": "InsightLearn Backend is running"}