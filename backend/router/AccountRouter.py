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
class Login(BaseModel):
    email : str
    password : str
    role : str
class ClassRegRequest(BaseModel):
    classes: List[Class]
class SubjectRegRequest(BaseModel):
    subjects: List[Subject]
class ChangePassword(BaseModel):
    old_password: str
    new_password : str
parse_role = {"ROLE_ADMIN":3,"ROLE_STUDENT":1,"ROLE_TM":2}

router = APIRouter(prefix="/account")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")
accountService = AccountService()


async def get_current_active_user(current_user: Account = Depends(accountService.get_current_user)):
	if current_user.status == 0:
		raise HTTPException(status_code=400, detail="Inactive user")
	return current_user

@router.get("/me", response_model=Account)
async def read_users_me(current_user: Account = Depends(get_current_active_user)):
	return current_user

#------------REGISTER--------------#
subject_regService = Subject_regService()
class_regService = Class_regService()
@router.post("/subReg")
async def subReg( semester,sub_reg: SubjectRegRequest,current_user: Account = Depends(get_current_active_user)):
    return await subject_regService.subject_reg(sub_reg,semester, current_user)

@router.post("/subDel")
async def subDel(semester,subjectId:Optional[str]=None, current_user: Account = Depends(get_current_active_user)):
    return await subject_regService.subject_del([subjectId], semester,current_user)

@router.post("/classReg")
async def classReg(class_reg: ClassRegRequest,current_user: Account = Depends(get_current_active_user)):
    return await class_regService.class_reg(class_reg, current_user)

@router.post("/classDel")
async def classDel(classId:Optional[str]=None, current_user: Account = Depends(get_current_active_user)):
    return await class_regService.class_del([classId],current_user)
#------------REGISTER--------------#

@router.post("/login")
async def login(form_data: Login):
    form_data.role = parse_role[form_data.role]
    return await accountService.authenticate(form_data)

@router.post("/register")
async def register(account:Account):
    return await accountService.register(accountService.map_role([account]))

@router.get("/get-by-id")
async def get_by_id(Id:Optional[str]=None,email:Optional[str]=None):
    accounts = await accountService.get_account_by_id(Id,email)
    return {"accounts":accountService.map_revert_role(accounts) }

@router.get("/search")
async def search(Id : Optional[int]=None, email: Optional[str]=None, fullname: Optional[str]=None,\
                address : Optional[str]=None, birthday: Optional[str]=None, phone: Optional[str]=None,\
                status: Optional[int]=None, role: Optional[int]=None, schoolyear: Optional[int]=None,\
                cmnd: Optional[str]=None, gender: Optional[str]=None,program: Optional[str]=None, \
                schoolId : Optional[str]=None, maxcredit: Optional[int]=None,limit=20,offset=0,export:int=0):
    if export == 1:
        limit = None
        offset = None  
    accounts = await accountService.search( Id = Id, email=email, fullname = fullname,address =fullname,\
                                            birthday=birthday, phone=phone,status=status, role=role,\
                                            schoolyear=schoolyear,cmnd=cmnd, gender=gender,program=program, \
                                            schoolId =schoolId, maxcredit=maxcredit,limit=limit,offset=offset)
    accounts = accountService.map_revert_role(accounts)
    if export == 0:    
        return accounts
    else:
        stream = await accountService.export_file(accounts)
        response = StreamingResponse(iter([stream.getvalue()]),media_type="text/csv" )#"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#
        response.headers["Content-Disposition"] = "attachment; filename=export.csv"
        return response

@router.post("/update")
async def update(account:Account):
    account = accountService.map_role([account])[0]
    res = await accountService.update_one(account)
    return res

@router.get("/change-password")
async def change_password(form:ChangePassword, current_user: Account = Depends(get_current_active_user) ):
    old_password, new_password = form.old_password,form.new_password

    res = await accountService.change_password(old_password,new_password,current_user)
    return res

@router.post("/import")
async def import_file(file: UploadFile = File(...)):
    content = await file.read()
    res = await accountService.import_file(content)
    return res
