import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM","HS256")

def create_access_token(data: dict, expires_delta: int = 1440):
    payload = {k: str(v) for k, v in data.items()}
    payload["exp"] = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=expires_delta)
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def decode_access_token(token: str):
    try:
        return jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        print("Token expired")
        return None
    except jwt.InvalidTokenError:
        print("Invalid token")
        return None