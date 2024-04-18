from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options


class Scraper:
    @staticmethod
    def scrape_medicine_info(medicine):
        base_url = f"https://www.nhs.uk/medicines/"
        # headless browser -  browses without opening a GUI
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        driver = webdriver.Firefox(options=options)
        # Check if the medicine name appears in the page content
        try:
            # open the base url
            driver.get(base_url)
            medicine_link = driver.find_element(By.PARTIAL_LINK_TEXT, medicine.capitalize())
            if not medicine_link:
                raise NoSuchElementException
        except NoSuchElementException:
            driver.quit()
            return None
        # click link if returned
        medicine_link.click()
        # scrape all the links within the main tag
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        # get the links within the main body
        main_links = soup.find('main').find_all('a', href=True)
        # json to be returned
        medicine_info = {
            "name": medicine,
            "links": [],
        }
        for link in main_links:
            # strips all text in link
            link_text = link.text.strip()
            # click the link to navigate
            try:
                driver.find_element(By.PARTIAL_LINK_TEXT, link_text).click()
            except NoSuchElementException:
                pass
            # read content of each link
            link_soup = BeautifulSoup(driver.page_source, 'html.parser')
            # pass the content as a string
            link_content = link_soup.find('main').text.strip()
            # return relevant links
            link_url = link['href']
            # append the dictionary.
            medicine_info["links"].append({'text': link_text, 'url': link_url, "content": link_content})
        driver.quit()
        return medicine_info
