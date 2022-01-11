# ----------------------------------------------------------------------------------------------------------------------
# CDN INPUTS
# ----------------------------------------------------------------------------------------------------------------------

variable "bucket_information" {}
variable "domain" {}
variable "sub_domain" {}
variable "certificate_arn" {}
variable "environment" {}
variable "is_production" {}
locals {
  aliases = var.is_production ? [
    "www.${var.sub_domain}",
    var.sub_domain
  ] : [
    var.sub_domain
  ]
}
