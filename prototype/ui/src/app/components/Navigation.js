class NavigationController {

  /**
   * @ngInject
   * @param {GmailService} GmailService
   */
  constructor(GmailService) {
    this.GmailService = GmailService;
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
