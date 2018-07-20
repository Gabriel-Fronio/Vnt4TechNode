'use strict'

const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const consign = require('consign')

server.use('/vjobs', express.static(__dirname + '/../app/static'))
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
consign().include('./config/firebaseConfig.js').then('./app/routes').into(server)

server.get('/', async (req, res) => {
  try {
    return res.redirect('http://localhost:3000/vjobs/index.html')
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Erro no redirecionamento(?)')
  }
})

module.exports = server
