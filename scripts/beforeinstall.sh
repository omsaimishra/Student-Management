#!/bin/bash
set -e

echo "Stopping existing containers..."

docker compose down || true
