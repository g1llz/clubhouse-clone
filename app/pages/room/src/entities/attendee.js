export default class Attendee {
  constructor({ id, username, img, isSpeaker, roomId, peerId }) {
    this.id = id;
    this.username = username || "Anonymous";
    this.img = img || "";
    this.isSpeaker = isSpeaker;
    this.roomId = roomId;
    this.peerId = peerId;
  }
}
