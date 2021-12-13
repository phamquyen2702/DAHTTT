import mysql.connector


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="DAHTTT"
)

print(mydb)
mycursor = mydb.cursor()

try:
  mycursor.execute("CREATE TABLE Subject (\
  subjectId VARCHAR(255) PRIMARY KEY,\
  subjectName VARCHAR(255) UNIQUE,\
  credit INT(8),\
  programsemester INT(8),\
  school VARCHAR(255),\
  status Int,\
  note VARCHAR(255))"
  )
except:
  print("Table Subject is arleady exists")



sql = "INSERT INTO Subject (subjectId, subjectName, credit, programsemester, school, note) VALUES (%s,%s, %s, %s, %s, %s)"
# sql = "UPDATE Subject WHERE subjectId = %s SET  credit=%s, programsemester=%s, school=%s, note=%s)"
#
try:
    val = ("IT1000", "Đồ án hệ thống thông tin", 3, 5, "Trường công nghệ thông tin và truyền thông", None)
    mycursor.execute(sql, val)
    mydb.commit()
except:
    print("")

mycursor.execute("select * from Subject where school='Trường công nghệ thông tin và truyền thông' LIMIT 5 OFFSET 0")
records = mycursor.fetchall()
print("Total number of rows in table: ", mycursor.rowcount)

print("\nPrinting each row")
for row in records:
    print(row)