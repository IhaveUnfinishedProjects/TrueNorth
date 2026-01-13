from django.db import models
from goal.models import Goal

class Review(models.Model):
    REVIEW_OPTIONS = [
        ('behind','Behind'),
        ('on_track','On Track'),
        ('ahead','Ahead'),
    ]

    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name='reviews')
    review_type = models.CharField(
        max_length=10,
        choices=REVIEW_OPTIONS,
        default='on_track'
    )
    
    first_input = models.TextField()
    second_input = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)