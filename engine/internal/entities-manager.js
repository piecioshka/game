export class EntitiesManager {
  #entities = [];

  addEntity(entity) {
    this.#entities.push(entity);
  }

  destroyEntities() {
    this.#entities.length = 0;
  }

  runOnAllEntities(methodName) {
    // console.debug('EntitiesManager > runOnAllEntities', { methodName });
    this.#entities.forEach((entity) => entity[methodName]?.());

    // const size = this.#entities.length;

    // for (let i = 0; i < size; i++) {
    //   this.#entities[i][methodName]?.();
    // }

    // for (let entity of this.#entities) {
    //   entity[methodName]?.();
    // }
  }
}
