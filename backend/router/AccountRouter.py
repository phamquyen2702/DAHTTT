from fastapi import APIRouter, Header, Depends, HTTPException,File,UploadFile
from model.model import Account
from service.AccountService import AccountService
from typing import Optional, List 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pprint import pprint

class Login(BaseModel):
    email : str
    password : str
    role : int


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

@router.post("/login")
async def login(form_data: Login=Depends()):
    return await accountService.authenticate(form_data)

@router.post("/register")
async def register(account:Account):
    return await accountService.register([account])

@router.get("/get-by-id")
async def get_by_id(Id:Optional[str]=None,email:Optional[str]=None):
    accounts = await accountService.get_account_by_id(Id,email)
    return {"accounts":accounts}

@router.get("/search")
async def search(Id : Optional[int]=None, email: Optional[str]=None, fullname: Optional[str]=None,\
                address : Optional[str]=None, birthday: Optional[str]=None, phone: Optional[str]=None,\
                status: Optional[int]=None, role: Optional[int]=None, schoolyear: Optional[int]=None,\
                cmnd: Optional[str]=None, gender: Optional[str]=None,program: Optional[str]=None, \
                schoolId : Optional[str]=None, maxcredit: Optional[int]=None,limit=20,offset=0):
    accounts = await accountService.search( Id = Id, email=email, fullname = fullname,address =fullname,\
                                            birthday=birthday, phone=phone,status=status, role=role,\
                                            schoolyear=schoolyear,cmnd=cmnd, gender=gender,program=program, \
                                            schoolId =schoolId, maxcredit=maxcredit,limit=limit,offset=offset)
    return accounts

@router.post("/update")
async def update(account:Account):
    res = await accountService.update_one(account)
    return res

@router.get("/change-password")
async def change_password(old_password, new_password, current_user: Account = Depends(get_current_active_user) ):
    res = await accountService.change_password(old_password,new_password,current_user)
    return res

@router.post("/import")
async def import_file(file: UploadFile = File(...)):
    content = await file.read()
    res = await accountService.import_file(content)
    return res