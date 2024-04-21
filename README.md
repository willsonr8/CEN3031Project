# Medicate

## I. About

Medicate is a web application designed to improve accessibility to cheaper alternatives for both prescribed and 
over-the-counter medications. The application contains search bar functionality that accesses the RxNorm API to 
display information about any medication available in the continental US. Furthermore, with user consent, Medicate 
uses the Google Maps API to show local drugstores in an embedded map. These features allow the user to identify generic
alternatives to medications that they want to use, along with highlighting where an individual may be able to purchase 
these products.

## II. Setup
- ### Backend

  1. Navigate to the backend Directory.

  2. Set up a virtual environment:

      For macOS:
      ```
      python3 -m venv venv
      ```
      For Windows:
      ```
      python -m venv venv
      ```
  3. Start virtual environment:

      For macOS:
    
      ```
      source venv/bin/activate
      ``` 
      For Windows:
      ```
      .\venv\Scripts\activate
      ```
   
  4. Install Dependencies:
      ```
      pip install -r requirements.txt
      ```
  5. Database migrations: (if needed)
      ```
      python manage.py makemigrations
      ```
      ```
      python manage.py migrate
      ```
  6. Create a superuser: (optional)
      ```
      python manage.py createsuperuser
      ```
  7. Run server:
     ```
     python manage.py runserver
     ```
- ### Frontend Setup

  1. Navigate to the frontend directory.

  2. Install dependencies:
     ```
     npm install
     ```
  3. Start server:
     ```
     npm run dev
     ```

