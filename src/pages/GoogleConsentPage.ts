import { By } from "selenium-webdriver";
import { WebDriver } from "selenium-webdriver";
import { logger } from "../utils/logger";
import BasePage from "./BasePage";

export default class GoogleConsentPage extends BasePage {
  private readonly agreeButtonLocator = By.xpath(
    '//*[@id="yDmH0d"]/c-wiz/div/div/div/div[2]/div[1]/div[4]/form/div/div/button'
  );

  constructor(driver: WebDriver) {
    super(driver);
  }

  async isInitialized(): Promise<boolean> {
    logger.info("Consent page initialized");
    const elements = await this.driver.findElements(this.agreeButtonLocator);
    return elements.length > 0;
  }

  async agreeWithConsent(): Promise<void> {
    await this.findElementByLocator(this.agreeButtonLocator).click();
  }
}
