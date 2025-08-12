const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Store leads in a JSON file (in production, use a database)
const LEADS_FILE = 'leads.json';

// Ensure leads file exists
if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

// API endpoint to handle lead submissions
app.post('/api/leads', (req, res) => {
    try {
        const leadData = {
            ...req.body,
            id: Date.now(),
            submittedAt: new Date().toISOString()
        };

        // Read existing leads
        const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
        
        // Add new lead
        leads.push(leadData);
        
        // Save back to file
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
        
        // Log the lead (in production, you might want to send emails, SMS, etc.)
        console.log('New lead received:', leadData);
        
        res.status(200).json({ 
            success: true, 
            message: 'Lead submitted successfully',
            leadId: leadData.id
        });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving lead' 
        });
    }
});

// API endpoint to get all leads (for admin purposes)
app.get('/api/leads', (req, res) => {
    try {
        const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
        res.json(leads);
    } catch (error) {
        console.error('Error reading leads:', error);
        res.status(500).json({ error: 'Error reading leads' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Leads will be saved to: ${LEADS_FILE}`);
}); 
