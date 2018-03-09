#!/usr/bin/env bash

source .env

hugo

aws configure set default.s3.signature_version s3v4
aws s3 sync public $S3_BUCKET_URL --delete
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"