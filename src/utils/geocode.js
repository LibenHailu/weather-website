const request = require('request')
const geocode = (address, callback) => {
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGliZW4iLCJhIjoiY2swb3Vpd2c4MGRnZDNobzAzcTdnYThubSJ9.Xx3IieQWy2Fdf54tK06I6g'
    request({ url: geocodeurl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the internet...', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location...', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode