export class EventEmitter {
  _listeners = {};

  trigger(name) {
    this._listeners[name].forEach(({ cb }) => cb());
  }

  on(name, cb) {
    this._listeners[name] = this._listeners[name] || [];
    this._listeners[name].push({ name, cb });
  }
}
