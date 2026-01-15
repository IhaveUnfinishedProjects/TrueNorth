from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.shortcuts import render, get_object_or_404
from .serailizer import ReviewSerializer
from goal.models import Goal
from .models import Review

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        goal_id = self.kwargs.get('goal_id')
        goal_instance = get_object_or_404(Goal, id=goal_id, user=self.request.user)
        serializer.save(goal=goal_instance)

    def get_queryset(self):
        goal_id = self.kwargs.get('goal_id')
        return Review.objects.filter(goal_id=goal_id, goal__user=self.request.user).order_by('-created_at')