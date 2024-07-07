# Create network
docker network create mariadb-network

# MariaDB database server container, initialized with database user and password.
docker run -d \
  --name mariadb_server \
  --network mariadb-network \
  -e MARIADB_USER=user \
  -e MARIADB_PASSWORD=userpass \
  -e MARIADB_ROOT_PASSWORD=rootpass \
mariadb:latest

# MariaDB command line client against the MariaDB server container
docker run -it --rm \
  --name mariadb_client \
  --network mariadb-network \
  mariadb \
  mariadb \
  -h mariadb_server \
  -u user \
  -puserpass