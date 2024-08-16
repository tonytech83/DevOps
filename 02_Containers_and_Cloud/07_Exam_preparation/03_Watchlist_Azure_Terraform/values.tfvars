# Resource group
resource_group_name     = "WatchlistRG"
resource_group_location = "northeurope"

# Application Service plan
app_service_plan_name     = "watchlist-plan"
app_service_plan_os_type  = "Linux"
app_service_plan_sku_name = "F1"

# SQL server
sql_server_name           = "watchlist-sqlserver"
sql_server_admin_username = "saadminuser"
sql_server_admin_password = "myStrongPassword12#"
sql_server_version        = "12.0"

# SQL database
sql_database_name           = "Contacts"
sql_database_collation      = "SQL_Latin1_General_CP1_CI_AS"
sql_database_license_type   = "LicenseIncluded"
sql_database_max_size_bg    = 2
sql_database_sku_name       = "S0"
sql_database_zone_redundant = false

# SQL firewall rule
sql_firewall_rule_name     = "watchlist-firewall-rule"
sql_firewall_rule_start_ip = "0.0.0.0"
sql_firewall_rule_end_ip   = "0.0.0.0"

# Linux web application
app_service_name = "softuni-watchlist-web-app"

# Service source control
repo_url                    = "https://github.com/tonytech83/task-2-prep-2"
repo_branch                 = "main"
repo_use_manual_integration = true
