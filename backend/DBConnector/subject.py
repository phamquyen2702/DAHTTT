import mysql.connector
from config import Settings
from model.model import Subject
from fastapi import HTTPException
from typing import List, Text, Dict, Union
import logging


class SubjectConnector:
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
        self.sql_insert_subject = "INSERT INTO Subject (subjectId, subjectName, credit, programsemester, schoolId," \
                                  " status, note) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        self.sql_update_subject = "UPDATE Subject SET subjectName=%s, credit=%s," \
                                  " programsemester=%s, schoolId=%s, status=%s, note=%s WHERE subjectId=%s "

    @staticmethod
    def validate(subject: Subject):
        if subject.subjectId is None or isinstance(subject.subjectId, str) is False:
            logging.error(f"Field `subjectId` is null in subject: {subject.dict()}")
            raise HTTPException(status_code=422, detail="Invalid Schema")

        if subject.subjectName is None or isinstance(subject.subjectName, str) is False:
            logging.error(f"Field `subjectName` is null in subject: {subject.dict()}")
            raise HTTPException(status_code=422, detail="Invalid Schema")

        if subject.credit is None or isinstance(subject.credit, int) is False:
            logging.error(f"Field `credit` is null in subject: {subject.dict()}")
            raise HTTPException(status_code=422, detail="Invalid Schema")

        if subject.programsemester is None or isinstance(subject.programsemester, int) is False:
            logging.error(f"Field `programsemester` is null in subject: {subject.dict()}")
            raise HTTPException(status_code=422, detail="Invalid Schema")

        if subject.schoolId is None or isinstance(subject.schoolId, str) is False:
            logging.error(f"Field `schoolId` is null in subject: {subject.dict()}")
            raise HTTPException(status_code=422, detail="Invalid Schema")

        return True

    def object2data(self, subject: Subject, id_place='first'):
        """
        :param subject:
        :param id_place: first: subjectId in index 0, last: subjectId in last index
        :return:
        """
        subject_ = subject.dict()
        subject_ = list(subject_.values())
        if id_place == 'last':
            subjectID = subject_[0]
            subject_.pop(0)
            subject_.append(subjectID)
        return tuple(subject_)

    def do_query(self, data: List[tuple], sql_other: str):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        mycursor = db.cursor()
        try:
            mycursor.executemany(sql_other, data)
            db.commit()
        except mysql.connector.Error as error:
            # reverting changes because of exception
            db.rollback()
            print(data)
            raise HTTPException("Failed to update record to database rollback: {}".format(error))
        mycursor.close()
        db.close()

    async def insert(self, subjects: Union[List[Subject], Subject]):
        if isinstance(subjects, Subject):
            subjects = [subjects]

        for subject in subjects:
            self.validate(subject)

        subjects = [self.object2data(x) for x in subjects]
        if subjects:
            self.do_query(subjects, self.sql_insert_subject)
            print("Insert subject Done!")
        return True

    async def update(self,  subjects: Union[List[Subject], Subject]):
        if isinstance(subjects, Subject):
            subjects = [subjects]

        for subject in subjects:
            self.validate(subject)

        subjects = [self.object2data(x, id_place='last') for x in subjects]

        if subjects:
            self.do_query(subjects, self.sql_update_subject)
            print(f"Update subjects: {str([subject[-1] for subject in subjects])} Done!")

        return True

    async def update_status(self, subjectId: str, status: int):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )

        mycursor = db.cursor()
        sql = "UPDATE Subject SET status=%s WHERE subjectId=%s"
        try:
            mycursor.execute(sql, (status, subjectId))
            db.commit()
            print(f"Update status of subject {subjectId} to `{status}` Done!")
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            # reverting changes because of exception
            db.rollback()
            return False
        mycursor.close()
        db.close()
        return True

    def do_search(self, sql: str):
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
            subject = Subject.from_list(row)
            results.append(subject)
        mycursor.close()
        db.close()
        return results

    async def search(self, limit: int = 20, offset: int = 0, filters: Dict = {}, **kwargs):
        sql = "select * from Subject"
        if filters:
            condition = ""
            for i, (key, value) in enumerate(filters.items()):
                if value:
                    if isinstance(value, str):
                        value = f'"{value}"'
                    if len(condition) == 0:
                        condition += f" {key}={value}"
                    else:
                        condition += f" AND {key}={value}"

            if len(condition) > 0:
                sql += " WHERE" + condition

        if limit:
            sql += f" LIMIT {limit}"

        if offset:
            sql += f" OFFSET {offset}"

        # print(sql)
        results = self.do_search(sql)
        return results

    async def get_subject_by_id(self, subjectID: Text):
        db = mysql.connector.connect(
            host="localhost",
            user=self.config.db_username,
            password=self.config.db_password,
            database=self.config.db_name
        )
        mycursor = db.cursor()

        mycursor.execute("select * from Subject where subjectID=%s", (subjectID,))

        records = mycursor.fetchall()
        results = []

        for row in records:
            subject = Subject.from_list(row)
            results.append(subject)

        mycursor.close()
        db.close()
        return results



