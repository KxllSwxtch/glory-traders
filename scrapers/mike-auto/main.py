import requests
import json
import time

# Путь для сохранения файла
output_file = "car_generations.js"

# Ссылка на API
base_url = "https://mike-auto.ru/api/proxy/filter/filter"

# Хранилище для данных
car_generations = {}

# Заголовки для запросов
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Referer": "https://mike-auto.ru/",
}


# Функция для логирования
def log(message):
    current_time = time.strftime("%H:%M:%S")
    print(f"[{current_time}] {message}")


# Функция для запроса страницы с повторными попытками
def fetch_page(page, retries=5):
    for attempt in range(retries):
        try:
            log(f"Запрос страницы {page}...")
            response = requests.get(base_url, params={"page": page}, headers=headers)
            if response.status_code == 200:
                log(f"Страница {page} успешно получена.")
                return response.json()
            else:
                log(f"Ошибка {response.status} при получении страницы {page}")
        except Exception as e:
            log(f"Ошибка при запросе страницы {page}: {e}")
        log(f"Повторная попытка {attempt + 1} для страницы {page}")
        time.sleep(2)
    log(f"Не удалось получить страницу {page} после {retries} попыток.")
    return None


# Обработка данных со страницы
def parse_page_data(data):
    for car in data:
        model_id = car.get("model_id")
        generation_id = car.get("generation_id")
        generation_name = car.get("generation_name")

        if model_id and generation_id and generation_name:
            if model_id not in car_generations:
                car_generations[model_id] = []

            # Проверяем уникальность generation_id
            existing_generation_ids = {g["id"] for g in car_generations[model_id]}
            if generation_id not in existing_generation_ids:
                car_generations[model_id].append(
                    {"id": generation_id, "name": generation_name}
                )
                log(
                    f"Добавлена модель ID: {model_id}, поколение: {generation_name} ({generation_id})"
                )


# Сохранение в файл
def save_to_file():
    log("Сохранение данных в файл...")
    with open(output_file, "w", encoding="utf-8") as file:
        file.write("const carGenerations = ")
        json.dump(car_generations, file, ensure_ascii=False, indent=4)
        file.write(";\n\nexport default carGenerations;")
    log(f"Данные успешно сохранены в {output_file}")


# Основной запуск
def main():
    start_time = time.time()

    # Начинаем с первой страницы
    page = 1

    while True:
        log(f"Начинаем обработку страницы {page}...")
        page_data = fetch_page(page)
        if not page_data:
            break

        parse_page_data(page_data.get("data", []))

        # Сохраняем прогресс каждые 10 страниц
        if page % 10 == 0:
            save_to_file()

        # Проверяем, есть ли ещё страницы
        if page >= page_data.get("pageCount", 1):
            break

        page += 1

    save_to_file()
    end_time = time.time()
    log(f"Скрипт завершил работу за {round(end_time - start_time, 2)} секунд.")


if __name__ == "__main__":
    main()
