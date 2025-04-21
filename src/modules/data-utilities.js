
// This module includes various utilities for weather data

const savedLocations = {};

export { savedLocations };

// Checks whether there are any stored locations
export function checkSavedLocations() {
    const locations = Object.keys(savedLocations);

    if (locations.length === 0) {
        return false;
    }
    return true;
}