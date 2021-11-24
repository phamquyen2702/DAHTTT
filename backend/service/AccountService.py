from DBConnector.account import AccountConnector
from model.model import *
from fastapi.security import OAuth2PasswordBearer
from fastapi import  Depends
from .utils import JWTUtils
from fastapi import HTTPException
from datetime import timedelta
from config import Settings
from typing import Optional, List

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")
class AccountService:
    def __init__(self, ):
        self.connector = AccountConnector()
        self.settings = Settings()

    async def get_account_by_id(self,Id:Optional[str]= None, email:Optional[str]= None):
        return await self.connector.get_account_by_id(Id,email)

    async def search(self,limit = 20, offset=0, **kwargs):
        return await self.connector.search(limit=limit,offset=offset,**kwargs)

    async def update_one(self,account:Account):
        return await self.connector.update([account])

    async def register(self,accounts: List[Account]):
        processed = []
        for acc in accounts:
            acc.password = JWTUtils.get_password_hash(acc.password)
            processed.append(acc)
        return await self.connector.insert(processed)


    async def authenticate(self,login_object):
        user = await self.get_account_by_id(email=login_object.email)
        if (len(user)) == 0 or user[0].role != login_object.role:
            raise HTTPException(status_code=402, detail="Unautorized")

        
        user = user[0]
        if JWTUtils.verify_password(login_object.password, user.password):
            session_time = timedelta(minutes=self.settings.expire_minutes)
            return JWTUtils.create_access_token(data={"email":login_object.email},expires_delta= session_time)
        else:
            raise HTTPException(status_code=402, detail="Unautorized")

    async def get_current_user(self, token: str = Depends(oauth2_scheme)):
        email = JWTUtils.get_current_username(token)
        user = await self.get_account_by_id(email=email)
        if len(user):
            return user[0]
        else:
            raise HTTPException(status_code=402, detail="Unautorized")