const express = require('express');
const {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todo.controller');
const auth = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/', auth, createTodo)
router.post('/', auth, getTodo)
router.post('/:id', auth, updateTodo)
router.post('/:id', auth, deleteTodo)

module.exports = router;