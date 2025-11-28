import { useMemo, useState, type Key } from "react";

interface ComboBoxProps {
    arr: string[];
}

function useComboBox ({arr}: ComboBoxProps) {

    /**
     * Provides each option in arr[] it's own uuid selectKey. 
     */
    const options = useMemo(() => {
        const map = new Map<Key, string>();
        arr.forEach(val => map.set(crypto.randomUUID(), val));
        return map;
    }, [arr]);
    
    /**
     * Intialises the default input to be the first
     * option available in options, or '' if none exist. 
     */
    const [input, setInput] = useState<string>(() => {
        const val = options.values().next();
        return (val.done ? '' : val.value.toString());
    });

    /**
     * Initialises the default selectKey to be the first option
     * available in options. Or null if none exists
     */
    const [selectKey, setKey] = useState<Key | null>(() => {
        const val = options.keys().next();
        return (val.done ? null : val.value);
    });


    const onChangeInput = (value: string): void => {
        setInput(value);
    }

    const onChangeKey = (selectKey: Key | null) => {
        setKey(selectKey);
        const value = options.get(selectKey!.toString());
        setInput(value ? value : '');
    }

    return { options, input, selectKey, onChangeInput, onChangeKey };
}

export default useComboBox;