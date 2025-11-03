import { initialValues } from "@root/components/CreateGoal/support/Data.js";
import { useState, type ChangeEvent, useCallback } from "react";

export function useForm<T extends Record<string, any>>(initialValues: T){
    const [formValues, setFormValues] = useState<T>(initialValues);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }

    const resetForm = useCallback(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    return { formValues, handleChange, resetForm};
}