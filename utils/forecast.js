const request = require('request')


const forecast = (lat, long, callback) => {

    console.log(lat, "lat");
    console.log(long, 'long')

    const url =
        `http://api.weatherstack.com/current?access_key=a954cf9c932764eee04829418837753d&query=${lat},${long}`
    request({ url, json: true }, (error, { body }) => {

        console.log(body.location,"loactions");

        if (error) {
            callback('Unable to connect weather service', undefined)
        } else if (body.error) {
            callback('unable to connect ', undefined)
        } else {

            callback(undefined,  body.location.name + " " + body.current.weather_descriptions + ' It is currently ' + body.current.temperature)
        }
    })
}







module.exports = forecast