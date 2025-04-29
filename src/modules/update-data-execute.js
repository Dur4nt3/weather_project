import { savedLocations, getHighlightData, updateLatestUpdates } from './data-utilities';
import checkForDataUpdates from './update-data-check';
import {
    getLocationDataCont,
    changeDataContTimestamp,
    changeDataContHighlight,
} from './ui-data-utilities';
import { adjustToLocalTime, formatDateUI } from './misc-utilities-dates';

// This module performs weather data updates
// It uses 'update-data-check.js' to know whether an update is need or not and what needs to be updated

export default function performDataUpdates() {
    console.log('executing updates');
    for (const location in savedLocations) {
        const updateRequirements = checkForDataUpdates(
            savedLocations[location]
        );
        const dataCont = getLocationDataCont(location);
        if (updateRequirements.timestamp) {
            changeDataContTimestamp(
                dataCont,
                formatDateUI(
                    adjustToLocalTime(savedLocations[location].tzOffset)
                )
            );
        }

        if (updateRequirements.highlight) {
            changeDataContHighlight(
                dataCont,
                getHighlightData(savedLocations[location])
            );
        }
        updateLatestUpdates(location, savedLocations[location].tzOffset);
    }

    // Repeat checks 30 seconds
    setTimeout(performDataUpdates, 30000);
}
