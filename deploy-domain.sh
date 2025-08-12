#!/bin/bash

# 🌐 Domain Deployment Script for TheStormProfessional.com
echo "🚀 Deploying The Storm Professional to TheStormProfessional.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  TheStormProfessional.com     ${NC}"
echo -e "${BLUE}  Domain Deployment Script     ${NC}"
echo -e "${BLUE}================================${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from your project root directory${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Step 2: Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

# Step 3: Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Step 4: Deploy to Vercel
echo -e "${YELLOW}🌐 Deploying to Vercel...${NC}"
vercel --prod

# Step 5: Provide next steps
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}🌍 Next Steps to Connect Your Domain:${NC}"
echo ""
echo "1. Go to https://vercel.com/dashboard"
echo "2. Select your project"
echo "3. Go to Settings → Domains"
echo "4. Add your domain: TheStormProfessional.com"
echo "5. Follow the DNS configuration instructions"
echo ""
echo -e "${YELLOW}📋 DNS Records to Add:${NC}"
echo "Type: A"
echo "Name: @"
echo "Value: 76.76.19.19"
echo ""
echo "Type: CNAME"
echo "Name: www"
echo "Value: cname.vercel-dns.com"
echo ""
echo -e "${GREEN}🎉 Your site will be live at TheStormProfessional.com once DNS propagates!${NC}"
echo ""
echo -e "${BLUE}📞 Need help? Check DOMAIN-SETUP.md for detailed instructions${NC}" 