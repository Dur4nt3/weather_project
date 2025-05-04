# Weather App Project

### Weather App | The Odin Project | JavaScript

This is the fifth project of the "JavaScript" course within "The Odin Project".

The main goal of this project is to build a forecast application that lets you view the weather in specified locations.
*The API used for this application is Visual Crossing's "Weather API".*
*Learn more about Visual Crossing [here](https://www.visualcrossing.com/weather-api/).*
<br/>

*Additionally, the Geoapify API is used due to the fact that visual crossing returns location names in the local language.*
*Geoapify remediates the issue by resolving addresses to English.*
*Learn more about Geoapify [here](https://www.geoapify.com/).*

This app is used to practice asynchronous programming, specifically using "Promises", "async/await", and in general working with APIs.

*Note: the API keys are stored in `secret.json` which is not committed; although this isn't completely secure as this is a front-end project without a backend server to hide the key behind, it provides some level of obfuscation.*

*If you are cloning this project and wish to replicate the structure of `secret.json` you can use the following template:*

```
{
    "key": "${Visual Crossing API Key}",
    "geocode": "${Geoapify API Key}"
}
```

**Skills demonstrated: Promises, async/await, APIs**

**Webpage responsiveness: THIS PROJECT WILL NOT DISPLAY PROPERLY ON MOBILE DEVICES**