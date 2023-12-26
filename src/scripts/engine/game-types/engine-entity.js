import { EngineAssetsLoader } from '../engine-assets-loader';

const console = {
  log: require('debug')('game:EngineEntity:log'),
};

export class EngineEntity {
  config = {
    world: null,
    assetId: null,
    x: 0,
    y: 0,
    width: 80,
    height: 80,
    controlKeys: [
      // top
      // right
      // down
      // left
      // a (special button, like we had in pads)
      // b (special button, like we had in pads)
    ],
  };

  keyboard = null;

  get x() {
    return this.config.x;
  }

  get y() {
    return this.config.y;
  }

  get context() {
    return this.config.world.context;
  }

  constructor(props) {
    // console.log('new');
    Object.assign(this.config, props);
    this.config.world.addItem(this);
  }

  update() {
    this.render();
    this.keyboard.update();
  }

  render() {
    // console.log('render');
    // this.renderFake();
    this.renderImage();
  }

  moveTo(props) {
    // console.log('moveTo', props);
    Object.assign(this.config, props);
    this.render();
  }

  renderFake() {
    const ctx = this.context;
    const cfg = this.config;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(cfg.x, cfg.y, cfg.width, cfg.height);
  }

  renderImage() {
    const ctx = this.context;
    const cfg = this.config;
    const img = EngineAssetsLoader.getLoadedAsset(this.config.assetId);
    ctx.drawImage(img, cfg.x, cfg.y);
  }
}
