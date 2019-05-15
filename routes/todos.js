const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo

// new todo page
router.get('/new', (req, res) => {
  res.render('new')
})

// new todo
router.post('/', (req, res) => {
  res.send('建立 Todo')
})

// detail todo
router.get('/:id', (req, res) => {
  res.render('detail')
})

// edit todo page
router.get('/:id/edit', (req, res) => {
  res.render('edit')
})

// edit todo
router.put('/:id', (req, res) => {
  res.send('修改 Todo')
})

// delete todo
router.delete('/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

module.exports = router
