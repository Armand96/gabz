######## USE DOCKER SWARM
cmd `docker swarm init`
cmd `docker stack deploy -c docker-compose.yaml <stack name>` 
example `docker stack deploy -c docker-compose.yaml gabz_stack`
to update the number of replicas
`docker service update --replicas <number_of_replicas> <stack name>_<docker service name in docker compose>` 
example  `docker service update --replicas 3 gabz_stack_product`
use this to scale the replicas
`docker service scale <stack name>_<docker service name in docker compose>=<number_of_replicas>` 
example `docker service scale gabz_stack_product=4`
to check if docker service is running `docker service ls`
to get more detail about service `docker service ps gabz_stack_product`

------ kubernetes
to start kubernetes run this command first
`kubectl apply -f k8s/namespace.yaml`
then
`kubectl apply -f k8s/`

the `-n` in here is the namespace, described in the namespace.yaml

to check if the pods running
`kubectl get pods -n gabz`

to check if the service running
`kubectl get svc -n gabz`

to scale the service
`kubectl scale deployment product-service --replicas=5 -n gabz`

to apply the changes run the same command as to run the kubernetes config
`kubectl apply -f k8s/mysql-deployment.yaml`

to delete the pods
`kubectl delete pods --all -n gabz`

to delete the services
`kubectl delete svc --all -n gabz`

to delete from the higher service 
`kubectl delete deployment api-gateway -n gabz`
`kubectl delete deployment product -n gabz`
`kubectl delete deployment mysql -n gabz`