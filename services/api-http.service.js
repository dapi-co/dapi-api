const APIGateway = require('moleculer-web')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

module.exports = {
  name: 'api-unsecure',
  mixins: [APIGateway],
  settings: {
    use: [
      redirectToHTTPS()
    ],
    onError(req, res, err) {
      if (typeof err.message === 'string') {
        if (!err.data && err.code === 404) {
          err.message = 'Endpoint not found'
          err.data = { success: false }
        }
        res.setHeader('Content-type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ msg: err.message, ...err.data }, null, 2))
      }
    },
    port: process.env.HTTP_PORT || 80,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    routes: [
      {
        path: '/',
        whitelist: ['**'],
        aliases: {
          '': 'api-unsecure.Root',
          '/': 'api-unsecure.Root',
        },
        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false },
        },
      },
      {
        path: '/v1',
        whitelist: ['**'],
        aliases: {
          '': 'api-unsecure.Root',
          '/': 'api-unsecure.Root',
        },

        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false },
        },
      },
    ],
  },
  actions: {
    Root: {
      handler() {
        Promise.resolve({
          name: 'Dapi Sandbox',
          apiVersion: 'v1',
        })
      },
    },
  },
}