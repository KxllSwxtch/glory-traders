import aiohttp
import asyncio
import json

# Базовый URL API
base_url = "https://mike-auto.ru/api/proxy/filter/filter"

# Заголовки
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Referer": "https://mike-auto.ru/",
}


# Функция для получения данных с одной страницы
async def fetch_page(session, page):
    try:
        params = {"page": page}
        async with session.get(base_url, params=params) as response:
            if response.status == 200:
                data = await response.json()
                if "data" in data and data["data"]:
                    print(f"Page {page}: {len(data['data'])} items fetched.")
                    return data["data"]
                else:
                    print(f"Page {page}: No data found.")
                    return []
            else:
                print(f"Page {page}: Failed with status {response.status}.")
                return []
    except Exception as e:
        print(f"Page {page}: Error occurred: {e}")
        return []


# Главная асинхронная функция для массового сбора данных
async def fetch_all_data(start_page, end_page, max_connections=100):
    all_data = []
    connector = aiohttp.TCPConnector(limit=max_connections)
    async with aiohttp.ClientSession(headers=headers, connector=connector) as session:
        tasks = [fetch_page(session, page) for page in range(start_page, end_page + 1)]
        results = await asyncio.gather(*tasks)
        for result in results:
            all_data.extend(result)
    return all_data


# Основной запуск
def main():
    start_page = 1
    end_page = 10  # Все страницы
    max_connections = 100  # Максимальное количество одновременных соединений

    # Асинхронный запуск
    data = asyncio.run(fetch_all_data(start_page, end_page, max_connections))

    # Сохранение данных в JSON
    output_file = "cars_data.json"
    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    print(f"Data successfully saved to {output_file}")


# Запуск скрипта
if __name__ == "__main__":
    main()
