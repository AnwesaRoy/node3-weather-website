const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //to point express to our custom views directory named templates
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/* app.get('', (req, res) => {
    res.send("<h1>Weather</h1>");
}); 

app.get('/help', (req, res) => {
    res.send([{
        name: "Andrew",
        age: 27
    },
    {
        name: "Sarah",
        age: 29
    }]);
});

app.get('/about', (req, res) => {
    res.send("<h1>About</h1>");
}); */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anwesa Roy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anwesa Roy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Anwesa Roy'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address    
            });
        })
    })    
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found.');
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Anwesa Roy'
    })
})

app.get('*', (req, res) => {
    // res.send(My 404 page);
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Anwesa Roy'
    })
    
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});