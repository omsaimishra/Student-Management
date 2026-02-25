#!/bin/bash
set -e

cd /opt/codedeploy-agent/deployment-root/*/*/deployment-archive

echo "Stopping existing containers..."
docker compose down || true
