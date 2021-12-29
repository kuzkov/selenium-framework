import _ from "lodash";
import devResources from "../res/dev.json";
import qaResources from "../res/qa.json";

export default class ResourceManager {
  private static resourceObject =
    global.ENV === "dev" ? devResources : qaResources;

  static get(key: string) {
    return _.get(this.resourceObject, key);
  }
}
