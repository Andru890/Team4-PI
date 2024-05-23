
docker stop $(docker ps -aq)


docker rm -f $(docker ps -aq)


docker rmi -f $(docker images -aq)


docker network prune -f
