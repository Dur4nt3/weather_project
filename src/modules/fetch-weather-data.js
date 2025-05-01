import { checkIfAlreadySaved } from './data-utilities';
import { apiErrors } from './misc-utilities';

import secret from '../../secret.json';

// This module fetches weather data based on a given location

function fetchAPIKey() {
    return secret.key;
}

// Fetch the data, return true if data for the specified location was found
// Return false if no data was found, an api error has occurred, or the location already exists
export async function fetchWeatherData(location, update = false) {
    let apiResult = true;

    try {
        const apiKey = fetchAPIKey();

        const baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today`;
        const queryParameters = `?unitGroup=metric&include=hours&key=${apiKey}&contentType=json`;

        const response = await fetch(baseURL + queryParameters);
        if (response.status === 200) {
            const jsonData = await response.json();

            // No need to process requests for locations that are already saved
            // Exception: Request made to update the data of existing locations
            // The exception is indicated by the optional 'update' argument
            // update = false (default) => no exception || update - true => exception granted
            if (checkIfAlreadySaved(jsonData) && !update) {
                apiResult = ['duplicate', jsonData];
                throw new Error('Location already saved');
            }

            return jsonData;
        }

        // If the data wasn't received => throw an error
        // Additionally, prepare to return the cause of the error
        apiResult = apiErrors(response.status);
        throw new Error(`Received Status: ${response.status}`);
    } catch (error) {
        console.error(`Error Caught: ${error}`);
    }

    // If an error occurred => return the type of error
    return apiResult;
}
