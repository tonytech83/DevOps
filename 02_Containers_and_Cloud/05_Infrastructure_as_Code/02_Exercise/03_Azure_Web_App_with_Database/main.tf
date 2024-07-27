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
  min = 10000
  max = 99999
}

# 4. Create a resource group
resource "azurerm_resource_group" "rg" {
  # name     = "TaskBoardRG${random_integer.ri.result}"
  # location = "North Europe"
  name     = "${var.resource_group_name}-${random_integer.ri.result}"
  location = var.resource_group_location
}

# 5. Create a Linux App Service Plan
resource "azurerm_service_plan" "asp" {
  # name                = "task-board-plan-${random_integer.ri.result}"
  name                = "${var.app_service_plan_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "F1"
  depends_on          = [azurerm_resource_group.rg]
}

# 6. Create a MSSQL Server
resource "azurerm_mssql_server" "mssql" {
  # name                = "task-board-sql-${random_integer.ri.result}"
  name                = "${var.sql_server_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  version             = "12.0"
  # administrator_login          = "4dm1n157r470r"
  # administrator_login_password = "4-v3ry-53cr37-p455w0rd"
  administrator_login          = var.sql_server_admin_username
  administrator_login_password = var.sql_server_admin_password
  depends_on                   = [azurerm_resource_group.rg]
}

# 7. Create a MSSQL Database
resource "azurerm_mssql_database" "database" {
  # name           = "TaskBoardDB-${random_integer.ri.result}"
  name           = "${var.sql_database_name}-${random_integer.ri.result}"
  server_id      = azurerm_mssql_server.mssql.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  sku_name       = "S0"
  zone_redundant = false
  depends_on     = [azurerm_mssql_server.mssql]
}

# 8. Create a MSSQL Firewall Rule
resource "azurerm_mssql_firewall_rule" "firewall" {
  # name             = "task-board-firewall-${random_integer.ri.result}"
  name             = var.firewall_rule_name
  server_id        = azurerm_mssql_server.mssql.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
  depends_on       = [azurerm_mssql_server.mssql]
}

# 9. Create the web app, pass in the App Service Plan ID, connection string for MSSQL
resource "azurerm_linux_web_app" "alwa" {
  # name                = "task-board-${random_integer.ri.result}"
  name                = "${var.app_service_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
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
resource "azurerm_app_service_source_control" "sc" {
  app_id = azurerm_linux_web_app.alwa.id
  # repo_url               = "https://github.com/tonytech83/azure-app-deploy-asp-sql"
  repo_url               = var.repo_URL
  branch                 = "main"
  use_manual_integration = true
  depends_on             = [azurerm_linux_web_app.alwa]
}
