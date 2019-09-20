const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const parialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(parialsPath)
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Liben Hailu'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Liben Hailu',
        about: 'Hi I am a software developer.'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'You input a search query which is name of a country in the search bar then if everything is fine the website returns the required data. This site does\'t have autocomplete so make sure that you write the whole letters and you spelt it out correctly.if the website goes wrong the problem might be losing internet connection or unable to find the required location from the api or it might be the mistake of the developer.',
        name: 'Liben Hailu'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Liben Hailu',
        errorMessage: 'page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port 3000...')
})