import mysql.connector
from config import Settings
from model.model import *
from model.subject_regModel import *
from fastapi import HTTPException
from typing import List, Optional
from datetime import date

class subjectRegisterConnector:
    def __init__(self, ):
        self.config = Settings()
        """
        self.db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )
        """
        self.sql_insert = "INSERT INTO subjectregister (Id, subjectId, semester, timestamp) VALUES (%s,%s, %s, %s)"
        # self.sql_insert_student =  "INSERT INTO Account (Id, email, password, fullname, address, birthday, phone, status, role, schoolyear, cmnd,gender,program, schoolId,maxcredit) VALUES (%s,%s, %s, %s, %s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        # self.sql_update_other = "UPDATE subjectregister SET  email=%s,  fullname=%s, address=%s, birthday=%s, phone=%s, status=%s, role=%s WHERE Id = %s"
        # self.sql_update_student = "UPDATE Account SET  email=%s, fullname=%s, address=%s, birthday=%s, phone=%s, status=%s, role=%s,schoolyear=%s, cmnd=%s,gender=%s,program=%s, schoolId=%s,maxcredit=%s WHERE Id = %s"
        self.sql_delete = "DELETE FROM subjectregister WHERE (Id = %s) and (subjectId = %s)"

    def object2data(self,account:Sub_Reg):
        account = account.dict()
        account = tuple(list(account.values()))
        return account

    def validatetime(self):
        pass
    
    async def search(self,Id,semester,subjectId=None):
        sql = f"select * from subjectregister where semester={semester}"
        if subjectId != None:
            sql += f" and subjectId='{subjectId}'"
        if Id != None:
            sql += f" and Id='{Id}'"
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
        records = mycursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            
            results.append(Sub_Reg(
                Id =row[0],
                subjectId=row[1],
                semester=row[2],
                timestamp = row[3]
            ))
        mycursor.close()
        db.close()
        return results
           

    async def subreg_insert(self, subreg: List[Sub_Reg]):
        aaa = []

        for reg in subreg:
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
                mycursor.executemany("INSERT INTO subjectregister (Id, subjectId, semester, timestamp) VALUES (%s,%s,%s,%s)", aaa)
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
    
    async def subdel(self, Id: int, semester:int , subjectId: List[Optional[str]]):
        aaa = []
        for subid in subjectId:
            aaa.append((Id, subid,semester))

        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        if True:
            try:
                mycursor.executemany("DELETE FROM subjectregister WHERE (Id = %s) and (subjectId = %s) and (semester = %s);", aaa)
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