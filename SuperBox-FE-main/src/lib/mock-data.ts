import type { ServerResponse } from "./types";

// LocalStorage key for user-created servers
const STORAGE_KEY = 'superbox_user_servers';

// Load user-created servers from localStorage
function loadUserCreatedServers(): ServerResponse[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save user-created servers to localStorage
function saveUserCreatedServers(servers: ServerResponse[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servers));
  } catch (error) {
    console.error('Failed to save servers:', error);
  }
}

// Realistic general MCP servers from popular platforms
export const MOCK_SERVERS: ServerResponse[] = [
  {
    name: "github-mcp",
    version: "3.2.1",
    description: "Official GitHub MCP server for repository management, code search, issue tracking, PR reviews, and GitHub Actions integration",
    author: "GitHub",
    lang: "TypeScript",
    license: "MIT",
    entrypoint: "index.ts",
    repository: {
      type: "github",
      url: "https://github.com/github/github-mcp"
    },
    tools: {
      count: 15,
      names: ["repo_search", "create_issue", "list_prs", "merge_pr", "code_search", "create_branch", "workflow_run", "commit_history", "file_content", "repo_stats", "collaborators", "releases", "gist_create", "star_repo", "fork_repo"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "github/github-mcp",
        repo_url: "https://github.com/github/github-mcp",
        scan_date: "2024-12-05T08:30:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 7,
        critical_issues: 0,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=github-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 4,
        bugs: 0,
        vulnerabilities: 0,
        code_smells: 4,
        security_hotspots: 0,
        quality_gate: "A",
        reliability_rating: "A",
        security_rating: "A",
        maintainability_rating: "A",
        coverage: 95.8,
        duplications: 0.8,
        lines_of_code: 8540
      },
      gitguardian: {
        scan_passed: true,
        total_secrets: 0,
        secrets: [],
        error: null
      },
      bandit: {
        scan_passed: true,
        total_issues: 0,
        severity_counts: { high: 0, medium: 0, low: 0 },
        total_lines_scanned: 8540,
        issues: [],
        error: null
      },
      recommendations: [
        "Excellent security posture maintained by GitHub team",
        "OAuth token rotation implemented for enhanced security",
        "Rate limiting properly configured to prevent API abuse",
        "Minor: Consider adding more comprehensive error handling in edge cases",
        "Well-documented API with extensive examples and guides",
        "Regular security audits performed quarterly"
      ]
    }
  },
  {
    name: "google-search-mcp",
    version: "2.5.0",
    description: "Google Search MCP server providing web search, image search, news aggregation, and custom search engine integration with advanced filtering",
    author: "Google Cloud",
    lang: "Python",
    license: "Apache-2.0",
    entrypoint: "main.py",
    repository: {
      type: "github",
      url: "https://github.com/googlecloudplatform/google-search-mcp"
    },
    tools: {
      count: 10,
      names: ["web_search", "image_search", "news_search", "video_search", "custom_search", "trending_topics", "search_suggest", "safe_search", "location_search", "date_filter"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "googlecloudplatform/google-search-mcp",
        repo_url: "https://github.com/googlecloudplatform/google-search-mcp",
        scan_date: "2024-12-03T11:20:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 10,
        critical_issues: 1,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=google-search-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 7,
        bugs: 2,
        vulnerabilities: 1,
        code_smells: 4,
        security_hotspots: 1,
        quality_gate: "B",
        reliability_rating: "B",
        security_rating: "B",
        maintainability_rating: "B",
        coverage: 76.3,
        duplications: 3.5,
        lines_of_code: 6230
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 1,
        secrets: [{type: "Google API Key", line: 145, file: "config/settings.py"}],
        error: null
      },
      bandit: {
        scan_passed: false,
        total_issues: 2,
        severity_counts: { high: 0, medium: 1, low: 1 },
        total_lines_scanned: 6230,
        issues: [
          {severity: "MEDIUM", line: 178, file: "src/search.py", issue: "Weak random number generator detected - use secrets module"},
          {severity: "LOW", line: 456, file: "utils/cache.py", issue: "Use of assert statements in production code"}
        ],
        error: null
      },
      recommendations: [
        "CRITICAL: Remove hardcoded API key from settings.py and use environment variables",
        "MEDIUM: Replace random module with secrets for security-sensitive operations",
        "LOW: Remove assert statements from production code paths",
        "Medium: Implement request caching to reduce API quota consumption",
        "Increase test coverage especially for error scenarios",
        "Add input validation for search query parameters",
        "Consider implementing exponential backoff for API rate limiting",
        "Review security hotspot in query sanitization logic"
      ]
    }
  },
  {
    name: "slack-mcp",
    version: "4.1.2",
    description: "Official Slack MCP server for workspace management, messaging, channel operations, file sharing, and Slack bot integrations",
    author: "Slack Technologies",
    lang: "JavaScript",
    license: "MIT",
    entrypoint: "index.js",
    repository: {
      type: "github",
      url: "https://github.com/slackhq/slack-mcp"
    },
    tools: {
      count: 14,
      names: ["send_message", "create_channel", "list_channels", "invite_user", "file_upload", "get_history", "search_messages", "set_status", "reactions_add", "pins_add", "reminders_add", "user_info", "team_info", "emoji_list"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "slackhq/slack-mcp",
        repo_url: "https://github.com/slackhq/slack-mcp",
        scan_date: "2024-12-01T14:30:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 14,
        critical_issues: 3,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=slack-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 9,
        bugs: 3,
        vulnerabilities: 2,
        code_smells: 4,
        security_hotspots: 2,
        quality_gate: "C",
        reliability_rating: "C",
        security_rating: "C",
        maintainability_rating: "B",
        coverage: 68.4,
        duplications: 5.8,
        lines_of_code: 7230
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 2,
        secrets: [
          {type: "Slack OAuth Token", line: 89, file: "src/auth/tokens.js"},
          {type: "Slack Webhook URL", line: 234, file: "config/webhooks.js"}
        ],
        error: null
      },
      bandit: {
        scan_passed: false,
        total_issues: 3,
        severity_counts: { high: 1, medium: 2, low: 0 },
        total_lines_scanned: 7230,
        issues: [
          {severity: "HIGH", line: 123, file: "src/webhooks.js", issue: "Use of eval() detected - potential code injection"},
          {severity: "MEDIUM", line: 456, file: "src/client.js", issue: "Weak cryptographic key - consider using stronger algorithm"},
          {severity: "MEDIUM", line: 789, file: "src/auth.js", issue: "Insecure deserialization detected"}
        ],
        error: null
      },
      recommendations: [
        "CRITICAL: Remove eval() usage - use safer alternatives like JSON.parse",
        "CRITICAL: Remove hardcoded OAuth tokens from source code - use secure vault storage",
        "CRITICAL: Webhook URLs should be environment variables, not committed to repository",
        "HIGH: Fix SQL injection vulnerability in message search functionality",
        "MEDIUM: Upgrade cryptographic algorithm to AES-256 or stronger",
        "MEDIUM: Implement rate limiting for API endpoints to prevent abuse",
        "LOW: Refactor duplicate authentication logic across modules",
        "Test coverage needs significant improvement - currently below 70%",
        "Review security hotspots in file upload validation logic"
      ]
    }
  },
  {
    name: "aws-mcp",
    version: "5.0.3",
    description: "Amazon Web Services MCP server for EC2, S3, Lambda, RDS, DynamoDB, CloudWatch and comprehensive AWS service management",
    author: "Amazon Web Services",
    lang: "Python",
    license: "Apache-2.0",
    entrypoint: "aws_main.py",
    repository: {
      type: "github",
      url: "https://github.com/aws/aws-mcp"
    },
    tools: {
      count: 18,
      names: ["ec2_launch", "s3_upload", "lambda_invoke", "rds_connect", "dynamo_query", "cloudwatch_metrics", "iam_policy", "vpc_create", "route53_dns", "sqs_send", "sns_publish", "elasticache_connect", "ecs_deploy", "cloudfront_cache", "secrets_get", "cost_explorer", "backup_create", "logs_query"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "aws/aws-mcp",
        repo_url: "https://github.com/aws/aws-mcp",
        scan_date: "2024-12-04T09:45:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 8,
        critical_issues: 0,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=aws-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 5,
        bugs: 1,
        vulnerabilities: 0,
        code_smells: 4,
        security_hotspots: 1,
        quality_gate: "A",
        reliability_rating: "A",
        security_rating: "A",
        maintainability_rating: "A",
        coverage: 89.7,
        duplications: 2.3,
        lines_of_code: 12450
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 1,
        secrets: [{type: "AWS Access Key ID", line: 567, file: "tests/fixtures/credentials.py"}],
        error: null
      },
      bandit: {
        scan_passed: false,
        total_issues: 2,
        severity_counts: { high: 0, medium: 1, low: 1 },
        total_lines_scanned: 12450,
        issues: [
          {severity: "MEDIUM", line: 345, file: "src/s3_client.py", issue: "Use of shell=True in subprocess call"},
          {severity: "LOW", line: 678, file: "tests/test_lambda.py", issue: "Hardcoded temporary file path detected"}
        ],
        error: null
      },
      recommendations: [
        "MEDIUM: Avoid shell=True in subprocess calls - use array arguments instead",
        "MEDIUM: Remove test AWS credentials from fixtures - use mocking instead",
        "LOW: Use tempfile module for temporary file operations",
        "Comprehensive boto3 integration with proper error handling",
        "Implements AWS SDK best practices for credential management",
        "Session tokens properly managed with automatic renewal",
        "Strong typing and input validation for all AWS operations",
        "Excellent documentation with usage examples for each service"
      ]
    }
  },
  {
    name: "postgres-mcp",
    version: "3.8.1",
    description: "PostgreSQL database MCP server with query execution, schema management, migrations, backup/restore, and performance monitoring",
    author: "PostgreSQL Community",
    lang: "TypeScript",
    license: "PostgreSQL",
    entrypoint: "postgres.ts",
    repository: {
      type: "github",
      url: "https://github.com/postgres/postgres-mcp"
    },
    tools: {
      count: 13,
      names: ["execute_query", "create_table", "alter_schema", "insert_data", "update_records", "delete_records", "backup_database", "restore_backup", "run_migration", "explain_query", "vacuum_analyze", "replication_status", "connection_pool"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "postgres/postgres-mcp",
        repo_url: "https://github.com/postgres/postgres-mcp",
        scan_date: "2024-12-02T10:15:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 13,
        critical_issues: 3,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=postgres-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 12,
        bugs: 4,
        vulnerabilities: 3,
        code_smells: 5,
        security_hotspots: 3,
        quality_gate: "D",
        reliability_rating: "D",
        security_rating: "D",
        maintainability_rating: "C",
        coverage: 62.1,
        duplications: 7.4,
        lines_of_code: 9340
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 1,
        secrets: [{type: "PostgreSQL Connection String", line: 23, file: "config/database.ts"}],
        error: null
      },
      bandit: {
        scan_passed: true,
        total_issues: 0,
        severity_counts: { high: 0, medium: 0, low: 0 },
        total_lines_scanned: 9340,
        issues: [],
        error: null
      },
      recommendations: [
        "CRITICAL: SQL injection vulnerabilities found in dynamic query builder - use parameterized queries",
        "CRITICAL: Database connection string with credentials committed to repository",
        "CRITICAL: Missing input sanitization in schema alteration functions",
        "HIGH: Implement prepared statements for all user-facing queries",
        "MEDIUM: Connection pooling configuration needs security hardening",
        "MEDIUM: Add transaction rollback handling for failed operations",
        "LOW: High code duplication in CRUD operation handlers",
        "Test coverage critically low - needs immediate attention"
      ]
    }
  },
  {
    name: "docker-mcp",
    version: "4.2.0",
    description: "Docker container management MCP server for building images, running containers, compose orchestration, registry operations, and swarm management",
    author: "Docker Inc",
    lang: "Go",
    license: "Apache-2.0",
    entrypoint: "main.go",
    repository: {
      type: "github",
      url: "https://github.com/docker/docker-mcp"
    },
    tools: {
      count: 16,
      names: ["build_image", "run_container", "stop_container", "list_containers", "pull_image", "push_image", "compose_up", "compose_down", "volume_create", "network_create", "logs_tail", "exec_command", "inspect_container", "prune_system", "swarm_init", "service_create"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "docker/docker-mcp",
        repo_url: "https://github.com/docker/docker-mcp",
        scan_date: "2024-12-06T07:20:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 3,
        critical_issues: 0,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=docker-mcp",
        scan_passed: true
      },
      sonarqube: {
        total_issues: 3,
        bugs: 0,
        vulnerabilities: 0,
        code_smells: 3,
        security_hotspots: 0,
        quality_gate: "A",
        reliability_rating: "A",
        security_rating: "A",
        maintainability_rating: "A",
        coverage: 91.5,
        duplications: 1.6,
        lines_of_code: 10230
      },
      gitguardian: {
        scan_passed: true,
        total_secrets: 0,
        secrets: [],
        error: null
      },
      bandit: {
        scan_passed: true,
        total_issues: 0,
        severity_counts: { high: 0, medium: 0, low: 0 },
        total_lines_scanned: 10230,
        issues: [],
        error: null
      },
      recommendations: [
        "Robust container isolation with proper security contexts",
        "Image scanning integrated for vulnerability detection",
        "Supports rootless mode for enhanced security",
        "Secrets management using Docker secrets API",
        "Resource limits enforced to prevent container escapes",
        "Regular security patches and updates",
        "Comprehensive logging for audit trails"
      ]
    }
  },
  {
    name: "mongodb-mcp",
    version: "6.1.0",
    description: "MongoDB database MCP server with CRUD operations, aggregation pipelines, indexing, transactions, and Atlas cloud integration",
    author: "MongoDB Inc",
    lang: "JavaScript",
    license: "SSPL",
    entrypoint: "mongo.js",
    repository: {
      type: "github",
      url: "https://github.com/mongodb/mongodb-mcp"
    },
    tools: {
      count: 12,
      names: ["find_documents", "insert_one", "insert_many", "update_one", "delete_documents", "aggregate", "create_index", "start_transaction", "watch_changes", "bulk_write", "text_search", "geospatial_query"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "mongodb/mongodb-mcp",
        repo_url: "https://github.com/mongodb/mongodb-mcp",
        scan_date: "2024-12-07T16:45:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 10,
        critical_issues: 2,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=mongodb-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 6,
        bugs: 2,
        vulnerabilities: 1,
        code_smells: 3,
        security_hotspots: 1,
        quality_gate: "C",
        reliability_rating: "C",
        security_rating: "C",
        maintainability_rating: "B",
        coverage: 73.8,
        duplications: 4.7,
        lines_of_code: 8120
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 1,
        secrets: [{type: "MongoDB Connection URI", line: 12, file: "src/connection.js"}],
        error: null
      },
      bandit: {
        scan_passed: false,
        total_issues: 3,
        severity_counts: { high: 1, medium: 1, low: 1 },
        total_lines_scanned: 8120,
        issues: [
          {severity: "HIGH", line: 234, file: "src/query_builder.js", issue: "Possible code injection via eval-like function"},
          {severity: "MEDIUM", line: 567, file: "src/connection.js", issue: "Missing input validation on user-provided connection strings"},
          {severity: "LOW", line: 89, file: "utils/logger.js", issue: "Logging of sensitive data detected"}
        ],
        error: null
      },
      recommendations: [
        "HIGH: Remove eval-like functions from query builder - use safe alternatives",
        "CRITICAL: Hardcoded MongoDB URI with credentials - move to environment variables",
        "HIGH: NoSQL injection vulnerability in dynamic query construction",
        "MEDIUM: Add strict input validation for connection strings",
        "MEDIUM: Review security hotspot in aggregation pipeline builder",
        "LOW: Improve error handling for connection failures",
        "Enable MongoDB authentication and authorization",
        "Implement connection pooling with proper limits",
        "Add query performance monitoring and optimization"
      ]
    }
  },
  {
    name: "stripe-mcp",
    version: "7.3.2",
    description: "Stripe payment processing MCP server with checkout, subscriptions, invoices, refunds, webhooks, and comprehensive financial operations",
    author: "Stripe",
    lang: "Ruby",
    license: "MIT",
    entrypoint: "stripe_main.rb",
    repository: {
      type: "github",
      url: "https://github.com/stripe/stripe-mcp"
    },
    tools: {
      count: 14,
      names: ["create_payment", "create_subscription", "cancel_subscription", "create_invoice", "process_refund", "list_transactions", "create_customer", "update_customer", "webhook_verify", "payout_create", "dispute_respond", "tax_calculate", "balance_retrieve", "connect_account"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "stripe/stripe-mcp",
        repo_url: "https://github.com/stripe/stripe-mcp",
        scan_date: "2024-12-08T12:30:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 7,
        critical_issues: 0,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=stripe-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 4,
        bugs: 1,
        vulnerabilities: 0,
        code_smells: 3,
        security_hotspots: 1,
        quality_gate: "A",
        reliability_rating: "A",
        security_rating: "A",
        maintainability_rating: "A",
        coverage: 94.2,
        duplications: 1.3,
        lines_of_code: 9870
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 1,
        secrets: [{type: "Stripe Test API Key", line: 456, file: "spec/fixtures/credentials.rb"}],
        error: null
      },
      bandit: {
        scan_passed: false,
        total_issues: 2,
        severity_counts: { high: 0, medium: 2, low: 0 },
        total_lines_scanned: 9870,
        issues: [
          {severity: "MEDIUM", line: 234, file: "lib/webhooks.rb", issue: "Use of deprecated OpenSSL cipher"},
          {severity: "MEDIUM", line: 567, file: "lib/api_client.rb", issue: "Unverified SSL context detected"}
        ],
        error: null
      },
      recommendations: [
        "MEDIUM: Upgrade OpenSSL cipher to modern TLS 1.3 standards",
        "MEDIUM: Enable SSL verification for all API requests",
        "MEDIUM: Remove test API keys from fixture files - use environment variables",
        "PCI DSS compliant with Level 1 certification",
        "Strong encryption for all payment data in transit and at rest",
        "Webhook signature verification properly implemented",
        "Comprehensive error handling for payment failures",
        "Idempotency keys supported to prevent duplicate charges"
      ]
    }
  },
  {
    name: "openai-mcp",
    version: "5.4.1",
    description: "OpenAI API integration MCP server for GPT-4, DALL-E, Whisper, embeddings, fine-tuning, and advanced AI model interactions",
    author: "OpenAI",
    lang: "Python",
    license: "MIT",
    entrypoint: "openai_server.py",
    repository: {
      type: "github",
      url: "https://github.com/openai/openai-mcp"
    },
    tools: {
      count: 11,
      names: ["chat_completion", "text_completion", "image_generation", "image_edit", "audio_transcribe", "audio_translate", "embeddings_create", "fine_tune_model", "moderation_check", "token_count", "model_list"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "openai/openai-mcp",
        repo_url: "https://github.com/openai/openai-mcp",
        scan_date: "2024-12-09T09:15:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 14,
        critical_issues: 4,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=openai-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 8,
        bugs: 3,
        vulnerabilities: 2,
        code_smells: 3,
        security_hotspots: 2,
        quality_gate: "C",
        reliability_rating: "C",
        security_rating: "C",
        maintainability_rating: "B",
        coverage: 71.2,
        duplications: 6.3,
        lines_of_code: 11240
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 2,
        secrets: [
          {type: "OpenAI API Key", line: 34, file: "src/config.py"},
          {type: "OpenAI Organization ID", line: 89, file: "tests/integration/test_api.py"}
        ],
        error: null
      },
      bandit: {
        scan_passed: false,
        total_issues: 4,
        severity_counts: { high: 2, medium: 1, low: 1 },
        total_lines_scanned: 11240,
        issues: [
          {severity: "HIGH", line: 234, file: "src/api_client.py", issue: "Insecure SSL/TLS configuration - verify=False detected"},
          {severity: "HIGH", line: 567, file: "src/prompts.py", issue: "Possible SQL injection through string formatting"},
          {severity: "MEDIUM", line: 89, file: "src/embeddings.py", issue: "Use of pickle - potential code execution vulnerability"},
          {severity: "LOW", line: 345, file: "tests/conftest.py", issue: "Standard pseudo-random generators not suitable for security"}
        ],
        error: null
      },
      recommendations: [
        "CRITICAL: Remove hardcoded OpenAI API keys from codebase - use secure secrets management",
        "CRITICAL: Replace pickle with json for safer data serialization",
        "HIGH: Fix command injection vulnerability in subprocess execution",
        "MEDIUM: Implement input validation for user prompts to prevent prompt injection",
        "MEDIUM: Add rate limiting to prevent API quota exhaustion",
        "LOW: Reduce code duplication in API wrapper functions",
        "Improve test coverage especially for error handling scenarios",
        "Review security hotspots in image processing pipeline"
      ]
    }
  },
  {
    name: "redis-mcp",
    version: "7.2.4",
    description: "Redis cache and data structure server MCP with key-value operations, pub/sub messaging, streams, and cluster management",
    author: "Redis Labs",
    lang: "C",
    license: "BSD-3-Clause",
    entrypoint: "redis.c",
    repository: {
      type: "github",
      url: "https://github.com/redis/redis-mcp"
    },
    tools: {
      count: 15,
      names: ["get_key", "set_key", "delete_key", "hash_operations", "list_push", "list_pop", "set_add", "sorted_set", "publish_message", "subscribe_channel", "stream_add", "transaction_exec", "lua_script", "cluster_info", "memory_stats"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "redis/redis-mcp",
        repo_url: "https://github.com/redis/redis-mcp",
        scan_date: "2024-12-05T11:00:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 9,
        critical_issues: 1,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=redis-mcp",
        scan_passed: false
      },
      sonarqube: {
        total_issues: 8,
        bugs: 2,
        vulnerabilities: 1,
        code_smells: 5,
        security_hotspots: 2,
        quality_gate: "B",
        reliability_rating: "B",
        security_rating: "B",
        maintainability_rating: "B",
        coverage: 84.6,
        duplications: 3.1,
        lines_of_code: 6780
      },
      gitguardian: {
        scan_passed: false,
        total_secrets: 1,
        secrets: [{type: "Redis Password", line: 78, file: "config/redis.conf"}],
        error: null
      },
      bandit: {
        scan_passed: true,
        total_issues: 0,
        severity_counts: { high: 0, medium: 0, low: 0 },
        total_lines_scanned: 6780,
        issues: [],
        error: null
      },
      recommendations: [
        "CRITICAL: Redis password exposed in configuration file - use environment variables",
        "HIGH: Command injection risk in Lua script execution - sanitize inputs",
        "MEDIUM: Enable Redis AUTH to prevent unauthorized access",
        "MEDIUM: Review security hotspots in key expiration logic",
        "LOW: Implement connection limits to prevent DoS attacks",
        "Use TLS encryption for client-server communication",
        "Configure persistence options for data durability"
      ]
    }
  },
  {
    name: "WeatherMCP",
    version: "1.0.2",
    description: "Real-time weather data and forecasts using Open-Meteo API with geocoding support for cities worldwide, temperature tracking, and timezone information",
    author: "arush3218",
    lang: "Python",
    license: "MIT",
    entrypoint: "app.py",
    repository: {
      type: "github",
      url: "https://github.com/arush3218/WeatherMCP"
    },
    tools: {
      count: 4,
      names: ["get_weather", "fetch_coordinates", "validate_city", "build_response"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "arush3218/WeatherMCP",
        repo_url: "https://github.com/arush3218/WeatherMCP",
        scan_date: "2024-12-01T18:30:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 1,
        critical_issues: 0,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=weathermcp",
        scan_passed: true
      },
      sonarqube: {
        total_issues: 1,
        bugs: 0,
        vulnerabilities: 0,
        code_smells: 1,
        security_hotspots: 0,
        quality_gate: "A",
        reliability_rating: "A",
        security_rating: "A",
        maintainability_rating: "A",
        coverage: 92.3,
        duplications: 0.8,
        lines_of_code: 109
      },
      gitguardian: {
        scan_passed: true,
        total_secrets: 0,
        secrets: [],
        error: null
      },
      bandit: {
        scan_passed: true,
        total_issues: 0,
        severity_counts: { high: 0, medium: 0, low: 0 },
        total_lines_scanned: 109,
        issues: [],
        error: null
      },
      recommendations: [
        "Clean implementation following Python best practices",
        "Well-structured code with proper error handling",
        "Input validation prevents malformed requests",
        "API timeout protection against hanging requests",
        "Minimal dependencies reducing attack surface",
        "Type hints throughout for better code safety"
      ]
    }
  },
  {
    name: "LocationMCP",
    version: "1.1.0",
    description: "IP-based geolocation service providing accurate location data including coordinates, city, region, and country information using IPInfo API",
    author: "arush3218",
    lang: "Python",
    license: "MIT",
    entrypoint: "app.py",
    repository: {
      type: "github",
      url: "https://github.com/arush3218/LocationMCP"
    },
    tools: {
      count: 5,
      names: ["get_location", "fetch_geolocation", "parse_coordinates", "extract_fields", "format_location"]
    },
    pricing: {
      currency: "USD",
      amount: 0
    },
    security_report: {
      metadata: {
        repository: "arush3218/LocationMCP",
        repo_url: "https://github.com/arush3218/LocationMCP",
        scan_date: "2024-12-02T09:45:00Z",
        scanners_used: ["sonarqube", "gitguardian", "bandit"]
      },
      summary: {
        total_issues_all_scanners: 0,
        critical_issues: 0,
        sonarcloud_url: "https://sonarcloud.io/dashboard?id=locationmcp",
        scan_passed: true
      },
      sonarqube: {
        total_issues: 0,
        bugs: 0,
        vulnerabilities: 0,
        code_smells: 0,
        security_hotspots: 0,
        quality_gate: "A",
        reliability_rating: "A",
        security_rating: "A",
        maintainability_rating: "A",
        coverage: 95.2,
        duplications: 0.3,
        lines_of_code: 84
      },
      gitguardian: {
        scan_passed: true,
        total_secrets: 0,
        secrets: [],
        error: null
      },
      bandit: {
        scan_passed: true,
        total_issues: 0,
        severity_counts: { high: 0, medium: 0, low: 0 },
        total_lines_scanned: 84,
        issues: [],
        error: null
      },
      recommendations: [
        "Perfect code quality with zero technical debt",
        "Zero security issues detected in all scans",
        "Comprehensive error handling for all edge cases",
        "IP address never logged or stored",
        "Respects user privacy with minimal data collection",
        "GDPR compliant geolocation handling",
        "Safe deserialization of JSON responses"
      ]
    }
  }
];

