import { savedLocations } from './data-utilities';

// Loads weatherData from the localStorage unto 'savedLocations'
// This is used by the 'localStorage-build' module that builds data containers on page load
// This module WILL requery if the data is outdated