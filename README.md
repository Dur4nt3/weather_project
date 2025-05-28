# Weather App Project

## Weather App - Overview

This is the fifth project of the "JavaScript" course within "The Odin Project".

The main goal of this project is to build a forecast application that lets you view the weather in specified locations.

This app is used to practice asynchronous programming, specifically using "Promises", "async/await", and in general working with APIs.

## Additional Information

### APIs Used

The API used for this application is Visual Crossing's "Weather API".
Learn more about Visual Crossing [here](https://www.visualcrossing.com/weather-api/).

Additionally, the Geoapify API is used due to the fact that visual crossing returns location names in the local language.
Geoapify remediates the issue by resolving addresses to English.
Learn more about Geoapify [here](https://www.geoapify.com/).

### Storing API Keys

The API keys are stored in `secret.json` which is not committed; although this isn't completely secure as this is a front-end project without a backend server to hide the key behind, it provides some level of obfuscation.

If you are cloning this project and wish to replicate the structure of `secret.json` you can use the following template:

```
{
    "key": "${Visual Crossing API Key}",
    "geocode": "${Geoapify API Key}"
}
```

## Skills Demonstrated

- Promises

- Using "async" and "await"

- Using APIs

## Misc Information

**Webpage responsiveness:** This project will not display properly on mobile devices