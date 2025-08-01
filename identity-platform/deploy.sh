#!/bin/bash

# BrainSAIT Identity Platform Deployment Script
# This script deploys the identity platform to Cloudflare Pages

set -e

echo "🚀 BrainSAIT Identity Platform Deployment"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the identity-platform directory."
    exit 1
fi

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "Please login to Cloudflare:"
    wrangler auth login
fi

# Deploy to Cloudflare Pages
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy . --project-name=brainsait-identity --compatibility-date=2024-08-01

echo "✅ Deployment completed!"
echo ""
echo "🔗 Platform URLs:"
echo "   Production: https://id.brainsait.io"
echo "   Preview: https://brainsait-identity.pages.dev"
echo ""
echo "🔧 Next Steps:"
echo "   1. Configure custom domain 'id.brainsait.io' in Cloudflare Pages dashboard"
echo "   2. Update DNS records to point to Cloudflare Pages"
echo "   3. Test authentication flows"
echo "   4. Monitor security logs"
echo ""
echo "📚 Documentation: https://github.com/Fadil369/brainsait.io/tree/main/identity-platform"
