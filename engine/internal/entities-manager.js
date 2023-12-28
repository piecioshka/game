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

    // const size = this.#entities.length;

    // for (let i = 0; i < size; i++) {
    //   this.#entities[i][methodName]?.();
    // }

    // for (let item of this.#entities) {
    //   item[methodName]?.();
    // }
  }
}
