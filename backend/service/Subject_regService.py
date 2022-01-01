from DBConnector.account import AccountConnector
from DBConnector.subjectRegister import subjectRegisterConnector
from model.model import *
from model.subject_regModel import *
from fastapi.security import OAuth2PasswordBearer
from fastapi import  Depends
from .utils import JWTUtils, CSVUtils
from fastapi import HTTPException
from datetime import timedelta
from config import Settings
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Request
import pandas as pd
import io, time
from datetime import date
from .OTEService import OTEService
from .AccountService import AccountService
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")

class Subject_regService:
    def __init__(self, ):
        self.connector = subjectRegisterConnector()
        self.settings = Settings()
        self.oteService =  OTEService()
        self.accountService = AccountService()

    async def validate(self, subjects:List[Subject], current_user:Account):
        total = 0
        for sub in subjects:
            total += sub.credit
        if total > current_user.maxcredit:
            raise HTTPException(status_code=410, detail=f"vượt quá số tín chỉ tối đa {current_user.maxcredit}")
        else:
            return True
    async def search(self,Id,semester,subjectId=None,limit=None,offset=None):
        semester = await  self.oteService.get_semester_subject_config()
        if limit == None and offset ==None:
            return await self.connector.search(Id,semester,subjectId)
        else:
            li = await self.connector.search(Id,semester,subjectId,limit,offset)
            li = [x.Id for x in li]
            res = []
            for x in li:
                acc = await self.accountService.get_account_by_id(x)
                res.append(acc[0])
            return res
    async def count(self,semester,subjectId):
        semester = await self.oteService.get_semester_subject_config()
        return await self.connector.count(semester,subjectId)

    async def subject_reg(self,subreg, semester,current_user: Account):
        state = await self.oteService.validate_regis_subject_time()
        if state == False:
            raise HTTPException(status_code=410, detail="không phải thời điểm đăng kí")
        processed = []
        registered = await self.search(current_user.Id,semester)
        registered_subId =[x.subjectId for x in registered]
        coming_registered = [x.subjectId for x in subreg.subjects]

        to_regis = []
        to_del = []
        for subjectId in coming_registered:
            if subjectId not in registered_subId:
                to_regis.append(Sub_Reg(Id= current_user.Id,subjectId=subjectId,semester=semester,timestamp=int(time.time())))
        for subjectId in registered_subId:
            if subjectId not in coming_registered:
                to_del.append(subjectId)
        res = await self.subject_del(to_del,semester,current_user)
        return await self.connector.subreg_insert(to_regis)

    # async def subject_del(self,Id:Optional[str]=None, subjectId:Optional[str]= None):
    #     return await self.connector.subdel(Id,subjectId)

    async def subject_del(self, subjectId:List[Optional[str]], semester : int,current_user: Account):
        state = await self.oteService.validate_regis_subject_time()
        if state == False:
            raise HTTPException(status_code=410, detail="không phải thời điểm đăng kí")
        return await self.connector.subdel(current_user.Id,semester, subjectId)