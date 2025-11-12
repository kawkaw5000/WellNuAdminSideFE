# integration_tests.py (final stable)
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from base_driver import get_driver, login
import time

BASE_URL = "http://localhost:5173"


def test_toggle_user_status(driver):
    print("\n[1] Running Toggle User Status Test...")

    driver.find_element(By.XPATH, "//button[contains(., 'User logs')]").click()
    wait = WebDriverWait(driver, 15)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="users-table"]')))
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid^="user-row-"]')))

    # Detect first available user row
    first_row = driver.find_element(By.CSS_SELECTOR, '[data-testid^="user-row-"]')
    user_id = first_row.get_attribute("data-testid").split("user-row-")[-1]

    toggle_btn = first_row.find_element(By.CSS_SELECTOR, f'[data-testid="toggle-status-{user_id}"]')
    before_text = toggle_btn.text
    toggle_btn.click()
    time.sleep(1)
    after_text = toggle_btn.text

    assert before_text != after_text, f"Status button text did not change for user {user_id}."
    print(f"✓ Toggled user {user_id} status successfully.")


def test_logs_and_reports(driver):
    print("\n[2] Running Logs & Reports Test...")

    driver.find_element(By.XPATH, "//button[contains(., 'Logs & Reports')]").click()
    wait = WebDriverWait(driver, 15)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="logs-reports-container"]')))
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="meal-type-bar-wrapper"]')))
    print("✓ Logs & Reports page and charts loaded.")

    # Verify printable summary and print button exist
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="printable-summary"]')))
    print_btn = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="print-button"]')))
    print("✓ Printable summary and print button detected.")

    # Disable window.print() temporarily to prevent headless crash
    driver.execute_script("window.print = () => console.log('window.print() disabled for test');")
    print_btn.click()
    print("✓ Print button clicked safely (print dialog suppressed).")

    # Verify that summary sections exist
    summary_sections = driver.find_elements(By.CSS_SELECTOR, '[data-testid^="summary-"]')
    assert summary_sections, "No summary sections found in printable report."
    print(f"✓ {len(summary_sections)} summary sections verified.")


def run_admin_integration_tests():
    print("=== ADMIN MODULE INTEGRATION TEST START ===")
    driver = get_driver(headless=True)
    try:
        login(driver, base_url=f"{BASE_URL}/", username="admin", password="123")
        assert "/dashboard" in driver.current_url, "Login failed — check credentials or base URL."

        test_toggle_user_status(driver)
        test_logs_and_reports(driver)

        print("\n✅ ALL ADMIN INTEGRATION TESTS PASSED SUCCESSFULLY ✅")

    except AssertionError as e:
        print(f"\n❌ TEST FAILURE: {e}")
    except Exception as e:
        print(f"\n⚠️ Unexpected error: {e}")
    finally:
        driver.quit()
        print("=== TEST SESSION ENDED ===")


if __name__ == "__main__":
    run_admin_integration_tests()
