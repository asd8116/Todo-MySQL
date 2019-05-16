const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Todo.findAll({ include: [User] })
    .sort({ name: 'asc' })
    .then((err, todos) => {
      if (err) return console.error(err)
      return res.render('index', {
        todos: todos
      })
    })
})

module.exports = router
