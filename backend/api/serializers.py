from rest_framework import serializers
from .models import SearchHistory

# SearchHistory serializer
class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = ['id', 'query', 'created_at']