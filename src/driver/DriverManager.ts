import { Browser, Builder, Capabilities, WebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FirefoxOptions } from "selenium-webdriver/firefox";
import { optionsFlags } from "../values";

export default class DriverManager {
  private static driver: WebDriver;

  static async getDriver(): Promise<WebDriver> {
    if (this.driver) return this.driver;

    if (global.BROWSER === "chrome") {
      this.driver = await this.buildBrowserDriver(Browser.CHROME);
      return this.driver;
    }

    if (global.BROWSER === "firefox") {
      this.driver = await this.buildBrowserDriver(Browser.CHROME);
      return this.driver;
    }

    this.driver = await this.buildBrowserDriver(Browser.CHROME);
    return this.driver;
  }

  static async closeDriver(): Promise<void> {
    await this.driver.quit();
    this.driver = null;
  }

  private static async buildBrowserDriver(browser) {
    const builder = new Builder()
      .withCapabilities(new Capabilities().setPageLoadStrategy("normal"))
      .forBrowser(browser);

    if (browser === Browser.CHROME) {
      builder.setChromeOptions(
        new ChromeOptions().addArguments(...optionsFlags)
      );
    }

    if (browser === Browser.FIREFOX) {
      builder.setFirefoxOptions(
        new FirefoxOptions().addArguments(...optionsFlags)
      );
    }

    const driver = builder.build();
    await driver.manage().deleteAllCookies();
    await driver.manage().window().maximize();
    return driver;
  }
}
