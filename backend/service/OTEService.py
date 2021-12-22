from fastapi.security import OAuth2PasswordBearer
from .utils import load_yaml, write_yaml
from config import Settings
from model.model import Account
import os
import time
import datetime


class OTEService:
    def __init__(self, ):
        self.settings = Settings()
        #self.config = self._get_default_config()
        self.load_config()

    def _get_course_of_school_year(self, school_year):
        started_year = self.settings.started_year
        now = datetime.datetime.now()
        this_year = now.year
        this_month = now.month

        course_now = this_year - started_year + 1

        if this_month > 9:
            study_year = course_now - school_year + 1
        else:
            study_year = course_now - started_year

        if study_year == 1:
            return "first_year"
        elif study_year == 2:
            return "second_year"
        elif study_year == 3:
            return "third_year"
        elif study_year == 4:
            return "fourth_year"
        else:
            return "last_year"

    def _get_default_config(self):
        config = {
            "subject": {
                "start_time": None,
                "end_time": None,
                "meta": {
                    "establish_time": None
                }
            },
            "class": {
                "start_time": None,
                "end_time": None,
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
        }
        return config.copy()

    def save_config(self, dir_path='.establish'):
        if os.path.exists(dir_path) is False:
            os.makedirs(dir_path)

        file_path = os.path.join(dir_path, "open_time_config.yaml")
        write_yaml(self.config, file_path)
        print(f"Save ote config at file: {file_path}")

    def load_config(self, dir_path='.establish'):
        file_path = os.path.join(dir_path, "open_time_config.yaml")
        if os.path.exists(file_path):
            self.config = load_yaml(file_path)
            print("LOADED OTE")

    def update_subject_ote(self, config):
        establish_time = time.time()
        config["meta"]={}
        config["meta"]["establish_time"] = establish_time
        self.config["subject"] = config
        print(self.config)
        self.save_config()
        return True

    def update_class_ote(self, config):
        establish_time = time.time()
        config["meta"]={}
        config["meta"]["establish_time"] = establish_time
        self.config["class"] = config
        self.save_config()
        return True

    async def get_subject_ote(self):
        subject_cfg = self.config["subject"]
        return subject_cfg

    async def get_class_ote(self):
        class_cfg = self.config["class"]
        return class_cfg

    def _parse_time(self, t):
        try:
            return datetime.datetime.strptime(t, "%Y-%m-%dT%H:%M")
        except:
            return datetime.datetime.strptime(t, "%Y-%m-%dT%H:%M:%S")

    async def validate_regis_subject_time(self):
        start_time = self._parse_time(self.config["subject"]["start_time"])
        end_time = self._parse_time(self.config["subject"]["end_time"])

        if start_time is None:
            return False

        if end_time is None:
            return False

        now = datetime.datetime.now() +datetime.timedelta(hours=7)
        print(start_time,now,end_time)
        if start_time <= now <= end_time:
            return True
        else:
            return False

    async def validate_regis_class_time(self, student: Account):
        now = datetime.datetime.now() +datetime.timedelta(hours=7)
        start_time = self._parse_time(self.config["class"]["start_time"])
        end_time = self._parse_time(self.config["class"]["end_time"])

        if start_time is None:
            return False

        if end_time is None:
            return False

        if now < start_time or now > end_time:
            return False

        study_year = self._get_course_of_school_year(student.schoolyear)
        print(study_year)
        time_frame = self.config["class"]["timeframe"][study_year]
        student_start_time = f"{now.year}-{now.month}-{now.day}T"+ str(time_frame["start_time"]) 
        student_end_time = f"{now.year}-{now.month}-{now.day}T"+  str(time_frame["end_time"])

        student_start_time = self._parse_time(student_start_time)
        student_end_time = self._parse_time(student_end_time)
        print(student_start_time,now,student_end_time)
        if student_start_time <= now <= student_end_time:
            return True
        else:
            return False
