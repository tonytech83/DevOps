## Step 1: Create a Container Image for Deployment

# Build the image
docker build trackerapp .

# Check local images
docker images

# Run container locally (test run)
docker run -d --name trackerapp -p 80:80 trackerapp

## Step 2: Create an Azure Container Registry and Push a Container Image

# Login to Azure
az login

# Create a new resource group
az group create --name trackerapprg --location westeurope

# Create an Azure container registry 
az acr create --resource-groupe trackerapprg --name trackerappcrap --sku Basic

# Log in to the container registry
az acr login --name trackerappcrap

# Get the full login server name for your Azure container registry
az acr show --name trackerappcrap --query loginServer --output table

# Tag the container image
docker tag trackerapp trackerappcrap.azurecr.io/tracker-app-image:v1

# Check local images (new image should appear)
docker images 

# Push image to Azure Container Registry
docker push trackerappcrap.azurecr.io/tracker-app-image:v1

# Check the list of images in ACR
az acr repository list --name trackerappcrap

## Step 3: Deploy a Container Application

# Create an enviroment vairable for ACR
$ACR_NAME='trackerappcrap'
# Create an enviroment variable for SERVICE PRINCIPAL (Unique user who will work with this registry)
$SERVICE_PRINCIPAL_NAME='trackerappapcp'

# Obtain the full registry ID
$ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)

# Create and configure the service principal with pull permissions to your registry
$PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpull --query "password" --output tsv)

$USER_NAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)

# Deploy Container
az container create --resource-group trackerapprg --name trackerapp --image trackerappcrap.azurecr.io/tracker-app-image:v1 --cpu 1 --memory 1 --registry-login-server trackerappcrap.azurecr.io --registry-username ${USER_NAME} --registry-password ${PASSWORD} --ip-address Public --dns-name-label trackerappdns --ports 80

# View the container state of deployment
az container show --resource-group trackerapprg --name trackerapp --query instanceView.state

# Display the container's fully qualified domain name (FQDN)
az container show --resource-group trackerapprg --name trackerapp --query ipAddress.fqdn