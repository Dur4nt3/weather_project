import snowSvg from '../assets/images/weather/snow.svg';
import snowShowersDaySvg from '../assets/images/weather/snow-showers-day.svg';
import snowShowersNightSvg from '../assets/images/weather/snow-showers-at-night.svg';
import thunderSvg from '../assets/images/weather/thunderstorm.svg';
import rainSvg from '../assets/images/weather/rain.svg';
import dayShowersSvg from '../assets/images/weather/day-showers.svg';
import nightShowersSvg from '../assets/images/weather/night-showers.svg';
import fogSvg from '../assets/images/weather/fog.svg';
import windSvg from '../assets/images/weather/wind.svg';
import cloudySvg from '../assets/images/weather/cloudy.svg';
import cloudyDaySvg from '../assets/images/weather/cloudy-day.svg';
import cloudyNightSvg from '../assets/images/weather/cloudy-night.svg';
import clearDaySvg from '../assets/images/weather/clear-day.svg';
import clearNightSvg from '../assets/images/weather/clear-night.svg';
import noDataSvg from '../assets/images/weather/no-data.svg';

import newMoonSvg from '../assets/images/moon/new-moon.svg';
import waxingCrescentSvg from '../assets/images/moon/waxing-crescent.svg';
import firstQuarterSvg from '../assets/images/moon/first-quarter.svg';
import waxingGibbousSvg from '../assets/images/moon/waxing-gibbous.svg';
import fullMoonSvg from '../assets/images/moon/full-moon.svg';
import waningGibbousSvg from '../assets/images/moon/waning-gibbous.svg';
import lastQuarterSvg from '../assets/images/moon/last-quarter.svg';
import waningCrescentSvg from '../assets/images/moon/waning-crescent.svg';
import defaultMoonSvg from '../assets/images/moon/moon-default.svg';

import lowSvg from '../assets/images/UVindex/low-green.svg';
import mediumSvg from '../assets/images/UVindex/medium-yellow.svg';
import highSvg from '../assets/images/UVindex/high-orange.svg';
import veryHighSvg from '../assets/images/UVindex/very-high-red.svg';
import extremelyHighSvg from '../assets/images/UVindex/extremely-high-purple.svg';
import fallbackSvg from '../assets/images/UVindex/fallback.svg';

// This module associates condition names and moon phase values to their respective SVG icons
// Also includes support for UV Index icons

const conditionsIconsSources = {
    snow: snowSvg,
    'snow-showers-day': snowShowersDaySvg,
    'snow-showers-night': snowShowersNightSvg,
    'thunder-rain': thunderSvg,
    'thunder-showers-day': thunderSvg,
    'thunder-showers-night': thunderSvg,
    rain: rainSvg,
    'showers-day': dayShowersSvg,
    'showers-night': nightShowersSvg,
    fog: fogSvg,
    wind: windSvg,
    cloudy: cloudySvg,
    'partly-cloudy-day': cloudyDaySvg,
    'partly-cloudy-night': cloudyNightSvg,
    'clear-day': clearDaySvg,
    'clear-night': clearNightSvg,
    noData: noDataSvg,
};

const moonPhases = {
    newMoon: newMoonSvg,
    waxingCrescent: waxingCrescentSvg,
    firstQuarter: firstQuarterSvg,
    waxingGibbous: waxingGibbousSvg,
    fullMoon: fullMoonSvg,
    waningGibbous: waningGibbousSvg,
    lastQuarter: lastQuarterSvg,
    waningCrescent: waningCrescentSvg,
    defaultMoon: defaultMoonSvg,
};

const uvIndexes = {
    low: lowSvg,
    medium: mediumSvg,
    high: highSvg,
    veryHigh: veryHighSvg,
    extremelyHigh: extremelyHighSvg,
    fallback: fallbackSvg,
};

export function getWeatherConditionIcon(condition) {
    if (conditionsIconsSources[condition] !== undefined) {
        return conditionsIconsSources[condition];
    }
    return conditionsIconsSources.noData;
}

export function getMoonPhaseIcon(moonPhase) {
    if (moonPhase === 0) {
        return [moonPhases.newMoon, 'New Moon'];
    }

    if (moonPhase > 0 && moonPhase < 0.25) {
        return [moonPhases.waxingCrescent, 'Waxing Crescent'];
    }

    if (moonPhase === 0.25) {
        return [moonPhases.firstQuarter, 'First Quarter'];
    }

    if (moonPhase > 0.25 && moonPhase < 0.5) {
        return [moonPhases.waxingGibbous, 'Waxing Gibbous'];
    }

    if (moonPhase === 0.5) {
        return [moonPhases.fullMoon, 'Full Moon'];
    }

    if (moonPhase > 0.5 && moonPhase < 0.75) {
        return [moonPhases.waningGibbous, 'Waning Gibbous'];
    }

    if (moonPhase === 0.75) {
        return [moonPhases.lastQuarter, 'Last Quarter'];
    }

    if (moonPhase > 0.75 && moonPhase <= 1) {
        return [moonPhases.waningCrescent, 'Waning Crescent'];
    }

    return [moonPhases.defaultMoon, 'N/A'];
}

export function getUVIndexIcon(uvindex) {
    if (uvindex >= 1 && uvindex <= 2) {
        return [uvIndexes.low, 'Low'];
    }

    if (uvindex >= 3 && uvindex <= 5) {
        return [uvIndexes.medium, 'Medium'];
    }

    if (uvindex >= 6 && uvindex <= 7) {
        return [uvIndexes.high, 'High'];
    }

    if (uvindex >= 8 && uvindex <= 10) {
        return [uvIndexes.veryHigh, 'Very High'];
    }

    if (uvindex >= 11) {
        return [uvIndexes.extremelyHigh, 'Extremely High'];
    }

    return [uvIndexes.fallback, 'N/A'];
}
