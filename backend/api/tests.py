from django.test import TestCase
from RxNorm import Rx
from django.http import HttpRequest
import views
import os
from django.conf import settings

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
settings.configure(DEBUG=True)
mock_request = HttpRequest()
mock_request.method = 'POST'
mock_request.POST['name'] = 'zyrtec'
print(views.name_search(mock_request))
