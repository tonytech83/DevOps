terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {
  # default from command `docker context ls`
  host = "npipe:////./pipe/docker_engine"
}

resource "docker_image" "nginx_image" {
  name = "nginxdemos/hello"
}

resource "docker_container" "nginx-server" {
  name  = "nginx-server"
  image = resource.docker_image.nginx_image.name

  ports {
    internal = "80"
    external = "80"
  }
}