#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "Stopping existing containers..."
docker compose down || true
