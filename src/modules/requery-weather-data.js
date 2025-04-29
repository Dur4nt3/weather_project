
// This module initiate the requery process for weather data
// The requery process involves:
// 1) fetching new data via an API call
// 2) deleting outdated data from 'savedLocations' and localStorage
// 3) formatting and saving new data in 'savedLocations' and localStorage
// Note: this module will not update the data of elements in the UI, this will be done by 'update-data-execute.js'