#!/bin/bash

git pull

docker start $(docker ps -aq)

