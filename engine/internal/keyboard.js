import { EventEmitter } from '../utils/event-emitter';
import { KEYS } from '../utils/keys';

export class EngineKeyboard extends EventEmitter {
  #pressKeys = new Map();

  destroyListeners = null;

  constructor() {
    // console.debug('EngineKeyboard > new');
    super();
    this.destroyListeners = this._handleKeyboardEvents();
  }

  _handleKeyboardEvents() {
    // console.debug('EngineKeyboard > _handleKeyboardEvents');
    const keys = this.#pressKeys;

    /**
     * @param {KeyboardEvent} evt
     */
    function downHandler(evt) {
      const code = evt.keyCode;
      keys.set(code, true);
    }

    /**
     * @param {KeyboardEvent} evt
     */
    function upHandler(evt) {
      const code = evt.keyCode;
      keys.delete(code);
    }

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }

  update() {
    this.#pressKeys.forEach(this._dispatchEvent.bind(this));
  }

  /**
   * Whether a key is currently held down this frame. The map is keyed by the
   * numeric `evt.keyCode`, so pass the numeric code (not the KEYS name).
   * @param {number} code
   * @returns {boolean}
   */
  isPressed(code) {
    return this.#pressKeys.get(Number(code)) === true;
  }

  destroy() {
    // console.debug('EngineKeyboard > destroy');
    this.#pressKeys.clear();
    this.destroyListeners?.();
  }

  _dispatchEvent(status, code) {
    if (!status) {
      return;
    }

    const codeName = KEYS[code];
    // console.debug('_dispatchEvent', codeName);

    if (!codeName) {
      return;
    }

    this.emit(codeName);
  }
}
