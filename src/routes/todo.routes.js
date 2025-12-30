const express = require('express');
const {
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');

const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, createTask);
router.get('/', auth, getTask);
router.patch('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
