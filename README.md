# Astro + Tailwind + Alpine.js + i18n

A modern web development stack with simple internationalization, built for Asseco Web System.

## 🚀 Features

- ⚡️ **Astro 5** - Modern Static Site Generator with excellent performance
- 🎨 **Tailwind CSS v4** - Latest utility-first CSS framework with native CSS imports
- 🏔️ **Alpine.js** - Lightweight JavaScript framework for interactive components
- 🌍 **Simple i18n** - Easy internationalization with Polish/English support
- 🔤 **Geomanist Font** - Complete custom font family (100-900 weights)
- 📱 **Responsive Design** - Mobile-first approach with standard Tailwind breakpoints
- 🎯 **TypeScript** - Full TypeScript support for better development experience
- 🧩 **Component Architecture** - Organized with UI components and page slices

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.astro
│   │   ├── Heading.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── ...
│   └── slices/            # Page-specific sections
│       └── home/
│           ├── HomeHero.astro
│           ├── HomeAbout.astro
│           └── HomeFaq.astro
├── layouts/
│   └── Layout.astro       # Main page layout
├── pages/
│   ├── index.astro        # Polish homepage (/)
│   └── en/
│       └── index.astro    # English homepage (/en/)
├── styles/
│   ├── global.css         # Global styles and imports
│   ├── fonts.css          # Geomanist font definitions
│   └── colors.css         # Design system colors
└── utils/
    └── i18n.js           # Internationalization utilities
```

## 🌍 Internationalization (i18n)

This project includes a simple yet powerful i18n setup supporting Polish (default) and English.

### Language Structure
- **Default Language**: Polish (`pl`) - `/`
- **English**: (`en`) - `/en/`
- **URL Detection**: Automatic language detection from URL path
- **Fallbacks**: Browser language → Default language

### Content Pattern

```astro
---
import { t } from '../utils/i18n.js';

const content = {
  title: {
    pl: "Witaj świecie",
    en: "Hello world"
  },
  description: {
    pl: "To jest opis polskiej strony",
    en: "This is an English page description"
  }
};
---

<h1>{t(content.title)}</h1>
<p>{t(content.description)}</p>
```

### Language Switching
The `<LanguageSwitcher />` component provides automatic language switching with proper URL handling.

## 🎨 Design System

### Typography - Geomanist Font
Complete font family with all weights (100-900) and italic variants:

```html
<h1 class="font-geomanist font-thin">Thin (100)</h1>
<h2 class="font-geomanist font-light">Light (300)</h2>
<h3 class="font-geomanist font-medium">Medium (500)</h3>
<h4 class="font-geomanist font-bold">Bold (700)</h4>
<h5 class="font-geomanist font-black">Black (900)</h5>
```

### Color System
Comprehensive color system with theme support:

- **Light Mode** (default)
- **Dark Mode**
- **Light Gray Mode** 
- **Light Blue Mode**

Colors are defined as CSS custom properties in `/src/styles/colors.css`:

```css
/* Usage examples */
background-color: var(--bg);
color: var(--text);
border-color: var(--separator);
```

### Responsive Design
Mobile-first approach using standard Tailwind breakpoints:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Responsive grid -->
</div>
```

## 🧩 Component Development

### UI Components (`/src/components/ui/`)
Reusable components with TypeScript interfaces:

```astro
---
// Button.astro
export interface Props {
  class?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
---
```

### Page Slices (`/src/components/slices/`)
Page-specific sections organized by feature:

```astro
---
// HomeHero.astro
import Section from '@/ui/Section.astro';
import { t } from '../../../utils/i18n.js';
---

<Section mode="light">
  <!-- Section content -->
</Section>
```

### Path Aliases
Configured for clean imports:

```astro
import Button from '@/ui/Button.astro';
import HomeHero from '@/slices/home/HomeHero.astro';
```

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm

### Setup & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
- **Local**: http://localhost:4321
- **Network**: Available on local network
- **Hot Reload**: Automatic browser refresh on changes

## 🏗️ Build & Deployment

### Build Process
```bash
npm run build
```

Generates optimized static files in `/dist/` directory:
- Static HTML for all routes
- Optimized CSS and JavaScript bundles
- Font files and assets
- Source maps for debugging

### Production Checklist
- ✅ All translations verified
- ✅ Font loading optimized (`font-display: swap`)
- ✅ Responsive design tested
- ✅ TypeScript compilation successful
- ✅ Build completes without warnings
- ✅ Both language versions accessible

### Deployment Options
Static files can be deployed to any hosting service:
- Vercel, Netlify, GitHub Pages
- Traditional web servers (Apache, Nginx)
- CDN services (Cloudflare, AWS CloudFront)

## 🎯 Development Guidelines

### Code Style
- **Components**: PascalCase (`HomeHero.astro`)
- **Utilities**: camelCase (`i18n.js`)
- **CSS Files**: kebab-case (`global.css`)
- **TypeScript**: Enabled for all components

### Best Practices

1. **i18n**: Always use `t()` function for translatable content
2. **Responsive**: Mobile-first with standard Tailwind breakpoints
3. **Performance**: Leverage Astro's static generation
4. **Accessibility**: Semantic HTML with proper ARIA attributes
5. **Typography**: Use Geomanist font with appropriate weights

### Component Architecture
- Keep components focused and single-purpose
- Use composition over inheritance
- Favor props over global state
- Include TypeScript interfaces for reusable components

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4 Guide](https://tailwindcss.com)
- [Alpine.js Documentation](https://alpinejs.dev)
- [Geomanist Font Usage](./GEOMANIST_USAGE.md)

## 🔍 Project Status

✅ **Complete** - Ready for development and deployment
- All core components implemented
- i18n system fully functional
- Responsive design with custom typography
- Build process optimized
- Development guidelines established

For detailed coding standards and architecture patterns, see `.cursorrules` in the project root.
