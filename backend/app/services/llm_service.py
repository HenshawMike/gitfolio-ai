import httpx
import json
import re
from app.core.config import settings
from typing import List, Optional, Dict, Any
from app.core.prompts import SYSTEM_PROMPT
from app.services.cache import async_cache, response_cache

class LLMService:
    def __init__(self):
        self.openrouter_key = settings.OPENROUTER_API_KEY
        self.ollama_base_url = settings.OLLAMA_BASE_URL
        self.headers = {
            "Authorization": f"Bearer {self.openrouter_key}",
            "HTTP-Referer": "https://gitfolio.ai", # Required by OpenRouter
            "X-Title": "GitFolio AI"
        }

    @async_cache(response_cache)
    async def get_embedding(self, text: str, model: str = "snowflake-arctic-embed:33m") -> List[float]:
        """
        Get embeddings from Ollama for a given text.
        """
        async with httpx.AsyncClient() as client:
            try:
                # Ollama API: POST /api/embeddings
                # Payload: { "model": "snowflake-arctic-embed", "prompt": "text" }
                response = await client.post(
                    f"{self.ollama_base_url}/api/embeddings",
                    json={"model": model, "prompt": text},
                    timeout=30.0
                )
                response.raise_for_status()
                data = response.json()
                return data["embedding"]
            except Exception as e:
                print(f"Error fetching embedding: {e}")
                return []

    @async_cache(response_cache)
    async def generate_code(self, prompt: str, context: str = "", model: str = "openrouter/meta-llama/llama-3.3-70b-instruct:free") -> List[Dict[str, str]]:
        """
        Generate code using OpenRouter.
        """
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
        ]

        if context:
             messages.append({"role": "system", "content": f"Context/Knowledge Base:\n{context}"})

        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.2
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=self.headers,
                    json=payload,
                    timeout=60.0
                )
                response.raise_for_status()
                data = response.json()
                content = data["choices"][0]["message"]["content"]
                
                # Parse JSON output
                try:
                    # Remove markdown code blocks if present
                    clean_content = re.sub(r"^```json\s*|\s*```$", "", content.strip(), flags=re.MULTILINE | re.DOTALL)
                    parsed_files = json.loads(clean_content)
                    if isinstance(parsed_files, list):
                        return parsed_files
                    else:
                        print("LLM did not return a list")
                        return []
                except json.JSONDecodeError as e:
                    print(f"JSON Parse Error: {e} \nContent: {content}")
                    return []

            except Exception as e:
                print(f"Error generating code: {e}")
                return []

llm_service = LLMService()
