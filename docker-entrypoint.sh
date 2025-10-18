#!/bin/bash

# Docker entrypoint script
set -e

echo "Starting entrypoint script..."

# Fetch SSM parameters
echo "Fetching parameters from SSM..."
/usr/src/app/fetch-ssm-params.sh

# Execute the main command
echo "Starting application..."
exec "$@"
