import mysql.connector
from config import Settings
from model.model import *
from model.class_regModel import *
from fastapi import HTTPException
from typing import List, Optional

class classRegisterConnector:
    def __init__(self, ):

    def object2data(self,account:Account):
        account = account.dict()
        account = tuple(list(account.values()))
        return account

    def do_query(self,accounts:List[tuple],sql_other:str):   
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.executemany(sql_other,accounts)
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
    # reverting changes because of exception
            db.rollback()
        mycursor.close()
        db.close()

    async def classreg_insert(self, classreg: list[Class_Reg]):
        aaa = []

        for reg in classreg:
            try:
                aaa.append(reg)                  
            except: 
                raise HTTPException(status_code=422, detail="bad")

        aaa = [self.object2data(x) for x in aaa]
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        if True:
            try:
                mycursor.executemany("INSERT INTO classregister (Id, classId, timestamp) VALUES (%s,%s,%s)", aaa)
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
            mycursor.close()
            db.close()
       
        return True
    
    async def classdel(self, Id: int, classId: list[Optional[str]]):
        aaa = []
        for classid in classId:
            aaa.append((Id, classid))

        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        if True:
            try:
                mycursor.executemany("DELETE FROM classregister WHERE (Id = %s) and (classId = %s);", aaa)
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
            mycursor.close()
            db.close()
       
        return True    
