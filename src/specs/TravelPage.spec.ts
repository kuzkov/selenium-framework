import { WebDriver } from "selenium-webdriver";
import DriverManager from "../driver/DriverManager";
import ExplorePage from "../pages/ExplorePage";
import ThingsToDoPage from "../pages/ThingsToDoPage";
import TravelPage from "../pages/TravelPage";

describe("Travel page", () => {
  let driver: WebDriver;
  let travelPage: TravelPage;
  let thingsToDoPage: ThingsToDoPage;
  let explorePage: ExplorePage;

  beforeAll(async () => {
    driver = await DriverManager.getDriver();
  });

  beforeEach(async () => {
    travelPage = new TravelPage(driver);
    await travelPage.openPage();
    await travelPage.isInitialized();

    thingsToDoPage = new ThingsToDoPage(driver);
    explorePage = new ExplorePage(driver);
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
