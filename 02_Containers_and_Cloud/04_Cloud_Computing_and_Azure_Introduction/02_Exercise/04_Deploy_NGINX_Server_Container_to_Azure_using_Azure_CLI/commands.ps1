# Install Azure CLI (if not already installed):
winget install Microsoft.AzureCLI

# Log in to Azure CLI:
az login

# Create the container instance
az group create --name nginx --location westeurope

# Create an ACR instance
az acr create --resource-group nginx --name tonytechacrregistry --sku Basic

# Log in to ACR
az acr login --name tonytechacrregistry

# Pull the image if needed
docker pull nginxdemos/hello:latest

# Tag and Push the Image to ACR
docker tag nginxdemos/hello tonytechacrregistry.azurecr.io/nginxdemos/hello
docker push tonytechacrregistry.azurecr.io/nginxdemos/hello

# Create the container instance
# Login in Azure portal -> Home -> Container registry -> <registry name> -> Settings -> Access keys -> allow Admin user -> Use credentials to create the container instance
az container create --resource-group nginx --name nginx-container --image tonytechacrregistry.azurecr.io/nginxdemos/hello --ports 80 --ip-address Public

# Retrieve the IP address of the container instance
az container show --resource-group nginx --name nginx-container --query ipAddress.ip --output tsv