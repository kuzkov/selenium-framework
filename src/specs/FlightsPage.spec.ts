import { WebDriver } from "selenium-webdriver";
import DriverManager from "../driver/DriverManager";
import ExplorePage from "../pages/ExplorePage";
import FlightsPage from "../pages/FlightsPage";

describe("Flights page", () => {
  let driver: WebDriver;
  let flightsPage: FlightsPage;

  beforeAll(async () => {
    driver = await DriverManager.getDriver();
  });

  beforeEach(async () => {
    flightsPage = new FlightsPage(driver);
    await flightsPage.openPage();
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
