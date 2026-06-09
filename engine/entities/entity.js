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

  alive = true;

  /**
   * @type {import('../internal/sprite-animation').SpriteAnimation|null}
   */
  animation = null;

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

    this._renderImage();

    if (this.config.world?.config.isVisiblePlayerLabel) {
      this._renderLabel();
    }

    if (this.config.world?.config.isVisibleBoundingBox) {
      this._renderBoundingBox();
    }

    if (this.config.world?.config.isVisibleBoundingPoints) {
      this._renderBoundingPoints();
    }
  }

  update() {
    // console.debug(`Entity > update [${this.config.name}]`);
    if (this.animation) {
      // INFO: Swap the rendered image to the current animation frame
      this.setAsset(this.animation.currentFrame());
    }
    this.render();
    this.config.viewType?.update?.(this);
  }

  /**
   * Change the image used while rendering this entity.
   * @param {string|null} assetId
   */
  setAsset(assetId) {
    if (assetId) {
      this.config.assetId = assetId;
    }
  }

  /**
   * Play a sprite animation by cycling the entity's image over time.
   * @param {import('../internal/sprite-animation').SpriteAnimation} animation
   */
  setAnimation(animation) {
    this.animation = animation;
    animation?.start();
    return this;
  }

  destroy() {
    // console.debug(`Entity > destroy [${this.config.name}]`);
    this.alive = false;
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

  _renderPoint(x, y, pointSize = 3, color = 'white') {
    const cfg = this.config;
    const ctx = cfg.world?.context;
    if (!ctx) {
      return;
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, pointSize, pointSize);
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

  _renderBoundingPoints() {
    const { x: px, y: py, width: pWidth, height: pHeight } = this.config;

    // top left corner
    this._renderPoint(px, py);
    // top center
    this._renderPoint(px + pWidth / 2, py);
    // top right corner
    this._renderPoint(px + pWidth, py);

    // ---------------------------------------------------------------------

    // right center
    this._renderPoint(px + pWidth, py + pHeight / 2);

    // ---------------------------------------------------------------------

    // bottom right corner
    this._renderPoint(px + pWidth, py + pHeight);
    // bottom center
    this._renderPoint(px + pWidth / 2, py + pHeight);
    // bottom left corner
    this._renderPoint(px, py + pHeight);

    // ---------------------------------------------------------------------

    // left center
    this._renderPoint(px, py + pHeight / 2);
  }
}
