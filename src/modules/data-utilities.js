import { adjustToLocalTime, padTimeWithZeros } from './misc-utilities';
import { getHours, isSameDay } from 'date-fns';

// This module includes various utilities for handling and manipulating weather data

const savedLocations = {};
const latestUpdates = {};

export { savedLocations, latestUpdates };

// Class for storing weather data
export class WeatherData {
    constructor(
        location,
        date,
        tzOffset,
        hourlyTemps,
        sunrise,
        sunset,
        uvIndex,
        moonPhase
    ) {
        this.location = location;
        this.date = date;
        this.tzOffset = tzOffset;
        // 'hourlyTemps' is an object where every property is a time (hh:mm:ss) and every value is the weather data for said time
        this.hourlyTemps = hourlyTemps;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.uvIndex = uvIndex;
        this.moonPhase = moonPhase;
    }
}

// Checks whether there are any stored locations
export function checkSavedLocations() {
    const locations = Object.keys(savedLocations);

    if (locations.length === 0) {
        return false;
    }
    return true;
}

// Checks whether a resolved address is already displayed
// Returns true if it is, false otherwise
export function checkIfAlreadySaved(jsonData) {
    if (Object.hasOwn(savedLocations, jsonData.resolvedAddress)) {
        return true;
    }

    return false;
}

// Checks if a given location is already updated to the latest daily data
// Used to allow exceptions when fetching data for a location is already tracked
// If the data isn't updated => return false
export function checkIfUpdated(location) {
    const currentDate = new Date(
        adjustToLocalTime(savedLocations[location].tzOffset)
    );
    if (isSameDay(currentDate, new Date(savedLocations[location].date))) {
        return true;
    }
    return false;
}

export function updateLatestUpdates(location, tzOffset) {
    latestUpdates[location] = adjustToLocalTime(tzOffset);
}

// Returns weather data for the highlight (i.e., the current hour)
export function getHighlightData(weatherDataObj) {
    let time = padTimeWithZeros(
        `${getHours(new Date(adjustToLocalTime(weatherDataObj.tzOffset)))}:00`
    );
    time = `${time}:00`;

    for (const key in weatherDataObj.hourlyTemps) {
        if (key === time) {
            return weatherDataObj.hourlyTemps[key];
        }
    }
}
