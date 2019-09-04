const APIGateway = require('moleculer-web')
const fs = require('fs')

const https = process.env.NODE_ENV === 'production' ? {
  key: fs.readFileSync('/etc/letsencrypt/live/sandbox.dapi.co/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/sandbox.dapi.co/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/sandbox.dapi.co/chain.pem')
} : {}

module.exports = {
  name: 'api',
  mixins: [APIGateway],
  settings: {
    https: https,
    port: process.env.PORT || 443,
    cors: true,
    routes: [
      {
        path: '/v1',
        aliases: {
          'auth(.*)': 'auth.HandleRequest',
          'clients(.*)': 'clients.HandleRequest',
          'users(.*)': 'users.HandleRequest',
          'data/(.*)': 'users.HandleDataRequest',
          'payment/(.*)': 'users.HandlePaymentRequest',
        },
        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false },
        },
        authorization: true,
      },
    ],
  },

  methods: {
    async authorize(ctx, route, req, res) {
      let token = req.headers["authorization"];
      if (token && token.startsWith("Bearer"))
        token = token.slice(7);

      //Add endpoint and bearer token to params
      req.$params.endpoint = req.$params['0'];
      req.$params.jwt = token;
      delete req.$params['0'];
      return Promise.resolve('Authorized');
    }
  }
}
