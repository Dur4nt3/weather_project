import { fetchWeatherData } from './fetch-weather-data';
import formatAndSaveWeatherData from './format-weather-data';
import { deleteFromLocalStorage } from './localStorage-save';
import { checkQueryValidity, deleteLocation } from './data-utilities';
import { addErrorNotification } from './add-notification';

// This module initiate the requery process for weather data
// The requery process involves:
// 1) fetching new data via an API call
// 2) deleting outdated data from 'savedLocations' and localStorage
// 3) formatting and saving new data in 'savedLocations' and localStorage
// Note: this module will not update the data of elements in the UI, this will be done by 'update-data-execute.js'

export default async function requeryWeatherData(location) {
    const queryResult = await fetchWeatherData(location, true);
    if (!checkQueryValidity(queryResult)) {
        addErrorNotification(`Could not update ${location}'s weather data`);
        return;
    }
    if (!deleteFromLocalStorage(location) || !deleteLocation(location)) {
        addErrorNotification(`Could not update ${location}'s weather data`);
        return;
    }

    formatAndSaveWeatherData(queryResult);
    return;
}