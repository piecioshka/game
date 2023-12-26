export class EventEmitter {
  _listeners = {};

  emit(name) {
    this._listeners[name]?.forEach(({ cb }) => cb());
  }

  on(name, cb) {
    this._listeners[name] = this._listeners[name] || [];
    this._listeners[name].push({ name, cb });
  }
}
