from django.db import models
from django.conf import settings

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
