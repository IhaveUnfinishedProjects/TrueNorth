import { useEffect, type RefObject } from "react";

/**
 *  This hook is used to grab the height of the header pass it to a callback. 
 *
 *  The intent is to offset main by the height of the header so the background 
 *  is in full view.
 */
export function useHeaderDetails(ref: RefObject<HTMLElement | null>, callback: (details: {height: number}) => void){
    useEffect(() => {
        if (ref.current) {

            // Get the header height
            const height = ref.current.clientHeight;

            // Make the callback and pass in the measured height. 
            callback({
                height: height
            });
        }
    }, [ref, callback]);
}

export default useHeaderDetails;