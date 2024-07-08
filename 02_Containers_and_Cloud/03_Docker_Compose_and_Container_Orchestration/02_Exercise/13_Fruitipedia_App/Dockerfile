# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Set the working dir in the container
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current dir content into the container
COPY . .

# Set the static files dir
RUN mkdir ./staticfiles

# Copy the static files
COPY static ./staticfiles

# Expose the port the app runs on
EXPOSE 8000

CMD [ "gunicorn", "SimplePageApp.wsgi:application", "--bind", "0.0.0.0:8000" ]

