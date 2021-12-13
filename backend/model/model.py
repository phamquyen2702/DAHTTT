from typing import Dict, List, Optional, Text, Union
from pydantic import BaseModel
from datetime import datetime


class Account(BaseModel):
    Id : int 
    email : str
    password :str
    fullname : str
    address : str
    birthday : str
    phone : str
    status : int # 1 active, 0 inactive
    role : Union[int ,str]# 0 khách, 1 sinh viên, 2 quản lý đào tạo, 3 quản trị hệ thống
    schoolyear : Optional[int] = None 
    cmnd : Optional[str] = None 
    gender : Optional[str] = None 
    program : Optional[str] = None 
    schoolId : Optional[str] = None 
    maxcredit : Optional[int] = None


class Class(BaseModel):
    classId: int
    subjectId: str
    semester: int
    location: str
    day: int
    timeStart: int
    timeEnd: int
    registered: int
    limit: int
    status: int


class Subject(BaseModel):
    subjectId: Text
    subjectName: Text
    credit: int
    programsemester: int
    schoolId: Text
    status: Optional[int] = 1  # 1 active, 0 inactive
    note: Optional[int] = None

    @classmethod
    def from_list(cls, data):
        assert len(data) == 7
        return cls(
            subjectId=data[0],
            subjectName=data[1],
            credit=data[2],
            programsemester=data[3],
            schoolId=data[4],
            status=data[5],
            note=data[6]
        )
