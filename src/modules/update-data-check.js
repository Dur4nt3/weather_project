import { latestUpdates, checkIfUpdated } from './data-utilities';
import { UpdateRequirements } from './ui-data-utilities';
import { isSameHour, isSameMinute } from 'date-fns';
import { adjustToLocalTime } from './misc-utilities-dates';

// This module is used to check whether any weather data needs to be updated
// Note: this module doesn't orchestrates the updates only determines what needs to be updated

// Given a location's weather data, determines what needs to be updated by utilizing the latestUpdates object
export default function checkForDataUpdates(locationData) {
    // Always true as checks are conducted every minute (therefore the timestamp will always need to be updated)
    const timestamp = !isSameMinute(
        new Date(adjustToLocalTime(locationData.tzOffset)),
        new Date(latestUpdates[locationData.location])
    );
    // If the latest update is the same hour as the current hour => don't update
    const highlight = !isSameHour(
        new Date(adjustToLocalTime(locationData.tzOffset)),
        new Date(latestUpdates[locationData.location])
    );
    // Only need to requery if
    const requery = !checkIfUpdated(locationData.location);

    return new UpdateRequirements(timestamp, highlight, requery);
}
