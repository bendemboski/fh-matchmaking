#!/bin/bash

echo "decrypting credentials..."
mkdir -p ~/.aws
openssl aes-256-cbc -K $encrypted_388f6c49a1a2_key -iv $encrypted_388f6c49a1a2_iv -in ci/aws-credentials.enc -out ~/.aws/credentials -d
echo "deploying to development..."
yarn deploy --activate development
echo "deploying to staging..."
yarn deploy --activate staging
echo "deploying to production..."
yarn deploy production