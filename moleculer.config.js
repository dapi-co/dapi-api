const os = require('os')
module.exports = {
  nodeID: 'api-' + os.hostname().toLowerCase() + '-' + process.pid,
  logger: true,
  logLevel: 'info',
  transporter: {
    type: 'NATS',
    options: {
      urls: ['nats://10.0.0.4:4222', 'nats://10.0.0.5:4222'],
      user: 'nats',
      pass: 'LXl&3rb@4s#e1JAb1uA6fTFX#zJK@eF$',
    },
  },
  cacher: {
    type: 'Redis',
    options: {
      prefix: 'MOL-API',
      monitor: true,
      redis: {
        host: 'dapi.redis.cache.windows.net',
        port: 6380,
        password: 'NZr7JZ8nmK1FaYfXQnmgnv+nVyxsRSZaStRDtQ1pHRY=',
      },
    }, 
  },
  metrics: true,
}
