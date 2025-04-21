import './assets/stylesheets/reset.css';
import './styles.css';

import { initialLoad } from './modules/initial-load';

window.onload = initialLoad;

const dropdownIcon = document.querySelector('.dropdown-icon');
const menuOptions = document.querySelector('.menu-icons-cont');

dropdownIcon.addEventListener('click', () => {
    menuOptions.classList.toggle('expanded');
});
