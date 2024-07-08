# Use the official OpenJDK image as the base image
FROM openjdk:11-jre-slim

# Set metadata about the maintainer of the image
LABEL maintainer="..."

# Copy the compiled jar file into the image
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT [ "java", "-jar", "/app.jar" ]