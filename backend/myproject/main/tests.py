from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()

class UserViewTests(TestCase):
    def setUp(self):
        # a user to test authenticated access
        self.user = User.objects.create_user(username='testuser', password='password123')