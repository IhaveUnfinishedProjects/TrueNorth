from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.shortcuts import render, get_object_or_404
from .serailizer import ReviewSerializer
from ..goal.models import Goal

class CreateReviewView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        goal_id = self.kwargs.get('goal_id')
        goal_instance = get_object_or_404(Goal, id=goal_id, user=self.request.user)
        serializer.save(goal=goal_instance)