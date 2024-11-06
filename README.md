######## USE DOCKER SWARM
cmd `docker swarm init`
cmd `docker stack deploy -c docker-compose.yaml <stack name>` example `docker stack deploy -c docker-compose.yaml gabz_stack`
to update the number of replicas
`docker service update --replicas <number_of_replicas> <stack name>_<docker service name in docker compose>` example  `docker service update --replicas 3 gabz_stack_product`
use this to scale the replicas
`docker service scale <stack name>_<docker service name in docker compose>=<number_of_replicas>` 
example `docker service scale gabz_stack_product=4`