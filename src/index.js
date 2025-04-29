import './assets/stylesheets/reset.css';
import './styles.css';

import { initialLoad } from './modules/initial-load';
import { addLocationModalInteractivity } from './modules/add-location-modal-interactivity';
import { toggleMenuTip } from './modules/add-tooltips';
import handleGlobalChangeUnits from './modules/global-change-units';

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
        addLocationModalInteractivity();
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
});
