# CloudWatch log group for Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${var.project_name}-mcp-executor"
  retention_in_days = var.log_retention_days

  tags = {
    Name = "${var.project_name}-lambda-logs"
  }
}

# Lambda function
resource "aws_lambda_function" "mcp_executor" {
  function_name = "${var.project_name}-mcp-executor"
  role          = var.execution_role_arn
  handler       = "lambda.lambda_handler"
  runtime       = var.lambda_runtime
  filename      = "${path.module}/lambda_payload.zip"
  timeout       = var.lambda_timeout
  memory_size   = var.lambda_memory_size

  source_code_hash = filebase64sha256("${path.module}/lambda_payload.zip")

  environment {
    variables = {
      AWS_REGION     = var.aws_region
      S3_BUCKET_NAME = var.s3_bucket_name
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.lambda_logs
  ]

  tags = {
    Name = "${var.project_name}-mcp-executor"
  }
}

# Lambda function URL (public HTTPS endpoint)
resource "aws_lambda_function_url" "mcp_executor" {
  function_name      = aws_lambda_function.mcp_executor.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers     = ["*"]
    expose_headers    = ["*"]
    max_age           = 3600
  }
}

# Lambda permission for function URL
resource "aws_lambda_permission" "function_url" {
  statement_id           = "AllowFunctionURLInvoke"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.mcp_executor.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}
