export class EventEmitter {
  #listeners = {};

  emit(name, ...args) {
    this.#listeners[name]?.forEach((cb) => cb(...args));
  }

  on(name, cb) {
    this.#listeners[name] = this.#listeners[name] || [];
    this.#listeners[name].push(cb);
  }
}
