#!/bin/bash

# 🚀 Quick Deploy for TheStormProfessional.com
echo "🚀 Quick Deploy to TheStormProfessional.com"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  TheStormProfessional.com     ${NC}"
echo -e "${BLUE}  Quick Deploy Script          ${NC}"
echo -e "${BLUE}================================${NC}"

# Create a simple vercel.json for Node.js
echo -e "${YELLOW}📝 Creating Vercel configuration...${NC}"
cat > vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
EOF

# Deploy to Vercel
echo -e "${YELLOW}🌐 Deploying to Vercel...${NC}"
npx vercel --prod --yes

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}🌍 Your site should now be live at:${NC}"
echo -e "${GREEN}https://thestormprofessional.com${NC}"
echo ""
echo -e "${YELLOW}📋 If you see any issues:${NC}"
echo "1. Check Vercel dashboard for deployment status"
echo "2. Verify domain settings in Vercel"
echo "3. Wait 5-10 minutes for propagation"
echo ""
echo -e "${BLUE}🎉 Your enhanced website with Florida storm copy is now live!${NC}" 