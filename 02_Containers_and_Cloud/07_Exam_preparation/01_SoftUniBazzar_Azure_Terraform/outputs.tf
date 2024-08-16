output "web_app_url" {
  value = azurerm_linux_web_app.alwa.default_hostname
}

output "web_app_ips" {
  value = azurerm_linux_web_app.alwa.outbound_ip_addresses
}