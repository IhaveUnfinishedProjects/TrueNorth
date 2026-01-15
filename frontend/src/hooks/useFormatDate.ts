import { DateFormatter, getLocalTimeZone, parseDate, type CalendarDate } from "@internationalized/date";

interface ISO6801Props {
    dateObj: string | CalendarDate;
    dateStyle: 'short' | 'medium' | 'long' | 'full';
}


export function useFormatDate () {

    /**
     * Styles an ISO 8601 CalendarDate or string.
     * @returns a full, long, medium, or short date string based on dateStyle & 
     * the users locale + time zone. 
     */
    const formatISO8601 = ({dateObj, dateStyle}: ISO6801Props): string | undefined => {
        const userLocale: string = Intl.DateTimeFormat().resolvedOptions().locale;

        if (typeof(dateObj )=== "string") {
            try {
                dateObj = parseDate(dateObj);
            } catch (error) {
                console.warn(error);
                return undefined;
            }
        }

        const formatter = new DateFormatter(userLocale, { dateStyle: dateStyle });
        return formatter.format(dateObj.toDate(getLocalTimeZone()));
    }

    return { formatISO8601 };
}

export default useFormatDate;