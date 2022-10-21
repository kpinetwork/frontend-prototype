# ----------------------------------------------------------------------------------------------------------------------
# CLOUDFRONT DISTRIBUTION
# @param origin One or more origins for this distribution
# @param default_root_object By default, show index.html file
# @param enabled A flag that specifies whether Origin Shield is enabled.
# @param custom_error_response If there is a 404, return index.html with a HTTP 200 Response
# @param default_cache_behavior The default cache behavior for this distribution
# @param price_class Distributes content to US and Europe
# @param restrictions Restricts who is able to access this content
# @param viewer_certificate SSL certificate for the service.
# ----------------------------------------------------------------------------------------------------------------------

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    origin_id = var.sub_domain
    domain_name = var.bucket_information.bucket_regional_domain_name
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.web_distribution.cloudfront_access_identity_path
    }
  }
  aliases = local.aliases

  enabled = true

  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods = [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT"]
    cached_methods = [
      "GET",
      "HEAD"]
    target_origin_id = var.sub_domain

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
    
    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.http_headers_cloudfront_function.arn
    }
  }

  ordered_cache_behavior {
    path_pattern = "/*"
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS"]
    cached_methods = [
      "GET",
      "HEAD",
      "OPTIONS"]
    target_origin_id = var.sub_domain

    forwarded_values {
      query_string = false
      headers = [
        "Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl = 0
    default_ttl = 86400
    max_ttl = 31536000
    compress = true
    viewer_protocol_policy = "redirect-to-https"

    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.http_headers_cloudfront_function.arn
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = var.certificate_arn
    ssl_support_method = "sni-only"
  }
  price_class = "PriceClass_100"
  custom_error_response {
    error_caching_min_ttl = 86400
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  depends_on = [
    aws_cloudfront_function.http_headers_cloudfront_function
  ]
}

resource "aws_cloudfront_origin_access_identity" "web_distribution" {
  comment = "Managed by Terraform"
}

resource "aws_cloudfront_function" "http_headers_cloudfront_function" {
  name    =  "${var.environment}_http_headers_cloudfront_function"
  runtime = var.runtime
  comment = "http headers function"
  publish = true
  code    = file("${path.module}/../../cloudfrontFunctions/httpHeaders.js")
}