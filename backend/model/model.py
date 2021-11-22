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
    status : int
    role : int 
