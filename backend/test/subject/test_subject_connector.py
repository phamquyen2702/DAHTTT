from DBConnector.subject import SubjectConnector
from model.model import Subject
import asyncio


def test_validate_subject():
    subject = Subject(
        subjectId="IT5000",
        subjectName="Đồ án hệ thống thông tin",
        credit=3,
        programsemester=5,
        schoolId="KCNTT"
    )
    check = SubjectConnector.validate(subject)
    print(check)


def test_insert_subject():
    subject = Subject(
        subjectId="IT1234",
        subjectName="Nhập môn công nghệ thông tin",
        credit=3,
        programsemester=1,
        schoolId="KCNTT"
    )
    subject_connector = SubjectConnector()
    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(subject_connector.insert(subject))
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


def test_insert_invalid_subject(subjects=None):
    if subjects is None:
        subjects = Subject(
            subjectId="IT1233",
            subjectName="Nhập môn công nghệ thông tin",
            credit="3",
            programsemester=1,
            schoolId="KCNTT"
        )

    subject_connector = SubjectConnector()
    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(subject_connector.insert(subjects))
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


def test_update_subject(subjects=None):
    if subjects is None:
        subjects = Subject(
            subjectId="IT1000",
            subjectName="Lập trình C",
            credit=3,
            programsemester=1,
            schoolId="KCNTT",
            status=1
        )
        print(subjects.dict())
    subject_connector = SubjectConnector()
    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(subject_connector.update(subjects))
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


def test_update_status():
    subject_connector = SubjectConnector()
    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(subject_connector.update_status("IT1000", 1))
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


def test_get_subject_by_id():
    subject_connector = SubjectConnector()
    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(subject_connector.get_subject_by_id("IT1000"))
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


def test_search_subject():
    subject_connector = SubjectConnector()

    filters = {
        "subjectId": "IT1000",
        "status": 0
    }

    loop = asyncio.get_event_loop()
    tasks = [
        loop.create_task(subject_connector.search(limit=2, offset=0, filters=filters))
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


if __name__ == '__main__':
    # test_validate_subject()
    # test_insert_subject()
    # test_insert_invalid_subject()
    # test_update_subject()
    test_update_status()
    # test_get_subject_by_id()
    # test_search_subject()

