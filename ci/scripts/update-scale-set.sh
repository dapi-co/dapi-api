#!/bin/bash

set -ex

az login --service-principal \
--tenant "$AZURE_TENANT" \
-u "$AZURE_USER" \
-p "$AZURE_PASS"

# az vmss list-instances -n MyVMSS -g my-rg --query "[].id" --output tsv | \
# az vmss run-command invoke --command-id "RunShellScript" \
# --scripts "ls" \
# --ids 