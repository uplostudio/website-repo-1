#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsToUpdate = [
  {
    file: 'src/components/slices/cloud/CloudFeature3.astro',
    imports: [
      { from: "import img5 from '../../../assets/images/img-5.jpg';", to: "" }
    ],
    images: [
      { src: 'img5', to: '/img-5.jpg' }
    ]
  },
  {
    file: 'src/components/slices/cloud/CloudFeatures.astro',
    imports: [
      { from: "import img3 from '../../../assets/images/img-3.jpg';", to: "" },
      { from: "import img4 from '../../../assets/images/img-4.jpg';", to: "" },
      { from: "import img5 from '../../../assets/images/img-5.jpg';", to: "" }
    ],
    images: [
      { src: 'img3', to: '/img-3.jpg' },
      { src: 'img4', to: '/img-4.jpg' },
      { src: 'img5', to: '/img-5.jpg' }
    ]
  },
  {
    file: 'src/components/slices/home/HomeAbout2.astro',
    imports: [
      { from: "import img2 from '../../../assets/images/img-2.jpg';", to: "" }
    ],
    images: [
      { src: 'img2', to: '/img-2.jpg' }
    ]
  },
  {
    file: 'src/components/slices/home/HomeBaas.astro',
    imports: [
      { from: "import baasTeamImage from '../../../assets/images/baas-team-collaboration.jpg';", to: "" }
    ],
    images: [
      { src: 'baasTeamImage', to: '/baas-team-collaboration.jpg' }
    ]
  },
  {
    file: 'src/components/slices/home/HomeManagement.astro',
    imports: [
      { from: "import managerImage from '../../../assets/images/a67e2c52e897d0b3c87f1f98afaf7813977f914f.png';", to: "" }
    ],
    images: [
      { src: 'managerImage', to: '/a67e2c52e897d0b3c87f1f98afaf7813977f914f.png' }
    ]
  },
  {
    file: 'src/layouts/BlogPost.astro',
    imports: [
      { from: "import img6 from '../assets/images/img-6.jpg';", to: "" }
    ],
    images: [
      { src: 'img6', to: '/img-6.jpg' }
    ]
  }
];

function updateComponent(filePath, imports, images) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Remove imports
  imports.forEach(imp => {
    content = content.replace(imp.from, imp.to);
  });
  
  // Remove Image import if it exists
  content = content.replace(/import \{ Image \} from 'astro:assets';?\n?/g, '');
  
  // Replace image references
  images.forEach(img => {
    // Replace Image component usage
    const imageRegex = new RegExp(`<Image\\s+src=\\{${img.src}\\}[^>]*>`, 'g');
    content = content.replace(imageRegex, `<img src="${img.to}" loading="lazy"`);
    
    // Replace src={img.src} with src={img.to}
    content = content.replace(new RegExp(`src=\\{${img.src}\\}`, 'g'), `src="${img.to}"`);
  });
  
  // Fix width and height attributes
  content = content.replace(/width=\{(\d+)\}/g, 'width="$1"');
  content = content.replace(/height=\{(\d+)\}/g, 'height="$1"');
  
  // Remove format attribute
  content = content.replace(/format="[^"]*"/g, '');
  
  fs.writeFileSync(fullPath, content);
  console.log(`✅ Updated: ${filePath}`);
}

console.log('🔄 Updating components to use public images...\n');

componentsToUpdate.forEach(component => {
  updateComponent(component.file, component.imports, component.images);
});

console.log('\n✅ All components updated!');
