// Aggregate date-related functions from 'misc-utilities-dates.js'
export { 
    getTimePeriod,
    formatDate,
    padTimeWithZeros,
    adjustToLocalTime,
    getTimeFormatted,
    formatDateUI,
} from './misc-utilities-dates';

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

export function checkIfAPIError(result) {
    const errorDescriptions = ['api', 'user'];
    if (errorDescriptions.includes(result)) {
        return true;
    }
    return false;
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

export function toFahrenheit(tempInC) {
    return ((tempInC * (9 / 5)) + 32).toFixed(1);
}