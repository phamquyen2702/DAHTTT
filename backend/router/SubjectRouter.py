from fastapi import APIRouter, Header, Depends, HTTPException,File,UploadFile
from model.model import Subject, Account
from service.SubjectService import SubjectService
from typing import Optional, List, Dict
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pprint import pprint
from fastapi.responses import StreamingResponse, FileResponse

from router.AccountRouter import get_current_active_user


router = APIRouter(prefix="/subject")
subject_service = SubjectService()


@router.get("/get-by-id")
async def get_by_id(subjectId):
    subject = await subject_service.get_subject_by_id(subjectId)
    return {"subject": subject}
@router.get("/count-like-id")
async def count_subject_like_id(subjectId:str):
    return await subject_service.count_subject_like_id(subjectId)
@router.get("/get-like-id")
async def get_like_id(subjectId,limit:str=20,offset:str=0):
    subject = await subject_service.get_subject_like_id(subjectId,limit,offset)
    return {"subject": subject}
@router.get("/search")
async def search_subject(
        subjectId: str = None,
        subjectName: str = None,
        credit: int = None,
        programsemester:int = None,
        schoolId: str = None,
        status: int = None,
        note: str = None,
        limit: int = 20,
        offset: int = 0,
        export: int = 0
):
    filters = {
        "subjectId": subjectId,
        "subjectName": subjectName,
        "credit": credit,
        "programsemester": programsemester,
        "schoolId": schoolId,
        "status": status,
        "note": note
    }
    if status == 3: filters["status"] = None
    if schoolId == "all": filters["schoolId"] = None
    if export:
        limit = None
        offset = None
    subjects = await subject_service.search(filters=filters, limit=limit, offset=offset)

    if export == 0:
        return subjects
    else:
        stream = await subject_service.export_file(subjects)
        response = StreamingResponse(iter([stream.getvalue()]), media_type="text/csv")
        response.headers["Content-Disposition"] = "attachment; filename=export_subject.csv"
        return response

@router.get("/checkSubjectId/{subjectId}")
async def checkSubjectId(subjectId:str):
    filters = {
        "subjectId": subjectId,
        "subjectName": None,
        "credit": None,
        "programsemester": None,
        "schoolId": None,
        "status":None,
        "note": None
    }
    c = await subject_service.count(filters=filters)
    if c==0:
        return False
    else:
        return True
@router.get("/count")
async def count_subject(
        subjectId: str = None,
        subjectName: str = None,
        credit: int = None,
        programsemester:int = None,
        schoolId: str = None,
        status: int = None,
        note: str = None
):
    filters = {
        "subjectId": subjectId,
        "subjectName": subjectName,
        "credit": credit,
        "programsemester": programsemester,
        "schoolId": schoolId,
        "status": status,
        "note": note
    }
    if status == 3: filters["status"] = None
    if schoolId == "all" :filters["schoolId"] = None
    subjects = await subject_service.count(filters=filters)
    return subjects


@router.post("/update")
async def update_subject(subject: Subject, subjectId : str, current_user: Account = Depends(get_current_active_user)):
    if current_user.role < 2:
        raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
                                                    f" không có quyền sửa đổi thông tin học phần.")
    res = await subject_service.update(subject)
    return res


@router.post("/add")
async def add_subject(subject: Subject):#, current_user: Account = Depends(get_current_active_user)):
    # if current_user.role < 2:
    #     raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
    #                                                 f" không có quyền thêm học phần.")
    res = await subject_service.add(subject)
    return res


@router.get("/lock")
async def lock_subject(subjectId, current_user: Account = Depends(get_current_active_user)):
    if current_user.role < 2:
        raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
                                                    f" không có quyền khóa học phần")
    res = await subject_service.update_satus(subjectId, 0)
    return res


@router.get("/unlock")
async def unlock_subject(subjectId, current_user: Account = Depends(get_current_active_user)):
    if current_user.role < 2:
        raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
                                                    f" không có quyền mở khóa học phần")
    res = await subject_service.update_satus(subjectId, 1)
    return res


@router.post("/import")
async def import_subject(file: UploadFile = File(...)):#, current_user: Account = Depends(get_current_active_user)):
    # if current_user.role < 2:
    #     raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
    #                                                 f" không có quyền import học phần")

    content = await file.read()
    res = await subject_service.import_file(content)
    return res

# @router.post("/import")
# async def import_subject(file: UploadFile = File(...)):
#     content = await file.read()
#     res = await subject_service.import_file(content)
#     return res
@router.get("/get-all-subject-id")
async def get_all_subject_id(status=1):
    status = 1
    return await subject_service.get_all_subject_id(status)

@router.post("/export")
async def export_subject(subjects: List[Subject]):
    res = await subject_service.export_file(subjects)
    return res
