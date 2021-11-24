from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import config
from typing import Optional
from fastapi import HTTPException


class JWTUtils:
    settings = config.Settings()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")

    SECRET_KEY = settings.secret

    ALGORITHM = settings.algorithm

    @staticmethod
    def verify_password(plain_password, hashed_password):
        return JWTUtils.pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password):
        return JWTUtils.pwd_context.hash(password)

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        now = datetime.utcnow()
        if expires_delta:
            expire = now + expires_delta
        else:
            expire = now + timedelta(minutes=90)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, JWTUtils.SECRET_KEY, algorithm=JWTUtils.ALGORITHM)
        return {
            "access_token": encoded_jwt,
            "token_type": "bearer"}

    @staticmethod
    def get_current_username(token: str):
        try:
            payload = jwt.decode(token, JWTUtils.SECRET_KEY, algorithms=[JWTUtils.ALGORITHM])
            email: str = payload.get("email")
            expire = payload.get("exp")
            expire = datetime.fromtimestamp(expire)
            if email is None:
                raise HTTPException(status_code=402, detail="Unautorized")
            if expire < datetime.utcnow():
                raise HTTPException(status_code=402, detail="Unautorized")
        except:
            raise HTTPException(status_code=402, detail="Unautorized")
        return email


