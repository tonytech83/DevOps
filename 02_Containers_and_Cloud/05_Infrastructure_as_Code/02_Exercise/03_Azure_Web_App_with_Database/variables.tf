variable "resource_group_name" {
  type = string
  description = "The name of the resource group"
}

variable "resource_group_location" {
  type = string
  description = "The location of the resource group"
}

variable "app_service_plan_name" {
  type = string
  description = "The name of the app service plan"
}

variable "app_service_name" {
  type = string
  description = "The name of the app service"
}

variable "sql_server_name" {
  type = string
  description = "The name of the sql server"
}

variable "sql_database_name" {
  type = string
  description = "The name of the sql database"
}

variable "sql_server_admin_username" {
  type = string
  description = "The admin username of the sql server"
}

variable "sql_server_admin_password" {
  type = string
  description = "The admin password of the sql server"
}

variable "firewall_rule_name" {
  type = string
  description = "The name of the firewall rule"
}

variable "repo_URL" {
  type = string
  description = "The URL of the repository"
}