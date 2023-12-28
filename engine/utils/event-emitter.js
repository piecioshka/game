export class EventEmitter {
  #listeners = {};

  emit(name) {
    this.#listeners[name]?.forEach((cb) => cb());
  }

  on(name, cb) {
    this.#listeners[name] = this.#listeners[name] || [];
    this.#listeners[name].push(cb);
  }
}
