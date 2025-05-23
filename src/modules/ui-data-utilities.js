import { getWeatherConditionIcon } from './conditions-icons';

// This module provides utilities that allows handling and manipulating data in the UI

// Class indicating what data needs to be updated on a location data container
// 'timestamp' => true if there is a need to update local time in the container
// 'highlight' => true if there is a need to update the highlight section in the container
// 'requery' => true if there is a need to requery the weather data (because current data is outdated)
export class UpdateRequirements {
    constructor(timestamp, highlight, requery) {
        this.timestamp = timestamp;
        this.highlight = highlight;
        this.requery = requery;
    }
}

// Returns the location data container in the DOM that matches the given location
// Utilizes the 'data-location' attribute on the container's header
// Returns false if the container wasn't found
export function getLocationDataCont(location) {
    const mainData = document.querySelector('.main-data');
    const mainChildren = [...mainData.children];
    for (const child of mainChildren) {
        if (child.classList.contains('location-data-cont')) {
            if (
                child.querySelector('.location-name').dataset.location ===
                location
            ) {
                return child;
            }
        }
    }
    return false;
}

// Given a child element of a location data container, locates the container
// Returns null if a container wasn't found
export function locateLocationDataCont(childElement) {
    let maxDepth = 0;
    let currentNode = childElement.parentNode;
    while (
        !currentNode.classList.contains('location-data-cont') &&
        maxDepth < 50
    ) {
        currentNode = currentNode.parentNode;
        maxDepth += 1;
    }

    if (maxDepth === 50) {
        return null;
    }

    return currentNode;
}

// Given a location data container, changes the container's timestamp
// This is used by the updating module to update the local time on location data containers
export function changeDataContTimestamp(dataCont, newTimestamp) {
    const timestamp = dataCont.querySelector('.local-time-cont');
    timestamp.textContent = newTimestamp;
}

// Used to update the hourly highlight on a selected location data container
export function changeDataContHighlight(dataCont, highlightData) {
    const highlightCont = dataCont.querySelector('.location-hourly-highlight');

    const highlightImg = highlightCont.querySelector(
        '.highlight-condition-img'
    );
    highlightImg.src = getWeatherConditionIcon(highlightData.icon);
    highlightImg.alt = highlightData.conditions;

    highlightCont.querySelector('.highlight-temp').textContent =
        highlightData.temperature;

    highlightCont.querySelector('.highlight-condition').textContent =
        highlightData.conditions;
}

// Adjusts the 'highlight' and 'rest of day' sections of a data container
// Simply switches the old sections with the new
// dataShell = { highlight: highlightSection, restOfDay: restOfDaySection }
export function adjustDataContShell(dataCont, dataShell) {
    // Last child of data container, new sections are inserted before
    const referenceNode = dataCont.querySelector('.view-more-data');
    dataCont.querySelector('.location-hourly-highlight').remove();
    dataCont.querySelector('.location-rest-of-day').remove();
    dataCont.insertBefore(dataShell.highlight, referenceNode);
    dataCont.insertBefore(dataShell.restOfDay, referenceNode);
}
