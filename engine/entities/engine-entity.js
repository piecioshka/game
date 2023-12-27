import { EngineAssetsLoader } from '../engine-assets-loader';

const console = {
  log: require('debug')('game:EngineEntity:log'),
};

export class EngineEntity {
  config = {
    /**
     * @type {string|null}
     */
    name: null,
    /**
     * @type {EngineWorld|null}
     */
    world: null,
    /**
     * @type {string|null}
     */
    assetId: null,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    controlKeys: {
      // top
      // right
      // down
      // left
      // a (special button, like we had in pads)
      // b (special button, like we had in pads)
    },
  };

  /**
   * @type {EngineKeyboard|null}
   */
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
    if (this.config.world.config.isVisibleBoundingBox) {
      this.renderBoundingBox();
    }
    this.renderImage();
  }

  moveTo(props) {
    // console.log('moveTo', props);
    Object.assign(this.config, props);
    this.render();
  }

  renderBoundingBox() {
    const ctx = this.context;
    const cfg = this.config;
    ctx.fillStyle = 'rgba(0, 217, 176, 0.8)';
    ctx.fillRect(cfg.x, cfg.y, cfg.width, cfg.height);

    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.moveTo(cfg.x, cfg.y);
    ctx.lineTo(cfg.x + cfg.width, cfg.y);
    ctx.lineTo(cfg.x + cfg.width, cfg.y + cfg.height);
    ctx.lineTo(cfg.x, cfg.y + cfg.height);
    ctx.lineTo(cfg.x, cfg.y);
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    // ctx.strokeStyle = 'red';
    ctx.lineCap = 'square';
    ctx.stroke();
  }

  renderImage() {
    const ctx = this.context;
    const cfg = this.config;
    const img = EngineAssetsLoader.getLoadedAsset(this.config.assetId);
    ctx.drawImage(img, cfg.x, cfg.y);
  }
}
