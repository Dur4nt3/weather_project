import {
    buildElement,
    buildElementWithText,
    buildImgElement,
} from './dom-manipulator';

import { getMoonPhaseIcon, getUVIndexIcon } from './conditions-icons';
import {
    adjustToLocalTime,
    formatDate,
    formatDateUI,
} from './misc-utilities-dates';

import sunriseSvg from '../assets/icons/sunrise.svg';
import sunsetSvg from '../assets/icons/sunset.svg';

// This module builds the markup for the modal that pops up when the user selects the 'View More Data' option

function sunDataSection(weatherDataObj) {
    const cont = buildElement('div', 'sun-data');

    const sunriseData = buildElement('div', 'sunrise-data');
    const sunsetData = buildElement('div', 'sunset-data');

    const sunriseImg = buildImgElement(sunriseSvg, 'Sunrise Time', 'sun-icon');
    const sunsetImg = buildImgElement(sunsetSvg, 'Sunset Time', 'sun-icon');

    const headerRise = buildElementWithText('h4', 'Sunrise', 'sunrise-header');
    const headerSet = buildElementWithText('h4', 'Sunset', 'sunset-header');

    const textRise = buildElementWithText(
        'p',
        weatherDataObj.sunrise,
        'sunrise-content'
    );
    const textSet = buildElementWithText(
        'p',
        weatherDataObj.sunset,
        'sunrise-content'
    );

    sunriseData.append(sunriseImg, headerRise, textRise);
    sunsetData.append(sunsetImg, headerSet, textSet);

    cont.append(sunriseData, sunsetData);

    return cont;
}

function uvIndexDataSection(weatherDataObj) {
    const cont = buildElement('div', 'uv-data');

    const header = buildElementWithText('h3', 'UV Index', 'uv-header');

    const contentCont = buildElement('div', 'uvindex-content');

    const dataInfo = getUVIndexIcon(weatherDataObj.uvIndex);
    const [iconSrc, iconDescription] = dataInfo;
    const icon = buildImgElement(iconSrc, 'UV Index', 'uv-index-icon');

    const description = buildElementWithText(
        'p',
        iconDescription,
        'uvindex-description'
    );

    contentCont.append(icon, description);

    cont.append(header, contentCont);

    return cont;
}

function moonDataSection(weatherDataObj) {
    const cont = buildElement('div', 'moon-data');

    const header = buildElementWithText('h3', 'Moon Phase', 'moon-header');

    const contentCont = buildElement('div', 'moonphase-content');

    const dataInfo = getMoonPhaseIcon(weatherDataObj.moonPhase);
    const [iconSrc, iconDescription] = dataInfo;
    const icon = buildImgElement(iconSrc, 'Moon Phase', 'moonphase-icon');

    const description = buildElementWithText(
        'p',
        iconDescription,
        'moonphase-description'
    );

    contentCont.append(icon, description);

    cont.append(header, contentCont);

    return cont;
}

export default function viewMoreModal(weatherDataObj) {
    const modal = buildElement('div', 'modal');
    modal.tabIndex = 0;

    const modalContent = buildElement('div', 'modal-content', 'view-more-modal');

    const header = buildElementWithText(
        'h2',
        weatherDataObj.location,
        'view-more-location-name'
    );
    header.dataset.location = weatherDataObj.location;

    const currentDate = buildElementWithText(
        'p',
        formatDateUI(
            formatDate(adjustToLocalTime(weatherDataObj.tzOffset)),
            true
        ),
        'current-time'
    );

    const miscData = buildElement('div', 'misc-data');

    miscData.append(
        sunDataSection(weatherDataObj),
        uvIndexDataSection(weatherDataObj),
        moonDataSection(weatherDataObj)
    );

    const exitButton = buildElementWithText('button', 'Exit', 'exit-view');

    modalContent.append(header, currentDate, miscData, exitButton);

    modal.append(modalContent);

    return modal;
}
