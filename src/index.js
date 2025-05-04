import './assets/stylesheets/reset.css';
import './styles.css';

import { initialLoad } from './modules/initial-load';
import { addLocationModalInteractivity } from './modules/add-location-modal-interactivity';
import { toggleMenuTip } from './modules/add-tooltips';
import handleGlobalChangeUnits from './modules/global-change-units';
import handleToggleEditMode from './modules/global-edit-mode';

window.onload = initialLoad;

const dropdownIcon = document.querySelector('.dropdown-icon');
const menuOptions = document.querySelector('.menu-icons-cont');

dropdownIcon.addEventListener('click', () => {
    menuOptions.classList.toggle('expanded');
    toggleMenuTip();
});

menuOptions.addEventListener('click', (e) => {
    // Don't continue if the menu isn't expanded
    if (!menuOptions.classList.contains('expanded')) {
        return;
    }

    const { target } = e;

    if (target.classList.contains('add-icon')) {
        // Only display the modal if there isn't a modal currently being displayed
        if (document.querySelector('.modal') === null) {
            addLocationModalInteractivity();
        }
        return;
    }

    if (target.classList.contains('fahrenheit-icon')) {
        handleGlobalChangeUnits(target, true);
        return;
    }

    if (target.classList.contains('celsius-icon')) {
        handleGlobalChangeUnits(target, false);
        return;
    }

    if (target.classList.contains('edit-on-icon')) {
        handleToggleEditMode(target, true);
        return;
    }

    if (target.classList.contains('edit-off-icon')) {
        handleToggleEditMode(target, false);
        return;
    }
});
