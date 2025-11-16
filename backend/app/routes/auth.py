from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.utils.jwt_handler import create_access_token, decode_access_token
from app.utils.password_handler import hash_password, verify_password
from app.services.db_service import get_db_connection

router = APIRouter(prefix="/auth", tags=["Auth"])

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/register")
def register_user(user: UserRegister):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s",(user.email,))
    if cur.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists")  # fixed "detail"
    
    hashed_pw = hash_password(user.password)
    cur.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)", 
        (user.name, user.email, hashed_pw)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login_user(user: UserLogin):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    db_user = cur.fetchone()
    cur.close()
    conn.close()

    if not db_user or not verify_password(user.password, db_user[3]):
        raise HTTPException(status_code = 401, detail="Invalid email or password")

    token = create_access_token({
        "id": db_user[0], 
        "sub": str(db_user[1]), 
        "email": str(db_user[2])
    })
    return {"access_token": token, "token_type": "bearer"}  # fixed key