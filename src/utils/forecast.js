const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e3e0941d5eb53a95251729b0c2e19ba4&query=${latitude},${longitude}`; //&units=f

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if(body.error) {
            callback('Unable to find location!', undefined);
        }
        else {
            const {weather_descriptions, temperature, feelslike, humidity, precip} = body.current;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees. Humidity is ${humidity}%. Precipitation is ${precip}%.`);
        }    
    })
}

module.exports = forecast;