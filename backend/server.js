require('dotenv').config()
const app = require('./src/app')

app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))