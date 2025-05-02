import {
    buildElement,
    buildElementWithText,
    buildImgElement,
    buildToggleSwitchInput,
} from './dom-manipulator';

import { getWeatherConditionIcon } from './conditions-icons';
import {
    updateLatestUpdates,
    getHighlightData,
    savedLocations,
} from './data-utilities';
import {
    adjustToLocalTime,
    formatDateUI,
    toFahrenheit,
} from './misc-utilities';
import {
    locateLocationDataCont,
    adjustDataContShell,
} from './ui-data-utilities';
import { addErrorNotification } from './add-notification';
import viewMoreModalInteractivity from './view-more-modal-interactivity';

// This module builds the markup of a location data container based on data given as an argument

function buildHeaderSection(weatherDataObj) {
    const title = buildElementWithText(
        'h2',
        weatherDataObj.location,
        'location-name'
    );
    title.dataset.location = weatherDataObj.location;

    const utilities = buildElement('div', 'utilities-cont');

    const localTime = buildElement('div', 'local-time-cont');
    localTime.append(formatDateUI(adjustToLocalTime(weatherDataObj.tzOffset)));

    const changeUnits = buildElement('div', 'change-units-cont');
    const spanC = buildElementWithText('span', 'C°', 'c-label');
    const spanF = buildElementWithText('span', 'F°', 'f-label');
    const toggleSwitch = buildToggleSwitchInput('toggle-units');

    changeUnits.append(spanC, toggleSwitch, spanF);

    utilities.append(localTime, changeUnits);
    return [title, utilities];
}

function highlightSection(weatherDataObj, inF = false) {
    const highlightCont = buildElement('div', 'location-hourly-highlight');

    const highlightData = getHighlightData(weatherDataObj);

    const highlightTime = buildElementWithText(
        'p',
        'Current',
        'highlight-time'
    );

    const temp = inF
        ? toFahrenheit(Number(highlightData.temperature))
        : highlightData.temperature;

    const highlightTemp = buildElementWithText(
        'p',
        `${temp}°`,
        'highlight-temp'
    );
    const highlightConditions = buildElementWithText(
        'p',
        highlightData.conditions,
        'highlight-condition'
    );
    const highlightIcon = buildImgElement(
        getWeatherConditionIcon(highlightData.icon),
        highlightData.conditions,
        'highlight-condition-img'
    );

    highlightCont.append(
        highlightTime,
        highlightIcon,
        highlightTemp,
        highlightConditions
    );

    return highlightCont;
}

function hourlyDataCont(hourlyData, inF = false) {
    const hourlyCont = buildElement('div', 'hourly-data-cont');

    let { time } = hourlyData;
    // Ensures time is in the correct format (hh:mm)
    if (time.length > 5) {
        time = time.slice(0, -3);
    }

    const hourlyTime = buildElementWithText('p', time, 'hourly-time');

    const hourlyIcon = buildImgElement(
        getWeatherConditionIcon(hourlyData.icon),
        hourlyData.conditions,
        'hourly-condition-img'
    );

    const temp = inF
        ? toFahrenheit(Number(hourlyData.temperature))
        : hourlyData.temperature;

    const hourlyTemp = buildElementWithText('p', `${temp}°`, 'hourly-temp');

    const hourlyConditions = buildElementWithText(
        'p',
        hourlyData.conditions,
        'hourly-condition'
    );

    hourlyCont.append(hourlyTime, hourlyIcon, hourlyTemp, hourlyConditions);

    return hourlyCont;
}

function restOfDaySection(weatherDataObj, inF = false) {
    const restOfDay = buildElement('div', 'location-rest-of-day');
    for (const hour in weatherDataObj.hourlyTemps) {
        restOfDay.append(hourlyDataCont(weatherDataObj.hourlyTemps[hour], inF));
    }
    return restOfDay;
}

// Returns the highlight section and rest of day section in the selected units
export function locationDataShell(weatherDataObj, inF = false) {
    return {
        highlight: highlightSection(weatherDataObj, inF),
        restOfDay: restOfDaySection(weatherDataObj, inF),
    };
}

export function changeUnitsEvent(event) {
    const { target } = event;
    const dataCont = locateLocationDataCont(target);
    const weatherDataObj =
        savedLocations[
            dataCont.querySelector('.location-name').dataset.location
        ];
    if (dataCont === null || weatherDataObj === undefined) {
        addErrorNotification('Failed to change units of measurement!');
        return;
    }

    if (target.checked) {
        adjustDataContShell(dataCont, locationDataShell(weatherDataObj, true));
    } else {
        adjustDataContShell(dataCont, locationDataShell(weatherDataObj, false));
    }
}

function viewMoreEvent(event) {
    const { target } = event;
    const weatherDataObj =
        savedLocations[
            locateLocationDataCont(target).querySelector('.location-name')
                .dataset.location
        ];

    viewMoreModalInteractivity(weatherDataObj);
    return;
}

export function locationDataCont(weatherDataObj) {
    const dataCont = buildElement('div', 'location-data-cont');

    buildHeaderSection(weatherDataObj).forEach((val) => dataCont.append(val));
    dataCont.append(highlightSection(weatherDataObj));
    dataCont.append(restOfDaySection(weatherDataObj));

    const viewMoreButton = buildElementWithText(
        'button',
        'View More Data',
        'view-more-data'
    );
    viewMoreButton.addEventListener('click', viewMoreEvent);
    dataCont.append(viewMoreButton);

    // Mark the creation of the element as the first update of the data in element
    updateLatestUpdates(weatherDataObj.location, weatherDataObj.tzOffset);

    document.querySelector('.main-data').append(dataCont);

    dataCont
        .querySelector('.toggle-switch-input')
        .addEventListener('input', changeUnitsEvent);
}
