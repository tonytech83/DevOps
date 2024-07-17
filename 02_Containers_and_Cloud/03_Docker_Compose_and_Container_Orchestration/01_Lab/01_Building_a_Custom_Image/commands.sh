# Build custom image
docker image build -t my-webapp .

# List all images
docker images

# Login to Docker Hub
docker login

# Tag the image
docker tag my-webapp tonytech83/my-webapp

# Publish the image to Docker Hub
docker push tonytech83/my-webapp