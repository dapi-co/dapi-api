const APIGateway = require('moleculer-web')
const { UnAuthorizedError, ERR_INVALID_TOKEN } = require('moleculer-web').Errors
module.exports = {
  name: 'api',
  mixins: [APIGateway],
  settings: {
    port: process.env.PORT || 3000,
    routes: [
      {
        path: '/v1',
        authentication: true,
        aliases: {},
        // mappingPolicy: 'restrict',
        bodyParsers: {
          json: { strict: false },
          urlencoded: { extended: false },
        },
      },
    ],
  },
  methods: {
    authenticate(ctx, route, req, res) {
      console.log('Authenticating...')
      // const auth = await this.broker.call('auth.init', ctx, route, req, res) //example
      //   if(auth)
      //     return Promise.resolve()
      //   else
      return Promise.reject(new UnAuthorizedError(ERR_INVALID_TOKEN))
    },
  },
}
