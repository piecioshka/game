import { EventEmitter } from './utils/event-emitter';
import { KEYBOARD } from './utils/keyboard';

const console = {
  log: require('debug')('game:EngineKeyboard:log'),
  debug: require('debug')('game:EngineKeyboard:debug'),
};

export class EngineKeyboard extends EventEmitter {
  pressKeys = new Map();

  config = {
    world: null,
  };

  constructor(props) {
    super();
    // console.log('new');
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

    this.emit(codeName);
  }
}
