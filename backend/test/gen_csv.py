import pandas as pd


a =  {  "Id":[1],
        "email":["test@gmail.com"],
        "password":["test"] , 
        "fullname" :["test"], 
        "address":["test"] ,
        "birthday":["2021-11-25"] ,
        "phone":["test"], 
        "status":[0], 
        "role" :[0], 
        "schoolyear" :[1234],
        "cmnd":["test"] , 
        "gender":["test"] ,
        "program":["test"] , 
        "schoolId" :["test"],
        "maxcredit" :[0], }

aframe=pd.DataFrame(a)

aframe.to_csv("test.csv",index = False)
