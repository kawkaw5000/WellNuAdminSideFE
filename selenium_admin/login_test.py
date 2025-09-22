from base_driver import get_driver
from selenium.webdriver.common.by import By

BASE_URL = "http://localhost:5173"  # adjust if different


def test_login(username: str = "admin", password: str = "123"):
    driver = get_driver()
    try:
        driver.get(f"{BASE_URL}/")
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-username"]').send_keys(username)
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-password"]').send_keys(password)
        driver.find_element(By.CSS_SELECTOR, '[data-testid="login-submit"]').click()
        # Basic assertion: redirect to dashboard
        assert '/dashboard' in driver.current_url, 'Did not navigate to dashboard.'
        print('Login test passed')
    finally:
        driver.quit()

if __name__ == "__main__":
    test_login()
