import { useState, type ChangeEvent, useCallback } from "react";

/**
 * This hook is used to manage the state of form data that come from
 * <input> tags, handling the onChange and resetting of the form.  
 * @param initialValues A dictionary of values
 * @returns 
 */
export function useForm<T extends Record<string, string>>(initialValues: T){
    const [formValues, setFormValues] = useState<T>(initialValues);

    const checkMax = (value: string) => {
        if (!value) return value;

        const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0];
        if (maxDate && value > maxDate) return maxDate;
        return value;
    };

    const checkMin = (value: string) => {
        if (!value) return value;

        const today = new Date().toISOString().split('T')[0];
        if (today && value < today) return today;
        return value;
    };

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let { name, value, type } = event.target;

        if (type === 'date') {
            value = checkMax(value);
        }

        setFormValues(prev => ({ ...prev, [name]: value }));
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let { name, value, type } = event.target;

        if (type === 'date') {
            const fixedValue = checkMin(value);

            if (fixedValue != value) {
                setFormValues(prev => ({ ...prev, [name]: fixedValue }));
            }
        }
    }

    const resetForm = (values: T | undefined | null) => {
        if (values) {
            setFormValues(values);
        } else {
            setFormValues(initialValues);
        }
    }

    return { formValues, handleChange, resetForm, handleFocus};
}

export default useForm;