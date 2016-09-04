class AppController {
  /**
   * @ngInject
   * @param {EmailService} EmailService
   */
  constructor(EmailService) {
    this.selectedBox = EmailService.getBoxes()[0];
    this.boxes = EmailService.getBoxes();
  }

  selectBox(box) {
    this.selectedBox = box;
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
