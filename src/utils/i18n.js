// i18n utility for Astro with built-in i18n support
export const DEFAULT_LANG = 'pl';
export const SUPPORTED_LANGS = ['pl', 'en'];

// Global context for current request
let globalContext = null;

// Function to set the Astro context (called from layouts)
export function setAstroContext(astro) {
  globalContext = astro;
}

// Get current language from Astro's built-in currentLocale
export function getCurrentLang() {
  if (globalContext && globalContext.currentLocale) {
    return globalContext.currentLocale;
  }
  
  // Client-side fallback
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const langFromPath = pathname.split('/')[1];
    if (SUPPORTED_LANGS.includes(langFromPath)) {
      return langFromPath;
    }
    
    // Check if path starts with /en/
    if (pathname.startsWith('/en/') || pathname === '/en') {
      return 'en';
    }
  }
  
  return DEFAULT_LANG;
}

// Translate content object based on current language
export function t(content) {
  // If content is a string, return as-is
  if (typeof content === 'string') {
    return content;
  }
  
  // If content is an object with language keys
  if (typeof content === 'object' && content !== null) {
    const currentLang = getCurrentLang();
    
    // Return content for current language, fallback to default language, then first available
    return content[currentLang] || content[DEFAULT_LANG] || Object.values(content)[0] || '';
  }
  
  return '';
}

// Language switcher helper - works with Astro's built-in i18n
export function getOtherLangUrl(currentUrl, targetLang) {
  if (!globalContext) {
    return '/';
  }
  
  // Use Astro's built-in getRelativeLocaleUrl if available
  if (globalContext.getRelativeLocaleUrl) {
    const currentPath = new URL(currentUrl).pathname;
    // Remove current locale prefix if present
    let cleanPath = currentPath;
    if (currentPath.startsWith('/en/')) {
      cleanPath = currentPath.substring(3);
    } else if (currentPath === '/en') {
      cleanPath = '/';
    }
    
    return globalContext.getRelativeLocaleUrl(targetLang, cleanPath);
  }
  
  // Fallback implementation
  const url = new URL(currentUrl);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  
  // Remove current language if present
  if (SUPPORTED_LANGS.includes(pathSegments[0])) {
    pathSegments.shift();
  }
  
  // Add target language if not default
  if (targetLang !== DEFAULT_LANG) {
    pathSegments.unshift(targetLang);
  }
  
  return '/' + pathSegments.join('/') + url.search;
}
