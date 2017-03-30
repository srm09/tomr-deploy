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

## Add/remove nodes
Once the whole setup is up and running, run the command
```
docker-compose scale data-node=4
```
This starts a new data-node in the background. It gets displayed on the UI as INITIALIZED. From the UI, Add the node to the ring and see the magic happen.
Similarly, an exisitng node can be removed from the ring using the UI. The status of this node changes from READY ack to INITIALIZED.

## Known bugs
- After removing a node, the UI does not update key list from the removed node. 

## Features
- GET requests for keys from the UI

## Points to remember
Currently the services, data-node and load-balancer are being pulled as set
images from Docker Hub. This can be modified later to support hot deployments.
