const request = require('request');

class Geocode {
    geocodeAddress(addr, callback) {
        const address = encodeURIComponent(addr);
        console.log(address);
        request(
            {
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
                json: true
            }, function (error, response, body) {
                if (error) {
                    callback('Unable to connect to google servers');
                } else if (body.status === 'ZERO_RESULTS') {
                    console.log('Unable to find that address');
                } else if (body.status === 'OK') {
                    callback(undefined, {
                        Address: body.results[0].formatted_address,
                        Longitude: body.results[0].geometry.location.lng,
                        Latitude: body.results[0].geometry.location.lat
                    });
                }
            })
    }
};

module.exports = new Geocode();