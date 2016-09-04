class NavigationController {

  constructor() {}

  boxClicked(box) {
    this.boxSelected({box: box});
  }

}

export const Navigation = {
  template: require('./Navigation.html'),
  controller: NavigationController,
  bindings: {
    boxes: '<',
    selectedBox: '<',
    boxSelected: '&'
  }
};
