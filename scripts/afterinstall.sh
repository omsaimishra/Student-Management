#!/bin/bash
set -e

AWS_REGION="ap-south-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "Logging into ECR..."

aws ecr get-login-password --region $AWS_REGION 
| docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "Exporting variables for docker-compose..."

export AWS_REGION=$AWS_REGION
export ACCOUNT_ID=$ACCOUNT_ID

echo "Pulling latest images..."

docker compose pull
