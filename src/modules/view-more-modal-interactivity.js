import viewMoreModal from './view-more-modal';
import { exitModal } from './misc-utilities';

// This module handles the interactivity logic for the 'View More' modal

function viewMoreEventHandler(event) {
    const { target } = event;
    if (
        target.classList.contains('modal') ||
        target.classList.contains('exit-view')
    ) {
        const modal = document.querySelector('.modal');
        exitModal(modal, 'close-modal-animation', modal.lastChild, 300);
        return;
    }
}

export default function viewMoreModalInteractivity(weatherDataObj) {
    const modal = viewMoreModal(weatherDataObj);

    document.body.prepend(modal);
    modal.focus();

    modal.addEventListener('click', viewMoreEventHandler);
}
