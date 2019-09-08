const APIGateway = require('moleculer-web')
const fs = require('fs')

module.exports = {
  name: 'api-unsecure',
  mixins: [APIGateway],
  settings: {
    port: process.env.HTTP_PORT || 80,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    routes: [
      {
        path: '*',
        onBeforeCall(ctx, route, req, res) {
          if (req.method === 'GET') {
            res.writeHead(302, {
              Location: 'https://' + req.headers.host + req.originalUrl,
            })
            return res.end()
          } else {
            res.writeHead(505)
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
}
