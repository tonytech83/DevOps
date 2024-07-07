# Build images
docker compose build

# Run the containers
docker compose up

# Remove everything together – the containers, images, volumes, etc. (without the network)
docker compose down --rmi all --volumes