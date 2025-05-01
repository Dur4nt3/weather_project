import tippy from 'tippy.js';
import 'tippy.js/animations/shift-away-subtle.css'

// This module uses 'Tippy.js' to add tooltips to various elements in the DOM

let menuTip;

function createBasicToolTip(elementSelector, content) {
    return tippy(elementSelector, {
        content,
        theme: 'weatherApp',
        placement: 'right',
        animation: 'shift-away-subtle',
    });
}

export function toggleMenuTip() {
    if (menuTip[0].props.content === 'Hide Menu') {
        menuTip[0].setContent('Show Menu');
    } else {
        menuTip[0].setContent('Hide Menu');
    }
}

export function addToolTips() {
    menuTip = createBasicToolTip('.dropdown-icon', 'Show Menu');

    createBasicToolTip('.add-icon', 'Add Location');
    createBasicToolTip('.edit-on-icon', 'Toggle Edit Mode');
    createBasicToolTip('.edit-off-icon', 'Toggle Edit Mode');
    createBasicToolTip('.fahrenheit-icon', 'To Imperial Units');
    createBasicToolTip('.celsius-icon', 'To Metric Units');
}