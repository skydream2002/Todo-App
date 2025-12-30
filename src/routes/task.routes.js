const express = require('express');
const {
    crearteTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');

const auth = require('../middlewares/auth.middleware');
const router = require('./todo.routes');

router = express.Router()

router.post('/', auth, crearteTask).get('/', auth, getTask)
router.patch('/:id', auth, updateTask)
router.delete('/:id', auth, crearteTask)

module.exports = router
