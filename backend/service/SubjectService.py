from DBConnector.subject import SubjectConnector
from model.model import Subject
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from .utils import JWTUtils, CSVUtils
from fastapi import HTTPException
from datetime import timedelta
from config import Settings
from typing import Optional, List, Dict, Union
from fastapi import FastAPI, HTTPException, Depends, Request
import pandas as pd
import io

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")


class SubjectService:
    def __init__(self, ):
        self.connector = SubjectConnector()
        self.settings = Settings()
    async def get_all_subject_id(self,status):
        return await self.connector.get_all_subject_id(status)

    async def get_subject_by_id(self, subjectId: Optional[str] = None,):
        return await self.connector.get_subject_by_id(subjectId)
    async def count_subject_like_id(self,subjectId):
        return await self.connector.count_subject_like_id(subjectId)
    async def get_subject_like_id(self,subjectId,limit,offset):
        return await self.connector.get_subject_like_id(subjectId,limit,offset)

    async def search(self, limit=20, offset=0, filters: Dict = {}, **kwargs):
        return await self.connector.search(limit=limit, offset=offset, filters=filters, **kwargs)

    async def count(self, filters: Dict = {}, **kwargs):
        return await self.connector.search(count=1, limit=None, offset=None, filters=filters, **kwargs)

    async def update(self, subjects: Union[Subject, List[Subject]]):
        return await self.connector.update(subjects)

    async def add(self, subjects: Union[Subject, List[Subject]]):
        return await self.connector.insert(subjects)

    async def update_satus(self, subjectId: str, status: int):
        return await self.connector.update_status(subjectId, status)

    async def import_file(self, content):
        df = CSVUtils.read_content(content)
        subjects = CSVUtils.validate_subject(df)
        res = await self.connector.insert(subjects)
        return res

    async def export_file(self, subjects: List[Subject]):
        subjects = [subject.dict() for subject in subjects]
        data_df = pd.DataFrame(subjects)
        stream = io.BytesIO()
        data_df.to_csv(stream, index=False, encoding='utf-8')
        return stream