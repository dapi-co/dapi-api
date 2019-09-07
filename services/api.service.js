const APIGateway = require('moleculer-web')
const fs = require('fs')

const https =
  process.env.NODE_ENV === 'production'
    ? {
      key: fs.readFileSync('/etc/letsencrypt/live/dapi.co/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/dapi.co/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/dapi.co/chain.pem')
    }
    : {}

module.exports = {
  name: 'api',
  mixins: [APIGateway],
  settings: {
    onError(req, res, err) {
      res.setHeader('Content-type', 'application/json; charset=utf-8')

      if (typeof (err.message) === 'string') {
        res.writeHead(err.code || 500)
        res.end(JSON.stringify({ msg: err.message, ...err.data }, null, 2))
      } else {
        res.writeHead(err.message.code || 500)
        delete err.message.code
        res.end(JSON.stringify(err.message, null, 2))
      }
    },
    https: https,
    port: process.env.PORT || 443,
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    routes: [
      {
        path: '/v1',
        aliases: {
          'auth(.*)': 'auth.HandleRequest',
          'clients(.*)': 'clients.HandleRequest',
          'jobs/GetJobStatus': 'clients.HandleRequest',
          'users(.*)': 'users.HandleRequest',
          'data/(.*)': 'users.HandleDataRequest',
          'payment/(.*)': 'users.HandlePaymentRequest'
        },
        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false }
        },
        authorization: true
      },
      {
        path: '',
        aliases: {
          '': 'api.Root',
          '/': 'api.Root'
        },
        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false }
        },
        authorization: true
      }
    ]
  },

  actions: {
    Root: {
      handler() {
        return {
          name: 'Dapi Sandbox',
          apiVersion: 'v1'
        }
      }
    }
  },

  methods: {
    async authorize(ctx, route, req, res) {
      let token = req.headers['authorization']
      if (token && token.startsWith('Bearer')) token = token.slice(7)

      req.$params.jwt = token
      req.$params.remoteAddress = req.connection.remoteAddress
      req.$params.endpoint = req.parsedUrl.split('/')[3]
      return Promise.resolve('Authorized')
    }
  }
}
