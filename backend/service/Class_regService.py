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
from .ClassService import ClassService
from .SubjectService import SubjectService
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")

class Class_regService:
    def __init__(self, ):
        self.connector = classRegisterConnector()
        self.settings = Settings()
        self.oteService = OTEService()
        self.classService = ClassService()
        self.subjectService = SubjectService()

    # async def subject_reg(self,subreg: list[Sub_Reg], current_user:Sub_Reg):
    #     processed = []
    #     for reg in subreg:
    #         reg.Id = current_user.Id
    #         processed.append(acc)
    #     return await self.connector.subreg_insert(processed)    
    def check_time(self,class1,class2):
        x_left = max(class1.timeStart, class2.timeStart)    
        x_right = min(class1.timeEnd, class2.timeEnd)
        if x_right <= x_left :
            return True
        return False
        
    async def validate_register(self,list_class:List[str],current_user:Account):
        listClass = []
        total = 0

        for id_ in list_class:
            class_ = await self.classService.get_class_by_id(id_)
            if class_[0].registered >= class_[0].limit:
                raise HTTPException(status_code=410, detail=f"lớp {id_} đầy")
            listClass += class_
            c = await self.subjectService.get_subject_by_id(class_[0].subjectId)
            total += c[0].credit
        if total > current_user.maxcredit:
            raise HTTPException(status_code=410, detail="vượt quá số tín chỉ tối đa")
        for i, class1 in enumerate(listClass):
            for j, class2 in enumerate(listClass):
                if i==j : continue
                if not self.check_time(class1,class2):
                    raise HTTPException(status_code=410, detail=f"trùng lịch học 2 lớp {class1.classId} và {class2.classId}")
        return listClass

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