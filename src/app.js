const express = require('express')
const authRoutes = require('./routes/auth.routes')
const todoRoutes = require('./routes/todo.routes')
const cors = require('cors');

const app = express()
app.use(cors());

app.use(express.json())
app.use(express.urlencoded())

app.use('/api', authRoutes)
app.use('/api/todo', todoRoutes)


module.exports = app