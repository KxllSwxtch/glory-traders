from fastapi import FastAPI, HTTPException, Request
import httpx
from aiocache import cached
from slowapi import Limiter
from slowapi.util import get_remote_address
import logging
import asyncio

# Создание приложения FastAPI
app = FastAPI()

# Настройка ограничений запросов (Rate Limiting)
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Асинхронный запрос к внешнему API с кэшированием
@app.get("/api/proxy/filter/filter")
@cached(ttl=300)  # Кэширование на 5 минут
@limiter.limit("10/minute")  # Ограничение: не более 10 запросов в минуту с одного IP
async def proxy_filter(request: Request, page: int = 1):
    target_url = f"https://mike-auto.ru/api/proxy/filter/filter?page={page}"
    logger.info(f"Fetching data from {target_url}")

    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                ),
                "Referer": "https://mike-auto.ru/",
            }
            response = await client.get(target_url, headers=headers)
            response.raise_for_status()  # Проверка на успешный статус ответа

        logger.info(f"Successfully fetched page {page}")
        return response.json()
    except httpx.RequestError as e:
        logger.error(f"Error fetching page {page}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")


# Асинхронный запрос для загрузки данных с нескольких страниц одновременно
@app.get("/api/proxy/filter/bulk")
async def proxy_bulk(start_page: int, end_page: int):
    urls = [
        f"https://mike-auto.ru/api/proxy/filter/filter?page={page}"
        for page in range(start_page, end_page + 1)
    ]
    logger.info(f"Fetching data from pages {start_page} to {end_page}")

    try:
        async with httpx.AsyncClient() as client:
            tasks = [client.get(url) for url in urls]
            responses = await asyncio.gather(*tasks)

        # Фильтрация успешных ответов
        result = [
            response.json() for response in responses if response.status_code == 200
        ]
        logger.info(f"Successfully fetched {len(result)} pages")
        return result
    except Exception as e:
        logger.error(f"Error during bulk fetch: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Bulk request failed: {str(e)}")
