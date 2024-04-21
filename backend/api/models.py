from django.db import models
from django.conf import settings

# SearchHistory model to store the search history of the user
class SearchHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    query = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.query

# Message model to store the greeting message
class Message(models.Model):
    greeting = models.CharField(max_length=255, default="Hello")

    def __str__(self):
        return self.greeting

# Prescription model to store the prescription details of the user
class Prescription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rxid = models.CharField(max_length=100, unique=True)
    medication_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=100)
    expiration_date = models.DateField()
    pharmacy_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.medication_name} ({self.rxid})"
