
docker stop $(docker ps -aq)


docker rm -f $(docker ps -aq)


docker rmi -f $(docker image -aq)


docker network prune -f
