import { By, until, WebDriver, WebElementPromise } from "selenium-webdriver";

export default class BasePage {
  constructor(protected driver: WebDriver) {}

  protected async isInitialized(locator: By): Promise<boolean> {
    return this.findElementByLocator(locator).isDisplayed();
  }

  protected findElementByLocator(locator: By): WebElementPromise {
    return this.driver.wait(until.elementLocated(locator));
  }

  protected async enterTextToInteractableEl(
    locator: By,
    value: string
  ): Promise<this> {
    await this.driver.wait(until.stalenessOf(this.driver.findElement(locator)));
    await this.driver.findElement(locator).clear();
    await this.driver.findElement(locator).sendKeys(value);
    return this;
  }

  protected async enterText(locator: By, value: string): Promise<this> {
    await this.findElementByLocator(locator).clear();
    await this.findElementByLocator(locator).sendKeys(value);
    return this;
  }
}
