const request = require('request');

const forecast = (longitude, latitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=06e699c1032d5f608dff8cee0e634228&query=' + latitude + ',' + longitude + '&units=m';

	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect weather services!', undefined);
		} else if (body.error) {
			callback('Unable to find weather. Try another search.', undefined);
		} else {
			callback(undefined, {
				wheather: body.current.weather_descriptions[0]
			})
		}
	})
}
module.exports = forecast;