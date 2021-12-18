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
import io
from datetime import date
from .OTEService import OTEService
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")

class Subject_regService:
    def __init__(self, ):
        self.connector = subjectRegisterConnector()
        self.settings = Settings()
        self.oteService =  OTEService()

    async def subject_reg(self,subreg, semester,current_user: Account):
        state = await self.oteService.validate_regis_subject_time()
        if state == False:
            raise HTTPException(status_code=410, detail="không phải thời điểm đăng kí")
        processed = []
        for subject in subreg.subjects:
            processed.append(Sub_Reg(Id= current_user.Id,subjectId=subject.subjectId,semester=semester,timestamp=int(time.time())))
        return await self.connector.subreg_insert(processed)

    # async def subject_del(self,Id:Optional[str]=None, subjectId:Optional[str]= None):
    #     return await self.connector.subdel(Id,subjectId)

    async def subject_del(self, subjectId:List[Optional[str]], semester : int,current_user: Account):
        state = await self.oteService.validate_regis_subject_time()
        if state == False:
            raise HTTPException(status_code=410, detail="không phải thời điểm đăng kí")
        return await self.connector.subdel(current_user.Id,semester, subjectId)