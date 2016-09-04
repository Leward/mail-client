class EmailListController {

  /**
   * @param {Email} email
   */
  emailClicked(email) {
    this.onEmailSelected({email: email});
  }

}

export const EmailList = {
  template: require('./EmailList.html'),
  controller: EmailListController,
  bindings: {
    box: '<',
    selectedEmail: '<',
    onEmailSelected: '&'
  }
};
