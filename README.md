# API Service

This service is the entrypoint to the Dapi backend, where it handles routing to our different
services. Additionally, it adds products, ips and bearer tokens as parameters so that they can be used
smoothly by the backend services.

Along with that, API has a global error handler that formats, logs and returns if any errors get thrown
in the system.