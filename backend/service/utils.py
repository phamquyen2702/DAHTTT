from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import config
from typing import Optional
from fastapi import HTTPException
import pandas as pd
from model.model import Account, Class
class CSVUtils:
    @staticmethod
    def read_content(content):
        with open("test.csv", 'wb') as f:
            f.write(content)
        df = pd.read_csv('test.csv')
        return df

    @staticmethod
    def validate_account(df):
        list_col = ["Id", "email","password" , "fullname" , "address" ,"birthday" ,"phone", "status",
                    "role" , "schoolyear" ,"cmnd" , "gender" ,"program" , "schoolId" ,"maxcredit" , ]
        cols = list(df.columns)
        if not (cols==list_col) :
            raise HTTPException(status_code=422, detail="Invalid format")
        try:
            for col in list_col:
                if col in ["Id","status","role","schoolyear","maxcredit"]:
                    pd.to_numeric(df[col], downcast='integer')
        except:
            raise HTTPException(status_code=422, detail="Invalid datatype")
        return_accounts =[]
        for index, row in df.iterrows():
            try:
                return_accounts.append(Account(**row))
            except:
                raise HTTPException(status_code=422, detail="Invalid datatype")
        #print(return_accounts)
        return return_accounts

    @staticmethod
    def validate_class(df):
        list_col = ['classId', 'subjectId', 'semester', 'location', 'day', 'timeStart', 'timeEnd', 'registered', 'limit', 'status']
        cols = list(df.columns)
        if not (cols == list_col):
            raise HTTPException(status_code=422, detail="Invalid format")
        try:
            for col in list_col:
                if col in ['classId', 'semester', 'day', 'timeStart', 'timeEnd', 'registered', 'limit', 'status']:
                    pd.to_numeric(df[col], downcast='integer')
        except:
            raise HTTPException(status_code=422, detail="Invalid datatype")
        return_classes = []
        for index, row in df.iterrows():
            day = row.day
            timeStart = row.timeStart
            timeEnd = row.timeEnd
            limit = row.limit
            if (day < 2) or (day > 7) or (timeStart < 1) or (timeStart > 12) or (timeEnd < 1) or (timeEnd > 12) or (
                    limit < 0) or (timeEnd < timeStart):
                raise HTTPException(status_code=422, detail="Invalid data")
            try:
                return_classes.append(Class(**row))
            except:
                raise HTTPException(status_code=422, detail="Invalid datatype")
        return return_classes



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


if __name__ == "__main__":
    print(JWTUtils.get_password_hash("admin123"))