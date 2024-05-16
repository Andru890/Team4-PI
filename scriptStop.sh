#!/bin/bash

# Detener todos los contenedores en ejecución
docker stop $(docker ps -aq)
