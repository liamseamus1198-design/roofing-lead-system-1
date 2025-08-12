#!/bin/bash

# Deployment Script for TheStormProfessional.com
echo "🚀 Deploying The Storm Professional to TheStormProfessional.com"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to production
echo "🌐 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌍 Your updated site should now be live at TheStormProfessional.com"
echo "📧 Check your email for deployment confirmation" 