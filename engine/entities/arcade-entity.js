import { Entity } from './entity';
import { EngineKeyboard } from '../internal/keyboard';
import { AutoPilot } from '../internal/auto-pilot';
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

  /**
   * @type {AutoPilot|null}
   */
  autoPilot = null;

  /**
   * Rising-edge latch for jump: set when a jump fires, cleared once all
   * jump-bound keys are released, so holding the key cannot auto-repeat jump.
   * @type {boolean}
   */
  jumpLatched = false;

  constructor(props) {
    const { controlKeys, deltaMove, autoMove, ...newProps } = props;
    super(newProps);
    // console.debug(`ArcadeEntity > new [${this.config.name}]`);
    this.controlKeys = controlKeys;
    this.deltaMove = deltaMove;
    this._setupBindings();

    if (autoMove) {
      // INFO: When "autoMove" is defined the entity is controlled by computer
      this.autoPilot = new AutoPilot(autoMove);
    }
  }

  _setupBindings() {
    // console.debug(`ArcadeEntity > _setupBindings [${this.config.name}]`);
    if (!this.controlKeys) {
      // INFO: Do not enable control when keys aren't defined
      return;
    }

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

  update() {
    super.update();
    this.keyboard?.update();
    this._resetJumpLatch();
    this._updateAutoPilot();
  }

  /**
   * Clears the jump latch once every jump-bound key (up / a) is released, so
   * the next press is a fresh rising edge. The keyboard map is keyed by the
   * numeric keyCode while `controlKeys` values are KEYS strings (e.g. '38'),
   * so the code must be coerced to a Number before the lookup.
   */
  _resetJumpLatch() {
    if (!this.jumpLatched || !this.controlKeys || !this.keyboard) {
      return;
    }

    const jumpKeys = [this.controlKeys.up, this.controlKeys.a].filter(
      (key) => key !== undefined,
    );
    const anyHeld = jumpKeys.some((key) =>
      this.keyboard.isPressed(Number(key)),
    );

    if (!anyHeld) {
      this.jumpLatched = false;
    }
  }

  _updateAutoPilot() {
    if (!this.autoPilot) {
      return;
    }

    const viewType = this.config.viewType;
    const move = this.autoPilot.nextMove(this);

    const actions = {
      up: viewType?.onPressUp,
      right: viewType?.onPressRight,
      down: viewType?.onPressDown,
      left: viewType?.onPressLeft,
    };

    actions[move]?.call(viewType, this);
  }

  destroy() {
    super.destroy();
    this.keyboard?.destroy();
  }
}
