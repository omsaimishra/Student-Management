#!/bin/bash
set -e

cd /opt/codedeploy-agent/deployment-root/*/*/deployment-archive

echo "Starting application..."
docker compose up -d

docker ps
