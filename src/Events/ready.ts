import { Event } from "../Structures/Event.js";
import { TSClient } from "../Structures/Client.js";
import { Logger } from "../Utils/Logger.js";

const logger = new Logger("ready");

export default new Event({
  name: "ready",
  run: (client: TSClient) => {
    logger.info(`Logged in as ${client.user?.username}`);
    client.user?.setActivity({ type: "PLAYING", name: "with Typescript" });
  },
});
