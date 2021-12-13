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


@router.post("/update")
async def update_subject(subject: Subject, current_user: Account = Depends(get_current_active_user)):
    if current_user.role < 2:
        raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
                                                    f" không có quyền sửa đổi thông tin học phần.")
    res = await subject_service.update(subject)
    return res


@router.post("/lock")
async def lock_subject(subjectId, current_user: Account = Depends(get_current_active_user)):
    if current_user.role < 2:
        raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
                                                    f" không có quyền khóa học phần")
    res = await subject_service.update_satus(subjectId, 0)
    return res


@router.post("/unlock")
async def unlock_subject(subjectId, current_user: Account = Depends(get_current_active_user)):
    if current_user.role < 2:
        raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
                                                    f" không có quyền mở khóa học phần")
    res = await subject_service.update_satus(subjectId, 1)
    return res


@router.post("/import")
async def import_subject(file: UploadFile = File(...), current_user: Account = Depends(get_current_active_user)):
    if current_user.role < 2:
        raise HTTPException(status_code=400, detail=f"Tài khoản với vai trò {current_user.role}"
                                                    f" không có quyền import học phần")

    content = await file.read()
    res = await subject_service.import_file(content)
    return res

# @router.post("/import")
# async def import_subject(file: UploadFile = File(...)):
#     content = await file.read()
#     res = await subject_service.import_file(content)
#     return res


@router.post("/export")
async def export_subject(subjects: List[Subject]):
    res = await subject_service.export_file(subjects)
    return res
