# tomr-deploy
Container based deployment for TomR

## Start the containers
By default, docker-compose starts a single instance of data-node but we need
multiple instances of data-node containers, hence use the command
```
docker-compose scale data-node=3
```

Stop the scaled/started containers using the command
```
docker-compose down
```

Restart the deployment, using the following command
```
docker-compose up --build
```

Once this command is successfully executed, docker-compose will automatically
spawn 3 data-node service containers unless specified otherwise.

## Points to remember
Currently the services, data-node and load-balancer are being pulled as set
images from Docker Hub. This can be modified later to support hot deployments.
