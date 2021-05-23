import { constants } from "../../_shared/constants.js";
import RoomController from "./controller.js";
import RoomSocketBuilder from "./util/roomSocketBuilder.js";
import View from "./view.js";

const urlParams = URLSearchParams(window.location.search);
const keys = ["id", "topic"];
const urlData = keys.map((key) => urlParams.get(key));

const user = { img: "", username: `G1llz_${Date.now()}` };

const roomInfo = { room: { ...Object.fromEntries(urlData) }, user };

const socketBuilder = new RoomSocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

await RoomController.initialize({ socketBuilder, roomInfo, view: View });
