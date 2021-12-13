from service.OTEService import OTEService
from model.model import Account
import datetime
import asyncio


ote_service = OTEService()
student = Account(
    Id=1,
    email="abc@gmail.com",
    password="xxxxxx",
    fullname="Nguyen Van A",
    address="Số 1 Đại Cồ Việt",
    birthday="16/1/1999",
    phone="0868870166",
    status=1,
    role=1,
    schoolyear=62,
    cmnd='123456789',
    gender="Nam",
    program="Khao học máy tính",
    schoolId="TCNTT",
    maxcredit=150
)


def test_get_study_year(schoolyear=62):
    print(ote_service._get_course_of_school_year(schoolyear))


def test_save_config():
    ote_service.save_config()


def test_load_config():
    ote_service.load_config()
    print(ote_service.config)


def test_update_subject_ote_around_now():
    config = {
            "start_time": "11:30 06/12/2021",
            "end_time": "11:30 31/12/2021",
            "meta": {}
        }

    ote_service.update_subject_ote(config)
    print(ote_service.get_subject_ote())


def test_update_subject_ote_previous_now():
    config = {
            "start_time": "11:30 06/11/2021",
            "end_time": "11:30 06/12/2021",
            "meta": {}
        }

    ote_service.update_subject_ote(config)
    print(ote_service.get_subject_ote())


def test_validate_regis_subject_time():
    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(ote_service.validate_regis_subject_time())
    ]
    done, pending = loop.run_until_complete(asyncio.wait(tasks))

    loop.close()

    for future in done:
        value = future.result()
        print(value)


def test_update_class_ote_around_now():
    config = {
                "start_time": "11:30 06/12/2021",
                "end_time": "11:30 31/12/2021",
                "timeframe": {
                    "first_year": {
                        "start_time": "00:00",
                        "end_time": "4:30"
                    },
                    "second_year":{
                        "start_time": "4:30",
                        "end_time": "9:00"
                    },
                    "third_year": {
                        "start_time": "9:00",
                        "end_time": "13:30"
                    },
                    "fourth_year": {
                        "start_time": "13:30",
                        "end_time": "18:00"
                    },
                    "last_year": {
                        "start_time": "18:00",
                        "end_time": "23:59"
                    },
                },
                "meta": {
                    "establish_time": None
                }
            }

    ote_service.update_class_ote(config)
    print(ote_service.get_class_ote())


def test_validate_regis_class_time():
    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(ote_service.validate_regis_class_time(student=student))
    ]
    done, pending = loop.run_until_complete(asyncio.wait(tasks))

    loop.close()

    for future in done:
        value = future.result()
        print(value)


if __name__ == '__main__':
    # test_save_config()
    # test_load_config()
    # test_update_subject_ote_around_now()
    # test_validate_regis_subject_time()
    # # test_update_subject_ote_previous_now()
    # # test_validate_regis_subject_time()
    #
    # test_update_class_ote_around_now()
    # test_validate_regis_class_time()
    test_get_study_year(63)
