const APIGateway = require('moleculer-web')

module.exports = {
  name: 'api',
  mixins: [APIGateway],
  settings: {
    port: process.env.PORT || 3000,
    routes: [
      {
        path: 'api/v1',
        aliases: {
          'auth(.*)': 'auth.HandleRequest',
          'clients(.*)': 'clients.HandleRequest',
          'users(.*)': 'users.HandleRequest',
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