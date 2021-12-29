import { WebDriver } from "selenium-webdriver";
import DriverManager from "../driver/DriverManager";
import ExplorePage from "../pages/ExplorePage";
import FlightsPage from "../pages/FlightsPage";
import GoogleConsentPage from "../pages/GoogleConsentPage";
import { logger } from "../utils/logger";

describe("Flights page", () => {
  let driver: WebDriver;
  let flightsPage: FlightsPage;
  let consentPage: GoogleConsentPage;

  beforeAll(async () => {
    driver = await DriverManager.getDriver();
  });

  beforeEach(async () => {
    flightsPage = new FlightsPage(driver);
    consentPage = new GoogleConsentPage(driver);
    await flightsPage.openPage();

    if (await consentPage.isInitialized()) {
      logger.info("Consent Page Agreement");
      await consentPage.agreeWithConsent();
    }

    await flightsPage.isInitialized();
  });

  afterAll(async () => {
    await DriverManager.closeDriver();
  });

  it("should show list of all available routes", async () => {
    await flightsPage.setWhereFromField("Minsk");
    await flightsPage.setWhereToField("Moscow");
    await flightsPage.submitSearch();
  });
});
