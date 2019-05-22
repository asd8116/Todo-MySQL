const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const user = User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Todo.findAll({
        where: { UserId: req.user.id }
      })
    })
    .then(todos => {
      return res.render('index', { todos: todos })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
