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
class ClassRegRequest(BaseModel):
    classes: List[Class]



router = APIRouter(prefix="/regClass")

class_regService = Class_regService()
@router.post("/classReg")
async def classReg(class_reg: ClassRegRequest,current_user: Account = Depends(get_current_active_user)):
    return await class_regService.class_reg(class_reg, current_user)

@router.post("/classDel")
async def classDel(classId:Optional[str]=None, current_user: Account = Depends(get_current_active_user)):
    return await class_regService.class_del([classId],current_user)

