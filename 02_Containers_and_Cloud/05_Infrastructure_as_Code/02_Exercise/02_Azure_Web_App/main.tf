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
  name     = "ContactBookRG-${random_integer.ri.result}"
  location = "West Europe"
}

# 5. Create a Linux App Service Plan
resource "azurerm_service_plan" "asp" {
  name                = "contact-book-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "F1"
}

# 6. Create the web app, pass in the App Service Plan ID
resource "azurerm_linux_web_app" "alwa" {
  name                = "contact-book-webapp-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_service_plan.asp.location
  service_plan_id     = azurerm_service_plan.asp.id

  site_config {
    application_stack {
      node_version = "16-lts"
    }
    always_on = false
  }
}

# Daploy code from a public GitHub repo
resource "azurerm_app_service_source_control" "example" {
  app_id                 = azurerm_linux_web_app.alwa.id
  repo_url               = "https://github.com/nakov/ContactBook"
  branch                 = "master"
  use_manual_integration = true
}