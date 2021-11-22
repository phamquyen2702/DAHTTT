import mysql.connector


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="DAHTTT"
)

print(mydb)
mycursor = mydb.cursor()

#mycursor.execute("CREATE DATABASE DAHTTT")
#mycursor.execute("SHOW DATABASES")
#mycursor.execute("SHOW TABLES")
"""
mycursor.execute("CREATE TABLE Account (Id INT(32) PRIMARY KEY,\
email VARCHAR(20) ,\
password VARCHAR(255),\
fullname VARCHAR(255),\
address VARCHAR(255),\
birthday Datetime,\
phone VARCHAR(12),\
status INT(8),\
role INT(8))")
"""

sql = "INSERT INTO Account (Id, email, password, fullname, address, birthday, phone, status, role) VALUES (%s,%s, %s, %s, %s, %s,%s,%s,%s)"
val = (0,"admin@gmail.com","$2b$12$PkQkPgUJYoQqtyi3Yz4HReEbF1.YypT2x/hS93HE1cIcp/eEVZE7W",\
 "Nguyen Hoang Thuan","abdc","19990208","01234560",1,3)
mycursor.execute(sql, val)
mydb.commit()

mycursor.execute("select * from Account")
records = mycursor.fetchall()
print("Total number of rows in table: ", mycursor.rowcount)

print("\nPrinting each row")
for row in records:
    print(row)