const path = require('path');

const config = {
    // Server settings
    server: {
        port: process.env.PORT || 8080,
        host: process.env.HOST || 'localhost',
        environment: process.env.NODE_ENV || 'development'
    },

    // File storage settings
    storage: {
        uploadsDir: 'public/uploads',
        imagesDir: 'public/images',
        backupsDir: 'backups',
        logsDir: 'logs',
        tempDir: 'temp'
    },

    // File upload settings
    upload: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 10,
        allowedImageTypes: [
            'image/jpeg',
            'image/png', 
            'image/webp',
            'image/gif'
        ],
        allowedDocTypes: [
            'application/pdf',
            'text/plain',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
    },

    // Image processing settings
    images: {
        quality: 85,
        thumbnailSize: 300,
        maxWidth: 1920,
        maxHeight: 1080,
        formats: ['webp', 'jpeg', 'png'],
        defaultFormat: 'webp'
    },

    // Backup settings
    backup: {
        autoBackup: true,
        backupInterval: 24 * 60 * 60 * 1000, // 24 hours
        maxBackupAge: 30, // days
        maxBackupCount: 10
    },

    // Logging settings
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        maxLogAge: 7, // days
        logToFile: true,
        logToConsole: true
    },

    // Security settings
    security: {
        enableCORS: true,
        corsOrigins: ['http://localhost:3000', 'http://localhost:8080'],
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        }
    },

    // Database settings (for future use)
    database: {
        type: 'file', // 'file', 'sqlite', 'postgresql', 'mysql'
        file: {
            leadsFile: 'leads.json',
            configFile: 'config.json'
        }
    },

    // Email settings (for future use)
    email: {
        enabled: false,
        provider: 'smtp', // 'smtp', 'sendgrid', 'mailgun'
        smtp: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        }
    },

    // Notification settings
    notifications: {
        newLeadEmail: process.env.NEW_LEAD_EMAIL,
        adminEmail: process.env.ADMIN_EMAIL,
        slackWebhook: process.env.SLACK_WEBHOOK
    }
};

// Helper functions
config.getFullPath = (relativePath) => {
    return path.resolve(process.cwd(), relativePath);
};

config.getAllowedTypes = () => {
    return [...config.upload.allowedImageTypes, ...config.upload.allowedDocTypes];
};

config.isImageType = (mimetype) => {
    return config.upload.allowedImageTypes.includes(mimetype);
};

config.isDocumentType = (mimetype) => {
    return config.upload.allowedDocTypes.includes(mimetype);
};

config.getStoragePaths = () => {
    return {
        uploads: config.getFullPath(config.storage.uploadsDir),
        images: config.getFullPath(config.storage.imagesDir),
        backups: config.getFullPath(config.storage.backupsDir),
        logs: config.getFullPath(config.storage.logsDir),
        temp: config.getFullPath(config.storage.tempDir)
    };
};

module.exports = config; 