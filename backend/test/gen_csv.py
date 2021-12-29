import pandas as pd
import random
b = {
  "KCNTT": "Trường Công nghệ thông tin & Truyền thông",
  "KCK": "Trường Cơ khí",
  "VCKDL": "Viện Cơ khí Động lực",
  "KD": "Trường Điện - Điện tử",
  "VCNSHVTP": "Viên Công nghệ Sinh học & Công nghệ Thực phẩm",
  "KCNHH": "Viện Kỹ thuật Hóa học",
  "BGDTC": "Khoa Giáo Dục Thể Chất",
  "VVLKT": "Viện Vật Lý Kỹ Thuật",
  "KKHVCNVL": "Viện Khoa học & Kỹ thuật Vật Liệu",
  "KKTVQL": "Viện Kinh tế & Quản lý",
  "KTTD": "Viện Toán tin & Ứng dụng",
  "KSPKT": "Viện Sư phạm Kỹ thuật",
  "KNN": "Khoa Ngôn Ngữ",
  "KCNDMVTT": "Viện Dệt may - Da giầy & Thời trang",
  "KML": "Khoa Lý luận chính trị",
  "VDTLT": "Viện Đào tạo Liên tục",
  "VMICA": "Viện Nghiên cứu quốc tế MICA",
  "KDTVT": "Viện Điên tử viễn thông",
  "VKHVCNMT": "Viện Khoa học và Công nghệ Môi trường",
  "VKHVCNNL": "Viện Khoa học & Công Nghệ Nhiệt Lạnh",
  "KGDQP": "Khoa Giáo dục Quốc phòng"
}
a =  {  "Id":[],
        "email":[],
        "password":[] , 
        "fullname" :[], 
        "address":[] ,
        "birthday":[] ,
        "phone":[], 
        "status":[], 
        "role" :[], 
        "schoolyear" :[],
        "cmnd":[] , 
        "gender":[] ,
        "program":[] , 
        "schoolId" :[],
        "maxcredit" :[], }
year = [2017,2018,2019,2020,2021]
k = [62,63,64,65,66]
schoolIds = list(b.keys())
for i in range(100):
    y = random.choice(year)
    schoolyear = k[year.index(y)]
    schoolId = random.choice(schoolIds)
    Id = str(y)+str(i).zfill(4)
    email = "student"+str(Id)+"@gmail.com"
    password = str(Id)
    fullname = "STUDENT " +str(Id)
    address = "   "
    birthday="1999-02-08"
    phone = "0123456"
    status=1
    role=1
    schoolyear=schoolyear
    cmnd="0123456789"
    gender = random.choice(["nam","nu"])
    program = "  "
    schoolId = schoolId
    maxcredit = random.choice([24,18,14,8])
    a["Id"].append(Id)
    a["email"].append(email)
    a["password"].append(password)
    a["fullname"].append(fullname)
    a["address"].append(address)
    a["birthday"].append(birthday)
    a["phone"].append(phone)
    a["status"].append(status)
    a["role"].append(role)
    a["schoolyear"].append(schoolyear)
    a["cmnd"].append(cmnd)
    a["gender"].append(gender)
    a["program"].append(program)
    a["schoolId"].append(schoolId)
    a["maxcredit"].append(maxcredit)

aframe=pd.DataFrame(a)

aframe.to_csv("test.csv",index = False)
