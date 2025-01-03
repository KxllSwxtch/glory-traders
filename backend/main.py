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
    "Referer": "https://mike-auto.ru/korea",
}


# Эндпоинт для получения автомобилей с конкретной страницы
@app.get("/api/proxy/filter/page")
async def get_cars_page(
    page: int = Query(..., ge=1),
    manufacturerId: int | None = None,
    modelId: int | None = None,
    generationId: int | None = None,
    colorId: int | None = None,
    fuelId: int | None = None,
    transmissionId: int | None = None,
    mountOneId: int | None = None,
    mountTwoId: int | None = None,
    yearOneId: int | None = None,
    yearTwoId: int | None = None,
    mileageOneId: int | None = None,
    mileageTwoId: int | None = None,
):
    """
    Возвращает автомобили с указанной страницы и фильтрацией.
    """
    params = {"page": page}
    if manufacturerId:
        params["manufacturerId"] = manufacturerId
    if modelId:
        params["modelId"] = modelId
    if generationId:
        params["generationId"] = generationId
    if colorId:
        params["colorId"] = colorId
    if fuelId:
        params["fuelId"] = fuelId
    if transmissionId:
        params["transmissionId"] = transmissionId
    if mountOneId:
        params["mountOneId"] = mountOneId
    if mountTwoId:
        params["mountTwoId"] = mountTwoId
    if yearOneId:
        params["yearOneId"] = yearOneId
    if yearTwoId:
        params["yearTwoId"] = yearTwoId
    if mileageOneId:
        params["mileageOneId"] = mileageOneId
    if mileageTwoId:
        params["mileageTwoId"] = mileageTwoId

    try:
        async with httpx.AsyncClient() as client:
            logger.info(f"Fetching page {page} with filters: {params}")
            response = await client.get(BASE_URL, headers=HEADERS, params=params)
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
