'use strict'

const server = require('./config/server')
const port = 3001

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
