const debug = require('debug')('dhwani:server')
const express = require('express')
const { WebSocketServer } = require('ws')

function createApp () {
  const app = express()

  app.get('/', async (req, res) => {
    res.send('Hello World')
  })
  return app
}

function createWebSocketServer (server, path) {
  const wss = new WebSocketServer({
    noServer: true
  })

  server.on('upgrade', (req, sock, head) => {
    const pathname = req.url
    if (pathname.startsWith(path)) {
      wss.handleUpgrade(req, sock, head, ws => {
        wss.emit('connection', ws, req)
      })
    }
  })
  return wss
}

function listen (server, port) {
  server.listen(port, '0.0.0.0', () => {
    debug(`Server listening on port: ${port}`)
  })
}

module.exports = {
  createApp,
  createWebSocketServer,
  listen
}
