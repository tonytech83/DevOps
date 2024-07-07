# Create docker network
docker network create taskboard_network

# Create a MS SQL server container
docker run ` 
  -e "ACCEPT_EULA=Y" `
  -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" `
  -p 1433:1433 `
  -v sqldata:/var/opt/mssql `
  --name sqlserver `
  --network taskboard_network `
  --hostname sqlserver `
  -d mcr.microsoft.com/mssql/server:2022-preview-ubuntu-22.04


# Build app image
docker build . `
-f ./TaskBoard.WebApp/Dockerfile
-t tonytech/taskboard_app

# Create App container
docker run `
  -d `
  -p 5000:80 `
  --name web_app `
  --network taskboard_network
  tonytech/taskboard_app