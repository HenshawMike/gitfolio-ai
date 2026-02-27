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

## What to Ingest

The quality of the generated portfolios depends directly on the variety and quality of snippets in this directory. Aim for **high-utility, visually stunning components**.

### 1. Essential Categories
- **Heroes**: High-impact introduction sections.
    - *Examples*: `mesh-gradient-hero.tsx`, `typing-animation-hero.tsx`, `minimalist-text-hero.tsx`.
- **Navbars**: Responsive navigation layouts.
    - *Examples*: `floating-dock-nav.tsx`, `blurred-glass-nav.tsx`.
- **Project Cards**: Layouts for displaying GitHub repositories.
    - *Examples*: `3d-card-effect.tsx`, `hover-reveal-card.tsx`, `bento-grid-item.tsx`.
- **Skills/Tech Stack**: Visual representations of tools.
    - *Examples*: `infinite-icon-scroll.tsx`, `radar-chart-skills.tsx`.
- **Contact/Footer**: Final call-to-action sections.

### 2. Design Standards (The "Wow" Factor)
To maintain the **GitFolio AI aesthetic**, ensure snippets use:
- **Glassmorphism**: `backdrop-blur-md`, subtle borders, and low-opacity backgrounds.
- **Micro-animations**: Framer Motion for enters, hovers, and scroll reveals.
- **Dark Mode First**: Focus on deep grays, blacks, and vibrant accent gradients.
- **Responsive Design**: Ensure everything looks great on mobile using Tailwind's `sm:`, `md:`, and `lg:` prefixes.

---

## How the Project Is Built

Once you trigger a "Build" (via the `/generate` API), GitFolio AI follows this pipeline:

### 1. Context Assembly
The AI doesn't just "guess" code. It:
- **Analyzes GitHub Data**: Fetches your repos, bio, and languages.
- **Semantic Search**: Searches this `/snippets` directory (using the embeddings generated during ingestion) for code that matches your requested style or theme.

### 2. Tailored Generation
The LLM (e.g., Llama 3 or GPT-4o) receives the GitHub data AND the actual code from the top 3-5 relevant snippets as "context". It then:
- Modifies the snippets to inject **your actual data**.
- Harmonizes the styles (colors, fonts) across all generated files.
- Creates a complete Next.js project structure (e.g., `page.tsx`, `components/`, `globals.css`).

### 3. The Result (The "Built Project")
The final output is stored in the database as a **Virtual Project**:
- **Architecture**: A set of `FileObject` entries (filename + content) linked to a `Portfolio` ID.
- **Preview**: Accessible via `/preview?id={id}`, which dynamically renders these files in a sandboxed environment.
- **Export**: Users can then download the zip or deploy directly to Vercel/Netlify.

---

## How to Ingest Snippets

Once you've added your code files to the appropriate directories:

```bash
cd backend
python -m app.scripts.ingest_from_files
```

The script will:
1. **Scan**: All subdirectories for `.tsx`, `.ts`, `.css`, etc.
2. **Metadata**: Extract from comments (recommended) or infer from the path.
3. **Embed**: Generate semantic embeddings using Ollama (configured in `.env`).
4. **Store**: Save to the `code_snippets` table in PostgreSQL.

---

## Tips

- **Metadata Matters**: Use `@tags` like `minimal`, `neon`, or `corporate` to help the AI find the right style.
- **Self-Contained**: Try to make snippets self-contained (i.e., minimal external dependencies beyond Tailwind and Framer Motion).
- **Test Ingestion**: Run the script and check the terminal output for "✅ Ingested".
