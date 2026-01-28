/*
    Describes how to configure an input tag.
*/

export type InputFieldConfig<T> = {
    type: 'text' | 'date';
    name: keyof T;
    placeholder?: string;
    required?: boolean;
    h3?: string;
    maxLength?: number;
    warningMessage?: string;
}