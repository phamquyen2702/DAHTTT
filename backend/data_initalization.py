import mysql.connector

try:
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="root"
    )
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE DAHTTT")
    mycursor.close()
    mydb.close()
except:
    print("Database DAHTTT is exists")

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

# mycursor.execute("CREATE TABLE classregister (Id INT(32) ,\
# classId INT(32) ,\
# timestamp INT(32), primary key (Id,classId))")

mycursor.execute("CREATE TABLE subjectregister (Id INT(32) ,\
subjectId VARCHAR(255),semester INT(32) ,\
timestamp INT(32), primary key (Id,subjectId,semester))")


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

val = (0,"admin@gmail.com","$2b$12$an6B5xNZK4t2gZmVxSEdku6yPM8aeI76ial.8yszxBFl3kNzh9cK6",\
 "Nguyen Hoang Thuan","abdc","1999-02-08","01234560",1,3)
mycursor.execute(sql, val)
mydb.commit()

mycursor.execute("select * from Account LIMIT 5 OFFSET 0")
records = mycursor.fetchall()
print("Total number of rows in table: ", mycursor.rowcount)

print("\nPrinting each row")
for row in records:
    print(row)
try:
  mycursor.execute("CREATE TABLE Class (classId INT(32) PRIMARY KEY AUTO_INCREMENT,\
  subjectId	VARCHAR(10),\
  semester	INT(32),\
  location	VARCHAR(20),\
  day	INT(8),\
  timeStart	INT(32),\
  timeEnd	INT(32),\
  registered	INT(32),\
  `limit`	INT(32),\
  status	INT(8))")

  sql = "INSERT INTO Class (subjectId, semester, location, day, timeStart, timeEnd, registered, `limit`, status) VALUES (" \
      "%s,%s, %s, %s, %s, %s,%s,%s,%s) "
  val = (0, 20211, "TC-403", 2, 1, 4, 0, 120, 1)
  mycursor.execute(sql, val)
  mydb.commit()
except:
  print("Table Class is arleady exists")



try:
  mycursor.execute("CREATE TABLE Subject (\
  subjectId VARCHAR(255) PRIMARY KEY,\
  subjectName VARCHAR(255) UNIQUE,\
  credit INT(8),\
  programsemester INT(8),\
  schoolId VARCHAR(255),\
  status Int,\
  note VARCHAR(255))"
  )
except:
  print("Table Subject is arleady exists")


sql = "INSERT INTO Subject (subjectId, subjectName, credit, programsemester, schoolId, note) VALUES (%s,%s, %s, %s, %s, %s)"
# sql = "UPDATE Subject WHERE subjectId = %s SET  credit=%s, programsemester=%s, schoolId=%s, note=%s)"
#
try:
    val = ("IT0001", "Đồ án hệ thống thông tin", 3, 5, "KCNTT", 1)
    mycursor.execute(sql, val)
    mydb.commit()
except:
    print("")

mycursor.execute("select * from Subject where schoolId='KCNTT' LIMIT 5 OFFSET 0")
records = mycursor.fetchall()
print("Total number of rows in table: ", mycursor.rowcount)

print("\nPrinting each row")
for row in records:
    print(row)
