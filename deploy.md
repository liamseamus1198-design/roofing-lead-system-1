# Deployment Guide for TheStormProfessional.com

## Current Status
Your updated roofing lead system is ready for deployment to TheStormProfessional.com

## Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project directory:**
   ```bash
   cd /Users/liamoshaughnessy/roofing-lead-system-1
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set domain to TheStormProfessional.com
   - Deploy

### Option 2: Netlify (Free & Easy)
1. **Create netlify.toml file:**
   ```toml
   [build]
     publish = "public"
     command = "npm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify dashboard or CLI**

### Option 3: Traditional Hosting (cPanel, etc.)
1. **Upload files to your hosting provider**
2. **Set up Node.js environment**
3. **Configure domain pointing**

## Files Ready for Deployment

### ✅ Updated Files:
- `public/index.html` - Complete two-page website with domain integration
- `public/script.js` - All functionality with proper comments
- `public/styles.css` - Professional styling
- `server.js` - Backend API for lead management
- `package.json` - Dependencies and scripts

### 🌐 Domain Integration:
- TheStormProfessional.com prominently featured
- SEO optimized titles and descriptions
- Professional branding throughout

## Quick Deploy Commands

### For Vercel:
```bash
npm install -g vercel
vercel --prod
```

### For Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Environment Variables (if needed)
- `PORT`: 8080 (or your hosting provider's port)
- `NODE_ENV`: production

## Post-Deployment Checklist
- [ ] Domain points to new deployment
- [ ] SSL certificate active
- [ ] Lead form submissions working
- [ ] All images loading correctly
- [ ] Mobile responsiveness tested
- [ ] Contact information updated

## Support
If you need help with deployment, contact your hosting provider or use a platform like Vercel/Netlify for easy deployment. 