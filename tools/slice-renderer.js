#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tailwind CSS utility classes to CSS properties mapping
const tailwindToCSS = {
  // Layout
  'flex': { display: 'flex' },
  'flex-col': { 'flex-direction': 'column' },
  'flex-row': { 'flex-direction': 'row' },
  'w-full': { width: '100%' },
  'h-full': { height: '100%' },
  
  // Spacing
  'py-8': { 'padding-top': '2rem', 'padding-bottom': '2rem' },
  'py-12': { 'padding-top': '3rem', 'padding-bottom': '3rem' },
  'py-24': { 'padding-top': '6rem', 'padding-bottom': '6rem' },
  'py-32': { 'padding-top': '8rem', 'padding-bottom': '8rem' },
  'mt-8': { 'margin-top': '2rem' },
  'mb-4': { 'margin-bottom': '1rem' },
  'gap-4': { gap: '1rem' },
  
  // Typography
  'font-[500]': { 'font-weight': '500' },
  'leading-[1.15]': { 'line-height': '1.15' },
  'tracking-[-0.015em]': { 'letter-spacing': '-0.015em' },
  'font-geomanist': { 'font-family': 'Geomanist, sans-serif' },
  
  // Max width utilities
  'max-w-[800px]': { 'max-width': '800px' },
  'max-w-[600px]': { 'max-width': '600px' },
  'max-w-sm': { 'max-width': '24rem' },
  'max-w-md': { 'max-width': '28rem' },
  'max-w-lg': { 'max-width': '32rem' },
  'max-w-xl': { 'max-width': '36rem' },
  'max-w-2xl': { 'max-width': '42rem' },
  'max-w-3xl': { 'max-width': '48rem' },
  'max-w-4xl': { 'max-width': '56rem' },
  'max-w-5xl': { 'max-width': '64rem' },
  'max-w-6xl': { 'max-width': '72rem' },
  'max-w-7xl': { 'max-width': '80rem' },
  
  // Container styles
  'mx-auto': { 'margin-left': 'auto', 'margin-right': 'auto' },
  'px-4': { 'padding-left': '1rem', 'padding-right': '1rem' },
  'px-6': { 'padding-left': '1.5rem', 'padding-right': '1.5rem' },
  'px-8': { 'padding-left': '2rem', 'padding-right': '2rem' },
};

// Responsive breakpoint mapping
const responsiveBreakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// CSS Custom Properties from colors.css
const cssCustomProperties = {
  '--u-white': '#FFFFFF',
  '--u-black': '#01080F',
  '--u-gray-100': '#F9F9F9',
  '--u-gray-200': '#F1F1F1',
  '--u-gray-300': '#E2E2E2',
  '--u-blue': '#1D9BF0',
  '--u-dark-blue': '#252476',
  '--u-light-blue': '#D9ECFD',
  '--bg': '#FFFFFF',
  '--text': '#01080F',
  '--text-light': 'rgba(1, 8, 15, 0.70)',
  '--primary': '#1D9BF0',
  '--primary-dark': '#252476'
};

// Typography size mapping with responsive breakpoints
const typographySizes = {
  1: {
    mobile: { 'font-size': '38px' },
    tablet: { 'font-size': '48px' },
    desktop: { 'font-size': '67px' }
  },
  2: {
    mobile: { 'font-size': '36px' },
    tablet: { 'font-size': '40px' },
    desktop: { 'font-size': '56px' }
  },
  3: {
    mobile: { 'font-size': '28px' },
    tablet: { 'font-size': '32px' },
    desktop: { 'font-size': '40px' }
  },
  4: {
    mobile: { 'font-size': '25px' },
    tablet: { 'font-size': '28px' },
    desktop: { 'font-size': '34px' }
  },
  5: {
    mobile: { 'font-size': '23px' },
    tablet: { 'font-size': '23px' },
    desktop: { 'font-size': '23px' }
  },
  6: {
    mobile: { 'font-size': '18px' },
    tablet: { 'font-size': '18px' },
    desktop: { 'font-size': '18px' }
  }
};

