from DBConnector.statistic import StatisticConnector
from model.model import *
from fastapi import  Depends
from .utils import JWTUtils, CSVUtils
from fastapi import HTTPException
from datetime import timedelta, datetime
from config import Settings
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Request
from .OTEService import OTEService
import json
class StatisticService:
    def __init__(self):
        self.statisticConnector = StatisticConnector()
        self.oteService = OTEService()
        self.school = json.load(open("document/school.json","r"))
    async def stat_class_reg_by_day(self,semester):
        return await self.statisticConnector.stat_class_reg_by_day(semester)
    async def stat_class_reg_by_school(self,semester):
        objs = await self.statisticConnector.stat_class_reg_by_school(semester)
        for obj in objs:
            obj.schoolId = self.school[obj.schoolId]
        return objs
    async def stat_subject_reg_by_day(self,semester):
        return await self.statisticConnector.stat_subject_reg_by_day(semester)
    async def stat_subject_reg_by_school(self,semester):
        objs =  await self.statisticConnector.stat_subject_reg_by_school(semester)
        for obj in objs:
            obj.schoolId = self.school[obj.schoolId]
        return objs