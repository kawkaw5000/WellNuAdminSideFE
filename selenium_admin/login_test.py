from base_driver import get_driver, login

BASE_URL = "http://localhost:5173/"  # Adjust if needed
USERNAME = "1+1=--"
PASSWORD = "foo"

if __name__ == "__main__":
    try:
        print("Starting Brave browser...")
        driver = get_driver(headless=True)
        login(driver, base_url=BASE_URL, username=USERNAME, password=PASSWORD)
        # Check for successful login
        if '/dashboard' in driver.current_url:
            print("TEST PASS: Login successful.")
        else:
            print("TEST FAIL: Login unsuccessful. Current URL:", driver.current_url)
        driver.quit()
        print("Browser closed.")
    except Exception as e:
        print(f"Error: {e}")
        print("TEST FAIL")
