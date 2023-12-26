import { EngineEntity } from './engine-entity.js';
import { EngineKeyboard } from '../engine-keyboard.js';
import { KEYBOARD } from '../common/keyboard';

export class ArcadeEntity extends EngineEntity {
  deltaMove = 3;

  constructor(props) {
    super(props);
    this._setupKeyboard();
  }

  _setupKeyboard() {
    const { world, controlKeys } = this.config;
    this.keyboard = new EngineKeyboard({ world });
    const { up, right, down, left, a, b } = controlKeys;
    this.keyboard.on(KEYBOARD[up], this.onPressUp.bind(this));
    this.keyboard.on(KEYBOARD[right], this.onPressRight.bind(this));
    this.keyboard.on(KEYBOARD[down], this.onPressDown.bind(this));
    this.keyboard.on(KEYBOARD[left], this.onPressLeft.bind(this));
    if (a) {
      this.keyboard.on(KEYBOARD[a], this.onPressAButton.bind(this));
    }
    if (b) {
      this.keyboard.on(KEYBOARD[b], this.onPressBButton.bind(this));
    }
  }

  applyBoundaries(props) {
    let x = props.x || this.x;
    let y = props.y || this.y;

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
    const protectedPosition = this.applyBoundaries(props);
    super.moveTo(protectedPosition);
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
    // console.log('ArcadeEntity: on press A button');
  }

  onPressBButton() {
    // console.log('ArcadeEntity: on press B button');
  }
}
