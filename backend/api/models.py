from django.db import models
from django.conf import settings

# SearchHistory model
class SearchHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    query = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.query

class Message(models.Model):
    greeting = models.CharField(max_length=255, default="Hello")

    def __str__(self):
        return self.greeting

# Prescription model, I added the pharmacy_name field So that the user can choose (like in a dropdown menu) which pharmacy they get the medication from 
# cause I was thinking we could have like the name of the pharmacy link to the website of that pharmacy, feel free to change it; 
class Prescription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rxid = models.CharField(max_length=100, unique=True)
    medication_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=100)
    expiration_date = models.DateField()
    pharmacy_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.medication_name} ({self.rxid})"
