import { UTCDate } from '@date-fns/utc';
import {
    add,
    sub,
    format,
    getHours,
    getMinutes,
    getMonth,
    getDate,
} from 'date-fns';

// This module includes misc utilities that are related to dates
// Functions within this module will be 're-exported' through 'misc-utilities.js'

export function getTimePeriod() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 18) {
        return 'day';
    }

    return 'night';
}

// Formats the date in a YYYY-MM-DDThh:mm:ss format (Year-Month-DayTHours:Minutes:Seconds)
export function formatDate(date) {
    const partA = format(date, 'yyyy-MM-dd');
    const partB = format(date, 'HH:mm:ss');
    return `${partA}T${partB}`;
}

// Returns the name of the month for a given date
export function getMonthName(formattedDate) {
    const dateMonth = getMonth(formattedDate);

    switch (dateMonth) {
        case 0:
            return 'January';

        case 1:
            return 'February';

        case 2:
            return 'March';

        case 3:
            return 'April';

        case 4:
            return 'May';

        case 5:
            return 'June';

        case 6:
            return 'July';

        case 7:
            return 'August';

        case 8:
            return 'September';

        case 9:
            return 'October';

        case 10:
            return 'November';

        case 11:
            return 'December';
    }
}

// Take a data in a 'YYYY-MM-DDThh:mm:ss' format and converts it to a format used by the UI
// 'Month' 'Day of the month', 'hh:mm', e.g., 'April 28, 15:30'
export function formatDateUI(formattedDate, noTime = false) {
    const targetDate = new Date(formattedDate);

    if (noTime) {
        return `${getMonthName(targetDate)} ${getDate(targetDate)}`;
    }

    return `${getMonthName(targetDate)} ${getDate(targetDate)}, ${formattedDate.slice(-8, -3)}`;
}

// takes a time that might not be in a "hh:mm" format and pads it with zeros to conform to the correct format
// Argument must include a colon in between the hours and minutes
export function padTimeWithZeros(time) {
    const hourAndMinutes = time.split(':');
    if (hourAndMinutes[0].length === 1) {
        hourAndMinutes[0] = `0${hourAndMinutes[0]}`;
    }
    if (hourAndMinutes[1].length === 1) {
        hourAndMinutes[1] = `0${hourAndMinutes[1]}`;
    }

    return `${hourAndMinutes[0]}:${hourAndMinutes[1]}`;
}

// Returns the local time based on the timezone offset given
export function adjustToLocalTime(tzOffset) {
    if (tzOffset < 0) {
        const newOffset = -1 * tzOffset;
        return formatDate(sub(new UTCDate(), { hours: newOffset }));
    }
    return formatDate(add(new UTCDate(), { hours: tzOffset }));
}

// Returns the current time in a hh:mm (hour:minute) format based on a given date
export function getTimeFormatted(formattedDate) {
    const hours = getHours(new Date(formattedDate));
    const minutes = getMinutes(new Date(formattedDate));

    const time = padTimeWithZeros(`${hours}:${minutes}`);

    return time;
}
