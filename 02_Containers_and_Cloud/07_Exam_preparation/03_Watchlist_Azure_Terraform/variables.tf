variable "resource_group_name" {
  type        = string
  description = "The name of the resource group"
}

variable "resource_group_location" {
  type        = string
  description = "The location of the resource group"
}

variable "app_service_plan_name" {
  type        = string
  description = "The name of the app service plan"
}

variable "app_service_plan_os_type" {
  type        = string
  description = "The os type of app service plan"
}

variable "app_service_plan_sku_name" {
  type        = string
  description = "The SKU of app service plan"
}

variable "app_service_name" {
  type        = string
  description = "The name of the app service"
}

variable "sql_server_name" {
  type        = string
  description = "The name of the SQL server"
}

variable "sql_server_version" {
  type    = string
  default = "The version of the SQL server"
}

variable "sql_server_admin_username" {
  type        = string
  description = "The admin username of the sql server"
}

variable "sql_server_admin_password" {
  type        = string
  description = "The admin password of the sql server"
}

variable "sql_database_name" {
  type        = string
  description = "The name of the SQL database"
}

variable "sql_database_collation" {
  type        = string
  description = "The cpllation of SQL database"
}

variable "sql_database_license_type" {
  type        = string
  description = "The license type pf the SQL database"
}

variable "sql_database_max_size_bg" {
  type        = number
  description = "The max size of DB in GB."
}

variable "sql_database_sku_name" {
  type        = string
  description = "The SKU of SQL database."
}

variable "sql_database_zone_redundant" {
  type        = bool
  description = "Zone redundancy for DB (true/false)"
}

variable "sql_firewall_rule_name" {
  type        = string
  description = "The name of the firewall rule"
}

variable "sql_firewall_rule_start_ip" {
  type        = string
  description = "The start ip address for SQL firewall rule"
}

variable "sql_firewall_rule_end_ip" {
  type        = string
  description = "The end ip address for SQL firewall rule"
}

variable "repo_url" {
  type        = string
  description = "The URL of the repository"
}

variable "repo_branch" {
  type        = string
  description = "Branch of the repository."
}

variable "repo_use_manual_integration" {
  type        = bool
  description = "Use manual integration (true/false)."
}
