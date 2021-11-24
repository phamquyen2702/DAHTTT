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


mycursor.execute("CREATE TABLE Account (Id INT(32) PRIMARY KEY,\
email VARCHAR(255) UNIQUE,\
password VARCHAR(255),\
fullname VARCHAR(255),\
address VARCHAR(255),\
birthday Datetime,\
phone VARCHAR(12),\
status INT(8),\
role INT(8),\
schoolyear INT(32),\
cmnd VARCHAR(15),\
gender VARCHAR(255),\
program VARCHAR(255),\
schoolId VARCHAR(255),\
maxcredit INT(8))")


sql = "INSERT INTO Account (Id, email, password, fullname, address, birthday, phone, status, role) VALUES (%s,%s, %s, %s, %s, %s,%s,%s,%s)"
#sql = "UPDATE Account WHERE Id = %s SET  email=%s, password=%s, fullname=%s, address=%s, birthday=%s, phone=%s, status=%s, role=%s "

val = (0,"admin@gmail.com","$2b$12$PkQkPgUJYoQqtyi3Yz4HReEbF1.YypT2x/hS93HE1cIcp/eEVZE7W",\
 "Nguyen Hoang Thuan","abdc","1999-02-08","01234560",1,3)
mycursor.execute(sql, val)
mydb.commit()

mycursor.execute("select * from Account where Id=0 LIMIT 5 OFFSET 0")
records = mycursor.fetchall()
print("Total number of rows in table: ", mycursor.rowcount)

print("\nPrinting each row")
for row in records:
    print(row)

