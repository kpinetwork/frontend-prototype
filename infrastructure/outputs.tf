output "distribution_id" {
  value = module.cdn.cloudfront_distribution.id
}

output "region" {
  value = var.region
}

output "bucket_name" {
  value = module.buckets.bucket_information.name
}