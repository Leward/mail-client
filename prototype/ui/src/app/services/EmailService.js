import {Box} from '../model/Box';
import {Email} from '../model/Email';

export class EmailService {

  constructor() {
    /** @type {Array.<Box>} */
    this.boxes = [
      new Box('Inbox', generateEmails()),
      new Box('Trash Bin', generateEmails()),
      new Box('Delayed', generateEmails())
    ];
  }

  getBoxes() {
    return this.boxes;
  }

  /**
   * Get a box with a given name
   * @param {string} name - name of the box to find
   * @returns {Box} the box with the searched name, undefined otherwise
   */
  getBox(name) {
    return this.boxes.find(box => (box.name === name));
  }

}

/**
 *
 * @param {number} max
 * @returns {Array.<Email>}
 */
function generateEmails(max = 50) {
  const nbMails = Math.round(Math.random() * max);
  const mails = [];
  for (let i = 0; i < nbMails; i++) {
    mails.push(generateEmail());
  }
  return mails;
}

function generateEmail() {
  var n = Math.round(Math.random() * 1000);
  return new Email('This is a test - ' + n);
}
