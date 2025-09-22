from base_driver import get_driver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time

BASE_URL = "http://localhost:5173"

# Provide a user id present in the table
TARGET_USER_ID = 1


def toggle_user_status(user_id: int = TARGET_USER_ID):
    driver = get_driver()
    try:
        # Login first
        driver.get(f"{BASE_URL}/")
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-username"]').send_keys('admin')
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-password"]').send_keys('123')
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-submit"]').click()
        assert '/dashboard' in driver.current_url, 'Login failed'

        # Ensure User logs tab active
        driver.find_element(By.XPATH, "//button[contains(., 'User logs')]").click()

        # Locate the row for the user id
        try:
            row = driver.find_element(By.CSS_SELECTOR, f'[data-testid="user-row-{user_id}"]')
        except NoSuchElementException:
            raise AssertionError(f'User row for id {user_id} not found.')

        # Toggle status button
        toggle_btn = row.find_element(By.CSS_SELECTOR, f'[data-testid="toggle-status-{user_id}"]')
        before_text = toggle_btn.text
        toggle_btn.click()
        time.sleep(0.5)
        after_text = toggle_btn.text
        assert before_text != after_text, 'Status button text did not change (toggle may have failed).'
        print(f'Toggled user {user_id} status successfully.')
    finally:
        driver.quit()

if __name__ == '__main__':
    toggle_user_status()
