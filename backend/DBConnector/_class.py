import mysql.connector
from config import Settings
from model.model import Class, Account
from fastapi import HTTPException
from typing import List, Optional


class ClassConnector:
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
        self.sql_insert = "INSERT INTO Class (classId, subjectId, semester, location, day, timeStart, timeEnd, registered, " \
                          "`limit`, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        self.sql_update = "UPDATE Class SET subjectId=%s,  semester=%s, location=%s, day=%s, timeStart=%s, " \
                          "timeEnd=%s, registered=%s, `limit`=%s, status=%s  WHERE classId = %s "
        self.sql_lock = "UPDATE Class SET status=0 WHERE classId = %s"
        self.sql_unlock = "UPDATE Class SET status=1 WHERE classId = %s"

    def validate(self, _class: Class):
        day = _class.day
        timeStart = _class.timeStart
        timeEnd = _class.timeEnd
        limit = _class.limit
        if (day < 2) or (day > 7) or (timeStart < 1) or (timeStart > 12) or (timeEnd < 1) or (timeEnd > 12) or (
                limit < 0) or (timeEnd < timeStart):
            raise HTTPException(status_code=422, detail="Invalid Schema")
        return True

    def object2data(self, _class: Class):
        self.validate(_class)
        _class = _class.dict()
        _class = tuple(list(_class.values())[:-2])
        return _class

    def do_query(self, _classes: List[tuple], sql_other: str):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        my_cursor = db.cursor()
        try:
            my_cursor.executemany(sql_other, _classes)
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            # reverting changes because of exception
            db.rollback()
            my_cursor.close()
            db.close()
            raise HTTPException(status_code=500, detail="Can't execute the query")
        my_cursor.close()
        db.close()

    async def insert(self, _classes: List[Class]):
        _classes = [self.object2data(x) for x in _classes]
        self.do_query(_classes, self.sql_insert)
        return True

    async def update(self, _classes: List[Class]):
        _classes = [self.object2data(x) for x in _classes]
        _classes = [(x[1:] + (x[0],)) for x in _classes]
        self.do_query(_classes, self.sql_update)
        return True

    async def lock(self, classIds: List[int]):
        classIds = [(i,) for i in classIds]
        self.do_query(classIds, self.sql_lock)
        return True

    async def unlock(self, classIds: List[int]):
        classIds = [(i,) for i in classIds]
        self.do_query(classIds, self.sql_unlock)
        return True

    def do_search(self, sql: str):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        my_cursor = db.cursor()
        print(sql)
        my_cursor.execute(sql)
        records = my_cursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(Class(
                classId=int(row[0]),
                subjectId=row[1],
                semester=int(row[2]),
                location=row[3],
                day=int(row[4]),
                timeStart=int(row[5]),
                timeEnd=int(row[6]),
                registered=int(row[7]),
                limit=int(row[8]),
                status=int(row[9])
            ))
        my_cursor.close()
        db.close()
        return results

    def do_count(self, sql: str):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        mycursor = db.cursor()

        mycursor.execute(sql)
        result = mycursor.fetchone()
        mycursor.close()
        db.close()
        return result

    async def search(self, count=0, limit=20, offset=0, **kwargs):
        """
             classId: Optional[int] = None,
             subjectId: Optional[str] = None,
             semester: Optional[int] = None,
             location: Optional[str] = None,
             day: Optional[int] = None,
             timeStart: Optional[int] = None,
             timeEnd: Optional[int] = None,
             registered: Optional[int] = None,
             _limit: Optional[int] = None,
             status: Optional[str] = None,
             limit: int = 20,
             offset: int = 0,
             export: int = 0
        """
        if count == 0:
            sql = "select * from Class "
        else:
            sql = "select count(*) from Class "
        i = 0

        accepted = []
        for key, value in kwargs.items():
            if value is None:
                continue
            else:
                accepted.append((key, value))
        n = len(accepted)
        for key, value in accepted:
            if key == '_limit':
                key = "`limit`"
            if key == 'export':
                continue
            if type(value) == type(1):
                val = str(value)
            elif type(value) == type("s"):
                val = "'" + value + "'"
            if i == 0:
                sql += "WHERE " + str(key) + "=" + val + " AND "

            else:
                sql += str(key) + "=" + val + " AND "

            i += 1
        if sql[-4:] == "AND ":
            sql = sql[:-4] + " "
        if (limit is not None) and (offset is not None):
            sql += "LIMIT " + str(limit) + " OFFSET " + str(offset)
        else:
            sql = sql[:-1]
        if count == 0:
            results = self.do_search(sql)
        else:
            results = self.do_count(sql)[0]
        return results
    async def count_class_like_id(self,classId):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        my_cursor = db.cursor()
        if classId is not None:
            print("search class")
            my_cursor.execute(f"select count(*) from Class where classId like '%{classId}%'")

        records = my_cursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(row[0])
        my_cursor.close()
        db.close()
        return results[0]

    async def get_class_like_subjectId(self,subjectId,limit,offset):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        my_cursor = db.cursor()
        if subjectId is not None:
            print("search class")
            my_cursor.execute(f"select * from Class where subjectId like '%{subjectId}%' limit {limit} offset {offset}")

        records = my_cursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(Class(
                classId=int(row[0]),
                subjectId=row[1],
                semester=int(row[2]),
                location=row[3],
                day=int(row[4]),
                timeStart=int(row[5]),
                timeEnd=int(row[6]),
                registered=int(row[7]),
                limit=int(row[8]),
                status=int(row[9])
            ))
        my_cursor.close()
        db.close()
        return results
    async def get_class_like_id(self,classId,limit,offset):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        my_cursor = db.cursor()
        if classId is not None:
            print("search class")
            my_cursor.execute(f"select * from Class where classId like '%{classId}%' limit {limit} offset {offset}")

        records = my_cursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(Class(
                classId=int(row[0]),
                subjectId=row[1],
                semester=int(row[2]),
                location=row[3],
                day=int(row[4]),
                timeStart=int(row[5]),
                timeEnd=int(row[6]),
                registered=int(row[7]),
                limit=int(row[8]),
                status=int(row[9])
            ))
        my_cursor.close()
        db.close()
        return results

    async def search_collision(self,semester,location,day,timeStart,timeEnd):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        my_cursor = db.cursor()
        
        my_cursor.execute(f"SELECT * FROM Class WHERE day={day} and location = '{location}' and semester = {semester} and status = 1  AND ((timeStart >= {timeStart} and timeStart <= {timeEnd}) or (timeEnd>={timeStart} AND timeEnd <= {timeEnd}) or (timeStart<={timeStart} and timeEnd >= {timeEnd}))")
        records = my_cursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(Class(
                classId=int(row[0]),
                subjectId=row[1],
                semester=int(row[2]),
                location=row[3],
                day=int(row[4]),
                timeStart=int(row[5]),
                timeEnd=int(row[6]),
                registered=int(row[7]),
                limit=int(row[8]),
                status=int(row[9])
            ))
        my_cursor.close()
        db.close()
        return results
    async def get_class_by_id(self, Id=None):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        my_cursor = db.cursor()
        if Id is not None:
            my_cursor.execute("select * from Class where classId=%s", (Id,))
        records = my_cursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            results.append(Class(
                classId=int(row[0]),
                subjectId=row[1],
                semester=int(row[2]),
                location=row[3],
                day=int(row[4]),
                timeStart=int(row[5]),
                timeEnd=int(row[6]),
                registered=int(row[7]),
                limit=int(row[8]),
                status=int(row[9])
            ))
        my_cursor.close()
        db.close()
        return results
