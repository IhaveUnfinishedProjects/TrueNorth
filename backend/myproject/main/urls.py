from django.urls import path
from .views import get_current_user, login_view, logout_view, signup_view, guest_view

urlpatterns = [
    path('user/', get_current_user, name='get_current_user'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('signup/', signup_view, name='signup'),
    path('guest/', guest_view, name='guest'),
]