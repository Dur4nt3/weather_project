import {
    buildElement,
    buildElementWithText,
    buildImgElement,
    hide,
    show,
} from './dom-manipulator';

import xSvg from '../assets/icons/x.svg';
import loaderSvg from '../assets/icons/loader-circle.svg';

// This module build the markup for the "add location modal"
// Additionally it includes various utilities that the interactivity module uses

export function addLocationModal() {
    const modal = buildElement('div', 'modal');
    modal.tabIndex = 0;

    const modalContent = buildElement(
        'div',
        'modal-content',
        'add-location-modal'
    );

    const closeIcon = buildImgElement(xSvg, 'Close Modal', 'close-modal-icon');

    const header = buildElementWithText(
        'h2',
        'Track a New Location',
        'add-location-title'
    );

    const inputRow = buildElement('div', 'form-row');

    const input = buildElement('input', 'add-location-input');
    input.id = 'add-location-input';
    input.placeholder = '';

    const errorSpan = buildElement('span', 'error-span', 'add-location-error');

    inputRow.append(input);

    const submitButton = buildElement(
        'button',
        'submit-button',
        'find-location-button'
    );
    const buttonText = buildElementWithText(
        'span',
        'Find Location',
        'submit-button-text'
    );
    submitButton.append(buttonText);

    const queryResultCont = buildElement('div', 'query-result-cont', 'hide');

    const enlargedText = buildElementWithText(
        'span',
        'Did you mean:',
        'enlarge-text'
    );

    const queryResultText = buildElement('p', 'query-result-text');

    const decideLocationCont = buildElement('div', 'decide-location-cont');

    const yesButton = buildElementWithText(
        'button',
        'Yes',
        'decide-location-button',
        'accept-location'
    );
    const noButton = buildElementWithText(
        'button',
        'No',
        'decide-location-button',
        'decline-location'
    );

    decideLocationCont.append(yesButton, ' / ', noButton);

    queryResultCont.append(enlargedText, queryResultText, decideLocationCont);

    modalContent.append(
        closeIcon,
        header,
        inputRow,
        errorSpan,
        submitButton,
        queryResultCont
    );

    modal.append(modalContent);

    return modal;
}

// Adds/Removes the loader icon from the button
export function alterSubmitButton(modal, loader) {
    const submitButton = modal.querySelector('.find-location-button');
    const buttonChild = submitButton.lastChild;

    if (loader === false) {
        // remove the loader icon if it exists
        if (
            buttonChild !== null &&
            buttonChild.classList.contains('spin-loader')
        ) {
            submitButton.lastChild.remove();
        }

        const buttonText = buildElementWithText(
            'span',
            'Find Location',
            'submit-button-text'
        );
        submitButton.append(buttonText);
    } else {
        // Don't attempt to add a loader if the button already has one
        if (
            buttonChild !== null &&
            buttonChild.classList.contains('spin-loader')
        ) {
            return;
        }

        // Ensure the button doesn't have any text before adding the loader
        submitButton.textContent = '';

        const loader = buildImgElement(
            loaderSvg,
            'Fetching Location',
            'spin-loader'
        );

        submitButton.append(loader);
    }
}

// Changes the button to indicate that an error occurred
export function indicateError(modal) {
    const submitButton = modal.querySelector('.find-location-button');
    submitButton.classList.add('processing-error');

    if (submitButton.lastChild !== null) {
        submitButton.lastChild.remove();
    }

    const buttonText = buildElementWithText(
        'span',
        'Error!',
        'submit-button-text'
    );
    submitButton.append(buttonText);

    const input = modal.querySelector('.add-location-input');
    input.disabled = true;
    input.classList.add('disabled-input');
}

// Clears the query results
// This is used in case a user submitted an invalid query after submitting a valid one
export function clearQueryResults(modal) {
    const queryResultCont = modal.querySelector('.query-result-cont');
    hide(queryResultCont);
    modal.querySelector('.query-result-text').textContent = '';
}

// Displays the location queried if the query was successful
function displayQueryResults(modal, resultLocation) {
    const queryResultCont = modal.querySelector('.query-result-cont');
    show(queryResultCont);
    modal.querySelector('.query-result-text').textContent = resultLocation;
}

// Handles and displays all types of results, including errors
export function displayResults(modal, result) {
    const errorSpan = modal.querySelector('.add-location-error');
    // Reset any previous errors and results
    errorSpan.textContent = '';
    clearQueryResults(modal);
    if (Array.isArray(result)) {
        if (result[0] === 'duplicate') {
            errorSpan.textContent = `${result[1].resolvedAddress} is already tracked!`;
            return;
        }
    }

    if (result === 'api') {
        errorSpan.textContent = 'An error occurred, please try again later.';
        return;
    }

    if (result === 'user') {
        errorSpan.textContent =
            'Invalid location, adjust your search and try again.';
        return;
    }

    // If the code reaches here, the query was successful
    // Display the results to the user and get feedback and whether the location is the correct one
    displayQueryResults(modal, result.resolvedAddress);
}