// Mock reviews with realistic Indian names and feedback
export const MOCK_REVIEWS = [
  {
    id: "rev-001",
    serverName: "bharat-payments",
    author: "Rajesh Kumar",
    rating: 5,
    date: "2024-11-20",
    comment: "Excellent integration with UPI! Implemented in our e-commerce platform and transaction success rate is 98%. PhonePe and Google Pay integration works flawlessly.",
    helpful: 24
  },
  {
    id: "rev-002",
    serverName: "bharat-payments",
    author: "Priya Sharma",
    rating: 4,
    date: "2024-11-15",
    comment: "Great tool for payment processing. Documentation could be better but overall very satisfied. Razorpay webhook handling is smooth.",
    helpful: 18
  },
  {
    id: "rev-003",
    serverName: "indianrail-tracker",
    author: "Amit Patel",
    rating: 5,
    date: "2024-11-18",
    comment: "Amazing! Built a travel app using this. PNR status and live train tracking are spot on. Saved hours of development time.",
    helpful: 31
  },
  {
    id: "rev-004",
    serverName: "indianrail-tracker",
    author: "Sneha Reddy",
    rating: 4,
    date: "2024-11-12",
    comment: "Very useful for checking train schedules and seat availability. The fare calculator is accurate. Would love to see more features like coach composition.",
    helpful: 15
  },
  {
    id: "rev-005",
    serverName: "aadhaar-verify",
    author: "Vikram Singh",
    rating: 5,
    date: "2024-11-22",
    comment: "Perfect for our KYC requirements. UIDAI compliant and secure. OTP verification is quick and reliable. Highly recommended for fintech apps.",
    helpful: 28
  },
  {
    id: "rev-006",
    serverName: "swiggy-zomato-api",
    author: "Ananya Iyer",
    rating: 4,
    date: "2024-11-10",
    comment: "Good aggregator for food delivery. Restaurant search works well. Sometimes API rate limits are hit during peak hours but overall great value.",
    helpful: 22
  },
  {
    id: "rev-007",
    serverName: "gst-invoice-generator",
    author: "Suresh Gupta",
    rating: 5,
    date: "2024-11-25",
    comment: "Must-have for any business in India! GST calculations are accurate, e-invoice generation is seamless. GSTIN verification is instant. Worth every rupee!",
    helpful: 35
  },
  {
    id: "rev-008",
    serverName: "cricket-live-scores",
    author: "Karan Mehta",
    rating: 5,
    date: "2024-11-08",
    comment: "Cricket fan's dream! Ball-by-ball commentary during IPL was super fast. Fantasy tips feature is a bonus. Free tier is generous!",
    helpful: 42
  },
  {
    id: "rev-009",
    serverName: "cricket-live-scores",
    author: "Deepak Joshi",
    rating: 4,
    date: "2024-11-05",
    comment: "Excellent for live scores but video highlights could be better. Player stats are comprehensive. Great for cricket enthusiasts.",
    helpful: 19
  },
  {
    id: "rev-010",
    serverName: "bharatmap-navigation",
    author: "Meera Nair",
    rating: 5,
    date: "2024-11-28",
    comment: "Best navigation tool for Indian roads! Toll calculator saved me money. Traffic updates are accurate. MapMyIndia integration is excellent.",
    helpful: 27
  },
  {
    id: "rev-011",
    serverName: "bollywood-recommender",
    author: "Rohit Verma",
    rating: 4,
    date: "2024-11-14",
    comment: "Fun tool for movie nights! Recommendations are pretty good. OTT platform search across Netflix, Prime, and Hotstar is convenient.",
    helpful: 16
  },
  {
    id: "rev-012",
    serverName: "ayurveda-chatbot",
    author: "Lakshmi Krishnan",
    rating: 5,
    date: "2024-11-19",
    comment: "Wonderful resource for Ayurvedic knowledge! Dosha analysis was insightful. Herb recommendations are practical. Definitely consulting my doctor alongside.",
    helpful: 21
  },
  {
    id: "rev-013",
    serverName: "indian-stock-analyzer",
    author: "Sanjay Agarwal",
    rating: 5,
    date: "2024-11-27",
    comment: "Professional grade stock analysis! NSE/BSE data is real-time. Portfolio tracking and SIP calculator are excellent. Zerodha integration works perfectly.",
    helpful: 38
  },
  {
    id: "rev-014",
    serverName: "indian-stock-analyzer",
    author: "Neha Kapoor",
    rating: 4,
    date: "2024-11-21",
    comment: "Great for beginners and professionals. Technical analysis charts are detailed. Mutual fund info is comprehensive. Slightly expensive but worth it.",
    helpful: 23
  },
  {
    id: "rev-015",
    serverName: "gst-invoice-generator",
    author: "Manish Jain",
    rating: 4,
    date: "2024-11-16",
    comment: "Simplified our billing process. HSN code lookup is handy. E-way bill generation needs minor improvements. Overall solid product.",
    helpful: 14
  },
  {
    id: "rev-016",
    serverName: "WeatherMCP",
    author: "Ravi Shankar",
    rating: 5,
    date: "2024-11-30",
    comment: "Incredibly useful weather tool! Geocoding works perfectly for any city. The Open-Meteo integration is fast and accurate. Perfect for our travel app!",
    helpful: 29
  },
  {
    id: "rev-017",
    serverName: "WeatherMCP",
    author: "Pooja Desai",
    rating: 5,
    date: "2024-11-26",
    comment: "Clean and simple implementation. Temperature data is always accurate. Love that it's free and open source. Great work on the timezone support!",
    helpful: 17
  },
  {
    id: "rev-018",
    serverName: "WeatherMCP",
    author: "Aditya Singh",
    rating: 4,
    date: "2024-11-22",
    comment: "Very reliable weather service. Works great for international cities too. Would be nice to have humidity and wind speed data as well.",
    helpful: 12
  },
  {
    id: "rev-019",
    serverName: "LocationMCP",
    author: "Kavita Rao",
    rating: 5,
    date: "2024-12-01",
    comment: "Fantastic geolocation tool! IP-based location detection is spot-on. Coordinates are precise and the city/region data is always correct. Must-have!",
    helpful: 33
  },
  {
    id: "rev-020",
    serverName: "LocationMCP",
    author: "Rahul Khanna",
    rating: 5,
    date: "2024-11-29",
    comment: "Simple yet powerful! IPInfo integration works seamlessly. Perfect for our location-based services. Zero configuration needed, just works!",
    helpful: 26
  },
  {
    id: "rev-021",
    serverName: "LocationMCP",
    author: "Shruti Malhotra",
    rating: 4,
    date: "2024-11-24",
    comment: "Great tool for geolocation. Very lightweight and fast. The coordinate parsing is excellent. Would love to see additional metadata options.",
    helpful: 19
  }
];

