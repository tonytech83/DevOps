docker run \ 
-e "ACCEPT_EULA=Y" \
-e "MSSQL_SA_PASSWORD=yourStrong(!)Password" \
-e "MSSQL_PID=Evaluation" \
-p 1433:1433 \
-v sqldata:/var/opt/mssql \
--name sqlpreview \
--hostname sqlpreview \
-d mcr.microsoft.com/mssql/server:2022-preview-ubuntu-22.04