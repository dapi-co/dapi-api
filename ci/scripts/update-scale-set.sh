#!/bin/bash

set -ex

az login --service-principal \
--tenant "$AZURE_TENANT" \
-u "$AZURE_USER" \
-p "$AZURE_PASS"

az vmss list-instances -n "$AZURE_SS_NAME" -g $AZURE_RG --query "[].id" --output tsv | \
az vmss run-command invoke --command-id "RunShellScript" \
--scripts "sudo docker service update -d --image $CR_DOMAIN/$SERVICE" \
--ids @-