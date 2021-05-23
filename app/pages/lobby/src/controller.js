import { constants } from "../../_shared/constants.js";

export default class LobbyController {
  constructor({ socketBuilder, user, view }) {
    this.socketBuilder = socketBuilder;
    this.user = user;
    this.socket = {};
    this.view = view;
  }

  static async initialize(deps) {
    return new LobbyController(deps)._initialize();
  }

  async _initialize() {
    this._setupdViewEvents();
    this.socket = this._setupSocket();
  }

  _setupSocket() {
    return this.socketBuilder.setOnLobbyUpdated(this.onLobbyUpdated()).build();
  }

  _setupdViewEvents() {
    this.view.updateUserImage(this.user);
    this.view.configureCreateRoomButton();
  }

  onLobbyUpdated() {
    return (rooms) => {
      console.log("rooms list:", rooms);
      this.view.updateRoomList(rooms);
    };
  }
}
