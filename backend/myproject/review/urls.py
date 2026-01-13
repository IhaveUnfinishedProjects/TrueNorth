from django.urls import path
from .views import ReviewListCreateView

urlpatterns = [
    path('goals/<int:goal_id>/reviews/', ReviewListCreateView.as_view())
]