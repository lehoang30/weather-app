const path = require('path')
const express = require('express')
const hbs = require('hbs');
const { request } = require('http');
const geoCode = require('./ultis/geoCode.js')
const forecast = require('./ultis/foreCast.js')

// console.log(__dirname) 
// console.log(path.join(__dirname, '../public')) 
const rootDir = __dirname;

// define path for express config
const publicPath = path.join(__dirname, '../public')
const viewPath =path.join(__dirname, '../templates/views')
const partialPath =path.join(__dirname, '../templates/partials')


// set up handlebar engine and views location
const app = express()
const port = process.env.PORT || 3000




app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
// use partial to print the same thing on web


// set up static dir to use
app.use(express.static(publicPath))



app.get('',  (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Hoang'
    })
})


app.get('/about',  (req,res) =>{
    res.render('about', {
        title: 'About',
        name: 'Hoang'
    })
})

app.get('/help',  (req,res) =>{
    res.render('help', {
        name: 'Hoang',
        title: 'Help'
    })
})




// //app.com/help
// app.get('/help', (req, res) =>{
//     res.send('<h1>  This is help page</h1>')
//     // res.send({
//     //     name: 'hoang',
//     //     age: 22
//     // })
// })  

// //app.com/about
// app.get('/about', (req, res) =>{
//     res.send('<h1> This is about page </h1>')
// })  

//app.com/weather


// app.get('/weather', (req, res) =>{
    
//     res.send({
//         location: 'Ha Noi',
//         temp: 20,
//         forecast: 'Yeu mua, thich em rain'     
//     })
// })  


app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return   res.send({
               error: "No location was provided"
           })
   } 

geoCode(req.query.address, (error, {latitude, longtitude} = {})  => {

    if (error) {
        return   res.send({
            error: "Error! Can't find location"
        })
    } 

    forecast(latitude, longtitude, (error, forecastdata) => {
        if (error) {
            return   res.send({
                error: "Error"
            })
        }
       
    res.send({
        Search: req.query.address,
        latitude: latitude,
        longtitude: longtitude,
        forecast: forecastdata     
    })
})
  })  
})  



app.get('/products', (req, res) =>{
    if (!req.query.search) {
         return   res.send({
                error: "No found"
            })
    } 
    console.log(req.query)
    res.send({
        products: []
    }) 


})



// match with url /help/**

// var value
// app.get(value, (req, res) =>{
//         if (value === '/help/*') {
//             res.render('help404')
//         } else {
//             res.render('404shit')
//         }
//     }
// )

app.get('/help/*', (req, res) =>{
    res.render('help404', {
        name: 'Hoang'

    })
})  

app.get('*', (req, res) =>{
    res.render('404shit', {
        name: 'Hoang'

    })
})  



// * match everything, that's why it's need to stay at last 




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
