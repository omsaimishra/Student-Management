#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "Starting application..."
docker compose up -d

docker ps
