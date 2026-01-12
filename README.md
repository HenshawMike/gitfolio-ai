# Gitfolio AI

**AI-powered developer portfolio builder**  
Turn your raw GitHub activity into a polished, narrative-driven personal portfolio — *with you in the loop*.

Gitfolio AI scans a developer’s GitHub profile, reflects back insights, runs a guided AI brainstorm session, and only then generates a portfolio aligned with the developer’s goals, tone, and story.

---

## ✨ Key Features (MVP)

- GitHub profile & repository scanning  
- AI-guided brainstorm session  
  - Reflection & profile summary  
  - Goals, audience & tone alignment  
  - Project curation  
  - Narrative & headline proposals  
- Stateful multi-agent workflow (human-in-the-loop by design)  
- Chat-style brainstorming interface  
- Editable, shareable portfolio output  
- Developer-first, dark-mode-friendly UI  

---

## 🎯 Product Philosophy

> **No blind generation. No generic portfolios.**  
Gitfolio AI prioritizes alignment over automation by making the brainstorm session mandatory before portfolio creation.

---

## 🛠 Tech Stack

| Layer              | Technology                              | Purpose |
|--------------------|-----------------------------------------|---------|
| Frontend           | Next.js 15+ (App Router), TypeScript    | UI, routing, SSR |
| Styling            | Tailwind CSS, shadcn/ui                 | Design system & components |
| Backend            | FastAPI, Uvicorn                        | API & orchestration |
| AI Orchestration   | LangGraph, LangChain                   | Stateful agents & workflows |
| LLM Gateway        | litellm + OpenRouter                   | Model routing |
| GitHub API         | PyGithub                               | GitHub data access |
| Database           | Supabase (PostgreSQL)                  | Sessions, scans, portfolios |
| Auth (planned)     | Supabase Auth / GitHub OAuth           | User accounts |
| Deployment         | Vercel (frontend), Fly.io / Railway (backend) | Hosting & CI/CD |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ & pnpm  
- Python 3.11+  
- Supabase account  
- OpenRouter API key  

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gitfolio-ai.git
cd gitfolio-ai
```

---

### 2. Frontend Setup

```bash
cd frontend
pnpm install
cp .env.example .env.local
# set NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
pnpm dev
```

Frontend runs at: http://localhost:3000

---

### 3. Backend Setup

```bash
cd ../backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# add OPENROUTER_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, etc.

uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

---

## 📂 Project Structure

```text
gitfolio-ai/
├── frontend/              # Next.js app
│   ├── app/               # App router pages & layouts
│   ├── components/        # UI components
│   └── lib/               # Utilities & API clients
├── backend/               # FastAPI + LangGraph
│   ├── app/
│   │   ├── api/           # REST endpoints
│   │   ├── agents/        # LangGraph nodes
│   │   ├── core/          # LLM config & dependencies
│   │   └── services/      # GitHub, DB, business logic
│   └── requirements.txt
└── docs/                  # Architecture & design docs (planned)
```

---

## 🧠 AI Architecture (High-Level)

1. **Scanner Agent**  
   Analyzes GitHub profile & repositories.

2. **Brainstorm Agent**  
   Reflects insights, asks alignment questions, curates projects.

3. **Portfolio Generator Agent**  
   Produces final portfolio based strictly on brainstorm decisions.

---

## 🗺 Roadmap

### Phase 1 – Foundation ✅
- GitHub scanning
- LLM gateway integration
- Core agent graph

### Phase 2 – Brainstorm Experience (In Progress)
- Streaming chat UX
- Reflection & curation agents
- Session persistence

### Phase 3 – Portfolio Generation
- Final synthesis agent
- Markdown/HTML rendering
- Inline editing

### Phase 4 – Launch & Scale
- Authentication
- Public portfolio URLs
- Custom themes & domains
- Analytics & feedback loop

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repo  
2. Create a feature branch  
3. Commit your changes  
4. Open a Pull Request  

---

## 📄 License

MIT License

---

Built with ❤️ in Nigeria · January 2026