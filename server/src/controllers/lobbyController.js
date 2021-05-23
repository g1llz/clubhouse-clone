import { constants } from "../util/constants.js";

export default class LobbyController {
  constructor({ activeRooms, roomsListener }) {
    this.activeRooms = activeRooms;
    this.roomsListener = roomsListener;
  }

  #updateLobbyRooms(socket, activeRooms) {
    socket.emit(constants.events.LOBBY_UPDATED, activeRooms);
  }

  onNewConnection(socket) {
    const { id } = socket;
    this.#updateLobbyRooms(socket, [...this.activeRooms.values()]);
    console.log("[lobby] connection stablished with ", id);
  }

  getEvents() {
    const functions = Reflect.ownKeys(LobbyController.prototype)
      .filter((fn) => fn !== "constructor")
      .map((name) => this[name].bind(this));

    return new Map(functions);
  }
}
