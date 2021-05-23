import Attendee from "./entities/attendee.js";
import getTemplate from "./templates/attendeeTemplate.js";

const imgUser = document.getElementById("imgUser");
const roomTopic = document.getElementById("pTopic");

const gridAttendees = document.getElementById("gridAttendees");
const gridSpeakers = document.getElementById("gridSpeakers");

export default class View {
  static updateUserImage({ img, username }) {
    imgUser.src = img;
    imgUser.alt = username;
  }

  static updateRoomTopic({ topic }) {
    roomTopic.innerHTML = topic;
  }

  static updateAttendeesOnGrid(users) {
    users.forEach((user) => View.addAttendeeOnGrid(user));
  }

  static addAttendeeOnGrid(user, removeFirst = false) {
    const attendee = new Attendee(user);
    const { id } = attendee;

    const htmlTemplate = getTemplate(attendee);
    const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees;

    if (removeFirst) {
      View.removeAttendeeFromGrid(id);
      baseElement.innerHTML += htmlTemplate;
      return;
    }

    const existingAttendee = View._getExistingAttendeeOnGrid({
      id,
      baseElement,
    });

    if (existingAttendee) {
      existingAttendee.innerHTML = htmlTemplate;
      return;
    }

    baseElement.innerHTML += htmlTemplate;
  }

  static _getExistingAttendeeOnGrid({ id, baseElement = document }) {
    return baseElement.querySelector(`[id="${id}"]`);
  }

  static removeAttendeeFromGrid(id) {
    const existingElement = View._getExistingAttendeeOnGrid({ id });
    existingElement?.remove();
  }
}
