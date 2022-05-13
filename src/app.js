const hbs = require('hbs');
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define Path for Express config
const pubDirName = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(pubDirName));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wheather app',
        name: 'yigitbyksp'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'yigitbyksp'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'yigitbyksp'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }

    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                address: data.location
            });
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'yigitbyksp',
        errorMessage: 'Help article  Not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'yigitbyksp',
        errorMessage: 'Page Not found.'
    });
})

app.listen(port, () => {
    console.log('Server is up on port '+ port);
});