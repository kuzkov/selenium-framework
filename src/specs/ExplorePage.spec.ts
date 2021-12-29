import { WebDriver } from "selenium-webdriver";
import DriverManager from "../driver/DriverManager";
import ExplorePage from "../pages/ExplorePage";

describe("Explore page", () => {
  let driver: WebDriver;
  let explorePage: ExplorePage;

  beforeAll(async () => {
    driver = await DriverManager.getDriver();
  });

  beforeEach(async () => {
    explorePage = new ExplorePage(driver);
    await explorePage.openPage();
    await explorePage.isInitialized();
  });

  afterAll(async () => {
    await DriverManager.closeDriver();
  });

  it("should redirect on site modal", async () => {
    await explorePage.submitWhereToSearch("Moscow");
    await driver.sleep(1000);

    const discoverModalOpened = await explorePage.isDiscoverModalInitialized();
    expect(discoverModalOpened).toBeTruthy();

    const title = await explorePage.getDiscoverModalTitle();

    expect(await explorePage.getDiscoverModalTitle()).toBe("Moscow");
  });
});
