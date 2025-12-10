# SuperBox Infrastructure

OpenTofu/Terraform configuration for deploying SuperBox AWS infrastructure.

## Architecture

- **S3 Bucket**: MCP server registry storage (`{server_name}.json` files)
- **Lambda Function**: MCP executor (runs servers in sandboxed environment)
- **Lambda Function URL**: Public HTTPS endpoint for MCP execution
- **IAM Roles**: Lambda execution role with S3 access
- **CloudWatch Logs**: Lambda execution logs (7-day retention)

## Prerequisites

1. **AWS Account** with programmatic access
2. **OpenTofu** or **Terraform** (>= 1.10.0)
3. **AWS CLI** (optional, for verification)

Install OpenTofu:

```bash
# Windows (winget)
winget install OpenTofu.tofu

# macOS
brew install opentofu

# Linux
curl -fsSL https://get.opentofu.org/install-opentofu.sh | bash
```

## Setup

### 1. Configure AWS Credentials

Create `infra/terraform.tfvars`:

```hcl
aws_access_key = "AWS_ACCESS_KEY_ID"
aws_secret_key = "AWS_SECRET_ACCESS_KEY"
aws_region     = "ap-south-1"
project_name   = "superbox"
```

**Get AWS Keys:**

- Go to AWS Console → IAM → Users → Your User → Security Credentials
- Create Access Key → CLI/SDK → Copy keys

### 2. Package Lambda Function

```powershell
# Windows PowerShell
cd infra/scripts
./package_lambda.ps1

# Linux/macOS
cd infra/scripts
bash package_lambda.sh
```

This creates `modules/lambda/lambda_payload.zip` containing `lambda.py`.

### 3. Initialize Terraform

```bash
tofu init
# or: terraform init
```

### 4. Plan Infrastructure

```bash
tofu plan
# or: terraform plan
```

Review the resources that will be created:

- S3 bucket for registry
- Lambda function with execution role
- Lambda function URL
- CloudWatch log group

### 5. Deploy

```bash
tofu apply
# or: terraform apply
```

Type `yes` when prompted.

### 6. Get Outputs

```bash
tofu output
```

You will see:

- lambda_function_url - HTTPS endpoint for MCP execution
- s3_bucket_name - Registry bucket name
- lambda_function_name - Lambda function name

## Update .env File

After deployment, update your .env file with:

```bash
# From tofu output
LAMBDA_BASE_URL=<lambda_function_url>
S3_BUCKET_NAME=<s3_bucket_name>
AWS_REGION=ap-south-1
```

## Usage

### Deploy Updates

When you modify `lambda.py`:

```bash
# Re-package lambda
cd infra/scripts
./package_lambda.ps1  # or .sh on Linux/macOS

# Apply changes
cd ..
tofu apply
```

### View Lambda Logs

```bash
aws logs tail /aws/lambda/superbox-mcp-executor --follow
```

### Test Lambda

```bash
curl -X POST <lambda_function_url>/test-server \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test"}'
```

### Destroy Infrastructure

**WARNING: This deletes all resources and data!**

```bash
tofu destroy
```

## Costs

Estimated monthly costs (minimal usage):

- **Lambda**: Free tier covers 1M requests/month (400,000 GB-seconds)
- **S3**: ~$0.50/month (assuming <10GB storage)
- **CloudWatch Logs**: ~$0.50/month
- **Total**: ~$1-2/month

## Troubleshooting

### Lambda Timeout Errors

Increase timeout in `modules/lambda/variables.tf`:

```hcl
variable "lambda_timeout" {
  default = 90  # Increase from 60
}
```

### Lambda Out of Memory

Increase memory in `modules/lambda/variables.tf`:

```hcl
variable "lambda_memory_size" {
  default = 2048  # Increase from 1024
}
```

### CORS Issues

CORS is configured to allow all origins (`*`). If you need to restrict:

- Edit `modules/lambda/main.tf`
- Update `cors { allow_origins = ["https://yourdomain.com"] }`

### S3 Access Denied

Verify IAM policy in `modules/iam/main.tf` includes:

- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
- `s3:ListBucket`

## File Structure

```
infra/
├── main.tf              # Root module orchestration
├── variables.tf         # Input variables
├── outputs.tf           # Exported values
├── versions.tf          # Version constraints
├── providers.tf         # AWS provider config
├── terraform.tfvars     # Your credentials (git-ignored)
├── modules/
│   ├── s3/              # S3 bucket for registry
│   ├── lambda/          # Lambda function + URL
│   └── iam/             # IAM roles & policies
└── scripts/
    ├── package_lambda.sh   # Linux/macOS
    └── package_lambda.ps1  # Windows
```

## Security Notes

- Lambda function URL is **public** (no authentication)
- Add API Gateway + authentication for production hardening
- S3 bucket blocks public access (Lambda uses IAM role)
- Consider AWS WAF for DDoS protection
- Rotate AWS keys regularly
