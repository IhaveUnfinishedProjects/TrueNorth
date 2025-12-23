from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Goal, Step
from django.contrib.auth import get_user_model
import datetime

User = get_user_model()

class GoalUpdateTests(APITestCase):
    def setUp(self):
        # 1. Create a user
        self.user = User.objects.create_user(username='testuser', password='password')
        
        # 2. Authenticate the client so the request has a 'user' attached
        self.client.force_authenticate(user=self.user)

        # 3. Include the user when creating the initial Goal
        self.goal = Goal.objects.create(
            user=self.user,  # <--- Fixes the NOT NULL constraint
            goal_name="Old Goal",
            desired_achievement="Win",
            importance="High",
            measurement="100%",
            achievement_date=datetime.date.today(),
            created_at=datetime.datetime.now()
        )
        self.step = Step.objects.create(description="Step to Keep", goal=self.goal)
        self.orphan_step = Step.objects.create(description="Step to Delete", goal=self.goal)
        
        # DRF typically names the URL 'goal-detail' if using a SimpleRouter
        self.url = f'/api/goals/{self.goal.id}/' 

    def test_surgical_update_and_completion_sync(self):
        # 2. Act: Send a request that keeps one step, deletes another, and adds a third
        # We also mark the kept step as complete.
        data = {
            "goal_name": "Updated Goal",
            "desired_achievement": "Win Big",
            "importance": "High",
            "measurement": "100%",
            "achievement_date": str(datetime.date.today()),
            "created_at": str(datetime.datetime.now()),
            "steps": [
                {"id": str(self.step.id), "description": "Updated Step Description"},
                {"description": "Brand New Step"}
            ],
            "completed_step_ids": [str(self.step.id)]
        }
        
        response = self.client.put(self.url, data, format='json')
        
        # 3. Assert: Verify the logic
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that Step to Delete is gone
        self.assertEqual(self.goal.steps.count(), 2)
        self.assertFalse(Step.objects.filter(id=self.orphan_step.id).exists())
        
        # Check completion sync
        self.step.refresh_from_db()
        self.assertTrue(self.step.is_complete)

    def test_cannot_update_others_goal(self):
        # 1. Create a "Hacker" user and authenticate as them
        hacker = User.objects.create_user(username='hacker', password='password')
        self.client.force_authenticate(user=hacker)
        
        # 2. Try to update the original goal (which belongs to 'testuser')
        response = self.client.put(self.url, {"goal_name": "Hacked!"}, format='json')
        
        # 3. Assert that the hacker gets a 404, not a 200
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)