// Function to get reviews for a specific server
export function getReviewsForServer(serverName: string) {
  return MOCK_REVIEWS.filter(review => review.serverName === serverName);
}

// Function to get all servers (for marketplace) - includes user-created servers
export function getAllServers() {
  const userCreated = loadUserCreatedServers();
  return [...MOCK_SERVERS, ...userCreated];
}

// Function to get a specific server by name - checks both mock and user-created
export function getServerByName(name: string) {
  const allServers = getAllServers();
  return allServers.find(server => server.name === name);
}

// Function to get user's servers (for my-servers page)
export function getUserServers() {
  const userCreated = loadUserCreatedServers();
  // Return user-created servers plus featured mock servers
  const featuredServers = [
    MOCK_SERVERS.find(s => s.name === "WeatherMCP")!,
    MOCK_SERVERS.find(s => s.name === "LocationMCP")!,
  ];
  return [...userCreated, ...featuredServers];
}

// Function to add a new user-created server
export function addUserServer(serverData: any): ServerResponse {
  const currentTime = new Date().toISOString();
  const seed = serverData.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  
  // Create a complete ServerResponse object with security report
  const newServer: ServerResponse = {
    name: serverData.name,
    version: serverData.version || "1.0.0",
    description: serverData.description,
    author: serverData.author,
    lang: serverData.lang,
    license: serverData.license,
    entrypoint: serverData.entrypoint,
    repository: serverData.repository,
    tools: {
      count: Math.max(1, ((seed * 7) % 10) + 1),
      names: generateToolNames(serverData.name, ((seed * 7) % 10) + 1)
    },
    pricing: {
      currency: serverData.pricing.currency || "USD",
      amount: serverData.pricing.amount || 0
    },
    security_report: generateSecurityReport(serverData.name, serverData.repository.url, currentTime)
  };

  const userServers = loadUserCreatedServers();
  userServers.push(newServer);
  saveUserCreatedServers(userServers);
  
  return newServer;
}

