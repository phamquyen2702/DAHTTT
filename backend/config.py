from pydantic import BaseSettings
from typing import Union, List, Optional
import json


class Settings(BaseSettings):
    started_year = 1956
    algorithm = "HS256"
    expire_minutes = 90
    secret = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"

    db_username = "root"
    db_password = "root"
    db_name = "DAHTTT"
