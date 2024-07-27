# Without variables
terraform init
terraform validate
terraform apply

# With variables (only plan) - variables.tf
terraform plan

# Plan with declared variables - values.tfvars
terraform plan -var-file="values.tfvars"

# Apply with declared variables - values.tfvars and output.tf
terraform apply -var-file="values.tfvars"

# Destroy with declared variables - values.tfvars
terraform destroy -var-file="values.tfvars"