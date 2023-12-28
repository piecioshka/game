import { Entity } from './entity';
import { EngineKeyboard } from '../internal/keyboard';
import { KEYS } from '../utils/keys';

export class ArcadeEntity extends Entity {
  deltaMove = 3;

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
    const { controlKeys, ...newProps } = props;
    super(newProps);
    // console.debug(`ArcadeEntity > new [${this.config.name}]`);
    this.controlKeys = controlKeys;
    this._setupBindings();
  }

  _setupBindings() {
    // console.debug(`ArcadeEntity > _setupBindings [${this.config.name}]`);
    const { up, right, down, left, a, b } = this.controlKeys;

    const map = new Map([
      [up, this.onPressUp],
      [right, this.onPressRight],
      [down, this.onPressDown],
      [left, this.onPressLeft],
      [a, this.onPressAButton],
      [b, this.onPressBButton],
    ]);

    // Remove pair with "key = undefined"
    map.delete(void 0);

    map.forEach((action, key) => {
      this.keyboard?.on(KEYS[key], action.bind(this));
    });
  }

  _renderLabel() {
    const ctx = this.config.world.context;
    const cfg = this.config;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(cfg.x, cfg.y - 30, cfg.width, 20);

    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillText(this.config.name, cfg.x + 30, cfg.y - 15);
  }

  _applyBoundaries(props) {
    let x = props.x || this.x;
    let y = props.y || this.y;
    const world = this.config.world;

    // LEFT
    if (x < 0) {
      x = 0;
    } else

    // RIGHT
    if (x + this.width > world.width) {
      x = world.width - this.width;
    }

    // UP
    if (y < 0) {
      y = 0;
    } else

    // DOWN
    if (y + this.height > world.height) {
      y = world.height - this.height;
    }

    return { x, y };
  }

  moveTo(props) {
    const protectedPosition = this._applyBoundaries(props);
    super.moveTo(protectedPosition);
  }

  render() {
    super.render();
    if (this.config.world.config.isVisiblePlayerLabel) {
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

  onPressLeft() {
    this.moveTo({
      x: this.x - this.deltaMove,
    });
  }

  onPressRight() {
    this.moveTo({
      x: this.x + this.deltaMove,
    });
  }

  onPressUp() {
    this.moveTo({
      y: this.y - this.deltaMove,
    });
  }

  onPressDown() {
    this.moveTo({
      y: this.y + this.deltaMove,
    });
  }

  onPressAButton() {
    // console.log('ArcadeEntity: pressing A button');
  }

  onPressBButton() {
    // console.log('ArcadeEntity: pressing B button');
  }
}
