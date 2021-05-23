import { constants } from "../../_shared/constants.js";
import Attendee from "./entities/attendee.js";

export default class RoomController {
  constructor({ socketBuilder, roomInfo, view }) {
    this.socketBuilder = socketBuilder;
    this.roomInfo = roomInfo;
    this.socket = {};
    this.view = view;
  }

  static async initialize(deps) {
    return new RoomController(deps)._initialize();
  }

  async _initialize() {
    this._setupdViewEvents();
    this.socket = this._setupSocket();
    this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
  }

  _setupSocket() {
    return this.socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onUserDisconnected())
      .setOnRoomUpdated(this.onRoomUpdated())
      .setOnUserProfileUpgrade(this.onUserProfileUpgrade())
      .build();
  }

  _setupdViewEvents() {
    this.view.updateUserImage(this.roomInfo.user);
    this.view.updateRoomTopic(this.roomInfo.room);
  }

  onUserConnected() {
    return (data) => {
      const attendee = new Attendee(data);

      this.view.addAttendeeOnGrid(attendee);
      console.log("user connected", attendee);
    };
  }

  onUserDisconnected() {
    return (data) => {
      const attendee = new Attendee(data);

      this.view.removeAttendeeFromGrid(attendee.id);
      console.log(`${attendee.username} disconnected`);
    };
  }

  onRoomUpdated() {
    return (room) => {
      this.view.updateAttendeesOnGrid(room);
      console.log("room user list:", room);
    };
  }

  onUserProfileUpgrade() {
    return (data) => {
      const attendee = new Attendee(data);
      if (attendee.isSpeaker) {
        this.view.addAttendeeOnGrid(attendee);
      }

      console.log("user profile upgrade:", attendee);
    };
  }
}
