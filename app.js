'use strict'

const express = require('express')
//const path = require('path')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')


const app = express()
const PORT = 3000


// === VIEW ENGINE ===
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('express-ejs-extend'))

//=== DATABASE ===
const config = require('./config/dbconnection')
mongoose.connect(config.database)
const db = mongoose.connection

if(db){
	console.log('you are now connected to the db')
}


//=== MIDDLEWARE ===

//BodyParser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

//Passport
app.use(session({secret:'secret'}))
app.use(passport.initialize())
app.use(passport.session())//persistent login sessions
app.use(flash())


// === ROUTES ===
const routes = require('./routes/index')
app.use('/', routes)

app.listen(PORT, () => {
	console.log('now listening on port ${PORT}')
})