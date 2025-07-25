import sys
import os
from fastapi.testclient import TestClient

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
client = TestClient(app)

def test_analyze_endpoint():
    response = client.post("/analyze", json={"repo_url": "https://github.com/psf/requests"})
    assert response.status_code == 200
    data = response.json()
    assert "readme_score" in data
    assert "suggestions" in data
