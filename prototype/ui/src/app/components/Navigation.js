class NavigationController {

  constructor() {}

  boxClicked(box) {
    this.onBoxSelected({box: box});
  }

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
