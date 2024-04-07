from django.urls import path
from . import views



urlpatterns = [
    path('api/get_data/', views.get_data, name='get_data'),
    path('api/name_search/', views.name_search, name='name_search'),
]