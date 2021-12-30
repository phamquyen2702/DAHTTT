from DBConnector.classRegister import classRegisterConnector
from DBConnector.subjectRegister import subjectRegisterConnector
from model.model import *
from fastapi import  Depends
from .utils import JWTUtils, CSVUtils
from fastapi import HTTPException
from datetime import timedelta, datetime
from config import Settings
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Request
from .OTEService import OTEService

class StatisticService:
    def __init__(self):
        self.classRegConnector = classRegisterConnector()
        self.subjectRegConnector = subjectRegisterConnector()
        self.oteService = OTEService()
    async def stat_class_reg_by_day(self,):
        
