const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weatherInfo = require('./weather/weather.js');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (error, results) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Address is ${results.Address}`);
        weatherInfo.getWeatherInfo(results.Latitude, results.Longitude, (error, temp) => {
            if (error) {
                console.log(error);
            }
            console.log(`Its currently ${temp.temprature}. But it feels like it's ${temp.apparentTemperature}`);
        });
    }
});


