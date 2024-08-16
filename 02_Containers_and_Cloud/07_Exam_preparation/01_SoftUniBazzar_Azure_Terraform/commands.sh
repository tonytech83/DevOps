# Init, format and validate
terraform init
terraform fmt
terraform validate

# Push to Azure
az login
terraform plan -var-file="values.tfvars"
terraform apply -var-file="values.tfvars"