const APIGateway = require('moleculer-web')
const jwt = require('jsonwebtoken')

module.exports = {
  name: 'api-secure',
  mixins: [APIGateway],
  settings: {
    onError(req, res, err) {

      if (!res.headersSent)
        res.setHeader('Content-type', 'application/json; charset=utf-8')

      res.statusCode = err.code || 500
      res.end(JSON.stringify({
        success: false,
        msg: err.message,
        type: err.type || undefined,
        ...(err.data ? err.data.external : null)
      }))
    },

    port: process.env.HTTPS_PORT || 443,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    routes: [
      {
        mappingPolicy: 'restrict',
        path: '/v1',
        aliases: {
          'GET ': 'api-secure.Root',
          'GET /': 'api-secure.Root',
          'GET config/GetAllBanks': 'config.GetAllBanks',
          'POST auth/InitializeConnect': 'auth.HandleRequest',
          'POST auth/UserLogin': 'auth.HandleRequest',
          'POST auth/ExchangeToken': 'auth.HandleRequest',
          'POST auth/ClientLogin': 'auth.HandleRequest',
          'POST auth/Test': 'auth.Test',
          'POST clients/(.*)': 'clients.HandleRequest',
          'POST status': 'jobs.GetJobStatus',
          'POST users/(.*)': 'users.HandleRequest',
          'POST data/(.*)': 'users.HandleProductRequest',
          'POST payment/(.*)': 'users.HandleProductRequest',
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
          name: 'dapi Sandbox',
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
      req.$params.remoteAddress =
        req.headers['x-real-ip'] || req.connection.remoteAddress

      const split = req.parsedUrl.split('/')
      req.$params.product = split[2]
      req.$params.endpoint = split[3]

      this.logger.info({
        appKey: req.$params.appKey || (token ? jwt.decode(token).appKey : null),
        product: req.$params.product,
        subproduct: req.$params.endpoint
      })

      return Promise.resolve()
    },
  },
}
