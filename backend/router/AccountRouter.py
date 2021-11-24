from fastapi import APIRouter, Header, Depends, HTTPException
from model.model import Account
from service.AccountService import AccountService
from typing import Optional, List 
router = APIRouter(prefix="/account")

accountService = AccountService()

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