class SliceRenderer {
  constructor() {
    this.srcPath = path.resolve(__dirname, '../src');
    this.i18nData = this.loadI18n();
  }

  // Load i18n utility
  loadI18n() {
    const i18nPath = path.join(this.srcPath, 'utils', 'i18n.js');
    if (fs.existsSync(i18nPath)) {
      // Simple mock implementation since we can't execute Astro context
      return {
        t: (content) => {
          if (typeof content === 'object' && content.pl) {
            return content.pl; // Default to Polish
          }
          return content;
        },
        getCurrentLang: () => 'pl'
      };
    }
    return null;
  }

  // Parse Astro component file
  parseAstroComponent(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter (everything between first --- and second ---)
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
    
    // Extract template (everything after the second ---)
    const template = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    
    return {
      frontmatter,
      template,
      content
    };
  }

  // Convert Tailwind classes to inline styles
  convertTailwindToInline(className, breakpoint = 'mobile') {
    const classes = className.split(' ').filter(Boolean);
    let styles = {};
    
    classes.forEach(cls => {
      // Handle responsive prefixes
      if (cls.includes(':')) {
        const [prefix, utility] = cls.split(':');
        if (breakpoint === 'mobile' && !['sm', 'md', 'lg', 'xl'].includes(prefix)) {
          return;
        }
        if (breakpoint === 'tablet' && !['md', 'lg', 'xl'].includes(prefix)) {
          return;
        }
        if (breakpoint === 'desktop' && !['lg', 'xl'].includes(prefix)) {
          return;
        }
        cls = utility;
      }
      
      // Handle custom font sizes
      if (cls.startsWith('text-[') && cls.endsWith(']')) {
        const fontSize = cls.slice(6, -1);
        styles['font-size'] = fontSize;
        return;
      }
      
      // Handle margin bottom classes
      if (cls.startsWith('mb-[') && cls.endsWith(']')) {
        const marginBottom = cls.slice(4, -1);
        styles['margin-bottom'] = marginBottom;
        return;
      }
      
      // Map standard Tailwind classes
      if (tailwindToCSS[cls]) {
        Object.assign(styles, tailwindToCSS[cls]);
      }
    });
    
    return styles;
  }

  // Convert styles object to inline style string
  stylesToInline(styles) {
    return Object.entries(styles)
      .map(([property, value]) => {
        // Resolve CSS custom properties
        if (typeof value === 'string' && value.startsWith('var(--')) {
          const varName = value.match(/var\((.*?)\)/)?.[1];
          if (varName && cssCustomProperties[varName]) {
            value = cssCustomProperties[varName];
          }
        }
        return `${property}: ${value}`;
      })
      .join('; ');
  }

  // Render heading component with responsive styles
  renderHeading(level, size, className, content, isMb = false) {
    const tag = `h${level}`;
    
    // Base styles
    const baseStyles = {
      'font-weight': '500',
      'line-height': '1.15',
      'letter-spacing': '-0.015em',
      'font-family': 'Geomanist, sans-serif'
    };

    // Get responsive typography
    const typography = typographySizes[size] || typographySizes[1];
    
    // Mobile styles (375px)
    const mobileStyles = {
      ...baseStyles,
      ...typography.mobile,
      ...this.convertTailwindToInline(className, 'mobile')
    };

    // Desktop styles (1440px)  
    const desktopStyles = {
      ...baseStyles,
      ...typography.desktop,
      ...this.convertTailwindToInline(className, 'desktop')
    };

    // Add margin bottom if specified
    if (isMb) {
      const mbSizes = {
        1: { mobile: '16px', desktop: '20px' },
        2: { mobile: '12px', desktop: '16px' },
        3: { mobile: '8px', desktop: '12px' },
        4: { mobile: '6px', desktop: '10px' },
        5: { mobile: '8px', desktop: '8px' },
        6: { mobile: '8px', desktop: '8px' }
      };
      
      const mbSize = mbSizes[size] || mbSizes[1];
      mobileStyles['margin-bottom'] = mbSize.mobile;
      desktopStyles['margin-bottom'] = mbSize.desktop;
    }

    return `
      <${tag} 
        style="${this.stylesToInline(mobileStyles)}"
        class="responsive-heading"
      >
        ${content}
      </${tag}>
      
      <style>
        @media (min-width: 1440px) {
          .responsive-heading:last-of-type {
            ${this.stylesToInline(desktopStyles)}
          }
        }
      </style>
    `;
  }

