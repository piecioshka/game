export class EntitiesManager {
  #entities = [];

  addEntity(item) {
    this.#entities.push(item);
  }

  destroyEntities() {
    this.#entities.length = 0;
  }

  runOnAllEntities(methodName) {
    this.#entities.forEach((item) => item[methodName]?.());
  }
}
