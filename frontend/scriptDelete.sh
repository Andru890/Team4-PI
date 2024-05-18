#!/bin/bash

# Detener todos los contenedores en ejecución
docker stop $(docker ps -aq)

# Eliminar todos los contenedores detenidos
docker rm -f $(docker ps -aq)

# Eliminar todas las imágenes
docker rmi -f $(docker images -aq)

# Eliminar todas las redes
docker network prune -f
