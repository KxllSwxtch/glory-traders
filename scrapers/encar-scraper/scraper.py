import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

# Настройка Selenium без driver_path
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("--disable-extensions")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-infobars")
options.add_argument("--disable-renderer-backgrounding")

# Автоматическая загрузка драйвера
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# URL сайта
url = "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.CarType.Y._.SellType.%EC%9D%BC%EB%B0%98.)%22%2C%22toggle%22%3A%7B%7D%2C%22layer%22%3A%22%22%2C%22sort%22%3A%22ModifiedDate%22%2C%22page%22%3A1%2C%22limit%22%3A20%2C%22searchKey%22%3A%22%22%2C%22loginCheck%22%3Afalse%7D"

# Открываем страницу
driver.get(url)
time.sleep(3)

# Дожидаемся таблицы с автомобилями
try:
    car_table = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "car_list"))
    )
    print("Таблица найдена!")

    print(car_table.text)

    # Извлекаем строки таблицы
    rows = car_table.find_elements(By.TAG_NAME, "tr")

    for row in rows[1:]:  # Пропускаем заголовок таблицы
        cells = row.find_elements(By.TAG_NAME, "td")
        if cells:
            title = cells[0].text.strip()
            price = cells[1].text.strip()
            year = cells[2].text.strip()
            print(f"Title: {title}, Price: {price}, Year: {year}")
except Exception as e:
    print("Ошибка при поиске таблицы:", e)
finally:
    driver.quit()
