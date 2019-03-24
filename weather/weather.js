const request = require('request');

getWeatherInfo = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/5fae39290d12ba99f328252a593c9c5c/${lat},${long}`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(undefined, { temprature: body.currently.temperature, apparentTemperature: body.currently.apparentTemperature });
        } else {
            callback('Unable to fetch weather information');
        }
    });
}

module.exports = { getWeatherInfo }

