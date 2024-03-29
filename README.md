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


