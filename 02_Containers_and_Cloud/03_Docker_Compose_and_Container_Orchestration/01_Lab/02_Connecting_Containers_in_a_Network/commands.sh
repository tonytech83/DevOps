# Create a network
docker network create my_network

# Add MySQL container to the network
docker run -d \
--name wordpress_db \
-e MYSQL_ROOT_PASSWORD=pass \
-e MYSQL_DATABASE=wordpressdb \
-e MYSQL_USER=wordpress \
-e MYSQL_PASSWORD=wordpress \
--expose 3306 \
--expose 33060 \
--network my_network \
-v ${PWD}/data:/var/lib/mysql 
mysql

# Inspect network
docker network inspect my_network

# Add WordPress container to the network
docker run -d \
--name wordpress-website \
-e WORDPRESS_DB_HOST=wordpress_db \
-e WORDPRESS_DB_USER=wordpress \
-e WORDPRESS_DB_PASSWORD=wordpress \
-e WORDPRESS_DB_NAME=wordpressdb \
-v ${PWD}/wp-data:/var/www/html \
-p 80:80 \
--network my_network \
wordpress