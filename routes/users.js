const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login
router.post('/login', (req, res) => {
  res.send('login')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register
router.post('/register', (req, res) => {
  res.send('register')
})

// logout
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
