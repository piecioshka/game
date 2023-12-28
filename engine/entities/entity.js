import { EngineAssetsLoader } from '../internal/assets-loader';
import { UIEvents } from '../internal/ui-events';
import { EventEmitter } from '../utils/event-emitter';

export class Entity extends EventEmitter {
  config = {
    /**
     * @type {import('../domain/world').EngineWorld|null}
     */
    world: null,
    /**
     * @type {import('../views/view').EngineView|null}
     */
    viewType: null,
    /**
     * @type {string|null}
     */
    name: null,
    /**
     * @type {string|null}
     */
    assetId: null,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  /**
   * @type {() => void|null}
   */
  removeListeners = null;

  constructor(props) {
    super();
    Object.assign(this.config, props);

    this.removeListeners = UIEvents.setup(
      this.config.world?.$canvas,
      'click',
      this,
    );
  }

  render() {
    // console.debug(`Entity > render [${this.config.name}]`);
    if (this.config.world?.config.isVisibleBoundingBox) {
      this.renderBoundingBox();
    }
    this.renderImage();
  }

  update() {
    // console.debug(`Entity > update [${this.config.name}]`);
    this.render();
  }

  destroy() {
    // console.debug(`Entity > destroy [${this.config.name}]`);
    this.removeListeners?.();
  }

  /**
   * @param {{ x?: number, y?: number }} param0
   */
  moveTo({ x, y }) {
    // console.log('Entity > moveTo', { x, y });
    if (typeof x === 'number') {
      this.config.x = x;
    }
    if (typeof y === 'number') {
      this.config.y = y;
    }
  }

  renderBoundingBox() {
    const cfg = this.config;
    const ctx = cfg.world?.context;
    if (!ctx) {
      return;
    }
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
    ctx.lineCap = 'square';
    ctx.stroke();
  }

  renderImage() {
    const cfg = this.config;
    const ctx = cfg.world?.context;
    if (!ctx) {
      return;
    }
    const img = EngineAssetsLoader.getLoadedAsset(cfg.assetId);
    if (img) {
      ctx.drawImage(img, cfg.x, cfg.y);
    }
  }
}
