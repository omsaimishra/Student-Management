#!/bin/bash
set -e

echo "Starting application using docker-compose..."

docker compose up -d

docker ps
