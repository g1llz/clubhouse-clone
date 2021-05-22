import { constants } from "../../_shared/constants.js";
import RoomSocketBuilder from "./util/roomSocketBuilder.js";

const user = { img: "", username: `G1llz_${Date.now()}` };
const room = { id: "001", topic: "Yeep!" };

const socketBuilder = new RoomSocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const socket = socketBuilder
  .setOnUserConnected((user) => console.log("user connected"), user)
  .setOnUserDisconnected((user) => console.log("user disconnected"), user)
  .setOnRoomUpdated((room) => console.log("room user list:", room))
  .build();

socket.emit(constants.events.JOIN_ROOM, { user, room });
