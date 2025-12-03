import { useState, type ChangeEvent, useCallback } from "react";

/**
 * This hook is used to manage the state of form data that come from
 * <input> tags, handling the onChange and resetting of the form.  
 * @param initialValues A dictionary of values
 * @returns 
 */
export function useForm<T extends Record<string, string>>(initialValues: T){
    const [formValues, setFormValues] = useState<T>(initialValues);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }

    const resetForm = (values: T | undefined | null) => {
        if (values) {
            setFormValues(values);
        } else {
            setFormValues(initialValues);
        }
    }

    return { formValues, handleChange, resetForm};
}

export default useForm;