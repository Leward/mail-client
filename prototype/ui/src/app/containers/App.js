class AppController {

  /**
   * @ngInject
   * @param {EmailService} EmailService
   */
  constructor(EmailService) {
    /** @type {Box} */
    this.selectedBox = EmailService.getBoxes()[0];
    /** @type {Array.<Box>} */
    this.boxes = EmailService.getBoxes();
    /** @type {Email} */
    this.selectedEmail = null;
  }

  /**
   * @param {Box} box
   */
  selectBox(box) {
    this.selectedBox = box;
  }

  /**
   * @param {Email} email
   */
  selectEmail(email) {
    this.selectedEmail = email;
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
