import {
    buildElement,
    buildElementWithText,
    buildImgElement,
    buildToggleSwitchInput,
} from './dom-manipulator';

import { getWeatherConditionIcon } from './conditions-icons';
import { updateLatestUpdates, getHighlightData } from './data-utilities';
import { adjustToLocalTime, formatDateUI } from './misc-utilities';

// This module builds the markup of a location data container based on data given as an argument

function buildHeaderSection(weatherDataObj) {
    const title = buildElementWithText(
        'h2',
        weatherDataObj.location,
        'location-name'
    );

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

function highlightSection(weatherDataObj) {
    const highlightCont = buildElement('div', 'location-hourly-highlight');

    const highlightData = getHighlightData(weatherDataObj);

    const highlightTime = buildElementWithText(
        'p',
        'Current',
        'highlight-time'
    );
    // To add => adjust temperatures to units according to user selection
    const highlightTemp = buildElementWithText(
        'p',
        `${highlightData.temperature}°`,
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

function hourlyDataCont(hourlyData) {
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

    const hourlyTemp = buildElementWithText(
        'p',
        `${hourlyData.temperature}°`,
        'hourly-temp'
    );

    const hourlyConditions = buildElementWithText(
        'p',
        hourlyData.conditions,
        'hourly-condition'
    );

    hourlyCont.append(hourlyTime, hourlyIcon, hourlyTemp, hourlyConditions);

    return hourlyCont;
}

function restOfDaySection(weatherDataObj) {
    const restOfDay = buildElement('div', 'location-rest-of-day');
    for (const hour in weatherDataObj.hourlyTemps) {
        restOfDay.append(hourlyDataCont(weatherDataObj.hourlyTemps[hour]));
    }
    return restOfDay;
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
    dataCont.append(viewMoreButton);

    // Mark the creation of the element as the first update of the data in element
    updateLatestUpdates(weatherDataObj.location, weatherDataObj.tzOffset);

    document.querySelector('.main-data').append(dataCont);
}
