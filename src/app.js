const express = require('express')
const authRoutes = require('./routes/auth.routes')
const todoRoutes = require('./routes/todo.routes')
const taskRoutes = require('./routes/task.routes')
const cors = require('cors');

const app = express()
app.use(cors());

app.use(express.json())
app.use(express.urlencoded())

app.use('/api', authRoutes)
app.use('/api/todo', todoRoutes)
app.use('/api/task', taskRoutes)

module.exports = app