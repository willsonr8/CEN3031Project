from django.urls import path
from .views import hello_view, get_data


urlpatterns = [
    path('hello/', hello_view, name='hello'),
    path('api/data/', get_data, name='get_data'),
]