// Function to delete a user-created server
export function deleteUserServer(serverName: string): boolean {
  const userServers = loadUserCreatedServers();
  const filtered = userServers.filter(s => s.name !== serverName);
  
  if (filtered.length === userServers.length) {
    return false; // Server not found
  }
  
  saveUserCreatedServers(filtered);
  return true;
}

// Helper function to generate tool names based on server name
function generateToolNames(serverName: string, count: number): string[] {
  const commonActions = ['get', 'fetch', 'update', 'create', 'delete', 'list', 'search', 'validate', 'process', 'analyze'];
  const tools: string[] = [];
  const baseName = serverName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  for (let i = 0; i < count; i++) {
    const action = commonActions[i % commonActions.length];
    tools.push(`${action}_${baseName}`);
  }
  
  return tools;
}

// Helper function to generate realistic security report for new servers
function generateSecurityReport(serverName: string, repoUrl: string, scanDate: string) {
  const seed = serverName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const totalIssues = (seed % 5); // 0-4 issues
  const criticalIssues = totalIssues > 3 ? 1 : 0;
  const bugs = Math.floor(totalIssues / 3);
  const codeSmells = totalIssues - bugs;
  const coverage = 75 + ((seed % 20));
  const loc = 500 + ((seed * 13) % 3000);
  const scanPassed = criticalIssues === 0;
  
  const qualityGate = totalIssues === 0 ? "A" : totalIssues <= 2 ? "B" : "C";
  
  const recommendations = generateSecurityRecommendations(totalIssues, criticalIssues, coverage);
  
  return {
    metadata: {
      repository: serverName,
      repo_url: repoUrl,
      scan_date: scanDate,
      scanners_used: ["sonarqube", "gitguardian", "bandit"]
    },
    summary: {
      total_issues_all_scanners: totalIssues,
      critical_issues: criticalIssues,
      sonarcloud_url: `https://sonarcloud.io/dashboard?id=${serverName}`,
      scan_passed: scanPassed
    },
    sonarqube: {
      total_issues: totalIssues,
      bugs: bugs,
      vulnerabilities: criticalIssues,
      code_smells: codeSmells,
      security_hotspots: 0,
      quality_gate: qualityGate,
      reliability_rating: qualityGate,
      security_rating: scanPassed ? "A" : "B",
      maintainability_rating: qualityGate,
      coverage: coverage,
      duplications: (seed % 3) + 0.5,
      lines_of_code: loc
    },
    gitguardian: {
      scan_passed: true,
      total_secrets: 0,
      secrets: [],
      error: null
    },
    bandit: {
      scan_passed: scanPassed,
      total_issues: criticalIssues,
      severity_counts: { 
        high: criticalIssues, 
        medium: bugs, 
        low: codeSmells 
      },
      total_lines_scanned: loc,
      issues: [],
      error: null
    },
    recommendations: recommendations
  };
}

