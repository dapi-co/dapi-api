const os = require('os')
module.exports = {
  nodeID: 'api-' + os.hostname().toLowerCase() + '-' + process.pid,
  transporter: {
    type: 'NATS',
  },
}
