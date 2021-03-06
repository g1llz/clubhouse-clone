import Room from "./entities/room.js";
import getTemplate from "./templates/lobbyTemplate.js";

const roomGrid = document.getElementById("roomGrid");
const txtTopic = document.getElementById("txtTopic");

const btnCreateRoomWithoutTopic = document.getElementById("btnCreateRoomWithoutTopic");
const btnCreateRoomWithTopic = document.getElementById("btnCreateRoomWithTopic");

export default class View {
  static clearRoomList() {
    roomGrid.innerHTML = "";
  }

  static generateRoomLink({ id, topic }) {
    return `./../room/index.html?id=${id}&topic=${topic}`;
  }

  static redirectToRoom(topic = "") {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    window.location = View.generateRoomLink({ id, topic });
  }

  static configureCreateRoomButton() {
    btnCreateRoomWithTopic.addEventListener("click", () => {
      const topic = txtTopic.value;
    });

    btnCreateRoomWithoutTopic.addEventListener("click", () => {});
  }

  static updateRoomList(rooms) {
    View.clearRoomList();

    rooms.forEach((room) => {
      const params = new Room({
        ...room,
        roomLink: View.generateRoomLink(room),
      });

      const htmlTemplate = getTemplate(params);
      roomGrid.innerHTML += htmlTemplate;
    });
  }

  static updateUserImage({ img, username }) {
    imgUser.src = img;
    imgUser.alt = username;
  }
}
