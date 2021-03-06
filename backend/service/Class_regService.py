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
from .AccountService import AccountService
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")

class Class_regService:
    def __init__(self, ):
        self.connector = classRegisterConnector()
        self.settings = Settings()
        self.oteService = OTEService()
        self.classService = ClassService()
        self.subjectService = SubjectService()
        self.accountService = AccountService()
    async def search(self,Id,semester,classId,limit=None,offset=None):
        if semester == None:
            semester = await self.oteService.get_semester_class_config() 
        if limit == None and offset ==None:
            return await self.connector.search(Id,semester,classId,limit,offset)
        else:
            li = await self.connector.search(Id,semester,classId,limit,offset)
            li = [x.Id for x in li]
            res = []
            for x in li:
                acc = await self.accountService.get_account_by_id(x)
                res.append(acc[0])
            return res
    async def count(self,semester,classId):
        if semester == None:
            semester = await self.oteService.get_semester_class_config() 
        return await self.connector.count(semester,classId)
    # async def subject_reg(self,subreg: list[Sub_Reg], current_user:Sub_Reg):
    #     processed = []
    #     for reg in subreg:
    #         reg.Id = current_user.Id
    #         processed.append(acc)
    #     return await self.connector.subreg_insert(processed)    
    def check_time(self,class1,class2):
        if class1.day != class2.day: return True
        x_left = max(class1.timeStart, class2.timeStart)    
        x_right = min(class1.timeEnd, class2.timeEnd)
        if x_right < x_left :
            return True
        return False
        
    async def validate_register(self,list_class:List[Class],current_user:Account):
        listClass = []
        total = 0

        for class_ in list_class:
            #class_ = await self.classService.get_class_by_id(id_)
            id_ = class_.classId
            if class_.status != 1: 
                raise HTTPException(status_code=410, detail=f"l???p {id_} b??? kh??a")
            if class_.registered >= class_.limit:
                raise HTTPException(status_code=410, detail=f"l???p {id_} ?????y")
            listClass += class_
            #c = await self.subjectService.get_subject_by_id(class_[0].subjectId)
            total += class_.credit
        print("total registered credit",total)
        if total > current_user.maxcredit:
            raise HTTPException(status_code=410, detail="v?????t qu?? s??? t??n ch??? t???i ??a")
        """
        for i, class1 in enumerate(listClass):
            for j, class2 in enumerate(listClass):
                if i==j : continue
                if not self.check_time(class1,class2):
                    raise HTTPException(status_code=410, detail=f"tr??ng l???ch h???c 2 l???p {class1.classId} v?? {class2.classId}")
        """
        return True

    async def class_reg(self,classreg,current_user: Account):
        semester = await self.oteService.get_semester_class_config()
        tmp ={}
        state = await self.oteService.validate_regis_class_time(current_user)
        if state == False:
            raise HTTPException(status_code=410, detail="kh??ng ph???i th???i ??i???m ????ng k??")

        # ki???m tra tr??ng th???i kh??a bi???u
        await self.validate_register(classreg.classes,current_user)
        
        processed = []
        comming = []
        for class_ in classreg.classes:
            class_ = await self.classService.get_class_by_id(class_.classId)
            class_ = class_[0]
            tmp[class_.classId] = class_
            if int(semester) != int(class_.semester):
                raise HTTPException(status_code=410, detail=f"l???p {class_.classId} kh??ng ???????c m??? trong h???c k??? {semester}")
            comming.append(class_.classId)
            #
        registered = await self.search(Id = current_user.Id,semester=semester,classId=None)
        registered_clsId = []
        for obj in registered:
            registered_clsId.append(obj.classId)
            if obj.classId not in tmp.keys():
                c = await self.classService.get_class_by_id(obj.classId)
                tmp[obj.classId] = c[0]
        #print(tmp)
        for classId in comming:
            if classId not in registered_clsId:
                processed.append(Class_Reg(Id = current_user.Id,classId = classId,semester=semester,timestamp=int(time.time())))
        print("del class register")
        to_del = []
        for classId in registered_clsId:
            if classId not in comming:
                to_del.append(classId)
        await self.class_del(to_del,current_user)
        print("update number of registerd in class be deleted")
        to_update = []
        for class_ in to_del:
            class_ = tmp[class_]
            class_.registered -= 1
            to_update.append(class_)
        await self.classService.update(to_update)

        print("register class not be registerd") 
        await self.connector.classreg_insert(processed)

        to_update = []
        #print(tmp)
        for class_ in processed:
            class_ = tmp[class_.classId]
            class_.registered += 1
            to_update.append(class_)
        await self.classService.update(to_update)
        return True

    async def class_del(self, classId:List[Optional[str]], current_user: Account):
        state = await self.oteService.validate_regis_class_time(current_user)
        if state == False:
            raise HTTPException(status_code=410, detail="kh??ng ph???i th???i ??i???m ????ng k??")
        return await self.connector.classdel(current_user.Id, classId)