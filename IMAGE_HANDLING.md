# Image Handling Guide

This project has been updated with improved image handling to resolve WebContainer compatibility issues and provide more robust image loading.

## Changes Made

### 1. Converted to Public Images

All image imports have been removed and replaced with direct public image references for maximum compatibility with containerized environments:

**Before:**
```astro
import img1 from '../../../assets/images/img-1.jpg';
import { Image } from 'astro:assets';

<Image src={img1} alt="Description" />
```

**After:**
```astro
<img src="/img-1.jpg" alt="Description" loading="lazy" />
```

### 2. Enhanced Astro Configuration

The `astro.config.mjs` has been updated with better image handling:

```javascript
image: {
  service: {
    entrypoint: 'astro/assets/services/sharp'
  },
  // Enable image optimization
  domains: [],
},
```

### 3. New Utility Functions

Created `src/utils/images.ts` with helper functions:

- `getPublicImagePath()` - Get public image URLs
- `imageExists()` - Check if images exist
- `getImageWithFallback()` - Handle fallback images
- `IMAGE_PATHS` - Centralized image path constants

### 4. Enhanced Image Component

Created `src/components/ui/EnhancedImage.astro` that can handle:

- Imported images (ImageMetadata)
- Public image URLs
- Fallback images on error
- Automatic format optimization

## Usage

### Using Public Images (Recommended for All Environments)

```astro
---
<!-- No imports needed -->
---

<img 
  src="/img-1.jpg"
  alt="Description"
  width="800"
  height="600"
  loading="lazy"
  class="w-full h-full object-cover"
/>
```

### Using Public Images (Recommended for WebContainers)

```astro
---
import WebContainerImage from '@/ui/WebContainerImage.astro';
---

<WebContainerImage 
  src="img-1.jpg"
  alt="Description"
  width={800}
  height={600}
  class="w-full h-full object-cover"
/>
```

### Using Public Images

```astro
---
import { getPublicImagePath } from '@/utils/images';
---

<img 
  src={getPublicImagePath('img-1.jpg')}
  alt="Description"
  class="w-full h-full object-cover"
/>
```

### Using Enhanced Image Component

```astro
---
import EnhancedImage from '@/ui/EnhancedImage.astro';
import img1 from '@/assets/images/img-1.jpg';
---

<EnhancedImage 
  src={img1}
  alt="Description"
  width={800}
  height={600}
  fallbackSrc="/fallback-image.jpg"
/>
```

## Verification

Run the image verification script to check that all images are present:

```bash
npm run verify-images
```

This will check both the `public/` and `src/assets/images/` directories.

## Best Practices

1. **Use public images** for maximum compatibility with containerized environments
2. **Add `loading="lazy"`** for better performance
3. **Use the WebContainerImage component** for advanced features
4. **Run verification script** before deploying
5. **Keep images in the `public/` directory** for reliability

## Troubleshooting

### Image Not Found Errors

1. Check that the image exists in both `public/` and `src/assets/images/`
2. Verify the import path uses relative paths (not `@/assets` alias)
3. Run `npm run verify-images` to check all images
4. Clear build cache: `npm run build -- --force`

### WebContainer Issues

For WebContainer environments, use the `WebContainerImage` component instead of imported images:

1. Use `WebContainerImage` component with public image filenames
2. Ensure all images are in the `public/` directory
3. Use relative paths instead of `@/assets` alias
4. Check the browser console for specific error messages

**Example for WebContainers:**
```astro
---
import WebContainerImage from '@/ui/WebContainerImage.astro';
---

<WebContainerImage 
  src="img-1.jpg"
  alt="Description"
  class="w-full h-full object-cover"
/>
```