  // Render section component
  renderSection(mode, padding, content) {
    const paddingValues = {
      none: { mobile: '0', desktop: '0' },
      sm: { mobile: '2rem 0', desktop: '2rem 0' },
      md: { mobile: '3rem 0', desktop: '3rem 0' },
      lg: { mobile: '6rem 0', desktop: '6rem 0' },
      xl: { mobile: '8rem 0', desktop: '8rem 0' }
    };

    const currentPadding = paddingValues[padding] || paddingValues.lg;
    
    const mobileStyles = {
      width: '100%',
      padding: currentPadding.mobile,
      'background-color': cssCustomProperties['--bg'],
      color: cssCustomProperties['--text']
    };

    const desktopStyles = {
      ...mobileStyles,
      padding: currentPadding.desktop
    };

    return `
      <section 
        style="${this.stylesToInline(mobileStyles)}"
        data-theme="${mode || 'light'}"
        class="responsive-section"
      >
        <div style="max-width: 64rem; margin: 0 auto; padding: 0 1rem;">
          ${content}
        </div>
      </section>
      
      <style>
        @media (min-width: 1440px) {
          .responsive-section:last-of-type {
            ${this.stylesToInline(desktopStyles)}
          }
        }
      </style>
    `;
  }

  // Render a complete slice component
  async renderSlice(sliceName, lang = 'pl') {
    const slicePath = path.join(this.srcPath, 'components', 'slices', 'home', `${sliceName}.astro`);
    
    if (!fs.existsSync(slicePath)) {
      throw new Error(`Slice not found: ${sliceName}`);
    }

    const component = this.parseAstroComponent(slicePath);
    
    // Simple template processing for HomeHero example
    if (sliceName === 'HomeHero') {
      return this.renderHomeHero(lang);
    }
    
    // For other components, return a placeholder
    return `<div>Slice renderer for ${sliceName} not yet implemented</div>`;
  }

  // Specific renderer for HomeHero slice
  renderHomeHero(lang = 'pl') {
    const content = {
      title: {
        pl: "Rozwiązania dla ludzi, technologia dla biznesu",
        en: "Solutions for people, technology for business"
      },
      subtitle: {
        pl: "Jesteśmy największą firmą informatyczną w Polsce, i jedną z największych w Europie. Tworzymy cyfrową przyszłość.",
        en: "We are the largest IT company in Poland and one of the largest in Europe. We create the digital future."
      },
      cta: {
        pl: "Poznaj nasze rozwiązania", 
        en: "Discover our solutions"
      }
    };

    const t = (obj) => obj[lang] || obj.pl;

    const heading = this.renderHeading(1, 1, 'max-w-[800px]', t(content.title), true);
    
    const textStyles = {
      'max-width': '600px',
      'font-family': 'Geomanist, sans-serif',
      'margin-bottom': '2rem'
    };

    const buttonContainerMobileStyles = {
      display: 'flex',
      'flex-direction': 'column',
      gap: '1rem',
      'margin-top': '2rem'
    };

    const buttonContainerDesktopStyles = {
      display: 'flex', 
      'flex-direction': 'row',
      gap: '1rem',
      'margin-top': '2rem'
    };

    const buttonStyles = {
      'background-color': cssCustomProperties['--primary'],
      color: cssCustomProperties['--u-white'],
      padding: '0.75rem 1.5rem',
      'border-radius': '0.375rem',
      'text-decoration': 'none',
      'font-family': 'Geomanist, sans-serif',
      'font-weight': '500',
      display: 'inline-block'
    };

    const sectionContent = `
      ${heading}
      
      <p style="${this.stylesToInline(textStyles)}">
        ${t(content.subtitle)}
      </p>
      
      <div 
        style="${this.stylesToInline(buttonContainerMobileStyles)}"
        class="responsive-button-container"
      >
        <a href="#" style="${this.stylesToInline(buttonStyles)}">
          ${t(content.cta)}
        </a>
      </div>
      
      <style>
        @media (min-width: 640px) {
          .responsive-button-container:last-of-type {
            ${this.stylesToInline(buttonContainerDesktopStyles)}
          }
        }
      </style>
    `;

    return this.renderSection('light', 'lg', sectionContent);
  }

