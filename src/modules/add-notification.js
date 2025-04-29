import {
    buildElement,
    buildElementWithText,
    buildImgElement,
} from './dom-manipulator';
import xSvg from '../assets/icons/x.svg';

// This module builds notifications and adds them to the DOM
function buildNotification(type, bodyText) {
    let headerText;
    if (type === 'success') {
        headerText = 'Success!'
    }
    else if (type === 'error') {
        headerText = 'An Error Occurred!'
    } else {
        headerText = 'Notice!'
    }

    const cont = buildElement('div', 'notification', `${type}-notification`);
    const exit = buildImgElement(
        xSvg,
        'Close Notification',
        'close-modal-icon'
    );
    const bodyCont = buildElement('div', 'notification-body');
    const header = buildElementWithText(
        'h3',
        headerText,
        'notification-header'
    );
    const text = buildElementWithText('p', bodyText, 'notification-text');

    bodyCont.append(header, text);

    const progressBar = buildElement('div', 'progress-bar');

    cont.append(exit, bodyCont, progressBar);
    return cont;
}

function handleNotification(notificationElement) {
    notificationElement.classList.add('notification-fade-in');
    notificationElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal-icon')) {
            notificationElement.remove();
        }
    });

    // Override existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification !== null) {
        existingNotification.remove();
    }

    document.body.prepend(notificationElement);

    notificationElement.querySelector('.progress-bar').classList.add('drain-progress');
    setTimeout(() => {
        notificationElement.classList.add('notification-fade-out');
        setTimeout(() => (notificationElement.remove()), 450);
    }, 3500);
}

export function addErrorNotification(bodyText) {
    const errorElement = buildNotification('error', bodyText);
    handleNotification(errorElement);
}

export function addSuccessNotification(bodyText) {
    const successElement = buildNotification('success', bodyText);
    handleNotification(successElement);
}

export function addInformationNotification(bodyText) {
    const successElement = buildNotification('information', bodyText);
    handleNotification(successElement);
}