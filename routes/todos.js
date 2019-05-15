const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const { authenticated } = require('../config/auth')

// new todo page
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// new todo
router.post('/', authenticated, (req, res) => {
  const todo = Todo({
    name: req.body.name,
    userId: req.user._id
  })

  todo.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// detail todo
router.get('/:id', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.error(err)
    return res.render('detail', {
      todo: todo
    })
  })
})

// edit todo page
router.get('/:id/edit', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.error(err)
    return res.render('edit', {
      todo: todo
    })
  })
})

// edit todo
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name

    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }

    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})

// delete todo
router.delete('/:id/delete', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
