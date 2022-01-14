const baseUrl = 'http://localhost:8000';
const geoprocessorsUrl = `${baseUrl}/geoprocessors/`
const geofencesUrl = `${baseUrl}/geofences/`;
const featureInputsUrl = `${baseUrl}/featureinputs/`;
const geofenceWebSocketUrl = `ws://localhost:8000/admin_geofence_monitor/`

const urls = {
    baseUrl, geoprocessorsUrl, geofencesUrl, featureInputsUrl,
    geofenceWebSocketUrl
}
export {urls}