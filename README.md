# GitFolio AI

**AI-Powered Portfolio Generator**  
Transform your GitHub profile into a stunning, production-ready portfolio website in seconds using AI.

GitFolio AI combines intelligent code generation with semantic search to create beautiful, personalized developer portfolios. Chat with AI to customize your site, then deploy instantly.

---

## ✨ Key Features

- **Text-to-App Generation**: Describe your vision, get a complete Next.js portfolio
- **GitHub Integration**: Automatically fetch and display your repos, stats, and bio
- **AI Chat Editor**: Modify your portfolio by chatting with AI in real-time
- **Semantic Code Search**: AI uses proven component patterns from a curated library
- **Live Preview**: See changes instantly in split-screen view
- **One-Click Deploy**: Export or deploy your portfolio immediately

---

## 🏗 Architecture

GitFolio AI uses a **dual-system architecture**:

### Frontend (Next.js + Supabase)
- **Purpose**: User interface, authentication, GitHub data caching
- **Stack**: Next.js 14, React, Tailwind CSS, Framer Motion, Clerk Auth
- **Database**: Supabase (PostgreSQL) - stores user profiles and GitHub data
- **Features**: Dashboard, preview page, chat interface

### Backend (FastAPI + Neon)
- **Purpose**: AI code generation, embeddings, semantic search
- **Stack**: Python, FastAPI, OpenRouter, Ollama, pgvector
- **Database**: Neon (PostgreSQL) - stores portfolios, generated files, code snippets
- **Features**: LLM integration, vector search, snippet library

---

## 🛠 Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 14 (App Router), TypeScript | UI, routing, SSR |
| **Styling** | Tailwind CSS, Framer Motion | Design system & animations |
| **Auth** | Clerk + GitHub OAuth | User authentication |
| **Frontend DB** | Supabase (PostgreSQL) | User data, GitHub cache |
| **Backend** | FastAPI, Uvicorn | AI API & orchestration |
| **AI Models** | OpenRouter (Llama 3.3 70B), Ollama (Snowflake Arctic) | Code generation & embeddings |
| **Backend DB** | Neon (PostgreSQL + pgvector) | Portfolios, snippets, vectors |
| **Caching** | TTLCache (in-memory) | Performance optimization |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** and **pnpm**
- **Python 3.10+**
- **Supabase account** (for frontend)
- **Neon account** (for backend)
- **OpenRouter API key**
- **Ollama** (local) or hosted embedding service

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gitfolio-ai.git
cd gitfolio-ai
```

---

### 2. Frontend Setup

```bash
# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Add:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY

# Run development server
pnpm dev
```

Frontend runs at: **http://localhost:3000**

---

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.template .env
# Add:
# - DATABASE_URL (Neon PostgreSQL connection string)
# - OPENROUTER_API_KEY
# - OLLAMA_BASE_URL (default: http://localhost:11434)

# Ingest code snippets
python -m app.scripts.ingest_from_files

# Run server
uvicorn app.main:app --reload
```

Backend API docs: **http://localhost:8000/docs**

---

## 📂 Project Structure

```
gitfolio-ai/
├── src/                      # Next.js frontend
│   ├── app/                  # App router pages
│   │   ├── dashboard/        # User dashboard
│   │   ├── preview/          # Portfolio preview & editor
│   │   └── api/              # API routes (GitHub sync)
│   ├── components/           # React components
│   └── lib/                  # Supabase client
│
├── backend/                  # Python backend
│   ├── app/
│   │   ├── api/              # FastAPI routes
│   │   ├── core/             # Config, database, prompts
│   │   ├── models/           # SQLAlchemy models & schemas
│   │   ├── services/         # LLM, vector, snippet services
│   │   └── scripts/          # Ingestion scripts
│   │
│   └── snippets/             # Code snippet library
│       ├── components/       # React components
│       ├── layouts/          # Layout patterns
│       ├── styles/           # Tailwind configs
│       ├── animations/       # Framer Motion variants
│       └── seo/              # Metadata templates
│
└── public/                   # Static assets
```

---

## 🧠 How It Works

### 1. **User Connects GitHub**
- Frontend fetches profile and repos via GitHub OAuth
- Data is cached in Supabase for quick access

### 2. **User Requests Portfolio**
- Frontend sends request to backend `/api/generate`
- Backend searches snippet library for relevant components
- AI generates portfolio code using snippets as examples

### 3. **AI Returns Structured Files**
- Backend returns JSON array of files (`filename`, `content`)
- Files are stored in Neon database
- Frontend displays live preview

### 4. **User Edits via Chat**
- User chats with AI to request changes
- Backend retrieves existing files + relevant snippets
- AI generates updated code
- Preview updates in real-time

---

## 📦 Code Snippet System

GitFolio uses a **file-based snippet library** to ensure high-quality output.

### Adding Snippets

1. Create a file in `backend/snippets/` following the structure:
   ```
   snippets/components/hero/gradient-hero.tsx
   ```

2. Add metadata (optional):
   ```typescript
   /**
    * @snippet-name Modern Gradient Hero
    * @tags gradient, cta, responsive
    * @description Hero section with gradient background
    */
   ```

3. Ingest snippets:
   ```bash
   python -m app.scripts.ingest_from_files
   ```

Snippets are embedded and semantically searchable by the AI.

---

## 🗺 Roadmap

### ✅ Phase 1 - Foundation (Complete)
- Next.js frontend with Supabase
- FastAPI backend with Neon
- GitHub OAuth integration
- Basic portfolio generation

### ✅ Phase 2 - AI Enhancement (Complete)
- OpenRouter + Ollama integration
- Vector embeddings with pgvector
- Semantic snippet search
- Real-time chat editing

### 🚧 Phase 3 - Production (In Progress)
- [ ] Database migrations (Alembic)
- [ ] Deployment automation
- [ ] Custom domains
- [ ] Analytics dashboard

### 📋 Phase 4 - Scale
- [ ] Multi-template support
- [ ] Team portfolios
- [ ] A/B testing for snippets
- [ ] Community snippet marketplace

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/), [FastAPI](https://fastapi.tiangolo.com/), and [OpenRouter](https://openrouter.ai/)
- Inspired by [Lovable](https://lovable.dev/) and [v0](https://v0.dev/)
- Powered by [Neon](https://neon.tech/) and [Supabase](https://supabase.com/)

---

**Built with ❤️ in Nigeria · January 2026**
