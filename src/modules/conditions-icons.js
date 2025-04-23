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

// This module associates condition names and moon phase values to their respective SVG icons

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

export function getWeatherConditionIcon(condition) {
    if (conditionsIconsSources[condition] !== undefined) {
        return conditionsIconsSources[condition];
    }
    return conditionsIconsSources.noData;
}

export function getMoonPhaseIcon(moonPhase) {
    if (moonPhase === 0) {
        return moonPhases.newMoon;
    }

    if (moonPhase > 0 && moonPhase < 0.25) {
        return moonPhases.waxingCrescent;
    }

    if (moonPhase === 0.25) {
        return moonPhases.firstQuarter;
    }

    if (moonPhase > 0.25 && moonPhase < 0.5) {
        return moonPhases.waxingGibbous;
    }

    if (moonPhase === 0.5) {
        return moonPhases.fullMoon;
    }

    if (moonPhase > 0.5 && moonPhase < 0.75) {
        return moonPhases.waningGibbous;
    }

    if (moonPhase === 0.75) {
        return moonPhases.lastQuarter;
    }

    if (moonPhase > 0.75 && moonPhase <= 1) {
        return moonPhases.waningCrescent;
    }

    return moonPhases.defaultMoon;
}
