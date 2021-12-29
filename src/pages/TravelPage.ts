import { By, Key } from "selenium-webdriver";
import { WebDriver } from "selenium-webdriver";
import { logger } from "../utils/logger";
import BasePage from "./BasePage";

export default class TravelPage extends BasePage {
  private readonly PAGE_URL = "https://www.google.com/travel/";

  private readonly searchInputLocator = By.id("oA4zhb");
  private readonly exploreButtonLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[1]/div/div[1]/div[2]/div/span[1]/a/button'
  );
  private readonly thingsToDoButtonLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[1]/div/div[1]/div[2]/div/span[2]/a/button'
  );
  private readonly flightsButtonLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[1]/div/div[1]/div[2]/div/span[3]/a/button'
  );
  private readonly hotelsButtonLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[1]/div/div[1]/div[2]/div/span[4]/a/button'
  );
  private readonly vacationRentalsButtonLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[1]/div/div[1]/div[2]/div/span[5]/a/button'
  );

  constructor(driver: WebDriver) {
    super(driver);
  }

  async openPage(): Promise<this> {
    await this.driver.get(this.PAGE_URL);
    logger.info("Travel page opened");
    return this;
  }

  isInitialized(): Promise<boolean> {
    logger.info("Travel page initialized");
    return super.isInitialized(this.searchInputLocator);
  }

  fillSearchInput(value: string): Promise<this> {
    return this.enterText(this.searchInputLocator, value);
  }

  async submitSearchForm(): Promise<this> {
    await this.findElementByLocator(this.searchInputLocator).sendKeys(
      Key.RETURN
    );

    return this;
  }

  clickExploreButton(): Promise<void> {
    return this.findElementByLocator(this.exploreButtonLocator).click();
  }

  clickThingsToDoButton(): Promise<void> {
    return this.findElementByLocator(this.thingsToDoButtonLocator).click();
  }

  clickFlightsButton(): Promise<void> {
    return this.findElementByLocator(this.flightsButtonLocator).click();
  }

  clickHotelsButton(): Promise<void> {
    return this.findElementByLocator(this.hotelsButtonLocator).click();
  }

  clickVacationRentalsButton(): Promise<void> {
    return this.findElementByLocator(this.vacationRentalsButtonLocator).click();
  }
}
