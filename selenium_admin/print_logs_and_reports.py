from base_driver import get_driver
from selenium.webdriver.common.by import By
import time

BASE_URL = "http://localhost:5173"


def open_printable_summary():
    driver = get_driver()
    try:
        # Login
        driver.get(f"{BASE_URL}/")
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-username"]').send_keys('admin')
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-password"]').send_keys('123')
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-submit"]').click()
        assert '/dashboard' in driver.current_url, 'Login failed'

        # Navigate to Logs & Reports
        driver.find_element(By.XPATH, "//button[contains(., 'Logs & Reports')]").click()

        # Wait a bit for data fetch
        time.sleep(1.5)

        # Verify charts present via data-testids
        driver.find_element(By.CSS_SELECTOR, '[data-testid="meal-type-bar-wrapper"]')

        # Click print button (opens print dialog - cannot assert content but can ensure it is clickable)
        driver.find_element(By.CSS_SELECTOR, '[data-testid="print-button"]').click()
        print('Opened print dialog for summary report (cannot auto-verify print UI).')
    finally:
        driver.quit()

if __name__ == '__main__':
    open_printable_summary()
