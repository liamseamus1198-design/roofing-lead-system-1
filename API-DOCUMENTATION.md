# Roofing Lead System API Documentation

## Overview
This API provides comprehensive file and storage management capabilities for the roofing lead generation system, including lead management, file uploads, image processing, and system maintenance.

## Base URL
```
http://localhost:8080
```

## Authentication
Currently, the API does not require authentication. In production, implement proper authentication and authorization.

## API Endpoints

### Lead Management

#### POST /api/leads
Submit a new lead with optional file attachments.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "address": "123 Main St, City, State",
  "description": "Roof damage from recent storm",
  "files": ["file1.jpg", "file2.pdf"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "leadId": 1703123456789
}
```

#### GET /api/leads
Retrieve all leads (for admin purposes).

**Response:**
```json
[
  {
    "id": 1703123456789,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "address": "123 Main St, City, State",
    "description": "Roof damage from recent storm",
    "files": ["file1.jpg", "file2.pdf"],
    "submittedAt": "2023-12-21T10:30:45.123Z"
  }
]
```

#### GET /api/leads/:id
Retrieve a specific lead by ID.

**Response:**
```json
{
  "id": 1703123456789,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "address": "123 Main St, City, State",
  "description": "Roof damage from recent storm",
  "files": ["file1.jpg", "file2.pdf"],
  "submittedAt": "2023-12-21T10:30:45.123Z"
}
```

### File Management

#### POST /api/upload
Upload a single file with automatic image processing.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field

**Supported File Types:**
- Images: JPEG, PNG, WebP, GIF
- Documents: PDF, TXT, DOC, DOCX

**Response:**
```json
{
  "success": true,
  "file": {
    "originalName": "roof-damage.jpg",
    "filename": "file-1703123456789-123456789.jpg",
    "path": "public/images/file-1703123456789-123456789.jpg",
    "size": 2048576,
    "mimetype": "image/jpeg",
    "uploadedAt": "2023-12-21T10:30:45.123Z",
    "optimizedPath": "public/images/optimized/file-1703123456789-123456789.webp",
    "thumbnailPath": "public/images/thumbnails/file-1703123456789-123456789.webp"
  }
}
```

#### GET /api/files
List files in the system with optional filtering.

**Query Parameters:**
- `type`: Filter by file type (`images`, `documents`, `all`)
- `directory`: Specify directory to list (default: uploads directory)

**Response:**
```json
[
  {
    "name": "file-1703123456789-123456789.jpg",
    "path": "/path/to/file.jpg",
    "size": 2048576,
    "modified": "2023-12-21T10:30:45.123Z",
    "isDirectory": false
  }
]
```

#### GET /api/files/:filename
Serve a file with caching headers.

**Response Headers:**
- `ETag`: File modification hash
- `Cache-Control`: `public, max-age=86400`
- `Content-Type`: Based on file type

### System Management

#### POST /api/backup
Create a backup of the leads database.

**Response:**
```json
{
  "success": true,
  "message": "Backup completed successfully"
}
```

#### GET /api/config
Get system configuration information.

**Response:**
```json
{
  "uploadsDir": "public/uploads",
  "imagesDir": "public/images",
  "maxFileSize": 10485760,
  "allowedImageTypes": [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
  ],
  "allowedDocTypes": [
    "application/pdf",
    "text/plain",
    "application/msword"
  ]
}
```

## File Manager Script

The system includes a comprehensive file management utility that can be run from the command line.

### Available Commands

#### Full Maintenance
```bash
npm run file-maintenance
```
Performs all maintenance tasks: backup, cleanup, organization, and optimization.

#### Individual Tasks
```bash
# Create backup
npm run file-backup

# Clean up old files
npm run file-cleanup

# Organize images
npm run file-organize

# Optimize images
npm run file-optimize

# Get storage statistics
npm run file-stats
```

### Direct Script Usage
```bash
# Full maintenance
node scripts/file-manager.js

# Specific tasks
node scripts/file-manager.js backup
node scripts/file-manager.js cleanup
node scripts/file-manager.js organize
node scripts/file-manager.js optimize
node scripts/file-manager.js stats
```

## File Structure

```
roofing-lead-system-1/
├── public/
│   ├── uploads/          # General file uploads
│   ├── images/           # Image files
│   │   ├── optimized/    # Processed images
│   │   └── thumbnails/   # Image thumbnails
│   └── ...
├── backups/              # Lead database backups
├── logs/                 # System logs
├── temp/                 # Temporary files
└── config/
    └── server-config.js  # Configuration file
```

## Configuration

The system uses a centralized configuration file (`config/server-config.js`) that manages:

- Server settings (port, host, environment)
- File storage paths
- Upload limits and allowed file types
- Image processing settings
- Backup and logging preferences
- Security settings
- Email and notification settings

### Environment Variables

```bash
# Server
PORT=8080
HOST=localhost
NODE_ENV=development

# Logging
LOG_LEVEL=info

# Email (for future use)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@example.com
SMTP_PASS=password

# Notifications
NEW_LEAD_EMAIL=leads@example.com
ADMIN_EMAIL=admin@example.com
SLACK_WEBHOOK=https://hooks.slack.com/...
```

## Error Handling

All API endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (invalid input)
- `404`: Not Found
- `500`: Internal Server Error

Error responses include:
```json
{
  "error": "Error description",
  "success": false
}
```

## Rate Limiting

The API includes rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address
- Configurable in the server configuration

## Caching

Static files are cached for 1 day with ETag support for efficient updates.

## Security Considerations

1. **File Upload Validation**: All uploaded files are validated for type and size
2. **Path Traversal Protection**: File paths are sanitized to prevent directory traversal
3. **Rate Limiting**: Prevents abuse and DoS attacks
4. **CORS Configuration**: Configurable cross-origin resource sharing

## Future Enhancements

- Database integration (SQLite, PostgreSQL, MySQL)
- Email notifications for new leads
- User authentication and authorization
- Advanced image processing (watermarks, filters)
- Cloud storage integration (AWS S3, Google Cloud Storage)
- Real-time notifications (WebSocket)
- API versioning
- Comprehensive logging and monitoring 