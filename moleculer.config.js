const os = require('os')
module.exports = {
  nodeID: 'api-' + os.hostname().toLowerCase() + '-' + process.pid,
  logger: true,
  logLevel: 'info',
  transporter: {
    type: 'NATS',
    options: {
      urls: ['11.0.0.4', '11.0.0.5'],
      user: 'nats',
      pass: 'JRrx8P8l0FCh',
    },
  },
  cacher: {
    type: 'Redis',
    prefix: 'MOL-API',
    monitor: true,
    redis: {
      host: 'dapi.redis.cache.windows.net',
      port: 6380,
      password: 'dDc7Rn8NInIeaKs5xwocPOwZzr4O9EvVoTVI1akKE+A=',
    },
  },
  metrics: true,
}
