import { hide, show } from './dom-manipulator';
import { savedLocations } from './data-utilities';
import { locationDataShell } from './build-location-data';
import { adjustDataContShell } from './ui-data-utilities';
import { addInformationNotification } from './add-notification';

// This module mainly acts as an intermediate between 'index.js' and 'build-location-data.js' allowing to easily switch global units
// This module simply executes the 'changeUnitsEvent' on all location data containers when the users selects the option from the menu

function changeUnitsLoop(mainDataChildren, toF) {
    for (const child of mainDataChildren) {
        const toggleSwitchInput = child.querySelector('.toggle-switch-input');
        // If the user already adjusted a container individually to the selected units, don't proceed
        if (
            (toF && toggleSwitchInput.checked) ||
            (!toF && !toggleSwitchInput.checked)
        ) {
            continue;
        } else {
            const dataShell = locationDataShell(
                savedLocations[
                    child.querySelector('.location-name').dataset.location
                ],
                toF
            );
            if (toF && !toggleSwitchInput.checked) {
                toggleSwitchInput.checked = true;
            } else {
                toggleSwitchInput.checked = false;
            }
            adjustDataContShell(child, dataShell);
        }
    }
}

export default function handleGlobalChangeUnits(icon, toF = false) {
    const mainDataChildren = [...document.querySelector('.main-data').children];
    if (
        mainDataChildren.length === 0 ||
        mainDataChildren[0].classList.contains('no-data-notice')
    ) {
        addInformationNotification('No data to modify!');
        return;
    }

    hide(icon);
    if (toF) {
        show(icon.parentNode.querySelector('.celsius-icon'));
    } else {
        show(icon.parentNode.querySelector('.fahrenheit-icon'));
    }

    changeUnitsLoop(mainDataChildren, toF);
}
