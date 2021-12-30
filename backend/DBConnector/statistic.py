import mysql.connector
from config import Settings
from model.model import *
from fastapi import HTTPException
from typing import List, Optional

class StatisticConnector:
    def __init__(self):
        pass