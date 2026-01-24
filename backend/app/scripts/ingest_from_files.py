"""
File-based snippet ingestion script.
Scans the snippets/ directory and ingests all code files.

Usage:
    python -m app.scripts.ingest_from_files
"""
import asyncio
import os
import re
from pathlib import Path
from app.core.database import AsyncSessionLocal
from app.services.snippet_service import snippet_service

# Base directory for snippets
SNIPPETS_DIR = Path(__file__).parent.parent.parent / "snippets"

# Category mapping based on directory structure
CATEGORY_MAP = {
    "components": "component",
    "layouts": "layout",
    "styles": "style",
    "animations": "animation",
    "seo": "seo"
}

# Supported file extensions
SUPPORTED_EXTENSIONS = {".tsx", ".ts", ".jsx", ".js", ".css", ".json"}

def parse_metadata_from_content(content: str) -> dict:
    """
    Extract metadata from comment block at the top of the file.
    
    Example:
    /**
     * @snippet-name Modern Hero
     * @category component
     * @subcategory hero
     * @tags gradient, modern
     * @description A modern hero section
     */
    """
    metadata = {}
    
    # Match JSDoc-style comment block
    pattern = r'/\*\*\s*(.*?)\s*\*/'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        comment_block = match.group(1)
        
        # Extract @snippet-name
        name_match = re.search(r'@snippet-name\s+(.+)', comment_block)
        if name_match:
            metadata['name'] = name_match.group(1).strip()
        
        # Extract @description
        desc_match = re.search(r'@description\s+(.+)', comment_block)
        if desc_match:
            metadata['description'] = desc_match.group(1).strip()
        
        # Extract @tags
        tags_match = re.search(r'@tags\s+(.+)', comment_block)
        if tags_match:
            tags_str = tags_match.group(1).strip()
            metadata['tags'] = [t.strip() for t in tags_str.split(',')]
        
        # Extract @framework
        framework_match = re.search(r'@framework\s+(.+)', comment_block)
        if framework_match:
            metadata['framework'] = framework_match.group(1).strip()
    
    return metadata

def infer_metadata_from_path(file_path: Path, base_dir: Path) -> dict:
    """
    Infer category and subcategory from file path.
    
    Example:
    snippets/components/hero/gradient-hero.tsx
    -> category: component, subcategory: hero
    """
    relative_path = file_path.relative_to(base_dir)
    parts = relative_path.parts
    
    metadata = {
        'category': 'component',  # default
        'subcategory': 'general',
        'tags': [],
        'framework': 'nextjs'
    }
    
    if len(parts) >= 1:
        # First level is category
        category_dir = parts[0]
        metadata['category'] = CATEGORY_MAP.get(category_dir, category_dir)
    
    if len(parts) >= 2:
        # Second level is subcategory
        metadata['subcategory'] = parts[1]
    
    # Infer name from filename
    filename = file_path.stem  # Without extension
    # Convert kebab-case to Title Case
    name = filename.replace('-', ' ').replace('_', ' ').title()
    metadata['name'] = name
    
    # Add file extension as tag
    ext = file_path.suffix.lstrip('.')
    metadata['tags'].append(ext)
    
    return metadata

async def ingest_file(session, file_path: Path, base_dir: Path):
    """Ingest a single code file."""
    try:
        # Read file content
        with open(file_path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Parse metadata from content
        content_metadata = parse_metadata_from_content(code)
        
        # Infer metadata from path
        path_metadata = infer_metadata_from_path(file_path, base_dir)
        
        # Merge metadata (content takes precedence)
        metadata = {**path_metadata, **content_metadata}
        
        # Default description if not provided
        if 'description' not in metadata:
            metadata['description'] = f"A {metadata['subcategory']} {metadata['category']}"
        
        # Ingest snippet
        snippet = await snippet_service.ingest_snippet(
            session=session,
            name=metadata['name'],
            category=metadata['category'],
            subcategory=metadata['subcategory'],
            code=code,
            description=metadata['description'],
            tags=metadata.get('tags', []),
            framework=metadata.get('framework', 'nextjs')
        )
        
        print(f"✅ Ingested: {metadata['name']} ({file_path.relative_to(base_dir)})")
        return snippet
        
    except Exception as e:
        print(f"❌ Failed to ingest {file_path}: {e}")
        return None

async def scan_and_ingest():
    """Scan the snippets directory and ingest all files."""
    if not SNIPPETS_DIR.exists():
        print(f"❌ Snippets directory not found: {SNIPPETS_DIR}")
        print(f"Please create the directory and add your code files.")
        return
    
    # Find all supported files
    files_to_ingest = []
    for ext in SUPPORTED_EXTENSIONS:
        files_to_ingest.extend(SNIPPETS_DIR.rglob(f"*{ext}"))
    
    if not files_to_ingest:
        print(f"⚠️  No code files found in {SNIPPETS_DIR}")
        print(f"Supported extensions: {', '.join(SUPPORTED_EXTENSIONS)}")
        return
    
    print(f"Found {len(files_to_ingest)} files to ingest...")
    print()
    
    async with AsyncSessionLocal() as session:
        ingested_count = 0
        for file_path in files_to_ingest:
            result = await ingest_file(session, file_path, SNIPPETS_DIR)
            if result:
                ingested_count += 1
        
        print()
        print(f"✨ Ingestion complete! {ingested_count}/{len(files_to_ingest)} files ingested successfully.")

if __name__ == "__main__":
    print("=" * 60)
    print("GitFolio AI - File-Based Snippet Ingestion")
    print("=" * 60)
    print()
    asyncio.run(scan_and_ingest())
