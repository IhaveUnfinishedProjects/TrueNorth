from .models import Goal, Step, Recurrence
from rest_framework import serializers


class RecurrenceSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Recurrence
        fields='__all__'

class StepSerializer(serializers.ModelSerializer):
    recurrence = RecurrenceSerializer(required=False)

    class Meta: 
        model = Step
        fields=['id', 'description', 'recurrence', 'is_complete']
        extra_kwargs = {'id': {'read_only': False, 'required': False}}

class GoalSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True)
    completed_step_ids = serializers.SerializerMethodField()
    
    class Meta:
        model = Goal
        fields=[
            'id', 'goal_name', 'desired_achievement', 
            'importance', 'measurement', 'achievement_date', 
            'parent', 'created_at', 'steps', 'completed_step_ids'
        ]
        read_only_fields = ['user']

    def create(self, validated_data):
        steps_data = validated_data.pop('steps', None)
        goal = Goal.objects.create(**validated_data)
        
        for steps_data_item in steps_data:
            recurrence_data = steps_data_item.pop('recurrence', None)
            steps = Step.objects.create(**steps_data_item, goal=goal)

            if recurrence_data:
                recurrence = Recurrence.objects.create(**recurrence_data)
                steps.recurrence = recurrence
                steps.save()
        return goal
    
    def get_completed_step_ids(self, obj):
        return [str(steps.id) for steps in obj.steps.filter(is_complete=True)]

    def update(self, instance, validated_data):
        steps_data = validated_data.pop('steps', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if steps_data is not None:
            self._update_steps_list(instance, steps_data)

        self._update_completion_status(instance)
        return instance

    def _update_steps_list(self, instance, steps_data):
        keep_ids = set()
        
        for step_data in steps_data:
            step_id = step_data.get('id')
            recurrence_data = step_data.pop('recurrence', None)

            if step_id:
                step = Step.objects.get(id=step_id, goal=instance)
                for attr, value in step_data.items():
                    setattr(step, attr, value)
                step.save()
            else:
                step = Step.objects.create(**step_data, goal=instance)

            keep_ids.add(step.id)

            if recurrence_data:
                self._update_recurrence(step, recurrence_data)

        instance.steps.exclude(id__in=keep_ids).delete()
        
        instance.steps.update(is_complete=False)

    def _update_completion_status(self, instance):
        completed_ids = set(self.initial_data.get('completed_step_ids', []))
        if completed_ids:
            instance.steps.filter(id__in=completed_ids).update(is_complete=True)

    def _update_recurrence(self, step, recurrence_data):
        if step.recurrence:
            for attr, value in recurrence_data.items():
                setattr(step.recurrence, attr, value)
            step.recurrence.save()
        else:
            step.recurrence = Recurrence.objects.create(**recurrence_data)
            step.save()