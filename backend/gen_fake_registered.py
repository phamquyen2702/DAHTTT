from service.AccountService import AccountService
from service.ClassService import ClassService
from service.SubjectService import SubjectService
from service.Class_regService import Class_regService
from service.Subject_regService import Subject_regService
from datetime import datetime, timedelta
from DBConnector.classRegister import classRegisterConnector
from model.class_regModel import *
import random
accountService = AccountService()
classService = ClassService()
subjectService = SubjectService()
regClassService = Class_regService()
regSubjectService = Subject_regService()
clsRegConnector = classRegisterConnector()
async def main():
    students = await accountService.search(status=1,role=1,limit=10000)
    print(len(students))
    
    classes = await classService.search(status=1,semester = 20211,limit=10000)
    print(len(classes))
    semester = 20211
    d = datetime(year=2021,month=12,day=1)
    for i in range(30):
        num = random.randint(1,60)
        n = 0
        while n <num:
            Id = random.choice(students)
            Id = Id.Id
            cl_ = random.choice(classes)
            c = cl_.classId
            t = int(datetime.timestamp(d))
            
            try:
                await clsRegConnector.classreg_insert([Class_Reg(Id=Id,classId=c,semester=semester,timestamp=t)])
                n += 1
            except:
                continue
        d += timedelta(days=1)

    #print(students)


if __name__ == "__main__":
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())