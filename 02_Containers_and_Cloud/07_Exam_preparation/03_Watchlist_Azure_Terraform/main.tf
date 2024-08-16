# 1. Specify the version of the AzureRM Provider to use
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.113.0"
    }
  }
}

# 2. Configure the AzureRM Provider
provider "azurerm" {
  features {}
}

# 3. Generate a random integer to create a globally unique name
resource "random_integer" "ri" {
  min = 1000
  max = 9999
}

# 4. Create a resource group
resource "azurerm_resource_group" "arg" {
  name     = "${var.resource_group_name}-${random_integer.ri.result}"
  location = var.resource_group_location
}

# 5. Create a Linux App Service Plan
resource "azurerm_service_plan" "asp" {
  name                = "${var.app_service_plan_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.arg.name
  location            = azurerm_resource_group.arg.location
  os_type             = var.app_service_plan_os_type
  sku_name            = var.app_service_plan_sku_name
  depends_on          = [azurerm_resource_group.arg]
}

# 6. Create a MSSQL Server
resource "azurerm_mssql_server" "mssql" {
  name                         = "${var.sql_server_name}-${random_integer.ri.result}"
  resource_group_name          = azurerm_resource_group.arg.name
  location                     = azurerm_resource_group.arg.location
  version                      = var.sql_server_version
  administrator_login          = var.sql_server_admin_username
  administrator_login_password = var.sql_server_admin_password
  depends_on                   = [azurerm_resource_group.arg]
}

# 7. Create a MSSQL Database
resource "azurerm_mssql_database" "database" {
  name           = "${var.sql_database_name}-${random_integer.ri.result}"
  server_id      = azurerm_mssql_server.mssql.id
  collation      = var.sql_database_collation
  license_type   = var.sql_database_license_type
  max_size_gb    = var.sql_database_max_size_bg
  sku_name       = var.sql_database_sku_name
  zone_redundant = var.sql_database_zone_redundant
  depends_on     = [azurerm_mssql_server.mssql]
}

# 8. Create a MSSQL Firewall Rule
resource "azurerm_mssql_firewall_rule" "firewall" {
  name             = "${var.sql_firewall_rule_name}-${random_integer.ri.result}"
  server_id        = azurerm_mssql_server.mssql.id
  start_ip_address = var.sql_firewall_rule_start_ip
  end_ip_address   = var.sql_firewall_rule_end_ip
  depends_on       = [azurerm_mssql_server.mssql]
}

# 9. Create the web app, pass in the App Service Plan ID, connection string for MSSQL
resource "azurerm_linux_web_app" "alwa" {
  name                = "${var.app_service_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.arg.name
  location            = azurerm_service_plan.asp.location
  service_plan_id     = azurerm_service_plan.asp.id
  depends_on          = [azurerm_service_plan.asp]

  site_config {
    application_stack {
      dotnet_version = "6.0"
    }
    always_on = false
  }

  connection_string {
    name = "DefaultConnection"
    type = "SQLAzure"
    value = join("", [
      "Data Source=tcp:${azurerm_mssql_server.mssql.fully_qualified_domain_name},1433;",
      "Initial Catalog=${azurerm_mssql_database.database.name};",
      "User ID=${azurerm_mssql_server.mssql.administrator_login};",
      "Password=${azurerm_mssql_server.mssql.administrator_login_password};",
      "Trusted_Connection=False;",
      "MultipleActiveResultSets=True;"
    ])
  }
}

# 10. Daploy code from a public GitHub repo
resource "azurerm_app_service_source_control" "assc" {
  app_id                 = azurerm_linux_web_app.alwa.id
  repo_url               = var.repo_url
  branch                 = var.repo_branch
  use_manual_integration = var.repo_use_manual_integration
  depends_on             = [azurerm_linux_web_app.alwa]
}
