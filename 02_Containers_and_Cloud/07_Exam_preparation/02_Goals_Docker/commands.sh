### Backend ###

# Build Backend container (should be executed in backend foleder)
docker build -t tonytech/goals-backend .

# Push the container to DockerHub
docker push tonytech/goals-backend


### Frontend ###

# Build Frontend container (should be executed in backend foleder)
docker build -t tonytech/goals-frontend .

# Push the container to DockerHub
docker push tonytech/goals-frontend


### Run the docker-compose.yml ###
docker compose build
docker compose up -d