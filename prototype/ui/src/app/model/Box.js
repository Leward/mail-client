export class Box {
  /**
   * @param {string} name
   * @param {Array.<Email>} emails
   */
  constructor(name, emails = []) {
    this.name = name;
    this.emails = emails;
  }
}
