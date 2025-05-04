locals {
  prefix = var.prefix
  common_tags = {
    Project   = var.project
    ManagedBy = "Terraform"
    Env       = var.env
    Contact   = var.contact
  }
}