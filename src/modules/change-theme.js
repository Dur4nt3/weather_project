import { getTimePeriod } from './misc-utilities';

import sunSvg from '../assets/icons/sun.svg';
import moonSvg from '../assets/icons/moon.svg';

// This module checks the user's local time every minute and changes the theme depending on it

const bodyTag = document.querySelector('body');

function changeToDay() {
    // Remove night theme if applied
    bodyTag.classList.remove('night');
}

function changeToNight() {
    // Add night theme
    bodyTag.classList.add('night');
}

// Returns the correct theme function
function getTheme() {
    // Day theme: 6:00AM ~ 17:59PM
    if (getTimePeriod() === 'day') {
        return changeToDay;
    }

    // Night theme: 18:00PM ~ 5:59AM
    return changeToNight;
}

// Used to prevent adding a dependency to 'no-data-notice.js' for only changing an image's src attribute
function changeNoticeSvg() {
    const noDataNotice = document.querySelector('.no-data-notice');
    if (noDataNotice === null) {
        return;
    }

    if (getTimePeriod() === 'day') {
        noDataNotice.querySelector('.notice-icon').src = sunSvg;
        return;
    }

    noDataNotice.querySelector('.notice-icon').src = moonSvg;
}

// Every hour check if the theme should change
export default function applyTheme() {
    // Initial execution to apply on load
    getTheme()();
    changeNoticeSvg();

    // Check every minute after that
    setTimeout(applyTheme, 60000);
}
