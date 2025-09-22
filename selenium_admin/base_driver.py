def get_driver(headless=True, chromedriver_path=None):
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service
    import os

    print(f"Initializing Brave browser (headless={headless})...")
    options = webdriver.ChromeOptions()
    if headless:
        options.add_argument("--headless=new")
    options.binary_location = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
    if chromedriver_path is None:
        chromedriver_path = os.path.join(
            os.path.dirname(__file__), ".venv", "ChromeDriver", "chromedriver.exe"
        )
    if not os.path.exists(chromedriver_path):
        print(f"ERROR: chromedriver.exe not found at {chromedriver_path}.")
        print("You must download the ChromeDriver version that matches your Brave version (e.g., 140.x) from:")
        print("https://googlechromelabs.github.io/chrome-for-testing/#stable or https://chromedriver.chromium.org/downloads")
        print("Place the correct chromedriver.exe in your project directory or specify its path.")
        raise FileNotFoundError(f"chromedriver.exe not found at {chromedriver_path}")
    service = Service(executable_path=chromedriver_path)
    driver = webdriver.Chrome(service=service, options=options)
    print("Driver initialized.")
    return driver

def login(
    driver,
    base_url,
    username,
    password,
    username_selector=( "css selector", '[data-testid="login-username"]' ),
    password_selector=( "css selector", '[data-testid="login-password"]' ),
    submit_selector=( "css selector", '[data-testid="login-submit"]' ),
    wait_time=2
):
    from selenium.webdriver.common.by import By
    import time

    print("Navigating to login page...")
    driver.get(base_url)
    time.sleep(wait_time)  # wait for page to load

    print("Filling in credentials...")
    try:
        # Username
        by, value = username_selector
        driver.find_element(getattr(By, by.upper().replace(" ", "_")), value).send_keys(username)
        # Password
        by, value = password_selector
        driver.find_element(getattr(By, by.upper().replace(" ", "_")), value).send_keys(password)
        # Submit
        by, value = submit_selector
        driver.find_element(getattr(By, by.upper().replace(" ", "_")), value).click()
    except Exception as e:
        print(f"Login element not found: {e}")
        print("Page source for debugging:")
        print(driver.page_source)
        print("TEST FAIL")
        driver.quit()
        raise

    print("Login attempted.")
    time.sleep(wait_time)  # wait to observe result
