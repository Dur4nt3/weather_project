import { apiErrors } from './misc-utilities';

import secret from '../../secret.json';

// This module uses the "Geoapify" API to resolve addresses
// This is used because Visual Crossing returns addresses in the local language

function fetchAPIKey() {
    return secret.geocode;
}

export default async function fetchGeocodeLocation(queryLocation) {
    let apiResult = true;
    
    try {
        const apiKey = fetchAPIKey();

        const baseURL = 'https://api.geoapify.com/v1/geocode/search';
        const queryParameters = `?text=${queryLocation}&limit=1&format=json&apiKey=${apiKey}`;

        const response = await fetch(baseURL + queryParameters);
        if (response.status === 200) {
            const jsonData = await response.json();
            return jsonData;
        }
        
        // If the data wasn't received => throw an error
        // Additionally, prepare to return the cause of the error
        apiResult = apiErrors(response.status);
        throw new Error(`Received Status: ${response.status}`);
    } catch (error) {
        console.error(`Error Caught: ${error}`);
    }

    return apiResult;
}