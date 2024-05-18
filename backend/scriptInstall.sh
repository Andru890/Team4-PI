#!/bin/bash

docker network create -d bridge visual

docker build -t visual:latest . -f Dockerfile

docker-compose up -d
