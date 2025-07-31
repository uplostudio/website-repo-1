#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of images that should exist in public directory
const requiredImages = [
  'img-1.jpg',
  'img-2.jpg', 
  'img-3.jpg',
  'img-4.jpg',
  'img-5.jpg',
  'img-6.jpg',
  'image.jpg',
  'img.jpg',
  'baas-team-collaboration.jpg',
  'a67e2c52e897d0b3c87f1f98afaf7813977f914f.png'
];

// List of images that should exist in src/assets/images
const requiredAssetImages = [
  'img-1.jpg',
  'img-2.jpg',
  'img-3.jpg', 
  'img-4.jpg',
  'img-5.jpg',
  'img-6.jpg',
  'image.jpg',
  'img.jpg',
  'baas-team-collaboration.jpg',
  'a67e2c52e897d0b3c87f1f98afaf7813977f914f.png'
];

function checkImages() {
  const publicDir = path.join(__dirname, '../public');
  const assetsDir = path.join(__dirname, '../src/assets/images');
  
  console.log('🔍 Checking image files...\n');
  
  // Check public directory images
  console.log('📁 Public directory images:');
  let publicMissing = 0;
  for (const image of requiredImages) {
    const imagePath = path.join(publicDir, image);
    if (fs.existsSync(imagePath)) {
      console.log(`  ✅ ${image}`);
    } else {
      console.log(`  ❌ ${image} - MISSING`);
      publicMissing++;
    }
  }
  
  console.log('\n📁 Assets directory images:');
  let assetsMissing = 0;
  for (const image of requiredAssetImages) {
    const imagePath = path.join(assetsDir, image);
    if (fs.existsSync(imagePath)) {
      console.log(`  ✅ ${image}`);
    } else {
      console.log(`  ❌ ${image} - MISSING`);
      assetsMissing++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`  Public images: ${requiredImages.length - publicMissing}/${requiredImages.length} found`);
  console.log(`  Asset images: ${requiredAssetImages.length - assetsMissing}/${requiredAssetImages.length} found`);
  
  if (publicMissing === 0 && assetsMissing === 0) {
    console.log('\n🎉 All images are present!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some images are missing. Please check the file paths.');
    process.exit(1);
  }
}

checkImages();
