from DBConnector.account import AccountConnector
from DBConnector.classRegister import classRegisterConnector
from model.model import *
from model.class_regModel import *
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
import time
from .OTEService import OTEService
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")

class Class_regService:
    def __init__(self, ):
        self.connector = classRegisterConnector()
        self.settings = Settings()
        self.oteService = OTEService()

    # async def subject_reg(self,subreg: list[Sub_Reg], current_user:Sub_Reg):
    #     processed = []
    #     for reg in subreg:
    #         reg.Id = current_user.Id
    #         processed.append(acc)
    #     return await self.connector.subreg_insert(processed)

    async def class_reg(self,classreg,current_user: Account):
        state = await self.oteService.validate_regis_class_time(current_user)
        if state == False:
            raise HTTPException(status_code=410, detail="không phải thời điểm đăng kí")
        processed = []
        for class_ in classreg.classes:
            reg.Id = current_user.Id
            # reg.timestamp = date.today()
            processed.append(Class_Reg(Id = current_user.Id,classId = class_.classId,timestamp=int(time.time())))
        return await self.connector.classreg_insert(processed)

    async def class_del(self, classId:List[Optional[str]], current_user: Account):
        state = await self.oteService.validate_regis_class_time(current_user)
        if state == False:
            raise HTTPException(status_code=410, detail="không phải thời điểm đăng kí")
        return await self.connector.classdel(current_user.Id, classId)