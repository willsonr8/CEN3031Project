from rest_framework import serializers
from .models import SearchHistory
from .models import Prescription

# SearchHistory serializer
class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = ['id', 'query', 'created_at']

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['rxid', 'medication_name', 'dosage', 'expiration_date', 'pharmacy_name']
        read_only_fields = ['user']