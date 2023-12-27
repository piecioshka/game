const console = {
  log: require('debug')('game:EngineWorld:log'),
};

export class EngineWorld {
  items = [];
  $canvas = document.createElement('canvas');
  config = {
    isVisiblePlayerTitle: false,
    isVisibleBoundingBox: false,
  };

  get context() {
    return this.$canvas.getContext('2d');
  }

  constructor() {
    // console.log('new');
  }

  get width() {
    return this.$canvas.width;
  }

  get height() {
    return this.$canvas.height;
  }

  setSize({ width, height }) {
    // console.log('setSize', width, height);
    this.$canvas.width = width;
    this.$canvas.height = height;
  }

  addItem(item) {
    this.items.push(item);
  }

  render($target) {
    // console.log('render');

    $target.innerHTML = '';
    $target.appendChild(this.$canvas);

    this.items.forEach((item) => {
      if (item.render) {
        item.render();
      }
    });
  }

  update() {
    // console.log('update');
    this.context.clearRect(0, 0, this.width, this.height);

    this.items.forEach((item) => item.update?.());
  }
}
