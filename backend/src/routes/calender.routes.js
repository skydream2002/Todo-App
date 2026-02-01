const express = require('express');
const { getCalender } = require('../controllers/calender.controller');

const auth = require('../middlewares/auth.middleware');

const router = express.Router()

router.get('/', auth, getCalender)


module.exports = router
