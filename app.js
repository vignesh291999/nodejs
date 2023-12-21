
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const path = require('path')

const app = express();




const public = path.join(__dirname, '/public');

const viewpath = path.join(__dirname, '/templates/views');
const partialpath = path.join(__dirname, '/templates/partials');
hbs.registerPartials(partialpath);


console.log(partialpath);

app.use(express.static(public))
app.set('view engine', 'hbs')
app.set('views', viewpath)


app.get('', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    res.render('help', {
        helper: 'text as a props'
    })
})


// 
app.get('/weather', (req, res) => {

    const { address } = req.query;
    if (!address) {
        res.send("no data found")
    }

    else {
        geoCode(address, (error, { lattitude, longitude, placename } = {}) => {
            if (error) {
                res.send(error)
            }
            if (placename) {
                forecast(lattitude, longitude, (error, body) => {

                    res.send({
                        forecast: body,
                        location: placename,
                        address: address
                    })
                })
            }
        });
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'No help page founf'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'No page Found'
    })
})

app.listen(3000, () => {
    console.log("app is listening 3000")
})
