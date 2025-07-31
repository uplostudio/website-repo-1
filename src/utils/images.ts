// Image utility functions for robust image handling

/**
 * Get image path for public images
 * @param filename - The image filename in the public directory
 * @returns The public URL path for the image
 */
export function getPublicImagePath(filename: string): string {
  return `/${filename}`;
}

/**
 * Check if an image exists in the public directory
 * @param filename - The image filename to check
 * @returns Promise that resolves to true if image exists
 */
export async function imageExists(filename: string): Promise<boolean> {
  try {
    const response = await fetch(getPublicImagePath(filename), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get a fallback image path if the primary image doesn't exist
 * @param primaryPath - The primary image path
 * @param fallbackPath - The fallback image path
 * @returns The path to use
 */
export function getImageWithFallback(primaryPath: string, fallbackPath: string): string {
  // For now, return the primary path - in a real implementation,
  // you might want to check if the image exists and return fallback if not
  return primaryPath;
}

// Common image paths for easy reference
export const IMAGE_PATHS = {
  // Home page images
  HOME_ABOUT: '/img-1.jpg',
  HOME_ABOUT_2: '/img-2.jpg',
  HOME_BAAS_TEAM: '/baas-team-collaboration.jpg',
  HOME_MANAGEMENT: '/a67e2c52e897d0b3c87f1f98afaf7813977f914f.png',
  
  // Cloud page images
  CLOUD_FEATURE_1: '/img-3.jpg',
  CLOUD_FEATURE_2: '/img-4.jpg',
  CLOUD_FEATURE_3: '/img-5.jpg',
  
  // Blog images
  BLOG_CARD: '/img-6.jpg',
  
  // Generic images
  GENERIC: '/image.jpg',
  GENERIC_ALT: '/img.jpg',
} as const;
