'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//import models
let User = require('../models/user')

//=== LOGIN ===
router.get('/login', (req, res) => {
	res.render('index')
})
router.post('/login', (req, res) => {
	
	let username = req.body.username,
		password = req.body.password
})

//=== REGISTER ===
router.get('/register', (req, res) => {
	res.render('register')



})
router.post('/register', (req, res) => {

	let username = req.body.username,
	password = req.body.password,
	confirm = req.body.confirm
		

	//verify username isn't in DB

	let newUser = new User({'username': username})
	//if username is unique, save to db
	bcrypt.hash(password, 10, function(err, hash) {
   	newUser.password = hash
   	newUser.save()
   	console.log('user saved! congrats EARL!')
});



	
})




module.exports = router