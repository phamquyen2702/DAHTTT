from typing import Dict, List, Optional
from pydantic import BaseModel
from datetime import datetime

class Class_Reg(BaseModel):
    Id: int
    classId: str
    semester:int
    timestamp: int

    

if __name__ =="__main__":
    class_reg = Class_Reg()