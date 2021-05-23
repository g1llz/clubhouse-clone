import { constants } from "../../_shared/constants.js";
import LobbyController from "./controller.js";
import LobbySocketBuilder from "./util/lobbySocketBuilder.js";
import View from "./view.js";

const user = { img: "", username: `G1llz_${Date.now()}` };

const socketBuilder = new LobbySocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.lobby,
});

await LobbyController.initialize({ socketBuilder, user, view: View });
