# 🌐 Domain Setup Guide for TheStormProfessional.com

## Quick Deploy to Your Domain

### Step 1: Deploy to Vercel
```bash
# Run the deployment script
./deploy.sh
```

### Step 2: Connect Your Domain in Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your domain: `TheStormProfessional.com`
5. Follow the DNS configuration instructions

### Step 3: Update DNS Records
Add these records to your domain registrar:

**For Vercel:**
```
Type: A
Name: @
Value: 76.76.19.19
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Option 2: Traditional Hosting (cPanel, etc.)

### Step 1: Prepare Files for Upload
```bash
# Build optimized version
npm run build

# Files to upload:
# - public/index.html
# - public/styles.css  
# - public/script.js
# - public/images/
# - server.js
# - package.json
# - leads.json
```

### Step 2: Upload to Hosting
1. Upload files to your hosting provider
2. Set `index.html` as your default page
3. Configure Node.js hosting (if using server.js)

---

## Option 3: Netlify Deployment

### Step 1: Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=public
```

### Step 2: Connect Domain
1. Go to Netlify dashboard
2. Add custom domain: `TheStormProfessional.com`
3. Update DNS records as instructed

---

## DNS Configuration Checklist

### Required DNS Records:
- **A Record**: Points domain to hosting IP
- **CNAME Record**: Points www to main domain
- **MX Records**: For email (if needed)
- **TXT Records**: For verification

### Common Domain Registrars:
- **GoDaddy**: DNS Management → DNS Records
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Google Domains**: DNS → Manage Custom Records
- **Cloudflare**: DNS → Records

---

## SSL Certificate Setup

### Automatic (Recommended):
- Vercel/Netlify provide free SSL
- Traditional hosting: Enable Let's Encrypt

### Manual:
- Purchase SSL certificate
- Install on hosting server
- Configure redirects (HTTP → HTTPS)

---

## Testing Your Domain

### 1. Check DNS Propagation
```bash
# Check if domain resolves
nslookup TheStormProfessional.com
dig TheStormProfessional.com
```

### 2. Test Website
- Visit: https://TheStormProfessional.com
- Test: https://www.TheStormProfessional.com
- Check mobile responsiveness
- Test contact form functionality

### 3. Performance Check
- Google PageSpeed Insights
- GTmetrix
- Pingdom

---

## Troubleshooting

### Common Issues:
1. **DNS Not Propagated**: Wait 24-48 hours
2. **SSL Errors**: Check certificate installation
3. **404 Errors**: Verify file paths and hosting configuration
4. **Slow Loading**: Optimize images and enable caching

### Support Contacts:
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Netlify**: [netlify.com/support](https://netlify.com/support)
- **Domain Registrar**: Check your registrar's support

---

## Next Steps After Domain Setup

1. **Set up Google Analytics**
2. **Configure Google Search Console**
3. **Set up email forwarding** (info@TheStormProfessional.com)
4. **Create social media accounts**
5. **Set up business listings** (Google My Business, etc.)

---

## Quick Commands

```bash
# Deploy to Vercel
./deploy.sh

# Build for traditional hosting
npm run build

# Test locally
npm run dev

# Check domain status
curl -I https://TheStormProfessional.com
```

---

**Need Help?** Check your hosting provider's documentation or contact their support team. 