const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/route')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')



const port = process.env.PORT || 3000




// Database Connection

const url = process.env.MONGODB_URI || 'mongodb://localhost/crud';
mongoose.connect(url , {useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true, useFindAndModify : true});
const connection = mongoose.connection;
connection.once('open' , () => {
    console.log('Datebase Connected');
}).catch( err => {
    console.log('Connected Failed');
});


app.use(bodyParser.urlencoded({extended : false}))

app.use(methodOverride('_method'))



// Setting Template Engine

app.set('view engine' , 'ejs')
app.set('views' , __dirname + '/views')
app.set('layout' , 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


// Using Router

app.use('/' , indexRouter)

app.listen(port , () =>{
    console.log(`Server is running on ${port}`)
})