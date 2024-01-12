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
    if (this.config.world?.config.isVisiblePlayerLabel) {
      this._renderLabel();
    }

    // console.debug(`Entity > render [${this.config.name}]`);
    this._renderImage();

    if (this.config.world?.config.isVisibleBoundingBox) {
      this._renderBoundingBox();
    }
  }

  update() {
    // console.debug(`Entity > update [${this.config.name}]`);
    this.render();
    this.config.viewType?.update?.(this);
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

  _renderBoundingBox() {
    const cfg = this.config;
    const ctx = cfg.world?.context;
    if (!ctx) {
      return;
    }

    // Background
    ctx.fillStyle = 'rgba(25, 180, 5, 0.8)';
    ctx.fillRect(cfg.x, cfg.y, cfg.width, cfg.height);

    // Border
    // ctx.beginPath();
    // ctx.lineWidth = 0.3;
    // ctx.moveTo(cfg.x, cfg.y);
    // ctx.lineTo(cfg.x + cfg.width, cfg.y);
    // ctx.lineTo(cfg.x + cfg.width, cfg.y + cfg.height);
    // ctx.lineTo(cfg.x, cfg.y + cfg.height);
    // ctx.lineTo(cfg.x, cfg.y);
    // ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    // ctx.lineCap = 'square';
    // ctx.stroke();
  }

  _renderImage() {
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

  _renderLabel() {
    const cfg = this.config;
    const ctx = cfg.world?.context;
    if (!ctx) {
      return;
    }
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(cfg.x, cfg.y - 30, cfg.width, 20);

    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.textAlign = 'center';
    ctx.fillText(cfg?.name ?? 'NONAME', cfg.x + cfg.width / 2, cfg.y - 15);
  }
}
