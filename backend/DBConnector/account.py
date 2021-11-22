import mysql.connector
from config import Settings
from model.model import *
class AccountConnector:
    def __init__(self, ):
        self.config = Settings()
        self.db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )

    async def get_account_by_id(self,Id):
        mycursor = self.db.cursor()
        mycursor.execute("select * from Account")
        records = mycursor.fetchall()
        results = []
        for row in records:
            row = list(row)
            row[5] = str(row[5]) # format datetime to str
            results.append(Account(
                Id =int(row[0]),
                email =row[1],
                password =row[2],
                fullname =row[3],
                address =row[4],
                birthday =row[5],
                phone =row[6],
                status =int(row[7]),
                role =int(row[8]),
            ))
        mycursor.close()
        return results


