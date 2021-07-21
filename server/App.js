const express = require('express')
const cors = require('cors')

const allRoutes = require('./Routes/Index')

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/', allRoutes)

module.exports = app
