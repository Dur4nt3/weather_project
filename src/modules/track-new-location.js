import { removeNoDataNotice } from './no-data-notice';
import formatAndSaveWeatherData from './format-weather-data';
import { locationDataCont } from './build-location-data';
// This module is used to perform several integral actions when tracking a new location

export default function trackNewLocation(queryResult) {
    removeNoDataNotice();
    const weatherDataObj = formatAndSaveWeatherData(queryResult);
    locationDataCont(weatherDataObj);
}
