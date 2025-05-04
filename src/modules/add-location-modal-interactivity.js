import {
    addLocationModal,
    alterSubmitButton,
    displayResults,
    indicateError,
    clearQueryResults,
} from './add-location-modal';
import { fetchWeatherData } from './fetch-weather-data';
import trackNewLocation from './track-new-location';
import { exitModal } from './misc-utilities';
import { addSuccessNotification } from './add-notification';
import { checkQueryValidity, checkGeocodeValidity } from './data-utilities';
import fetchGeocodeLocation from './fetch-geocode-data';
import formatGeocodeAddress from './format-geocode-data';

// Tracks the results of the latest query (error/success)
let queryResult;
let altAddress;

// Returns true if the application is still processing an API call
// If a loader exists => an API call is still being processed
function stillProcessingCall(modalContent) {
    const submitButton = modalContent.querySelector('.find-location-button');
    // If the button doesn't exist it likely the user already selected a new location to track
    // In that case act as if the application isn't free to make an API call until the user exits the modal
    if (submitButton === null) {
        return true;
    }

    // If a loader is shown on the button => a running API call hasn't finished yet
    if (submitButton.lastChild.classList.contains('spin-loader')) {
        return true;
    }

    return false;
}

// Save/delete data depending on the user's decision
function handleFinalDecision(modal, decision) {
    if (decision === false) {
        clearQueryResults(modal);
        return true;
    }

    // If the decision isn't 'No' check if the query is valid before processing
    if (!checkQueryValidity(queryResult)) {
        return false;
    }

    if(checkGeocodeValidity(altAddress)) {
        queryResult.altAddress = formatGeocodeAddress(altAddress);
    } else {
        queryResult.altAddress = null;
    }

    // Show success within the modal
    addSuccessNotification(
        `Added ${queryResult.resolvedAddress}.`
    );
    trackNewLocation(queryResult);
    return true;
}

async function addLocationModalEvent(event) {
    const { target } = event;
    const modalContent = document.querySelector('.add-location-modal');

    if (target.classList.contains('close-modal-icon')) {
        exitModal(
            modalContent.parentNode,
            'close-modal-animation',
            modalContent,
            300
        );
        return;
    }

    // If a processing error occurred, only allow exiting the modal
    // Do the same if an API call is still being processed (indicated by a loader still being displayed)
    if (
        modalContent.querySelector('.processing-error') !== null ||
        stillProcessingCall(modalContent)
    ) {
        return;
    }

    if (
        target.classList.contains('find-location-button') ||
        target.classList.contains('submit-button-text')
    ) {
        const searchQuery = document.querySelector('#add-location-input').value;
        if (searchQuery.length === 0) {
            return;
        }
        // Attempt to query
        try {
            alterSubmitButton(modalContent.parentNode, true);
            queryResult = await fetchWeatherData(searchQuery);
            alterSubmitButton(modalContent.parentNode, false);
            displayResults(modalContent.parentNode, queryResult);
        } catch (error) {
            console.error(error);
            return;
        }
    }

    // If the location is accepted - generate an alternate address
    if (target.classList.contains('accept-location')) {
        alterSubmitButton(modalContent.parentNode, true);
        altAddress = await fetchGeocodeLocation(queryResult.address);
        alterSubmitButton(modalContent.parentNode, false);

        if (!handleFinalDecision(modalContent.parentNode, true)) {
            indicateError(modalContent.parentNode);
            return;
        }
        exitModal(
            modalContent.parentNode,
            'close-modal-animation',
            modalContent,
            300
        );
        return;
    }

    if (target.classList.contains('decline-location')) {
        if (!handleFinalDecision(modalContent.parentNode, false)) {
            indicateError(modalContent.parentNode);
            return;
        }
        return;
    }
}

export function addLocationModalInteractivity() {
    const modal = addLocationModal();

    document.body.prepend(modal);
    modal.focus();

    modal.addEventListener('click', addLocationModalEvent);
}
