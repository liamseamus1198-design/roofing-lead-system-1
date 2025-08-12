const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

class FileManager {
    constructor(config = {}) {
        this.config = {
            uploadsDir: config.uploadsDir || 'public/uploads',
            imagesDir: config.imagesDir || 'public/images',
            backupsDir: config.backupsDir || 'backups',
            logsDir: config.logsDir || 'logs',
            maxBackupAge: config.maxBackupAge || 30, // days
            maxLogAge: config.maxLogAge || 7, // days
            ...config
        };
    }

    async log(message, level = 'info') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        console.log(logMessage);
        
        const logFile = path.join(this.config.logsDir, `file-manager-${new Date().toISOString().split('T')[0]}.log`);
        await fs.mkdir(this.config.logsDir, { recursive: true });
        await fs.appendFile(logFile, logMessage + '\n');
    }

    async ensureDirectories() {
        const dirs = [
            this.config.uploadsDir,
            this.config.imagesDir,
            this.config.backupsDir,
            this.config.logsDir
        ];

        for (const dir of dirs) {
            await fs.mkdir(dir, { recursive: true });
            await this.log(`Ensured directory exists: ${dir}`);
        }
    }

    async backupLeads() {
        try {
            const leadsFile = 'leads.json';
            if (!(await fs.access(leadsFile).then(() => true).catch(() => false))) {
                await this.log('No leads.json file found to backup', 'warn');
                return false;
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupFile = path.join(this.config.backupsDir, `leads-backup-${timestamp}.json`);
            
            await fs.copyFile(leadsFile, backupFile);
            await this.log(`Leads backed up to: ${backupFile}`);
            return backupFile;
        } catch (error) {
            await this.log(`Backup failed: ${error.message}`, 'error');
            return false;
        }
    }

    async cleanupOldBackups() {
        try {
            const files = await fs.readdir(this.config.backupsDir);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - this.config.maxBackupAge);

            let deletedCount = 0;
            for (const file of files) {
                const filePath = path.join(this.config.backupsDir, file);
                const stats = await fs.stat(filePath);
                
                if (stats.mtime < cutoffDate) {
                    await fs.unlink(filePath);
                    deletedCount++;
                    await this.log(`Deleted old backup: ${file}`);
                }
            }

            await this.log(`Cleanup completed: ${deletedCount} old backups deleted`);
            return deletedCount;
        } catch (error) {
            await this.log(`Cleanup failed: ${error.message}`, 'error');
            return 0;
        }
    }

    async cleanupOldLogs() {
        try {
            const files = await fs.readdir(this.config.logsDir);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - this.config.maxLogAge);

            let deletedCount = 0;
            for (const file of files) {
                const filePath = path.join(this.config.logsDir, file);
                const stats = await fs.stat(filePath);
                
                if (stats.mtime < cutoffDate) {
                    await fs.unlink(filePath);
                    deletedCount++;
                    await this.log(`Deleted old log: ${file}`);
                }
            }

            await this.log(`Log cleanup completed: ${deletedCount} old logs deleted`);
            return deletedCount;
        } catch (error) {
            await this.log(`Log cleanup failed: ${error.message}`, 'error');
            return 0;
        }
    }

    async organizeImages() {
        try {
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
            const files = await fs.readdir(this.config.uploadsDir);
            
            let organizedCount = 0;
            for (const file of files) {
                const filePath = path.join(this.config.uploadsDir, file);
                const stats = await fs.stat(filePath);
                
                if (stats.isFile()) {
                    const ext = path.extname(file).toLowerCase();
                    if (imageExtensions.includes(ext)) {
                        const newPath = path.join(this.config.imagesDir, file);
                        await fs.rename(filePath, newPath);
                        organizedCount++;
                        await this.log(`Moved image to images directory: ${file}`);
                    }
                }
            }

            await this.log(`Image organization completed: ${organizedCount} images moved`);
            return organizedCount;
        } catch (error) {
            await this.log(`Image organization failed: ${error.message}`, 'error');
            return 0;
        }
    }

    async optimizeImages() {
        try {
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
            const files = await fs.readdir(this.config.imagesDir);
            
            let optimizedCount = 0;
            for (const file of files) {
                const filePath = path.join(this.config.imagesDir, file);
                const stats = await fs.stat(filePath);
                
                if (stats.isFile()) {
                    const ext = path.extname(file).toLowerCase();
                    if (imageExtensions.includes(ext)) {
                        const optimizedDir = path.join(this.config.imagesDir, 'optimized');
                        await fs.mkdir(optimizedDir, { recursive: true });
                        
                        const optimizedPath = path.join(optimizedDir, file.replace(/\.[^.]+$/, '.webp'));
                        
                        await sharp(filePath)
                            .resize(1920, null, {
                                withoutEnlargement: true,
                                fit: 'inside'
                            })
                            .webp({ quality: 85 })
                            .toFile(optimizedPath);
                        
                        optimizedCount++;
                        await this.log(`Optimized image: ${file}`);
                    }
                }
            }

            await this.log(`Image optimization completed: ${optimizedCount} images processed`);
            return optimizedCount;
        } catch (error) {
            await this.log(`Image optimization failed: ${error.message}`, 'error');
            return 0;
        }
    }

    async getStorageStats() {
        try {
            const stats = {
                uploads: await this.getDirectorySize(this.config.uploadsDir),
                images: await this.getDirectorySize(this.config.imagesDir),
                backups: await this.getDirectorySize(this.config.backupsDir),
                logs: await this.getDirectorySize(this.config.logsDir)
            };

            stats.total = Object.values(stats).reduce((sum, size) => sum + size, 0);
            
            await this.log('Storage statistics collected');
            return stats;
        } catch (error) {
            await this.log(`Failed to get storage stats: ${error.message}`, 'error');
            return null;
        }
    }

    async getDirectorySize(dirPath) {
        try {
            if (!(await fs.access(dirPath).then(() => true).catch(() => false))) {
                return 0;
            }

            const files = await fs.readdir(dirPath);
            let totalSize = 0;

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stats = await fs.stat(filePath);
                
                if (stats.isFile()) {
                    totalSize += stats.size;
                } else if (stats.isDirectory()) {
                    totalSize += await this.getDirectorySize(filePath);
                }
            }

            return totalSize;
        } catch (error) {
            return 0;
        }
    }

    async runMaintenance() {
        await this.log('Starting file maintenance...');
        
        await this.ensureDirectories();
        await this.backupLeads();
        await this.cleanupOldBackups();
        await this.cleanupOldLogs();
        await this.organizeImages();
        await this.optimizeImages();
        
        const stats = await this.getStorageStats();
        if (stats) {
            await this.log(`Maintenance completed. Storage usage: ${(stats.total / 1024 / 1024).toFixed(2)} MB`);
        }
        
        await this.log('File maintenance completed');
    }
}

// CLI interface
if (require.main === module) {
    const fileManager = new FileManager();
    const command = process.argv[2] || 'maintenance';

    async function run() {
        switch (command) {
            case 'backup':
                await fileManager.backupLeads();
                break;
            case 'cleanup':
                await fileManager.cleanupOldBackups();
                await fileManager.cleanupOldLogs();
                break;
            case 'organize':
                await fileManager.organizeImages();
                break;
            case 'optimize':
                await fileManager.optimizeImages();
                break;
            case 'stats':
                const stats = await fileManager.getStorageStats();
                console.log('Storage Statistics:', stats);
                break;
            case 'maintenance':
            default:
                await fileManager.runMaintenance();
                break;
        }
    }

    run().catch(console.error);
}

module.exports = FileManager; 