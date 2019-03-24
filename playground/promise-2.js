const request = require('request');
var geoCodeAddress = (addr) => {
    return new Promise((resolve, reject) => {
        const address = encodeURIComponent(addr);
        console.log(address);
        request(
            {
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
                json: true
            }, function (error, response, body) {
                if (error) {
                    reject('Unable to connect to google servers');
                } else if (body.status === 'ZERO_RESULTS') {
                    reject('Unable to find that address');
                } else if (body.status === 'OK') {
                    reject({
                        Address: body.results[0].formatted_address,
                        Longitude: body.results[0].geometry.location.lng,
                        Latitude: body.results[0].geometry.location.lat
                    });
                }
            })
    });
}


geoCodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (error) => {
    console.log(error);
});