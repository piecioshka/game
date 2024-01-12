export class EntitiesManager {
  #entities = [];

  addEntity(entity) {
    this.#entities.push(entity);
  }

  getEntities() {
    return this.#entities;
  }

  removeEntity(entity) {
    const index = this.#entities.indexOf(entity);
    if (index >= 0) {
      this.#entities.splice(index, 1);
    }
  }

  destroyEntities() {
    this.#entities.length = 0;
  }

  runOnAllEntities(methodName) {
    // console.debug('EntitiesManager > runOnAllEntities', { methodName });
    this.#entities.forEach((entity) => entity[methodName]?.());
  }
}
