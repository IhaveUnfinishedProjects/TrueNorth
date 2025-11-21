import type { ChangeEvent } from 'react';
import type { DropResult } from '@hello-pangea/dnd';

export interface DynamicFormProps {
    steps: Step[];
    staticStepId: string;
    push: (step: Step) => void;
    remove: (step: Step) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleStaticKeyDown: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    handleDragDrop: (result: DropResult) => void;
    onRepeatOpen: () => void;
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