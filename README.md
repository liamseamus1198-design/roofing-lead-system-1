# The Storm Professional - Roof Lead Generation Website

A professional, responsive website for generating roofing leads with storm damage assessment capabilities. Built for The Storm Professional serving Florida's Treasure Coast. Visit TheStormProfessional.com

## Features

- **Professional Design**: Clean, modern interface optimized for lead generation
- **Storm Maps Integration**: Interactive storm damage maps for affected areas
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Lead Capture Form**: Professional contact form with validation
- **Real-time Lead Storage**: Backend API to capture and store leads
- **Storm Damage Assessment**: Detailed storm activity reporting
- **Service Area Coverage**: Sebastian, Vero Beach, Palm Bay, Melbourne, Satellite Beach

## Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd roofing-lead-system-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Development Mode
For development with auto-restart on file changes:
```bash
npm run dev
```

## Project Structure

```
roofing-lead-system-1/
├── public/                 # Static files
│   ├── images/            # Images and photos
│   │   ├── roofing/       # Roofing project photos
│   │   └── storm-maps/    # Storm damage maps
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Custom CSS styles
│   └── script.js          # Frontend JavaScript
├── server.js              # Node.js backend server
├── package.json           # Dependencies and scripts
├── leads.json             # Lead storage (created automatically)
└── README.md              # This file
```

## Features Breakdown

### 1. Professional Header
- Company branding and contact information
- Mobile-responsive navigation
- Call-to-action buttons

### 2. Hero Section
- Compelling headline and value proposition
- Professional roofing gallery
- Service area information
- Storm damage alerts

### 3. Storm Maps Section
- Interactive storm damage maps
- Detailed storm activity reports
- Coverage area analysis
- Professional assessment information

### 4. Contact Form
- Professional lead capture form
- Form validation
- Success/error feedback
- Mobile-optimized design

### 5. Services Section
- Professional roofing services overview
- Emergency service information
- Trust indicators

## API Endpoints

### POST /api/leads
Submit a new lead:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "address": "123 Main St, Vero Beach, FL"
}
```

### GET /api/leads
Retrieve all submitted leads (for admin purposes)

## Lead Management

Leads are automatically saved to `leads.json` in the project root. Each lead includes:
- Contact information
- Submission timestamp
- Unique lead ID
- Source tracking

## Customization

### Updating Contact Information
Edit the phone number and contact details in `public/index.html`

### Adding New Storm Maps
1. Add map images to `public/images/storm-maps/`
2. Update the `stormMaps` configuration in `public/script.js`

### Modifying Service Areas
Update the service area information in the hero section of `public/index.html`

### Styling Changes
Modify `public/styles.css` for custom styling

## Deployment

### Local Development
The website runs on `http://localhost:3000` by default

### Production Deployment
1. Set up a production server (Heroku, DigitalOcean, AWS, etc.)
2. Install Node.js on the server
3. Upload the project files
4. Run `npm install` to install dependencies
5. Start the server with `npm start`
6. Configure environment variables as needed

### Environment Variables
- `PORT`: Server port (default: 3000)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images for web
- Minified CSS and JavaScript
- Responsive design for all screen sizes
- Fast loading times

## Security

- Form validation on both client and server side
- Input sanitization
- Secure lead storage

## Support

For technical support or questions about the website:
- Contact: The Storm Professional
- Phone: 954-531-8040
- Service Areas: Sebastian, Vero Beach, Palm Bay, Melbourne, Satellite Beach

## License

This project is proprietary software for The Storm Professional.

---

**The Storm Professional** - Licensed Roof Inspector
Professional Storm Damage Assessment Available
954-531-8040 | 24/7 Emergency Service 