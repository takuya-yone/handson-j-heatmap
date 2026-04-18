#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# ローカルから S3 + CloudFront へデプロイするスクリプト
#
# 使い方:
#   1. .env.deploy をコピーして値を設定
#      cp .env.deploy.example .env.deploy
#   2. 実行
#      ./scripts/deploy-aws.sh
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$ROOT_DIR/.env.deploy"

# .env.deploy を読み込む
if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
else
  echo "❌ .env.deploy が見つかりません。.env.deploy.example をコピーして設定してください。"
  exit 1
fi

: "${AWS_REGION:?AWS_REGION が未設定です}"
: "${S3_BUCKET:?S3_BUCKET が未設定です}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?CLOUDFRONT_DISTRIBUTION_ID が未設定です}"

echo "🔨 Build..."
cd "$ROOT_DIR"
pnpm run build

echo ""
echo "📦 S3 にアップロード中... (bucket: $S3_BUCKET)"

# assets/ はハッシュ付きファイル名のため長期キャッシュ
aws s3 sync dist/ "s3://$S3_BUCKET" \
  --region "$AWS_REGION" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

# index.html はキャッシュさせない
aws s3 cp dist/index.html "s3://$S3_BUCKET/index.html" \
  --region "$AWS_REGION" \
  --cache-control "no-cache, no-store, must-revalidate"

echo ""
echo "🔄 CloudFront キャッシュを無効化中..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo "   Invalidation ID: $INVALIDATION_ID"
echo ""
echo "✅ デプロイ完了！"
