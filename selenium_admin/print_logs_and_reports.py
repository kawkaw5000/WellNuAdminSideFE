from base_driver import get_driver, login
from selenium.webdriver.common.by import By
import time

BASE_URL = "http://localhost:5173"

def open_printable_summary():
    driver = get_driver(headless=True)  # Set headless=False to show the browser
    try:
        login(
            driver,
            base_url=f"{BASE_URL}/",
            username="admin",
            password="123"
        )
        if '/dashboard' not in driver.current_url:
            print('TEST FAIL: Login failed')
            driver.quit()
            return

        # Navigate to Logs & Reports
        driver.find_element(By.XPATH, "//button[contains(., 'Logs & Reports')]").click()
        time.sleep(1.5)
        driver.find_element(By.CSS_SELECTOR, '[data-testid="meal-type-bar-wrapper"]')
        driver.find_element(By.CSS_SELECTOR, '[data-testid="print-button"]').click()
        print('Opened print dialog for summary report (cannot auto-verify print UI).')
        print('TEST PASS: Print logs and reports workflow succeeded.')
    except Exception as e:
        print(f"Error: {e}")
        print('TEST FAIL')
    finally:
        driver.quit()

if __name__ == '__main__':
    open_printable_summary()
