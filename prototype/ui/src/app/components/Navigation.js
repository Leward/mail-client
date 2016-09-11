class NavigationController {

  /**
   * @ngInject
   * @param $rootScope
   * @param {GmailService} GmailService
   * @param {EmailService} EmailService
   */
  constructor($rootScope, GmailService, EmailService) {
    this.$rootScope = $rootScope;
    this.GmailService = GmailService;
    this.EmailService = EmailService;
  }

  boxClicked(box) {
    this.onBoxSelected({box: box});
  }

  gmailAuth() {
    this.GmailService.checkAuth().then(authSucceeded, authFailed);
  }

  listLabels() {
    this.GmailService.listLabels().then(console.log);
  }

  listEMails() {
    // TODO: For now this simply replace the content of the first inbox.
    this.GmailService.listMessages().then(emails => {
      this.EmailService.boxes[0].emails = emails;
      this.$rootScope.$apply();
    });
  }

}

function authSucceeded() {
  console.log('Auth succeeded');
}

function authFailed(error) {
  console.log('Auth failed');
  console.log(error);
}

export const Navigation = {
  template: require('./Navigation.html'),
  controller: NavigationController,
  bindings: {
    boxes: '<',
    selectedBox: '<',
    onBoxSelected: '&'
  }
};
