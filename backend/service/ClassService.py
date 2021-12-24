from DBConnector.account import AccountConnector
from DBConnector._class import ClassConnector
from model.model import *
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from .utils import JWTUtils, CSVUtils
from fastapi import HTTPException
from datetime import timedelta
from config import Settings
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Request
import pandas as pd
import io
from .SubjectService import SubjectService
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")


class ClassService:
    def __init__(self, ):
        self.connector = ClassConnector()
        self.subjectService = SubjectService()
        self.settings = Settings()

    async def aggerate(self,classes:List[Class]):
        res = []
        for clss in classes:
            subject = await self.subjectService.get_subject_by_id(subjectId=clss.subjectId)
            try:
                credit = subject[0].credit
                name = subject[0].subjectName
                clss.credit = credit
                clss.subjectName = name
            except:
                print(clss.subjectId)
                raise HTTPException(status_code=422, detail="subjectId not found")
            res.append(clss)
        return res
    async def search_collision(self,class_:Class):
        res = await self.connector.search_collision(semester=class_.semester,day=class_.day,location=class_.location,timeEnd=class_.timeEnd,timeStart=class_.timeStart)
        if len(res):
            raise HTTPException(status_code=422, detail=f"lớp {class_.classId} trùng thời khóa biểu với lớp {res[0].classId}")
        
    async def get_class_by_id(self, Id: Optional[str] = None):
        cls_ = await self.connector.get_class_by_id(Id)
        return await self.aggerate(cls_)
    async def get_class_like_id(self,classId,limit,offset):
        return await self.connector.get_class_like_id(classId,limit,offset)
    async def search(self, limit=20, offset=0, **kwargs):
        classes =  await self.connector.search(limit=limit, offset=offset, **kwargs)
        return await self.aggerate(classes)
    async def count(self, **kwargs):
        return await self.connector.search(count=1, **kwargs)
    async def update (self,classes:List[Class]):
        return await self.connector.update(classes)
    async def update_one(self, _class: Class):
        await self.search_collision(_class)
        _class = await self.aggerate([_class])
        return await self.connector.update(_class)

    async def lock_one(self, classId: int):
        return await self.connector.lock([classId])

    async def unlock_one(self, classId: int):
        class_ = await self.get_class_by_id(classId)
        await self.search_collision(class_[0])
        return await self.connector.unlock([classId])

    async def add(self, _classes: List[Class]):
        for _class in _classes:
            await self.search_collision(_class)
        _classes = await self.aggerate(_classes)
        return await self.connector.insert(_classes)

    async def import_file(self, content):
        df = CSVUtils.read_content(content)
        _classes = CSVUtils.validate_class(df)
        for _class in _classes:
            await self.search_collision(_class)
        res = await self.connector.insert(_classes)

    async def export_file(self, _classes: List[Class]):
        return_df = {
            'classId': [],
            'subjectId': [],
            'semester': [],
            'location': [],
            'day': [],
            'timeStart': [],
            'timeEnd': [],
            'registered': [],
            'limit': [],
            'status': []
        }
        for _class in _classes:
            _class = _class.dict()
            for key in return_df.keys():
                return_df[key].append(_class[key])
        print(return_df)
        return_df = pd.DataFrame(return_df)
        stream = io.BytesIO()
        # return_df.to_csv("test.csv", index = False, encoding='utf-8')
        return_df.to_csv(stream, index=False, encoding='utf-8')

        return stream
