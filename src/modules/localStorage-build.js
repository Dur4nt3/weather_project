import { savedLocations } from './data-utilities';
import { locationDataCont } from './build-location-data';

// This module uses 'savedLocations' to build weather data containers
// This module should be used on load to query localStorage and build the containers

export default function buildOnLoad() {
    for (const location in savedLocations) {
        locationDataCont(savedLocations[location]);
    }
}