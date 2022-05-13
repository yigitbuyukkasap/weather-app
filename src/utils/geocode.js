const request = require('request');

const geoCode = (address, callback) => {
	const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWlnaXRieWtzcCIsImEiOiJjbDMzOHN3cXYwczBwM2RxdmZhOW43ZGUzIn0.GOet_sTc7-I8uthpMWM2GA&limit=1';
	request({ url: geoUrl, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect location services!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[0],
				longitude: body.features[0].center[1],
				location: body.features[0].place_name
			})
		}
	})
}
module.exports = geoCode;