  // Generate complete HTML document
  generateHTML(sliceContent, title = 'Slice Preview') {
    return `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        /* Geomanist Font Face Declarations */
        @font-face {
            font-family: 'Geomanist';
            src: url('./public/fonts/geomanist-400.woff2') format('woff2'),
                 url('./public/fonts/geomanist-400.woff') format('woff');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Geomanist';
            src: url('./public/fonts/geomanist-500.woff2') format('woff2'),
                 url('./public/fonts/geomanist-500.woff') format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Geomanist';
            src: url('./public/fonts/geomanist-600.woff2') format('woff2'),
                 url('./public/fonts/geomanist-600.woff') format('woff');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
        }

        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Geomanist', sans-serif;
            line-height: 1.6;
            color: ${cssCustomProperties['--text']};
            background-color: ${cssCustomProperties['--bg']};
        }
        
        /* Responsive preview containers */
        .preview-container {
            margin: 2rem auto;
            max-width: 1200px;
            padding: 0 1rem;
        }
        
        .preview-header {
            text-align: center;
            margin-bottom: 2rem;
            font-family: 'Geomanist', sans-serif;
        }
        
        .preview-frame {
            border: 2px solid #e2e2e2;
            margin-bottom: 2rem;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .preview-frame h3 {
            background: #f1f1f1;
            padding: 0.5rem 1rem;
            margin: 0;
            font-size: 14px;
            color: #666;
            font-weight: 500;
        }
        
        .frame-375 {
            width: 375px;
            margin: 0 auto;
        }
        
        .frame-1440 {
            width: 100%;
            max-width: 1440px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="preview-header">
            <h1>Slice Preview: ${title}</h1>
            <p>Generated with inline styles for responsive breakpoints</p>
        </div>
        
        <div class="preview-frame frame-375">
            <h3>Mobile View (375px)</h3>
            <div style="width: 375px; overflow-x: auto;">
                ${sliceContent}
            </div>
        </div>
        
        <div class="preview-frame frame-1440">
            <h3>Desktop View (1440px)</h3>
            <div style="width: 100%; min-width: 1440px;">
                ${sliceContent}
            </div>
        </div>
    </div>
</body>
</html>
    `;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: node slice-renderer.js <slice-name> [language] [output-file]

Examples:
  node slice-renderer.js HomeHero
  node slice-renderer.js HomeHero en
  node slice-renderer.js HomeHero pl output.html
  
Available slices:
  - HomeHero
  - HomeAbout
  - HomeBaas
  - HomeCertificates
  - HomeCloudFeatures
  - HomeFaq
    `);
    process.exit(1);
  }

  const sliceName = args[0];
  const language = args[1] || 'pl';
  const outputFile = args[2] || `${sliceName.toLowerCase()}-preview.html`;

  try {
    const renderer = new SliceRenderer();
    const sliceContent = await renderer.renderSlice(sliceName, language);
    const html = renderer.generateHTML(sliceContent, sliceName);
    
    // Write to output file
    const outputPath = path.resolve(process.cwd(), outputFile);
    fs.writeFileSync(outputPath, html, 'utf-8');
    
    console.log(`✅ Generated ${sliceName} preview:`);
    console.log(`   Language: ${language}`);
    console.log(`   Output: ${outputPath}`);
    console.log(`   Breakpoints: 375px (mobile) and 1440px (desktop)`);
    console.log(`\n🌐 Open ${outputFile} in your browser to view the result.`);
    
  } catch (error) {
    console.error(`❌ Error generating slice preview:`, error.message);
    process.exit(1);
  }
}

// Export for programmatic use
export { SliceRenderer };

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
