output "bucket_information" {
  value = {
    bucket_regional_domain_name : aws_s3_bucket.bucket.bucket_regional_domain_name
    bucket : aws_s3_bucket.bucket.bucket
    name : "${var.environment}-${var.bucket_name}-distribution"
    id: aws_s3_bucket.bucket.id
    website_endpoint: aws_s3_bucket.bucket.website_endpoint
    arn: aws_s3_bucket.bucket.arn
  }
}
