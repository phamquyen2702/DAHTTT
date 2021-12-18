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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")


class ClassService:
    def __init__(self, ):
        self.connector = ClassConnector()
        self.settings = Settings()
    async def get_class_by_id(self, Id: Optional[str] = None):
        return await self.connector.get_class_by_id(Id)

    async def search(self, limit=20, offset=0, **kwargs):
        return await self.connector.search(limit=limit, offset=offset, **kwargs)

    async def count(self, **kwargs):
        return await self.connector.search(count=1, **kwargs)

    async def update_one(self, _class: Class):
        return await self.connector.update([_class])

    async def lock_one(self, classId: int):
        return await self.connector.lock([classId])

    async def unlock_one(self, classId: int):
        return await self.connector.unlock([classId])

    async def add(self, _classes: List[Class]):
        return await self.connector.insert(_classes)

    async def import_file(self, content):
        df = CSVUtils.read_content(content)
        _classes = CSVUtils.validate_class(df)
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
