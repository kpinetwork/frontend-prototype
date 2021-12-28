module "buckets" {
  source = "./buckets/"
  environment = local.environment
}

module "cdn" {
  source = "./cdn/"
  domain = var.domain
  sub_domain = local.domains[local.environment]
  certificate_arn = module.cert.certificate_validation_arn
  bucket_information = module.buckets.bucket_information
  environment = local.environment
  is_production = local.is_production
}

module "policy" {
  source = "./policy/"
  bucket_information = module.buckets.bucket_information
  aws_terraform_user_provider = var.aws_terraform_user_provider
  aws_account_id = var.aws_account_id
  cloudfront_distribution_oai_iam_arn = module.cdn.cloudfront_distribution_oai
  environment = local.environment
}

module "dns" {
  source = "./dns"
  aws_cloudfront_distribution = module.cdn.cloudfront_distribution
  domain = var.domain
  sub_domain = local.domains[local.environment]
  domain_certificates = module.cert.domain_certificate
  cert_sans = local.cert_sans
  hosted_zone_id = aws_route53_zone.kpinetwork.zone_id
  is_production = local.is_production
}

module "cert" {
  source = "./certificates"
  cert_validation_fqdn = module.dns.cert_validation_fqdn
  domain_name = local.domains[local.environment]
  aws_access_key_id = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  cert_sans = local.cert_sans
}