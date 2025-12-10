output "lambda_function_url" {
  description = "HTTPS endpoint for Lambda function (use this as LAMBDA_BASE_URL)"
  value       = module.lambda.function_url
}

output "s3_bucket_name" {
  description = "S3 bucket name for MCP registry (use this as S3_BUCKET_NAME)"
  value       = module.s3.bucket_name
}

output "lambda_function_name" {
  description = "Lambda function name"
  value       = module.lambda.function_name
}

output "lambda_function_arn" {
  description = "Lambda function ARN"
  value       = module.lambda.function_arn
}

output "cloudwatch_log_group" {
  description = "CloudWatch log group for Lambda logs"
  value       = module.lambda.log_group_name
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

output "next_steps" {
  description = "Post-deployment instructions"
  value       = <<-EOT

    Infrastructure deployed successfully!

    Update your .env file with:

    LAMBDA_BASE_URL=${module.lambda.function_url}
    S3_BUCKET_NAME=${module.s3.bucket_name}
    AWS_REGION=${var.aws_region}

    Test the Lambda function:
    curl -X POST ${module.lambda.function_url}/test-server

    View logs:
    aws logs tail ${module.lambda.log_group_name} --follow
  EOT
}
