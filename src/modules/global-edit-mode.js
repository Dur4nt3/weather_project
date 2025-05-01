import { deleteLocation } from './data-utilities';
import { deleteFromLocalStorage } from './localStorage-save';
import { addInformationNotification } from './add-notification';
import { hide, show, buildImgElement } from './dom-manipulator';
import { locateLocationDataCont } from './ui-data-utilities';
import applyNoDataNotice from './no-data-notice';

import minusSvg from '../assets/icons/minus.svg';

// Handler function for toggling edit mode via the menu
// Controls toggling the mode and deleting location data containers

// Actions to perform if the last container has been removed
function handleDeleteLast() {
    applyNoDataNotice();
    const editIcons = document.querySelector('.edit-icons');
    const onIcon = editIcons.querySelector('.edit-on-icon');
    const offIcon = editIcons.querySelector('.edit-off-icon');

    if (onIcon.classList.contains('hide')) {
        hide(offIcon);
        show(onIcon);
    }
}

function deleteLocationEvent(event) {
    const dataCont = locateLocationDataCont(event.target);
    const { location } = dataCont.querySelector('.location-name').dataset;
    deleteLocation(location);
    deleteFromLocalStorage(location);
    dataCont.remove();
    // If this is the last container remaining => adjust the UI
    if ([...document.querySelector('.main-data').children].length === 0) {
        handleDeleteLast();
    }
}

function editOn(mainDataChildren) {
    for (const child of mainDataChildren) {
        const { location } = child.querySelector('.location-name').dataset;
        const removeIcon = buildImgElement(
            minusSvg,
            `Remove ${location}`,
            'remove-cont-icon'
        );
        child.prepend(removeIcon);
        removeIcon.addEventListener('click', deleteLocationEvent);
        child.classList.add('erratic-shake');
    }
}

function editOff(mainDataChildren) {
    for (const child of mainDataChildren) {
        const removeIcon = child.querySelector('.remove-cont-icon');
        removeIcon.removeEventListener('click', deleteLocationEvent);
        removeIcon.remove();
        child.classList.remove('erratic-shake');
    }
}

export default function handleToggleEditMode(target, on) {
    const mainDataChildren = [...document.querySelector('.main-data').children];
    if (
        mainDataChildren.length === 0 ||
        mainDataChildren[0].classList.contains('no-data-notice')
    ) {
        addInformationNotification('No data to modify!');
        return;
    }

    hide(target);
    if (on) {
        show(target.parentNode.querySelector('.edit-off-icon'));
        editOn(mainDataChildren);
    } else {
        show(target.parentNode.querySelector('.edit-on-icon'));
        editOff(mainDataChildren);
    }
}
