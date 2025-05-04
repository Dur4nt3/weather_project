export default function formatGeocodeAddress(geocodeData) {
    return geocodeData.results[0].formatted;
}