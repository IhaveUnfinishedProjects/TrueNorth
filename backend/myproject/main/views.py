from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import User
import time

@api_view(['GET'])
def get_current_user(request):
    if request.user.is_authenticated:
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email
        }, status=200)
    else:
        return Response({"athenticated: False"}, status=403)
    

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if '@' in username:
        try:
            user_obj = User.objects.get(email=username)
            username = user_obj.username
        except User.DoesNotExist:
            pass
    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error": "Invalid username or password"}, status=400)
    
    login(request, user)
    return Response({"message": "Login Successful", "user": {"id": user.id, "username": user.username, "email": user.email}})


@api_view(['POST'])
def logout_view(request):
    time.sleep(5)
    logout(request)
    return Response({"Message": "Logout Successful"}, status=200)


@api_view(['POST'])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)
    
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already already exists"}, status=400)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    login(request, user)
    return Response({"Message": "User create and logged in", "user": user.username}, status = 201)