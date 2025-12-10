output "function_arn" {
  description = "Lambda function ARN"
  value       = aws_lambda_function.mcp_executor.arn
}

output "function_name" {
  description = "Lambda function name"
  value       = aws_lambda_function.mcp_executor.function_name
}

output "function_url" {
  description = "Lambda function HTTPS URL"
  value       = aws_lambda_function_url.mcp_executor.function_url
}

output "log_group_name" {
  description = "CloudWatch log group name"
  value       = aws_cloudwatch_log_group.lambda_logs.name
}

output "invoke_arn" {
  description = "Lambda invoke ARN"
  value       = aws_lambda_function.mcp_executor.invoke_arn
}
