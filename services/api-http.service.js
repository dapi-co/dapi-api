const APIGateway = require('moleculer-web')
const fs = require('fs')

module.exports = {
  name: 'api-unsecure',
  mixins: [APIGateway],
  settings: {
    onError(req, res, err) {
      res.setHeader('Content-type', 'application/json; charset=utf-8')

      if (typeof (err.message) === 'string') {
        res.writeHead(err.code || 500)

        //Handle route not found
        if (!err.data && err.code === 404) {
          err.message = 'Endpoint not found'
          err.data = { success: false }
        }

        res.end(JSON.stringify({ msg: err.message, ...err.data }, null, 2))
      } else {
        res.writeHead(err.message.code || 500)
        delete err.message.code
        res.end(JSON.stringify(err.message, null, 2))
      }
    },
    port: process.env.PORT || 80,
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    routes: [
      {
        path: '/v1',
        onBeforeCall(ctx, route, req, res){
          console.log('test')
          console.log(ctx, route, req, res)
        },
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