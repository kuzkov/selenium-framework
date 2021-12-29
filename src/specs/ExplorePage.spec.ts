import { WebDriver } from "selenium-webdriver";
import DriverManager from "../driver/DriverManager";
import ExplorePage from "../pages/ExplorePage";
import GoogleConsentPage from "../pages/GoogleConsentPage";
import { logger } from "../utils/logger";

describe("Explore page", () => {
  let driver: WebDriver;
  let explorePage: ExplorePage;
  let consentPage: GoogleConsentPage;

  beforeAll(async () => {
    driver = await DriverManager.getDriver();
  });

  beforeEach(async () => {
    explorePage = new ExplorePage(driver);
    consentPage = new GoogleConsentPage(driver);
    await explorePage.openPage();

    if (await consentPage.isInitialized()) {
      logger.info("Consent Page Agreement");
      await consentPage.agreeWithConsent();
    }

    await explorePage.isInitialized();
  });

  afterAll(async () => {
    await DriverManager.closeDriver();
  });

  it("should redirect on site modal", async () => {
    await explorePage.submitWhereToSearch("Moscow");
    // TODO: Remove sleep for a 1 second. This fix is required for correct behavior of dropdown input
    await driver.sleep(1000);

    const discoverModalOpened = await explorePage.isDiscoverModalInitialized();
    expect(discoverModalOpened).toBeTruthy();

    const title = await explorePage.getDiscoverModalTitle();

    expect(await explorePage.getDiscoverModalTitle()).toBe("Moscow");
  });
});
