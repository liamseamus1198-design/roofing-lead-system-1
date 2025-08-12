const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const inputDir = 'public/images';
  const outputDir = 'public/images/optimized';
  
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });
    
    // Get all image files
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log(`Found ${imageFiles.length} images to optimize...`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);
      
      console.log(`Optimizing ${file}...`);
      
      // Use Sharp for advanced image processing
      await sharp(inputPath)
        .resize(1920, null, { // Max width 1920px, maintain aspect ratio
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 80 }) // Convert to WebP with 80% quality
        .toFile(outputPath.replace(/\.[^.]+$/, '.webp'));
      
      // Also create optimized JPEG version
      await sharp(inputPath)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath.replace(/\.[^.]+$/, '.jpg'));
    }
    
    // Use Imagemin for additional compression
    const optimizedFiles = await imagemin([`${outputDir}/*.{jpg,jpeg,png}`], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({ quality: 85 }),
        imageminPngquant({ quality: [0.6, 0.8] })
      ]
    });
    
    console.log('✅ Image optimization complete!');
    console.log(`Optimized images saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

optimizeImages(); 