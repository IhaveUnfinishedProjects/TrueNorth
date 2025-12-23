from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout

@api_view(['GET'])
def get_current_user(request):
    if request.user.is_authenticated:
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email
        }, status=200)
    else:
        return Response({"athenticated: False"}, status=200)
    

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error": "Invalid Credentials"}, status=400)
    
    login(request, user)
    return Response({"message": "Login Successful", "user": user.username})


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"Message": "Logout Successful"}, status=200)