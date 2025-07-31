# Geomanist Font Usage Guide

## Overview
The Geomanist font has been successfully installed in your Astro + Tailwind CSS project. This guide explains how to use it effectively.

## Font Installation
- ✅ Font files downloaded from [Atipo Foundry's Geomanist repository](https://github.com/tristancade/geomanist)
- ✅ Font files stored in `/public/fonts/`
- ✅ CSS @font-face declarations added to `/src/styles/global.css`
- ✅ Tailwind CSS v4 configuration added for custom font family

## Available Font Weights
The Geomanist font includes the following weights, all available in regular and italic styles:

- **Thin (100)** - `font-thin`
- **Extra Light (200)** - `font-extralight` 
- **Light (300)** - `font-light`
- **Regular (400)** - `font-normal`
- **Medium (500)** - `font-medium`
- **Semi Bold (600)** - `font-semibold`
- **Bold (700)** - `font-bold`
- **Extra Bold (800)** - `font-extrabold`
- **Black (900)** - `font-black`

## How to Use

### Basic Usage
Apply the Geomanist font using the `font-geomanist` class:

```html
<h1 class="font-geomanist text-4xl font-bold">Your Heading</h1>
<p class="font-geomanist text-base">Your paragraph text</p>
```

### With Different Weights
Combine `font-geomanist` with Tailwind's font weight utilities:

```html
<h1 class="font-geomanist font-thin">Thin heading</h1>
<h2 class="font-geomanist font-light">Light heading</h2>
<h3 class="font-geomanist font-medium">Medium heading</h3>
<h4 class="font-geomanist font-bold">Bold heading</h4>
<h5 class="font-geomanist font-black">Black heading</h5>
```

### With Italic Style
Add the `italic` class for italic variants:

```html
<p class="font-geomanist italic">Italic text</p>
<p class="font-geomanist font-bold italic">Bold italic text</p>
```

### Using in CSS
You can also use the font directly in CSS:

```css
.custom-text {
  font-family: 'Geomanist', sans-serif;
  font-weight: 400;
}
```

## Font Features
Geomanist includes several OpenType features:
- Tabular figures for aligned numbers
- Fractions, superiors, and ordinals
- Case-sensitive forms for all-caps text
- Support for 105+ languages including Latin and Cyrillic scripts

## Performance Considerations
- Font files are optimized with WOFF2 format (primary) and WOFF fallback
- `font-display: swap` is used for better loading performance
- Only necessary font weights are loaded

## Browser Support
- WOFF2: Modern browsers (Chrome 36+, Firefox 39+, Safari 12+)
- WOFF: Legacy browser fallback (IE 9+, older Safari)

## Example Components
Check the main page (`/src/pages/index.astro`) for comprehensive examples of the Geomanist font in action, including:
- Typography hierarchy
- All font weights and styles
- Interactive components with Alpine.js
- Form elements

## Troubleshooting
If the font doesn't load:
1. Check that font files exist in `/public/fonts/`
2. Verify the CSS imports in `/src/styles/global.css`
3. Clear browser cache and hard refresh
4. Check browser developer tools for any 404 errors on font files

## License
The Geomanist font is used under the SIL Open Font License. See the original repository for license details.
