import { SceneManager } from '../internal/scene-manager';

export class EngineWorld extends SceneManager {
  $canvas = document.createElement('canvas');

  config = {
    isVisiblePlayerTitle: false,
    isVisibleBoundingBox: false,
  };

  get context() {
    return this.$canvas.getContext('2d');
  }

  get width() {
    return this.$canvas.width;
  }

  get height() {
    return this.$canvas.height;
  }

  setSize({ width, height }) {
    this.$canvas.width = width;
    this.$canvas.height = height;
  }

  render($target) {
    // console.log('EngineWorld > render');

    $target.innerHTML = '';
    $target.appendChild(this.$canvas);

    this.currentScene?.render();
  }

  update() {
    // console.log('update');
    this.context?.clearRect(0, 0, this.width, this.height);
    this.currentScene?.update();
  }
}
