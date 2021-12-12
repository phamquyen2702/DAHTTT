from typing import Dict, List, Optional
from pydantic import BaseModel
from datetime import datetime

class Sub_Reg(BaseModel):
    Id: int
    subjectId: str
    semeter: int
    timestamp: int

    

if __name__ =="__main__":
    sub_reg = Sub_Reg()