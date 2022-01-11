# ----------------------------------------------------------------------------------------------------------------------
# AWS CREDENTIALS
# ----------------------------------------------------------------------------------------------------------------------

variable "aws_access_key_id" {
  description = "AWS access key credential"
}

variable "aws_secret_access_key" {
  description = "AWS secret access key credential"
}

variable "region" {
  default = "us-west-2"
}

variable "aws_account_id" {
  description = "AWS account id"
}

variable "aws_terraform_user_provider" {
  description = "AWS account used to deploy project"
}

# ----------------------------------------------------------------------------------------------------------------------
# DOMAIN DEFINITIONS
# ----------------------------------------------------------------------------------------------------------------------

variable "domain" {
  default = "kpinetwork.com"
}

locals {
  prod_certs = [
    "www.app.${var.domain}",
    "app.${var.domain}"
  ]
  demo_certs = [
    "app.${terraform.workspace}.${var.domain}"
  ]
  environment = terraform.workspace
  is_production = local.environment == "prod"
  cert_sans = local.is_production ? local.prod_certs : local.demo_certs
  domains = {
    "root" = var.domain
    "prod" = "app.${var.domain}"
    "demo" = "app.demo.${var.domain}"
  }
}

variable "backend" {
  default     = "s3"
}
