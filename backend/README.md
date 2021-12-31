# Ubuntu
## Cài đặt docker 
https://docs.docker.com/engine/install/ubuntu/
## Cài đặt docker-compose
https://docs.docker.com/compose/install/
## Chạy project

$ cd backend

$ docker-compose build

$ docker-compose up

* Điều chỉnh file data_initalization.py để tạo database, tạo table và insert 1 vài bản ghi ví dụ và chạy file này.
## Test

vào trình duyệt truy cập localhost:8000/docs để đến trang swagger của api

vào trình duyệt truy cập localhost:8000 để vào chương trình

# Window

* Cài đặt mysql trên máy

* Cài đặt python 3, add environment variable trong lúc cài python 3

* Mở terminal, cd đến thư mục backend, chạy lệnh $ python -m pip install -r requirements.txt

* Sửa username và password database trong file data_initalization.py sau đó chạy file này bằng lệnh: python data_initalization.py (bước này để tạo database và init account admin)

* Sửa username và password database trong file config.py sau đó chạy lệnh $python app.py

* Vào trình duyệt truy cập localhost:8000 để vào chương trình
* Tài khoản quản trị hệ thống: email/pass : admin@gmail.com/admin123
