from django.http import JsonResponse
from .models import Message

def hello_view(request):
    # there's at least one Message instance in the database
    message = Message.objects.first().greeting
    data = {"message": message}
    return JsonResponse(data)
