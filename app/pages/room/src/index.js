import { constants } from "../../_shared/constants.js";
import RoomController from "./controller.js";
import RoomSocketBuilder from "./util/roomSocketBuilder.js";
import View from "./view.js";

const user = { img: "", username: `G1llz_${Date.now()}` };
const room = { id: "001", topic: "Yeep!" };

const roomInfo = { user, room };

const socketBuilder = new RoomSocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

await RoomController.initialize({ socketBuilder, roomInfo, view: View });
