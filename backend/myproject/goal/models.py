from django.db import models
from django.conf import settings

class Goal(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    # fields to match Frontend Interface
    goal_name = models.CharField(max_length=255)            
    desired_achievement = models.TextField()                
    importance = models.TextField()                         
    measurement = models.TextField()                        
    achievement_date = models.DateField()                   
    
    # Self-referential key for "parent" (allows sub-goals)
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='sub_goals'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.goal_name

class Recurrence(models.Model):
    start_date = models.DateField()
    interval = models.CharField(max_length=2)
    frequency = models.CharField(max_length=10)
    time = models.TimeField(null=True, blank=True)
    selected_days = models.JSONField(null=True, blank=True)
    type = models.CharField(max_length=50, null=True, blank=True)

class Step(models.Model):

    goal = models.ForeignKey(Goal, related_name="steps", on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    
    recurrence = models.OneToOneField(
        Recurrence, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )
    
    # Used to generate 'completeSteps' array
    is_complete = models.BooleanField(default=False)

    def __str__(self):
        return self.description