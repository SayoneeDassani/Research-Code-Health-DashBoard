
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from github import Github
import tempfile
import shutil
import os
import subprocess
import re

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic request model
class AnalyzeRequest(BaseModel):
    repo_url: str

# Utility: clone GitHub repo to temp dir
def clone_repo(repo_url):
    temp_dir = tempfile.mkdtemp()
    try:
        subprocess.run(["git", "clone", "--depth", "1", repo_url, temp_dir], check=True)
        return temp_dir
    except subprocess.CalledProcessError:
        return None

# Utility: get all source code files
def get_code_files(path):
    exts = [".py", ".js", ".ts", ".java", ".cpp", ".c", ".rb", ".go"]
    code_files = []
    for root, _, files in os.walk(path):
        for file in files:
            if any(file.endswith(ext) for ext in exts):
                code_files.append(os.path.join(root, file))
    return code_files

# === Metric Calculators ===

def readme_score(path):
    for fname in ["README.md", "README.txt"]:
        fpath = os.path.join(path, fname)
        if os.path.exists(fpath):
            length = len(open(fpath, "r", encoding="utf-8", errors="ignore").read())
            return min(1.0, length / 1000)
    return 0.0

def test_score(path):
    count = 0
    for root, _, files in os.walk(path):
        if "test" in root.lower() or "tests" in root.lower():
            count += len(files)
    return min(1.0, count / 5)

def code_quality_score(files):
    quality_score = 1.0
    penalties = 0
    for file in files:
        try:
            lines = open(file, "r", encoding="utf-8", errors="ignore").readlines()
            for line in lines:
                if len(line.strip()) > 120:
                    penalties += 0.5
                if line.strip().startswith("print(") or "console.log" in line:
                    penalties += 0.3
        except:
            continue
    quality_score -= min(1.0, penalties / 50)
    return max(0.0, quality_score)

def maintenance_score(path):
    score = 0
    indicators = ["release", ".github", "ci", "changelog", "version"]
    for root, _, files in os.walk(path):
        for file in files:
            if any(ind in file.lower() for ind in indicators):
                score += 1
    return min(1.0, score / 4)

def dependency_score(path):
    files = os.listdir(path)
    if any(f in files for f in ["requirements.txt", "package.json", "Pipfile", "environment.yml"]):
        return 1.0
    return 0.0

def modularity_score(files):
    if not files:
        return 0.0
    avg_len = sum(len(open(f, "r", encoding="utf-8", errors="ignore").readlines()) for f in files) / len(files)
    if avg_len <= 80:
        return 1.0
    elif avg_len <= 200:
        return 0.6
    else:
        return 0.3

def comments_style_score(files):
    comment_symbols = {"py": "#", "js": "//", "java": "//", "cpp": "//", "c": "//", "ts": "//", "rb": "#", "go": "//"}
    total_lines = 0
    comment_lines = 0

    for file in files:
        ext = file.split(".")[-1]
        symbol = comment_symbols.get(ext, "#")
        try:
            lines = open(file, "r", encoding="utf-8", errors="ignore").readlines()
            total_lines += len(lines)
            comment_lines += sum(1 for line in lines if line.strip().startswith(symbol))
        except:
            continue

    if total_lines == 0:
        return 0.0
    ratio = comment_lines / total_lines
    return min(1.0, ratio * 5)

# === Intelligent Suggestions ===

def generate_suggestions(scores):
    suggestions = []

    if scores["readme_score"] < 0.5:
        suggestions.append("📝 Add or expand your README file to explain project usage.")

    if scores["test_score"] < 0.5:
        suggestions.append("🧪 Include more test cases to improve test coverage.")

    if scores["code_quality_score"] < 0.6:
        suggestions.append("🔍 Improve code quality by reducing long lines or console logs.")

    if scores["maintenance_score"] < 0.5:
        suggestions.append("🔧 Add CI configs or changelogs to show active maintenance.")

    if scores["dependency_score"] < 1.0:
        suggestions.append("📦 Include dependency files like `requirements.txt` or `package.json`.")

    if scores["modularity_score"] < 0.6:
        suggestions.append("📂 Break large files into smaller modules for better modularity.")

    if scores["comments_style_score"] < 0.4:
        suggestions.append("💬 Add more comments for readability and maintainability.")

    return suggestions

# === Main Endpoint ===

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    repo_url = request.repo_url
    temp_dir = clone_repo(repo_url)
    if not temp_dir:
        return {"error": "Failed to clone repo."}

    try:
        files = get_code_files(temp_dir)

        scores = {
            "readme_score": round(readme_score(temp_dir), 2),
            "test_score": round(test_score(temp_dir), 2),
            "code_quality_score": round(code_quality_score(files), 2),
            "maintenance_score": round(maintenance_score(temp_dir), 2),
            "dependency_score": round(dependency_score(temp_dir), 2),
            "modularity_score": round(modularity_score(files), 2),
            "comments_style_score": round(comments_style_score(files), 2),
        }

        scores["total"] = round(sum(scores.values()) / len(scores), 2)
        scores["suggestions"] = generate_suggestions(scores)

        return scores
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
