import { savedLocations } from './data-utilities';

// Loads weatherData from the localStorage unto 'savedLocations'
// This is used by the 'localStorage-build' module that builds data containers on page load
// This module WILL requery if the data is outdated

export default function loadStoredData() {
    const weatherData = localStorage.getItem('weatherData');
    // No data is saved in the localStorage
    if (weatherData === null) {
        return;
    }

    const parsedData = JSON.parse(weatherData);
    // Used to prevent duplicates
    const alreadyAdded = [];
    for (const data of parsedData) {
        const [location, dataObj] = data;
        if (alreadyAdded.includes(location)) {
            continue;
        }
        savedLocations[location] = dataObj;
        alreadyAdded.push(location);
    }
}