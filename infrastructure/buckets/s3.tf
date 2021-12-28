# ----------------------------------------------------------------------------------------------------------------------
# S3 BUCKET TO STORE WEBSITE FILES
# @param bucket Bucket name
# @param acl The canned ACL to apply
# @param cors_rule A rule of Cross-Origin Resource Sharing
# ----------------------------------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "bucket" {
  bucket = "${var.environment}-${var.bucket_name}-distribution"
  acl = "public-read"
  cors_rule {
    allowed_headers = [
      "*"]
    allowed_methods = [
      "PUT",
      "POST",
      "GET"
    ]
    allowed_origins = [
      "*"]
    max_age_seconds = 3000
  }

  force_destroy = true
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
