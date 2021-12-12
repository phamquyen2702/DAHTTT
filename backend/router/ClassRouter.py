from fastapi import APIRouter, Header, Depends, HTTPException, File, UploadFile
from model.model import Account, Class
from service.AccountService import AccountService
from service.ClassService import ClassService
from typing import Optional, List
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pprint import pprint
from fastapi.responses import StreamingResponse, FileResponse

router = APIRouter(prefix="/class")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")
accountService = AccountService()
classService = ClassService()


async def get_current_active_user(current_user: Account = Depends(accountService.get_current_user)):
    if current_user.status == 0:
        raise HTTPException(status_code=400, detail="Inactive user")
    if current_user.role != 2:
        raise HTTPException(status_code=400, detail="You don't have right to do this")
    return current_user




@router.post("/add")
async def add_class(_class: Class, current_user: Account = Depends(get_current_active_user)):
    return await classService.add([_class])


@router.post("/update")
async def update(_class: Class):
    res = await classService.update_one(_class)
    return res


@router.post("/lock/{classId}")
async def lock(classId: int):
    res = await classService.lock_one(classId)
    return res


@router.post("/unlock/{classId}")
async def unlock(classId: int):
    res = await classService.unlock_one(classId)
    return res

"""
@router.post("/import")
async def import_file(file: UploadFile = File(...)):
    content = await file.read()
    res = await classService.import_file(content)
    return res

"""
@router.get("/search")
async def search(classId: Optional[int] = None,
                 subjectId: Optional[str] = None,
                 semester: Optional[int] = None,
                 location: Optional[str] = None,
                 day: Optional[int] = None,
                 timeStart: Optional[int] = None,
                 timeEnd: Optional[int] = None,
                 registered: Optional[int] = None,
                 _limit: Optional[int] = None,
                 status: Optional[str] = None,
                 limit: int = 20,
                 offset: int = 0,
                 export: int = 0):
    print(classId, type(classId))
    if export == 1:
        limit = None
        offset = None
    _classes = await classService.search(classId=classId,
                                         subjectId=subjectId,
                                         semester=semester,
                                         location=location,
                                         day=day,
                                         timeStart=timeStart,
                                         timeEnd=timeEnd,
                                         registered=registered,
                                         _limit=_limit,
                                         status=status,
                                         limit=limit,
                                         offset=offset,
                                         export=export)
    if export == 0:
        return _classes
    else:
        stream = await classService.export_file(_classes)
        response = StreamingResponse(iter([stream.getvalue()]),
                                     media_type="text/csv")  # "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#
        response.headers["Content-Disposition"] = "attachment; filename=export.csv"
        return response


@router.post("/import")
async def import_file(file: UploadFile = File(...)):
    print('ok')
    content = await file.read()
    res = await classService.import_file(content)
    return res


@router.get("/{classId}")
async def get_class_by_id(classId: int):
    res = await classService.get_class_by_id(classId)
    return res