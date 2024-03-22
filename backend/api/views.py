from django.http import JsonResponse
from .models import Message
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_data(request):
    data = {'message': 'Hello from Django!'}
    return Response(data)

def hello_view(request):
    # there's at least one Message instance in the database
    message = Message.objects.first().greeting
    data = {"message": message}
    return JsonResponse(data)
