const os = require('os')
module.exports = {
  nodeID: 'api-' + os.hostname().toLowerCase() + '-' + process.pid,
  logger: {
    type: "Pino",
    options: {
      level: "info"
    }
  },
  transporter: {
    type: 'NATS'
  },
  metrics: {
    enabled: true,
    reporter: [
      {
        type: "Prometheus",
        options: {
          port: 3030,
          path: "/metrics",
          defaultLabels: registry => ({
            namespace: registry.broker.namespace,
            nodeID: registry.broker.nodeID
          }),
          includes: ["moleculer.**"],
          excludes: ["moleculer.transit.**"]
        }
      }
    ]
  }
}
