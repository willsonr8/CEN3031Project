# Medicate
CEN3031 Semester Project

Basic search functionality

Backend Setup

Navigate to the backend Directory.

Set Up a Virtual Environment:

For macOS:

	python3 -m venv venv
 
	source venv/bin/activate
 
For Windows:

	python -m venv venv
 
	.\venv\Scripts\activate

Install Dependencies:

	pip install -r requirements.txt

Database Migrations:

	python manage.py makemigrations

	python manage.py migrate

Create a Superuser: (optional for now)

	python manage.py createsuperuser

Run Server:

	python manage.py runserver

Frontend Setup

Navigate to the Frontend Directory.

Install Dependencies:

	npm install

Start Server:

	npm run dev

To use authentication:

make .env file, include

DJANGO_SECRET_KEY="django-insecure-tjnh4o2xzqr+6+o&btw4s%4g*v4_1#un9*!p7l8t^(79^95c9b"

DEBUG="True"

AWS_SES_ACCESS_KEY_ID=""

AWS_SES_SECRET_ACCESS_KEY=""

AWS_SES_REGION_NAME="us-east-2"

AWS_SES_FROM_EMAIL=""


Create two identities in AWS ses (receiving email, from email)

Youtube tutorial at:

https://www.youtube.com/watch?v=2pZmxh8Tf78 starting at 49 min
