# Code Snippets Directory Structure

This directory contains reusable code snippets organized by category.
Each snippet is a separate file with metadata in the filename or frontmatter.

## Structure

```
backend/snippets/
├── components/
│   ├── hero/
│   │   ├── gradient-hero.tsx
│   │   ├── minimal-hero.tsx
│   │   └── animated-hero.tsx
│   ├── navbar/
│   │   ├── sticky-navbar.tsx
│   │   └── transparent-navbar.tsx
│   ├── footer/
│   │   └── social-footer.tsx
│   └── cards/
│       ├── glass-card.tsx
│       └── project-card.tsx
├── layouts/
│   ├── grids/
│   │   ├── two-column.tsx
│   │   └── masonry.tsx
│   └── sections/
│       └── container.tsx
├── styles/
│   ├── tailwind/
│   │   ├── config-dark.ts
│   │   └── config-gradient.ts
│   └── animations/
│       └── fade-in.tsx
├── animations/
│   ├── framer-motion/
│   │   ├── fade-variants.ts
│   │   └── slide-variants.ts
│   └── scroll/
│       └── reveal-on-scroll.tsx
└── seo/
    ├── metadata/
    │   └── portfolio-metadata.ts
    └── structured-data/
        └── person-schema.ts
```

## File Naming Convention

Files should follow this pattern:
`{descriptive-name}.{extension}`

Example: `gradient-hero.tsx`, `glass-card.tsx`

## Metadata Format (Optional)

You can add metadata as a comment block at the top of each file:

```typescript
/**
 * @snippet-name Modern Gradient Hero
 * @category component
 * @subcategory hero
 * @tags gradient, modern, cta
 * @framework nextjs
 * @description A modern hero section with gradient background and CTA buttons
 */

export default function GradientHero() {
  // ... component code
}
```

## Supported File Extensions

- `.tsx` - React/Next.js components
- `.ts` - TypeScript utilities
- `.css` - CSS files
- `.json` - Configuration files

## How to Ingest Snippets

Once you've added your code files to the appropriate directories:

```bash
cd backend
python -m app.scripts.ingest_from_files
```

The script will:
1. Scan all subdirectories for supported file types
2. Extract metadata from comments or infer from file path
3. Generate embeddings for semantic search
4. Store in the database with proper categorization

## Tips

- Organize files logically by category and subcategory
- Add metadata comments for better search results
- Use descriptive filenames (e.g., `gradient-hero.tsx` not `hero1.tsx`)
- Test search after ingestion to verify quality
