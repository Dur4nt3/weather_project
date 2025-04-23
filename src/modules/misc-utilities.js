import { UTCDate } from '@date-fns/utc';
import { add, sub, format, getHours, getMinutes } from 'date-fns';

// Various utilities to use across different modules

export function getTimePeriod() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 18) {
        return 'day';
    }

    return 'night';
}

// Allows to distinguish between API errors (bad key, etc.) and user error (bad input)
export function apiErrors(errorCode) {
    if (errorCode === 401) {
        return 'api';
    }

    if (errorCode === 400) {
        return 'user';
    }

    return 'user';
}

// Formats the date in a YYYY-MM-DDThh:mm:ss format (Year-Month-DayTHours:Minutes:Seconds)
export function formatDate(date) {
    const partA = format(date, 'yyyy-MM-dd');
    const partB = format(date, 'HH:mm:ss');
    return `${partA}T${partB}`;
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
    let hours = getHours(new Date(formattedDate));
    let minutes = getMinutes(new Date(formattedDate));

    // Pad with zeros if needed
    if (Number(hours) < 10) {
        hours = `0${hours}`;
    }
    if (Number(minutes) < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

// Exits a modal with a specified animation
export function exitModal(
    modal,
    exitAnimationClass,
    applyAnimationTo,
    timeoutDuration
) {
    // Remediate potential errors when auto-exit is interrupted
    try {
        applyAnimationTo.classList.add(exitAnimationClass);
        setTimeout(() => modal.remove(), timeoutDuration);
    } catch(error) {
        console.error(`Error when exiting modal: ${error}`);
    }
}
