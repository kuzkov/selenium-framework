import { By, Key, until } from "selenium-webdriver";
import { WebDriver } from "selenium-webdriver";
import { logger } from "../utils/logger";
import BasePage from "./BasePage";

export default class FlightsPage extends BasePage {
  private readonly PAGE_URL = "https://www.google.com/travel/flights";

  private readonly whereFromButtonLocator = By.xpath(
    '//*[@id="i7"]/div[1]/div/div/div[1]/div/div/input'
  );

  private readonly whereFromInputLocator = By.xpath(
    '//*[@id="i7"]/div[6]/div[2]/div[2]/div[1]/div/input'
  );

  private readonly whereToButtonLocator = By.xpath(
    '//*[@id="i7"]/div[4]/div/div/div[1]/div/div/input'
  );

  private readonly whereToInputLocator = By.xpath(
    '//*[@id="i7"]/div[6]/div[2]/div[2]/div[1]/div/input'
  );

  private readonly searchButtonLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div/c-wiz/c-wiz/div[2]/div[1]/div[2]/div/button'
  );

  constructor(driver: WebDriver) {
    super(driver);
  }

  async openPage(): Promise<void> {
    await this.driver.get(this.PAGE_URL);
  }

  isInitialized(): Promise<boolean> {
    logger.info("Flights page initialized");
    return super.isInitialized(this.whereFromButtonLocator);
  }

  async setWhereFromField(value: string): Promise<void> {
    await this.findElementByLocator(this.whereFromButtonLocator).click();
    await this.findElementByLocator(this.whereFromInputLocator).sendKeys(value);
    await this.findElementByLocator(this.whereFromInputLocator).sendKeys(
      Key.RETURN
    );
  }

  async setWhereToField(value: string): Promise<void> {
    await this.findElementByLocator(this.whereToButtonLocator).click();
    await this.findElementByLocator(this.whereToInputLocator).sendKeys(value);
    await this.findElementByLocator(this.whereToInputLocator).sendKeys(
      Key.RETURN
    );
  }

  async submitSearch(): Promise<void> {
    await this.findElementByLocator(this.whereToButtonLocator).sendKeys(
      Key.RETURN
    );
  }
}
