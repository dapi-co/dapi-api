const APIGateway = require('moleculer-web')

module.exports = {
  name: 'api-unsecure',
  mixins: [APIGateway],
  settings: {
    use: [
      (req, res) => {
        if (req.method === 'GET') {
          res.statusCode = 301
          res.setHeader(
            'Location',
            'https://' + req.headers.host + req.originalUrl,
          )
          return res.end()
        } else {
          res.setHeader('Content-type', 'application/json; charset=utf-8')
          res.statusCode = 505
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
          'GET ': 'api-unsecure.Root',
          'GET /': 'api-unsecure.Root',
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
          'GET ': 'api-unsecure.Root',
          'GET /': 'api-unsecure.Root',
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
