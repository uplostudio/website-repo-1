# Slice Renderer Tool

A server-side tool for rendering Astro slice components with inline CSS styles for specific breakpoints (375px mobile and 1440px desktop).

## Features

- 🎨 **Inline CSS Generation**: Converts Tailwind CSS classes to inline styles
- 📱 **Responsive Design**: Generates styles for both mobile (375px) and desktop (1440px) breakpoints
- 🌍 **i18n Support**: Renders content in Polish (pl) or English (en)
- 🎯 **CSS Custom Properties**: Resolves design system colors from `colors.css`
- 🖼️ **Preview Output**: Generates complete HTML documents with side-by-side breakpoint previews
- ⚡ **Component-based**: Understands Astro component structure and UI components

## Installation

The tool is a standalone Node.js script using ES modules. No additional dependencies needed beyond Node.js 16+.

## Usage

### Command Line Interface

```bash
# Basic usage - renders HomeHero in Polish
node slice-renderer.js HomeHero

# Specify language
node slice-renderer.js HomeHero en

# Custom output file
node slice-renderer.js HomeHero pl custom-output.html
```

### Available Commands

```bash
# Show help and available slices
node slice-renderer.js

# Examples
node slice-renderer.js HomeHero           # Polish, default output
node slice-renderer.js HomeHero en        # English
node slice-renderer.js HomeHero pl hero-preview.html  # Custom filename
```

### Programmatic Usage

```javascript
import { SliceRenderer } from './slice-renderer.js';

const renderer = new SliceRenderer();

// Render a slice
const sliceContent = await renderer.renderSlice('HomeHero', 'en');

// Generate complete HTML
const html = renderer.generateHTML(sliceContent, 'HomeHero');

// Write to file
fs.writeFileSync('output.html', html);
```

## Supported Slices

Currently implemented:
- ✅ **HomeHero** - Main hero section with heading, text, and CTA button

Planned:
- 🔄 HomeAbout
- 🔄 HomeBaas  
- 🔄 HomeCertificates
- 🔄 HomeCloudFeatures
- 🔄 HomeFaq

## Output Structure

The tool generates a complete HTML document with:

### 1. Mobile Preview (375px)
- Inline styles optimized for mobile viewport
- Typography sized for mobile reading
- Stacked layout components

### 2. Desktop Preview (1440px)
- Inline styles for desktop viewport
- Larger typography scales
- Horizontal layout arrangements

### 3. Font Integration
- Geomanist font face declarations
- Proper font loading with `font-display: swap`
- Full weight range support (100-900)

### 4. CSS Reset & Base Styles
- Modern CSS reset
- Design system color integration
- Responsive containers

## Technical Details

### Tailwind to Inline CSS Conversion

The tool maps Tailwind utility classes to corresponding CSS properties:

```javascript
const tailwindToCSS = {
  'flex': { display: 'flex' },
  'flex-col': { 'flex-direction': 'column' },
  'py-24': { 'padding-top': '6rem', 'padding-bottom': '6rem' },
  'max-w-[800px]': { 'max-width': '800px' },
  // ... extensive mapping
};
```

### Responsive Typography

Typography scales responsively based on the component's heading level:

```javascript
const typographySizes = {
  1: {
    mobile: { 'font-size': '38px' },
    tablet: { 'font-size': '48px' },
    desktop: { 'font-size': '67px' }
  },
  // ... other levels
};
```

### CSS Custom Properties Resolution

Design system colors are resolved from the project's `colors.css`:

```javascript
const cssCustomProperties = {
  '--u-white': '#FFFFFF',
  '--u-blue': '#1D9BF0', 
  '--bg': '#FFFFFF',
  '--text': '#01080F',
  // ... all project colors
};
```

### Component Structure Understanding

The tool parses Astro components and understands:
- Frontmatter JavaScript
- Template markup
- Component imports and dependencies
- Props and interfaces

## Use Cases

### 1. Email Templates
Generate HTML with inline styles for email clients that don't support external CSS.

### 2. Design Reviews
Create static previews for stakeholder review without running the full Astro dev server.

### 3. Component Documentation
Generate visual documentation showing components at different breakpoints.

### 4. Quality Assurance
Verify responsive behavior by comparing exact pixel-perfect renderings.

### 5. Static Asset Generation
Create standalone HTML files for CDN distribution or embedding.

## Development

### Adding New Slice Support

To add support for a new slice component:

1. **Create the renderer method**:
```javascript
renderNewSlice(lang = 'pl') {
  const content = {
    title: {
      pl: "Polski tytuł",
      en: "English title"
    }
  };
  
  const t = (obj) => obj[lang] || obj.pl;
  
  // Build component HTML with inline styles
  return this.renderSection('light', 'lg', componentHTML);
}
```

2. **Update the renderSlice method**:
```javascript
async renderSlice(sliceName, lang = 'pl') {
  // ... existing code ...
  
  if (sliceName === 'NewSlice') {
    return this.renderNewSlice(lang);
  }
}
```

3. **Test the implementation**:
```bash
node slice-renderer.js NewSlice
```

### Extending Tailwind Mapping

Add new Tailwind classes to the `tailwindToCSS` object:

```javascript
const tailwindToCSS = {
  // ... existing mappings ...
  'your-new-class': { 'css-property': 'value' },
};
```

## Project Integration

This tool is specifically designed for the Astro + Tailwind + Alpine.js + i18n project structure:

- ✅ Follows project's design system (`colors.css`)
- ✅ Uses Geomanist typography system
- ✅ Respects component architecture patterns
- ✅ Integrates with i18n content structure
- ✅ Supports project's responsive breakpoints

## Output Examples

### Mobile View (375px)
- Heading: 38px font size
- Vertical button layout
- Compact spacing

### Desktop View (1440px)  
- Heading: 67px font size
- Horizontal button layout
- Generous spacing

The generated HTML includes media queries to switch between these layouts automatically based on viewport width.
