from django.contrib import admin
from .models import User
from goal.models import Goal, Step, Recurrence
from review.models import Review


# Register your models here.
admin.site.register(User)
admin.site.register(Goal)
admin.site.register(Step)
admin.site.register(Recurrence)
admin.site.register(Review)