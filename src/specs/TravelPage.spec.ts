import { WebDriver } from "selenium-webdriver";
import DriverManager from "../driver/DriverManager";
import ExplorePage from "../pages/ExplorePage";
import GoogleConsentPage from "../pages/GoogleConsentPage";
import ThingsToDoPage from "../pages/ThingsToDoPage";
import TravelPage from "../pages/TravelPage";
import { logger } from "../utils/logger";

describe("Travel page", () => {
  let driver: WebDriver;
  let consentPage: GoogleConsentPage;
  let travelPage: TravelPage;
  let thingsToDoPage: ThingsToDoPage;
  let explorePage: ExplorePage;

  beforeAll(async () => {
    driver = await DriverManager.getDriver();
  });

  beforeEach(async () => {
    travelPage = new TravelPage(driver);
    consentPage = new GoogleConsentPage(driver);
    await travelPage.openPage();

    if (await consentPage.isInitialized()) {
      logger.info("Consent Page Agreement");
      await consentPage.agreeWithConsent();
    }

    await travelPage.isInitialized();

    thingsToDoPage = new ThingsToDoPage(driver);
    explorePage = new ExplorePage(driver);
  });

  afterEach(async () => {
    await DriverManager.closeDriver;
  });

  afterAll(async () => {
    await DriverManager.closeDriver();
  });

  it("should redirect on explore button click", async () => {
    await travelPage.clickExploreButton();

    expect(await explorePage.isInitialized()).toBeTruthy();
  });

  it("should redirect on things to do button click", async () => {
    await travelPage.clickThingsToDoButton();

    expect(await thingsToDoPage.isInitialized()).toBeTruthy();
  });

  it("should redirect on things to do page if the request contains a place to visit", async () => {
    await travelPage.fillSearchInput("Minsk");
    await travelPage.submitSearchForm();

    expect(await thingsToDoPage.isInitialized()).toBeTruthy();
  });

  it("should redirect on things to do page if the request contains a flight route", async () => {
    await travelPage.fillSearchInput("Minsk - Moscow");
    await travelPage.submitSearchForm();

    expect(await thingsToDoPage.isInitialized()).toBeTruthy();
  });
});
