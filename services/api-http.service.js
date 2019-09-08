const APIGateway = require('moleculer-web')
const fs = require('fs')

module.exports = {
  name: 'api-unsecure',
  mixins: [APIGateway],
  settings: {
    onError(req, res, err) {
      if (typeof err.message === 'string') {
        if (!err.data && err.code === 404) {
          err.message = 'Endpoint not found'
          err.data = { success: false }
        }
        if (!res.headersSent)
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
        onBeforeCall(ctx, route, req, res) {
          if (req.method === 'GET') {
            res.writeHead(302, {
              Location: 'https://' + req.headers.host + req.originalUrl,
            })
          } else {
            res.writeHead(505, {
              'Content-type': 'application/json; charset=utf-8',
            })
            return res.end(
              JSON.stringify(
                {
                  msg: 'Please use HTTPS when talking to dapi.co',
                  success: false,
                },
                null,
                2,
              ),
            )
          }
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
        onBeforeCall(ctx, route, req, res) {
          if (req.method === 'GET') {
            res.writeHead(302, {
              Location: 'https://' + req.headers.host + req.originalUrl,
            })
          } else {
            res.writeHead(505, {
              'Content-type': 'application/json; charset=utf-8',
            })
            return res.end(
              JSON.stringify(
                {
                  msg: 'Please use HTTPS when talking to dapi.co',
                  success: false,
                },
                null,
                2,
              ),
            )
          }
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
        return {
          name: 'Dapi Sandbox',
          apiVersion: 'v1',
        }
      },
    },
  },
}
