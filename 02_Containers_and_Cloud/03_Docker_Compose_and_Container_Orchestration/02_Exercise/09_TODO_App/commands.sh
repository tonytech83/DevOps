# Create two Docker networks
docker network create react-express
docker network create express-mongo

# Create image for backend from backend folder
docker build -t tonytech/backend .

# Run backend container
docker run -d --name backend --network react-express tonytech/backend
docker network connect express-mongo backend

# Crate image for frontend from frontend folder
docker build -t tonytech/frontend .

# Run frontend container
docker run -d -p 3000:3000 --name frontend --network react-express tonytech/frontend

# Run mondo DB container
docker run -d -v ./data:/data/db --network express-mongo --name mongo mongo:latest