const express = require('express');
const {
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');

const validate = require('../middlewares/validation.middleware');
const { createTaskSchema, updateTaskSchema } = require('../validations/task.validation');

const auth = require('../middlewares/auth.middleware');

const router = express.Router()

router.post('/', auth, validate(createTaskSchema), createTask).get('/', auth, getTask)
router.patch('/:id', auth, validate(updateTaskSchema), updateTask)
router.delete('/:id', auth, deleteTask)

module.exports = router
