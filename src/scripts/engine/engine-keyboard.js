import { EventEmitter } from './common/event-emitter';
import { Enum } from './common/enum';

const console = {
  log: require('debug')('game:EngineKeyboard:log'),
};

export const KEYBOARD = new Enum({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  ENTER: 13,
  ESCAPE: 27,
});

export class EngineKeyboard extends EventEmitter {
  pressKeys = new Map();

  config = {
    world: null,
  };

  constructor(props) {
    super();
    console.log('new');
    Object.assign(this.config, props);
    this.config.world.addItem(this);
    this._handleKeyboardEvents();
  }

  _handleKeyboardEvents() {
    window.addEventListener('keydown', (evt) => {
      const code = evt.keyCode;
      this.pressKeys.set(code, true);
    });

    window.addEventListener('keyup', (evt) => {
      const code = evt.keyCode;
      this.pressKeys.delete(code);
    });
  }

  update() {
    this.pressKeys.forEach(this._dispatchEvent.bind(this));
  }

  _dispatchEvent(status, code) {
    if (!status) {
      return;
    }

    const codeName = KEYBOARD[code];

    if (!codeName) {
      return;
    }

    const codeString = KEYBOARD[codeName];

    this.trigger(codeString);
  }
}
