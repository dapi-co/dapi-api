const APIGateway = require('moleculer-web')
const fs = require('fs')

const https = process.env.NODE_ENV === 'production' ? {} : {}

module.exports = {
  name: 'api-secure',
  mixins: [APIGateway],
  settings: {
    onError(req, res, err) {
      if (!res.headersSent)
        res.setHeader('Content-type', 'application/json; charset=utf-8')

      //Moleculer errors
      if (typeof (err.message) === 'string') {
        res.statusCode = err.code || 500

        switch (err.code) {
          case 404:
            if (!err.data) {
              err.message = 'Endpoint not found'
              err.data = { success: false }
            }
            break;

          case 422:
            err.data = {
              success: false,
              field: err.data[0].field,
              err: err.data[0].message
            }
            break;
        }
        res.end(JSON.stringify({ msg: err.message, ...err.data }, null, 2))
        //Promise.reject
      } else {
        res.statusCode = err.message.code || 500
        delete err.message.code
        res.end(JSON.stringify(err.message, null, 2))
      }
    },
    https: https,
    port: process.env.HTTPS_PORT || 443,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    routes: [
      {
        path: '/v1',
        aliases: {
          'GET ': 'api-secure.Root',
          'GET /': 'api-secure.Root',
          'GET config/GetAllBanks': 'config.GetAllBanks',
          'POST auth(.*)': 'auth.HandleRequest',
          'POST clients(.*)': 'clients.HandleRequest',
          'POST jobs/GetJobStatus': 'clients.HandleRequest',
          'POST users(.*)': 'users.HandleRequest',
          'POST data/(.*)': 'users.HandleDataRequest',
          'POST payment/(.*)': 'users.HandlePaymentRequest',
        },
        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false },
        },
        authorization: true,
      },
      {
        path: '',
        aliases: {
          'GET ': 'api-secure.Root',
          'GET /': 'api-secure.Root',
        },
        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false },
        },
        authorization: true,
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

  methods: {
    async authorize(ctx, route, req, res) {
      let token = req.headers['authorization']
      if (token && token.startsWith('Bearer')) token = token.slice(7)

      req.$params.jwt = token
      req.$params.remoteAddress = req.headers['x-real-ip'] || req.connection.remoteAddress
      req.$params.endpoint = req.parsedUrl.split('/')[3]
      return Promise.resolve('Authorized')
    },
  },
}
