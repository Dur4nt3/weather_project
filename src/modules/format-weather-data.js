import { WeatherData, savedLocations } from './data-utilities';
import { saveToLocalStorage } from './localStorage-save';

// This module formats the weather data so it can be safely inserted to 'savedLocations'

// Builds the hourlyTemps object
function buildHourlyTemps(hourlyArray) {
    const hourlyTemps = {};
    for (const i of hourlyArray) {
        const hourlyData = {
            time: i.datetime,
            temperature: i.temp,
            conditions: i.conditions,
            icon: i.icon,
        };

        hourlyTemps[i.datetime] = hourlyData;
    }

    return hourlyTemps;
}

export default function formatAndSaveWeatherData(jsonData) {
    const hourlyTemps = buildHourlyTemps(jsonData.days[0].hours);

    const weatherDataObject = new WeatherData(
        jsonData.resolvedAddress,
        jsonData.altAddress,
        jsonData.days[0].datetime,
        jsonData.tzoffset,
        hourlyTemps,
        jsonData.days[0].sunrise,
        jsonData.days[0].sunset,
        jsonData.days[0].uvindex,
        jsonData.days[0].moonphase
    );

    savedLocations[jsonData.resolvedAddress] = weatherDataObject;
    saveToLocalStorage(weatherDataObject);
    return weatherDataObject;
}
