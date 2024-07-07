# Build a custom image
docker build . -f .\TaskBoard.WebApp\Dockerfile -t tonytech/taskboard_app

# List images
docker images

# Loign Docker Hub
docker login

# Push the image to Dcoker Hub
docker push tonytech/taskboard_app

