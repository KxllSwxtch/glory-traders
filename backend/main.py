import httpx
import logging

from fastapi import FastAPI, HTTPException, Query

# Создание приложения FastAPI
app = FastAPI()

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_URL = "https://mike-auto.ru/api/proxy/filter/filter"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    ),
    "Referer": "https://mike-auto.ru/",
}


# Эндпоинт для получения автомобилей с конкретной страницы
@app.get("/api/proxy/filter/page")
async def get_cars_page(page: int = Query(..., ge=1)):
    """Возвращает автомобили с указанной страницы."""
    url = f"{BASE_URL}?page={page}"
    try:
        async with httpx.AsyncClient() as client:
            logger.info(f"Fetching page {page}")
            response = await client.get(url, headers=HEADERS)
            response.raise_for_status()
            data = response.json()

            return {
                "page": page,
                "data": data.get("data", []),
                "pageCount": data.get("pageCount", 0),
            }
    except httpx.RequestError as e:
        logger.error(f"Error fetching page {page}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch page {page}")
