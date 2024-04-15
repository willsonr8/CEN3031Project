from rest_framework import serializers
from .models import UserAccount

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'first_name', 'email', 'date_of_birth']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'date_of_birth': {'required': True}
        }