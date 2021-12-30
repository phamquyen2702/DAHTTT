import mysql.connector
from config import Settings
from model.model import *
from model.class_regModel import *
from fastapi import HTTPException
from typing import List, Optional

class classRegisterConnector:
    def __init__(self, ):
        self.config = Settings()
        
    def object2data(self,account:Class_Reg):
        account = account.dict()
        account = tuple(list(account.values()))
        return account
    async def count(self,semester,classId):
        sql = f"select count(*) from classregister where semester={semester} and classId={classId}"
        print(sql)    
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        
        try:
            mycursor.execute(sql)
            
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
        try:
            records = mycursor.fetchall()
        except:
            return 0
        
        results = []
        for row in records:
            row = list(row)
            
            results.append(row[0])
        mycursor.close()
        db.close()
        return results[0]

    async def search(self,Id,semester,classId=None,limit=None,offset=None):
        if limit == None and offset == None:
            sql = f"select * from classregister where semester={semester}"
            if classId != None:
                sql += f" and classId='{classId}'"
            if Id != None:
                sql += f" and Id='{Id}'"
        else:
            sql = f"select * from classregister where semester={semester} and classId={classId} limit {limit} offset {offset}"
        print(sql)    
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute(sql)
            
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
        try:
            records = mycursor.fetchall()
        except:
            return []
        results = []
        for row in records:
            row = list(row)
            
            results.append(Class_Reg(
                Id =int(row[0]),
                classId=int(row[1]),
                semester=int(row[2]),
                timestamp = int(row[3])
            ))
        mycursor.close()
        db.close()
        return results

    
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
            raise HTTPException(status_code=422, detail="Failed to update record to database rollback: {}".format(error))
        mycursor.close()
        db.close()

    async def classreg_insert(self, classreg: List[Class_Reg]):
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
                mycursor.executemany("INSERT INTO classregister (Id, classId, semester,timestamp) VALUES (%s,%s,%s,%s)", aaa)
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
                mycursor.close()
                db.close()
                raise HTTPException(status_code=422, detail="Failed to update record to database rollback: {}".format(error))
            mycursor.close()
            db.close()
       
        return True
    
    async def classdel(self, Id: int, classId: List[Optional[str]]):
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
                raise HTTPException(status_code=422, detail="Failed to update record to database rollback: {}".format(error))
            mycursor.close()
            db.close()
       
        return True    
