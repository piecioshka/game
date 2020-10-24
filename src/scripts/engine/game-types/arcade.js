import { EngineEntity } from '../../engine/engine-entity.js';
import { EngineKeyboard, KEYBOARD } from '../../engine/engine-keyboard.js';

export class ArcadeEntity extends EngineEntity {
  deltaMove = 3;

  constructor(props) {
    super(props);
    this._setupKeyboard();
  }

  _setupKeyboard() {
    const world = this.config.world;
    this.keyboard = new EngineKeyboard({ world });
    this.keyboard.on(KEYBOARD.LEFT, this.onPressLeft.bind(this));
    this.keyboard.on(KEYBOARD.RIGHT, this.onPressRight.bind(this));
    this.keyboard.on(KEYBOARD.UP, this.onPressUp.bind(this));
    this.keyboard.on(KEYBOARD.DOWN, this.onPressDown.bind(this));
    this.keyboard.on(KEYBOARD.SPACE, this.onPressSpace.bind(this));
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

  onPressSpace() {
    console.log('shot shot from ArcadeEntity');
  }
}
