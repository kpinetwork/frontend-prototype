# ----------------------------------------------------------------------------------------------------------------------
# Route53 record
# @param zone_id The ID of the hosted zone to contain this record.
# @param name The name of the record.
# @param type The record type.
# @param alias An alias block, conflicts with ttl & records.
# ----------------------------------------------------------------------------------------------------------------------

resource "aws_route53_record" "kpinetwork_domain" {
  zone_id = var.hosted_zone_id
  name = var.domain
  type = "A"

  alias {
    name = var.aws_cloudfront_distribution.domain_name
    zone_id = var.aws_cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false
  }

  count = var.is_production ? 1 : 0
}

resource "aws_route53_record" "kpinetwork_sub_domain" {
  zone_id = var.hosted_zone_id
  name = var.sub_domain
  type = "A"

  alias {
    name = var.aws_cloudfront_distribution.domain_name
    zone_id = var.aws_cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# ----------------------------------------------------------------------------------------------------------------------
# Route53 Here the certificates are added to hosted zone
# @allow_overwrite Allows the overwrite to replace the record, uncomment if you need to renew the certificate
# ----------------------------------------------------------------------------------------------------------------------

resource "aws_route53_record" "cert_validations" {
  count = length(var.cert_sans) + 1
  zone_id = var.hosted_zone_id
  name    = element(var.domain_certificates.cert.domain_validation_options.*.resource_record_name, count.index)
  type    = element(var.domain_certificates.cert.domain_validation_options.*.resource_record_type, count.index)
  records = [element(var.domain_certificates.cert.domain_validation_options.*.resource_record_value, count.index)]
  allow_overwrite = true
  ttl     = 60
}
