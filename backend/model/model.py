from typing import Dict, List, Optional
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
    role : int # 0 khách, 1 sinh viên, 2 quản lý đào tạo, 3 quản trị hệ thống
    schoolyear : Optional[int] = None 
    cmnd : Optional[str] = None 
    gender : Optional[str] = None 
    program : Optional[str] = None 
    schoolId : Optional[str] = None 
    maxcredit : Optional[int] = None 

if __name__ =="__main__":
    account = Account()