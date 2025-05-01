// This module is used to save weather data to localStorage
// Data in local storage is save in the following format: weatherData: [[location, weatherDataObj],[location, weatherDataObj], ...]

// Formats instances of WeatherData to an array: [location, WeatherData instance]
function formatToArrayItem(weatherDataObj) {
    const arrayItem = [weatherDataObj.location, weatherDataObj];
    return arrayItem;
}

// Appends items to the localStorage array ('weatherData')
// If the array doesn't exist yet, create it
function appendToSavedArray(arrayItem) {
    const storedData = localStorage.getItem('weatherData');
    if (storedData === null) {
        return [arrayItem];
    } 

    const parsedArray = JSON.parse(storedData);
    parsedArray.push(arrayItem);
    return parsedArray;
}

// Saves a given location to localStorage
export function saveToLocalStorage(weatherDataObj) {
    const arrayItem = formatToArrayItem(weatherDataObj);
    const localStorageArray = appendToSavedArray(arrayItem);
    localStorage.setItem('weatherData', JSON.stringify(localStorageArray));
}

// Locates the index of a weatherData item in the localStorage given a location
// REQUIRES the parsed localStorage array passed as parsedArray
function locateInLocalStorage(parsedArray, location) {
    for (const item in parsedArray) {
        if (parsedArray[item][0] === location) {
            return item;
        }
    }
}

// Deletes a given location from the localStorage
// Indicate success/failure with true or false
export function deleteFromLocalStorage(location) {
    const storedData = localStorage.getItem('weatherData');
    // If for some reason the location isn't saved to localStorage, exit.
    if (storedData === null) {
        return false;
    }
    const parsedArray = JSON.parse(storedData);
    const itemIndex = locateInLocalStorage(parsedArray, location);
    if (itemIndex === undefined) {
        return false;
    }
    parsedArray.splice(itemIndex, 1);
    localStorage.setItem('weatherData', JSON.stringify(parsedArray));
    return true;
}
