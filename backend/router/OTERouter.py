from fastapi import APIRouter, Header, Depends, HTTPException, File, UploadFile
from model.model import Subject, Account
from service.OTEService import OTEService
from typing import Optional, List, Dict
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pprint import pprint
from fastapi.responses import StreamingResponse, FileResponse

from router.AccountRouter import get_current_active_user
import sys
import os


ROOT_PATH = sys.path[1]
file_config = os.path.join(ROOT_PATH, "backend/.eot/open_time_config.yaml")
router = APIRouter(prefix="/ote")

ote_service = OTEService()
#ote_service.load_config(file_config)
#ote_service.save_config(file_config)


@router.post("/update-subject-ote")
def update_subject_ote(
        config: Dict = {
                "start_time": "2021-11-01 10:30:00",
                "end_time":  "2021-11-21 10:30:00",
                "meta": {}
            },
        current_user: Account = Depends(get_current_active_user)):
    return ote_service.update_subject_ote(config)


@router.post("/update-class-ote")
def update_subject_ote(
        config: Dict = {
                "start_time": "2021-11-01 10:30:00",
                "end_time": "2021-11-21 10:30:00",
                "timeframe": {
                    "first_year": {"start_time": "00:00", "end_time": "4:30"},
                    "second_year": {"start_time": "4:30", "end_time": "9:00"},
                    "third_year": {"start_time": "9:00", "end_time": "13:30"},
                    "fourth_year": {"start_time": "13:30", "end_time": "18:00"},
                    "last_year": {"start_time": "18:00", "end_time": "23:59"},
                },
                "meta": {}
            },
        current_user: Account = Depends(get_current_active_user)):
    return ote_service.update_class_ote(config)


@router.get("/get-subject-ote")
async def get_subject_ote():
    res = await ote_service.get_subject_ote()
    return res


@router.get("/get-class-ote")
async def get_subject_ote():
    res = await ote_service.get_class_ote()
    return res


# @router.get("/validate-regis-class-time")
# async def validate_regis_class_time(student: Account):
#     res = await ote_service.validate_regis_class_time(student)
#     return res
#
#
# @router.get("/validate-regis-subject-time")
# async def validate_regis_class_time():
#     res = await ote_service.validate_regis_subject_time()
#     return res
