import mysql.connector
from config import Settings
from model.model import *
from fastapi import HTTPException
from typing import List, Optional

class StatisticConnector:
    def __init__(self):
        self.config = Settings()

    async def stat_subject_reg_by_school(self,semester):
        sql = f"SELECT schoolId ,count(DISTINCT subjectregister.Id) from Account,subjectregister WHERE Account.Id = subjectregister.Id and subjectregister.semester={semester} group by schoolId "
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        
        mycursor.execute(sql)
        records = mycursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(StatBySchool(schoolId=row[0],soluongSV=row[1])
            )  
        
        mycursor.close()
        db.close()
        return results

    async def stat_class_reg_by_school(self,semester):
        sql = f"SELECT schoolId ,count(DISTINCT classregister.Id) from Account,classregister WHERE Account.Id = classregister.Id and classregister.semester={semester} group by schoolId "
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        
        mycursor.execute(sql)
        records = mycursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(StatBySchool(schoolId=row[0],soluongSV=row[1])
            )  
        
        mycursor.close()
        db.close()
        return results

    async def stat_class_reg_by_day(self,semester):
        sql = f"SELECT DATE(FROM_UNIXTIME(classregister.timestamp)) as fordate,count(DISTINCT classregister.Id) \
                    from Account,classregister\
                    WHERE Account.Id = classregister.Id  and classregister.semester = {semester}\
                    group by DATE(FROM_UNIXTIME(classregister.timestamp))\
                    order by fordate"
        print(sql)
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        
        mycursor.execute(sql)
        try:
            records = mycursor.fetchall()
        except:
            return []
        results = []
        for row in records:
            row = list(row)
            results.append(StatByDay(day=str(row[0]),numberSV=row[1])
            )  
        
        mycursor.close()
        db.close()
        return results
    async def stat_subject_reg_by_day(self,semester):
        sql = f"SELECT DATE(FROM_UNIXTIME(subjectregister.timestamp)) as fordate,count(DISTINCT subjectregister.Id) \
                    from Account,subjectregister\
                    WHERE Account.Id = subjectregister.Id  and subjectregister.semester = {semester}\
                    group by DATE(FROM_UNIXTIME(subjectregister.timestamp))\
                    order by fordate"
        print(sql)
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        
        mycursor.execute(sql)
        try:
            records = mycursor.fetchall()
        except:
            return []
        results = []
        for row in records:
            row = list(row)
            results.append(StatByDay(day=str(row[0]),numberSV=row[1])
            )  
        
        mycursor.close()
        db.close()
        return results