from fastapi import APIRouter, Header, Depends, HTTPException,File,UploadFile
from model.model import Account, Class,Subject
from service.StatisticService import StatisticService
from typing import Optional, List , Union

router = APIRouter(prefix="/account")
statisticService = StatisticService()
