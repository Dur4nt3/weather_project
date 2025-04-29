import { checkSavedLocations } from './data-utilities';
import {
    buildElement,
    buildElementWithText,
    buildImgElement,
    clearChildren,
} from './dom-manipulator';
import { getTimePeriod } from './misc-utilities';

import sunSvg from '../assets/icons/sun.svg';
import moonSvg from '../assets/icons/moon.svg';
import menuSvg from '../assets/icons/menu.svg';
import plusSvg from '../assets/icons/plus.svg';

// This module builds the no data notice that displays if a user hasn't tracked any locations yet

function buildNoDataNotice() {
    const noDataNotice = buildElement('div', 'no-data-notice');

    const labelCont = buildElement('div', 'label-cont');

    const labelImg = buildElement('img', 'notice-icon');
    if (getTimePeriod() === 'day') {
        labelImg.src = sunSvg;
        labelImg.alt = 'Sun Image';
    } else {
        labelImg.src = moonSvg;
        labelImg.alt = 'Moon Image';
    }

    labelCont.appendChild(labelImg);

    const noticeContentCont = buildElement('div', 'notice-content');

    const noticeHeader = buildElementWithText(
        'h2',
        'No Locations Tracked!',
        'notice-header'
    );

    const noticeText1 = buildElementWithText(
        'p',
        'To track the weather you will need to specify locations to track.',
        'notice-text'
    );

    const noticeText2 = buildElement('p', 'notice-text');

    const menuImg = buildImgElement(menuSvg, 'Menu Icon', 'notice-img');
    const plusImg = buildImgElement(plusSvg, 'Add Icon', 'notice-img');

    noticeText2.append(
        'Select the ',
        menuImg,
        ' icon in the top-left corner to open the menu, then select ',
        plusImg,
        ' to add a new location.'
    );

    noticeContentCont.append(noticeHeader, noticeText1, noticeText2);

    noDataNotice.append(labelCont, noticeContentCont);

    return noDataNotice;
}

export default function applyNoDataNotice() {
    // Only apply the notice if there are no saved locations
    if (checkSavedLocations()) {
        return;
    }

    const mainDataCont = document.querySelector('.main-data');
    // Ensures the main data container doesn't have any data
    clearChildren(mainDataCont);

    mainDataCont.appendChild(buildNoDataNotice());
}

// Used to remove the no data notice
// Can be used even if the notice was already removed
export function removeNoDataNotice() {
    const noticeCont = document.querySelector('.no-data-notice');
    if (noticeCont === null) {
        return;
    }
    noticeCont.remove();
}
