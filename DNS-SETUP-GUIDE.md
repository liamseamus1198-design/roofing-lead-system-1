# 🌐 DNS Setup Guide for TheStormProfessional.com

## The Issue: Vercel vs Domain Registrar

**Vercel cannot update your domain registrar directly.** You need to:
1. **Deploy to Vercel** (get your Vercel URL)
2. **Update DNS records** at your domain registrar
3. **Point your domain** to Vercel's servers

---

## Step 1: Get Your Vercel URL

First, let's deploy your site to Vercel to get the URL:

```bash
# Run this to deploy and get your Vercel URL
npx vercel --prod --yes
```

After deployment, you'll get a URL like: `https://your-project-name.vercel.app`

---

## Step 2: Update DNS at Your Domain Registrar

### Common Domain Registrars:

#### **GoDaddy:**
1. Go to [godaddy.com](https://godaddy.com) and sign in
2. Click "My Products" → "DNS"
3. Find "TheStormProfessional.com" → "Manage DNS"
4. Add these records:

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 600 (or default)
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 (or default)
```

#### **Namecheap:**
1. Go to [namecheap.com](https://namecheap.com) and sign in
2. Click "Domain List" → "Manage" → "Advanced DNS"
3. Add these records:

```
Type: A Record
Host: @
Value: 76.76.19.19
TTL: Automatic
```

```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

#### **Google Domains:**
1. Go to [domains.google](https://domains.google) and sign in
2. Click "TheStormProfessional.com" → "DNS"
3. Add these records:

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### **Cloudflare:**
1. Go to [cloudflare.com](https://cloudflare.com) and sign in
2. Select "TheStormProfessional.com" → "DNS"
3. Add these records:

```
Type: A
Name: @
Content: 76.76.19.19
Proxy status: DNS only (gray cloud)
```

```
Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy status: DNS only (gray cloud)
```

---

## Step 3: Connect Domain in Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Click **"Add Domain"**
5. Enter: `TheStormProfessional.com`
6. Click **"Add"**
7. Vercel will show you the exact DNS records needed

---

## Step 4: Verify DNS Propagation

After updating DNS records, check propagation:

```bash
# Check if DNS is propagating
nslookup TheStormProfessional.com
dig TheStormProfessional.com
```

**DNS propagation can take 24-48 hours**, but often works within 1-2 hours.

---

## Troubleshooting

### "Vercel won't let me update registrar"
- **Vercel doesn't update registrars** - you must do this manually
- **Vercel only provides the DNS values** - you add them at your registrar

### "Domain not found"
- Check if you're at the right registrar
- Verify domain ownership
- Wait for DNS propagation

### "SSL Certificate issues"
- Vercel provides automatic SSL
- Wait 24-48 hours after DNS setup
- Check Vercel dashboard for SSL status

---

## Quick Commands

```bash
# Deploy to Vercel
npx vercel --prod --yes

# Check DNS propagation
nslookup TheStormProfessional.com
dig TheStormProfessional.com

# Test website
curl -I https://TheStormProfessional.com
```

---

## Need Help?

1. **Which domain registrar are you using?** (GoDaddy, Namecheap, etc.)
2. **What specific error message** are you seeing?
3. **Have you deployed to Vercel** and gotten a URL?

Let me know your registrar and I can provide specific step-by-step instructions! 