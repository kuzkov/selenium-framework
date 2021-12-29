import { By, Key, until } from "selenium-webdriver";
import { WebDriver } from "selenium-webdriver";
import { logger } from "../utils/logger";
import BasePage from "./BasePage";

export default class ExplorePage extends BasePage {
  private readonly PAGE_URL = "https://www.google.com/travel/explore";

  private readonly listLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[2]/div/div[1]/main/div/div[2]/ol'
  );
  private readonly whereToLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[2]/div/div[1]/div[1]/section/div/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div/div[1]/div/div/input'
  );
  private readonly whereToSearchLocator = By.xpath(
    '//*[@id="ow53"]/div[2]/div[2]/div[2]/input'
  );
  private readonly discoverModalTitleLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/div/c-wiz/div[2]/div/div[2]/div/div[1]/div/span[1]'
  );

  constructor(driver: WebDriver) {
    super(driver);
  }

  async openPage(): Promise<void> {
    await this.driver.get(this.PAGE_URL);
  }

  isInitialized(): Promise<boolean> {
    logger.info("Explore page initialized");
    return super.isInitialized(this.listLocator);
  }

  async submitWhereToSearch(value: string): Promise<void> {
    await this.findElementByLocator(this.whereToLocator).click();
    const searchInput = await this.findElementByLocator(
      this.whereToSearchLocator
    );
    await searchInput.sendKeys(value);
    await searchInput.sendKeys(Key.RETURN);
  }

  async isDiscoverModalInitialized(): Promise<boolean> {
    return this.findElementByLocator(
      this.discoverModalTitleLocator
    ).isDisplayed();
  }

  async getDiscoverModalTitle(): Promise<string> {
    const title = await this.findElementByLocator(
      this.discoverModalTitleLocator
    );
    return title.getText();
  }
}
