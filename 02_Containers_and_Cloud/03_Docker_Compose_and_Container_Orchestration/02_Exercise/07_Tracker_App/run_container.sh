# Build the image
docker build -t tonytech/tracker_app .

# Push the image to Docker Hub
docker push tonytech/tracker_app

# Run the container
docker run -d -p 8080:80 --name tracker_app tonytech/tracker_app