# 🩺 Research Code Health Dashboard

> A full-stack tool to analyze, visualize, and improve research code quality

---

## 🎯 Motivation

In research environments (especially academia) codebases often lack the structure and sustainability practices found in production engineering. Many projects are rushed, poorly documented, and abandoned post-publication. This not only slows down reproducibility but also burdens new contributors.

**RCHD** was built to address that gap by helping researchers and engineers **evaluate the health of their codebases**, visually identify areas of concern, and receive actionable, intelligent suggestions.

---

## 💡 What It Does

RCHD is a web-based dashboard that:

✅ **Analyzes any public GitHub repository**  
✅ Scores code quality across 7 software engineering dimensions  
✅ Provides **actionable suggestions** to improve maintainability  
✅ Visualizes results through clean, exportable **radar and bar charts**. This can be helpful during annual reviews and funding proposals.
✅ Offers a friendly, mobile-ready UI for non-technical users  

---

## 📊 Metrics Evaluated

Each repository is scored on the following:

1. **README Quality** – Is it informative and helpful?
2. **Test Coverage** – Are tests present and maintained?
3. **Code Quality** – Linting, formatting, and structure
4. **Maintenance Activity** – Commit recency and issue hygiene
5. **Dependency Health** – Outdated/insecure packages
6. **Modularity & Reuse** – Code organization and abstraction
7. **Comments & Style** – Developer-friendly annotations

---

## 🚀 Tech Stack

| Layer     | Tech Used                     |
|-----------|-------------------------------|
| Frontend  | React + TailwindCSS + Recharts |
| Backend   | FastAPI + Pydantic + GitHub API |
| DevOps    | Docker                          |

---

## ⚙️ Setup & Usage

### 1. Clone the repo

```bash
git clone https://github.com/SayoneeDassani/Research-Code-Health-DashBoard.git
cd Research-Code-Health-DashBoard
```

### 2. Configure `.env`

Create a `.env` file with your GitHub token:

```
GITHUB_TOKEN=ghp_your_personal_access_token_here
```

> ⚠️ Don’t commit this file. It's already ignored in `.gitignore`.

### 3. Build and Run with Docker

```bash
docker compose up --build
```

- Frontend available at: http://localhost:5173  
- Backend API at: http://localhost:8000/docs  

### 4. Analyze a Repository

Just enter any public GitHub repo (e.g. `numpy/numpy`) into the frontend and hit **Analyze**.

---

## 🧠 How Suggestions Work

RCHD intelligently analyzes each repository using:

- Static code checks
- Repository metadata from GitHub
- Package dependency trees
- File system heuristics

It then maps these to a curated set of suggestions like:

- "Add usage examples in your README"
- "Include unit tests for major functions"
- "Consider splitting large files into smaller modules"

---

## 🛣️ Future Roadmap

🧠 **LLM-based Suggestion Engine**  
Use GPT-based models to generate context-aware code improvements from PRs.

🤖 **GitLab / GitHub Bot Integration**  
Deploy RCHD as a CI bot that comments on pull requests with code health summaries.

📦 **VS Code Extension**  
Allow researchers to visualize and fix code issues directly in the IDE.

📚 **Academic Use Case Templates**  
Prebuilt templates for fields like computational biology, NLP, or climate science.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for more details.
