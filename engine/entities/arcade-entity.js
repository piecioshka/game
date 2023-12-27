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
    console.debug(`ArcadeEntity > _setupBindings [${this.config.name}]`);
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

  _renderTitle() {
    const ctx = this.config.world.context;
    const cfg = this.config;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(cfg.x, cfg.y - 30, cfg.width, 20);

    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillText(this.config.name, cfg.x + 30, cfg.y - 15);
  }

  _applyBoundaries(props) {
    let x = props.x || this.config.x;
    let y = props.y || this.config.y;

    // LEFT
    if (x < 0) {
      x = 0;
    }

    // UP
    if (y < 0) {
      y = 0;
    }

    // RIGHT
    if (x + this.config.width > this.config.world.width) {
      x = this.config.world.width - this.config.width;
    }

    // DOWN
    if (y + this.config.height > this.config.world.height) {
      y = this.config.world.height - this.config.height;
    }
    return { x, y };
  }

  moveTo(props) {
    const protectedPosition = this._applyBoundaries(props);
    super.moveTo(protectedPosition);
  }

  render() {
    super.render();
    if (this.config.world.config.isVisiblePlayerTitle) {
      this._renderTitle();
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
      x: this.config.x - this.deltaMove,
    });
  }

  onPressRight() {
    this.moveTo({
      x: this.config.x + this.deltaMove,
    });
  }

  onPressUp() {
    this.moveTo({
      y: this.config.y - this.deltaMove,
    });
  }

  onPressDown() {
    this.moveTo({
      y: this.config.y + this.deltaMove,
    });
  }

  onPressAButton() {
    // console.log('ArcadeEntity: pressing A button');
  }

  onPressBButton() {
    // console.log('ArcadeEntity: pressing B button');
  }
}
