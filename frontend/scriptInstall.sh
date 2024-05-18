#!/bin/bash

docker build -t frontend:latest . -f Dockerfile

docker-compose up -d
