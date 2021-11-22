from fastapi import APIRouter, Header, Depends, HTTPException
from model.model import Account
from service.AccountService import AccountService
router = APIRouter(prefix="/account")

accountService = AccountService()

@router.get("/get-by-id")
async def get_by_id(Id:str):
    accounts = await accountService.get_account_by_id(Id)
    return {"accounts":accounts}