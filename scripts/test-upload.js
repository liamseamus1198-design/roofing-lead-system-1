const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Test configuration
const BASE_URL = 'http://localhost:8080';
const TEST_IMAGE_PATH = path.join(__dirname, '..', 'public', 'images', 'roofing-lead-1.jpeg');

async function testAPI() {
    console.log('🧪 Testing Roofing Lead System API...\n');

    try {
        // Test 1: Get configuration
        console.log('1. Testing configuration endpoint...');
        const configResponse = await fetch(`${BASE_URL}/api/config`);
        const config = await configResponse.json();
        console.log('✅ Configuration:', config);
        console.log('');

        // Test 2: Get storage statistics
        console.log('2. Testing file listing...');
        const filesResponse = await fetch(`${BASE_URL}/api/files?type=images`);
        const files = await filesResponse.json();
        console.log(`✅ Found ${files.length} image files`);
        console.log('');

        // Test 3: Get leads
        console.log('3. Testing leads endpoint...');
        const leadsResponse = await fetch(`${BASE_URL}/api/leads`);
        const leads = await leadsResponse.json();
        console.log(`✅ Found ${leads.length} leads`);
        console.log('');

        // Test 4: Submit a test lead
        console.log('4. Testing lead submission...');
        const testLead = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '555-123-4567',
            address: '123 Test St, Test City, FL',
            description: 'Test lead submission from API test script',
            files: []
        };

        const leadResponse = await fetch(`${BASE_URL}/api/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testLead)
        });

        const leadResult = await leadResponse.json();
        console.log('✅ Lead submission result:', leadResult);
        console.log('');

        // Test 5: File upload (if test image exists)
        if (fs.existsSync(TEST_IMAGE_PATH)) {
            console.log('5. Testing file upload...');
            
            const form = new FormData();
            form.append('file', fs.createReadStream(TEST_IMAGE_PATH));
            
            const uploadResponse = await fetch(`${BASE_URL}/api/upload`, {
                method: 'POST',
                body: form
            });

            const uploadResult = await uploadResponse.json();
            console.log('✅ File upload result:', uploadResult);
            console.log('');
        } else {
            console.log('5. Skipping file upload test (no test image found)');
            console.log('');
        }

        // Test 6: Create backup
        console.log('6. Testing backup creation...');
        const backupResponse = await fetch(`${BASE_URL}/api/backup`, {
            method: 'POST'
        });
        const backupResult = await backupResponse.json();
        console.log('✅ Backup result:', backupResult);
        console.log('');

        console.log('🎉 All tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Check if server is running
async function checkServer() {
    try {
        const response = await fetch(`${BASE_URL}/api/config`);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Main execution
async function main() {
    console.log('🔍 Checking if server is running...');
    
    const serverRunning = await checkServer();
    if (!serverRunning) {
        console.error('❌ Server is not running. Please start the server with: npm start');
        process.exit(1);
    }

    console.log('✅ Server is running!\n');
    await testAPI();
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { testAPI, checkServer }; 