import type { ChangeEvent } from 'react';
import type { DropResult } from '@hello-pangea/dnd';

export interface DynamicFormProps {
    onRepeatOpen: () => void;
    handleSubmit: (event: React.FormEvent) => void;
}

export type InputFormData = {
    goalName: string,
    desiredAchievement: string,
    importance: string,
    measurement: string,
    achievementDate: string,
    parent?: string
}

export type Step = {id: string, description: string};

export const DayOfWeek = ["Mon", "Tue", "Wed", "Fri", "Thu", "Sat", "Sun"];