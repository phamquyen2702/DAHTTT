from fastapi import APIRouter, Header, Depends, HTTPException,File,UploadFile
from model.model import Account, Class,Subject
from service.AccountService import AccountService

#------------REGISTER--------------#
from model.subject_regModel import Sub_Reg
from model.class_regModel import Class_Reg
from service.Subject_regService import Subject_regService
from service.Class_regService import Class_regService
#------------REGISTER--------------#
from typing import Optional, List 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pprint import pprint
from fastapi.responses import StreamingResponse, FileResponse
import random

from . AccountRouter import get_current_active_user

class SubjectRegRequest(BaseModel):
    subjects: List[Subject]

router = APIRouter(prefix="/regSubject")
subject_regService = Subject_regService()

@router.get("/search")
async def search( semester : int,Id:Optional[int]=None,current_user: Account = Depends(get_current_active_user)):
    if current_user.role != 1:
        Id = Id
    else:
        Id = current_user.Id
    return await subject_regService.search(Id,semester,subjectId)

@router.post("/subReg")
async def subReg( semester,sub_reg: SubjectRegRequest,current_user: Account = Depends(get_current_active_user)):
    return await subject_regService.subject_reg(sub_reg,semester, current_user)

@router.post("/subDel")
async def subDel(semester,subjectId:Optional[str]=None, current_user: Account = Depends(get_current_active_user)):
    return await subject_regService.subject_del([subjectId], semester,current_user)