// Generate diverse security recommendations based on scan results
function generateSecurityRecommendations(totalIssues: number, criticalIssues: number, coverage: number): string[] {
  const recs: string[] = [];
  
  if (totalIssues === 0) {
    recs.push("Excellent code quality with zero issues detected");
    recs.push("All security best practices followed");
    recs.push("Regular security audits recommended to maintain standards");
  } else {
    if (criticalIssues > 0) {
      recs.push("⚠️ Critical vulnerabilities detected - immediate fix required");
      recs.push("Review and patch security vulnerabilities before production");
      recs.push("Implement security scanning in CI/CD pipeline");
    } else {
      recs.push("Good security posture with minor improvements needed");
    }
    
    if (totalIssues > 3) {
      recs.push("Refactor code to reduce complexity and improve maintainability");
      recs.push("Add comprehensive error handling for edge cases");
    }
  }
  
  if (coverage < 80) {
    recs.push(`Increase test coverage from ${coverage}% to at least 80%`);
    recs.push("Add unit tests for critical business logic");
  } else {
    recs.push(`Great test coverage at ${coverage}% - keep it up!`);
  }
  
  // Add general security recommendations
  const generalRecs = [
    "Implement input validation and sanitization",
    "Use environment variables for sensitive configuration",
    "Enable HTTPS/TLS for all communications",
    "Implement rate limiting to prevent abuse",
    "Add logging and monitoring for security events",
    "Keep dependencies up to date with security patches",
    "Use parameterized queries to prevent SQL injection",
    "Implement proper authentication and authorization",
    "Add CORS configuration for API endpoints",
    "Regular dependency scanning with automated tools"
  ];
  
  // Add 2-3 random general recommendations
  const seed = totalIssues + criticalIssues + coverage;
  const count = 2 + (seed % 2);
  for (let i = 0; i < count; i++) {
    const idx = (seed * (i + 1)) % generalRecs.length;
    if (!recs.includes(generalRecs[idx])) {
      recs.push(generalRecs[idx]);
    }
  }
  
  return recs;
}

// Helper function to generate consistent stats based on server name (makes data look natural, not random)
export function generateServerStats(serverName: string) {
  const seed = serverName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    stars: ((seed * 17) % 450) + 100,
    downloads: ((seed * 23) % 80) + 20,
    views: ((seed * 31) % 2000) + 500,
    forks: ((seed * 13) % 50) + 5,
  };
}
