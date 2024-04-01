from django.db import models

class Message(models.Model):
    greeting = models.CharField(max_length=255, default="Hello")

    def __str__(self):
        return self.greeting
