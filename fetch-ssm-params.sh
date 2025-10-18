#!/bin/bash

# Fetch env vars from AWS SSM Parameter Store
set -e

SSM_PATH="${SSM_PARAMETER_PATH:-/dev/ecs-web}"
AWS_REGION="${AWS_REGION:-us-east-1}"
ENV_FILE=".env"

echo "Fetching parameters from SSM path: ${SSM_PATH}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "Error: AWS CLI is not installed"
    exit 1
fi

# Fetch parameters from SSM
parameters=$(aws ssm get-parameters-by-path \
    --path "${SSM_PATH}" \
    --with-decryption \
    --recursive \
    --region "${AWS_REGION}" \
    --query 'Parameters[*].[Name,Value]' \
    --output text)

if [ -z "$parameters" ]; then
    echo "Warning: No parameters found at path ${SSM_PATH}"
    exit 0
fi

# Clear or create .env file
> "${ENV_FILE}"

# Parse and write to .env file
while IFS=$'\t' read -r name value; do
    # Extract variable name from SSM path
    var_name=$(echo "$name" | sed "s|^${SSM_PATH}/||" | sed 's|/|_|g')
    echo "${var_name}=${value}" >> "${ENV_FILE}"
    echo "Added: ${var_name}"
done <<< "$parameters"

echo "Environment variables written to ${ENV_FILE}"
