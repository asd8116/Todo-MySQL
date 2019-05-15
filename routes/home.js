const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
