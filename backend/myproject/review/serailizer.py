from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        extra_kwargs = {
            'goal': {'read_only': True},
            'created_at': {'read_only': True},
        }

        