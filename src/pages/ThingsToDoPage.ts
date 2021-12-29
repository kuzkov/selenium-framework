import { By, until } from "selenium-webdriver";
import { WebDriver } from "selenium-webdriver";
import { logger } from "../utils/logger";
import BasePage from "./BasePage";

export default class FlightsPage extends BasePage {
  private readonly PAGE_URL = "https://www.google.com/travel/things-to-do";

  private readonly searchInputLocator = By.id("oA4zhb");

  constructor(driver: WebDriver) {
    super(driver);
  }

  isInitialized(): Promise<boolean> {
    logger.info("Things to do page initialized");
    return super.isInitialized(this.searchInputLocator);
  }
}
