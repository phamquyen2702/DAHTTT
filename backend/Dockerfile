FROM python:3.7-buster

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
RUN pip install pandas
RUN pip install python-multipart
ENV C_FORCE_ROOT=1

COPY . /app
CMD uvicorn server:app --host 0.0.0.0 --reload
