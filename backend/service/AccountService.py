from DBConnector.account import AccountConnector
from model.model import *
from fastapi.security import OAuth2PasswordBearer
from fastapi import  Depends
from .utils import JWTUtils, CSVUtils
from fastapi import HTTPException
from datetime import timedelta
from config import Settings
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Request
import pandas as pd
import io

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")
class AccountService:
    def __init__(self, ):
        self.connector = AccountConnector()
        self.settings = Settings()
        self.parse_role = {"ROLE_ADMIN":3,"ROLE_STUDENT":1,"ROLE_TM":2,"ROLE_GUEST":0}
        self.revert_role = {3:"ROLE_ADMIN",2:"ROLE_TM",1:"ROLE_STUDENT",0:"ROLE_GUEST"}
    def map_role(self,accounts:List[Account]):
        res = []
        for acc in accounts:
            acc.role = self.parse_role[acc.role]
            res.append(acc)
        return res
    def map_revert_role(self,accounts:List[Account]):
        res = []
        for acc in accounts:
            acc.role = self.revert_role[acc.role]
            res.append(acc)
        return res

    async def get_account_by_id(self,Id:Optional[str]= None, email:Optional[str]= None):
        return await self.connector.get_account_by_id(Id,email)

    async def search(self,limit = 20, offset=0, **kwargs):
        return await self.connector.search(limit=limit,offset=offset,**kwargs)

    async def update_one(self,account:Account):
        if (account.password is not None ) or (account.password != "" ):
            print("Update new password for Id:",account.Id," pass:",account.password)
            await self.connector.update_password(account.Id, JWTUtils.get_password_hash(account.password))
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
        if user[0].role == 0:
            raise HTTPException(status_code=400, detail="Inactive user")
        
        user = user[0]
        if JWTUtils.verify_password(login_object.password, user.password):
            session_time = timedelta(minutes=self.settings.expire_minutes)
            return JWTUtils.create_access_token(data={"email":login_object.email},expires_delta= session_time)
        else:
            raise HTTPException(status_code=402, detail="Unautorized")
    async def change_password(self,old_password,new_password,current_user:Account):
        if JWTUtils.verify_password(old_password, current_user.password):
            hashed_password = JWTUtils.get_password_hash(new_password)
            res = await self.connector.update_password(current_user.Id, hashed_password)
            return res
        else:
            raise HTTPException(status_code=402, detail="wrong old password")

    async def import_file(self,content):
        df = CSVUtils.read_content(content)
        accounts = CSVUtils.validate_account(df)
        processed = []
        for acc in accounts:
            acc.password = JWTUtils.get_password_hash(acc.password)
            processed.append(acc)
        res = await self.connector.insert(processed)

    async def export_file(self,accounts:List[Account]):
        return_df= {    "Id":[],
                        "email":[],
                        "password":[] , 
                        "fullname" :[], 
                        "address":[] ,
                        "birthday":[] ,
                        "phone":[], 
                        "status":[], 
                        "role" :[], 
                        "schoolyear" :[],
                        "cmnd":[] , 
                        "gender":[] ,
                        "program":[] , 
                        "schoolId" :[],
                        "maxcredit" :[], }
        for acc in accounts:
            acc = acc.dict()
            for key in return_df.keys():
                return_df[key].append(acc[key])
        return_df=pd.DataFrame(return_df)
        stream = io.BytesIO()
        #return_df.to_csv("test.csv", index = False, encoding='utf-8')
        return_df.to_csv(stream, index = False, encoding='utf-8')

        return stream

    async def get_current_user(self, token: str = Depends(oauth2_scheme)):
        email = JWTUtils.get_current_username(token)
        user = await self.get_account_by_id(email=email)
        if len(user):
            return user[0]
        else:
            raise HTTPException(status_code=402, detail="Unautorized")