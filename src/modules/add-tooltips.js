import tippy from 'tippy.js';
import 'tippy.js/animations/shift-away-subtle.css'

// This module uses 'Tippy.js' to add tooltips to various elements in the DOM

let menuTip;

export function toggleMenuTip() {
    if (menuTip[0].props.content === 'Hide Menu') {
        menuTip[0].setContent('Show Menu');
    } else {
        menuTip[0].setContent('Hide Menu');
    }
}

export function addToolTips() {
    menuTip = tippy('.dropdown-icon', {
        content: 'Show Menu',
        theme: 'weatherApp',
        placement: 'right',
        animation: 'shift-away-subtle',
    });

    tippy('.add-icon', {
        content: 'Add Location',
        theme: 'weatherApp',
        placement: 'right',
        animation: 'shift-away-subtle',
    });

    tippy('.edit-on-icon', {
        content: 'Toggle Edit',
        theme: 'weatherApp',
        placement: 'right',
        animation: 'shift-away-subtle',
    });

    tippy('.edit-off-icon', {
        content: 'Toggle Edit',
        theme: 'weatherApp',
        placement: 'right',
        animation: 'shift-away-subtle',
    });

    tippy('.fahrenheit-icon', {
        content: 'To Imperial Units',
        theme: 'weatherApp',
        placement: 'right',
        animation: 'shift-away-subtle',
    });
    
    tippy('.celsius-icon', {
        content: 'To Metric Units',
        theme: 'weatherApp',
        placement: 'right',
        animation: 'shift-away-subtle',
    });
}