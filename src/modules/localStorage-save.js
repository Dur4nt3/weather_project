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
