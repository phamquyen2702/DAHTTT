from fastapi import APIRouter, Header, Depends, HTTPException, File, UploadFile
from model.model import Subject, Account
from service.OTEService import OTEService
from typing import Optional, List, Dict
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pprint import pprint
from fastapi.responses import StreamingResponse, FileResponse

from router.AccountRouter import get_current_active_user


router = APIRouter(prefix="/ote")
ote_service = OTEService()
ote_service.load_config()


@router.post("/update-subject-ote")
def update_subject_ote(
        config: Dict = {
                "start_time": "10:30 01/11/2021",
                "end_time":  "10:30 21/11/2021",
                "meta": {}
            },
        current_user: Account = Depends(get_current_active_user)):
    return ote_service.update_subject_ote(config)


@router.post("/update-class-ote")
def update_subject_ote(
        config: Dict = {
                "start_time": "10:30 01/11/2021",
                "end_time": "10:30 21/11/2021",
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
