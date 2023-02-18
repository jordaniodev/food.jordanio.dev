const server = require('./db.js')
const express = require('express')
const app = express()

app.use(express.json())
app.use(server)

module.exports.handler = serverless(app)