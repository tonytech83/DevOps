# Using official python runtime base image
FROM python:3.9-slim

# Set the application directory
WORKDIR /app

# Install our requirements.txt
COPY vote/requirements.txt /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy our code from the current folder to /app inside the container
COPY . .

# Make port 80 available for links and/or publish
EXPOSE 80

# Define our command to be run when launching the container
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
