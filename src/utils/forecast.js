const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/02cb9e2eb8037a8b8bc4e0b1c90c599e/' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to the weather service...', undefined)
        } else if (body.error) {
            callback('Unable to find location...', undefined)
        } else {
            callback(
                undefined,
                // ' It is currently #' + body.currently.temperature + '# degrees out. There is a #' + body.currently.precipProbability + '# % chance of rain. #' + body.daily.data[0].summary
                body.currently.temperature + '#' + body.currently.precipProbability + '#' + body.daily.data[0].summary

            )
        }
    })


}
module.exports = forecast