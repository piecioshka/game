import { Entity } from './entity';
import { EngineKeyboard } from '../internal/keyboard';
import { KEYS } from '../utils/keys';

export class ArcadeEntity extends Entity {
  deltaMove = 0;

  controlKeys = {
    // top
    // right
    // down
    // left
    // a (special button, like we had in pads)
    // b (special button, like we had in pads)
  };

  /**
   * @type {EngineKeyboard}
   */
  keyboard = new EngineKeyboard();

  constructor(props) {
    const { controlKeys, deltaMove, ...newProps } = props;
    super(newProps);
    // console.debug(`ArcadeEntity > new [${this.config.name}]`);
    this.controlKeys = controlKeys;
    this.deltaMove = deltaMove;
    this._setupBindings();
  }

  _setupBindings() {
    // console.debug(`ArcadeEntity > _setupBindings [${this.config.name}]`);
    const { up, right, down, left, a, b } = this.controlKeys;
    const viewType = this.config.viewType;

    const map = new Map([
      [up, viewType?.onPressUp.bind(viewType, this)],
      [right, viewType?.onPressRight.bind(viewType, this)],
      [down, viewType?.onPressDown.bind(viewType, this)],
      [left, viewType?.onPressLeft.bind(viewType, this)],
      [a, viewType?.onPressAButton.bind(viewType, this)],
      [b, viewType?.onPressBButton.bind(viewType, this)],
    ]);

    // Remove pair with "key = undefined"
    map.delete(void 0);

    map.forEach((action, key) => {
      this.keyboard?.on(KEYS[key], action.bind(this));
    });
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

  render() {
    super.render();
    if (this.config.world?.config.isVisiblePlayerLabel) {
      this._renderLabel();
    }
  }

  update() {
    super.update();
    this.keyboard?.update();
  }

  destroy() {
    super.destroy();
    this.keyboard?.destroy();
  }
}
