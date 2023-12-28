export class SceneManager {
  /**
   * @type {import('../domain/scene').EngineScene[]}
   */
  #scenes = [];

  /**
   * @type {import('../domain/scene').EngineScene|null}
   */
  currentScene = null;

  /**
   * @param {string} name
   * @param {import('../domain/scene').EngineScene} scene
   */
  addScene(name, scene) {
    // console.debug(`[💾] SceneManager > addScene [${name}]`);
    this.#scenes[name] = scene;
  }

  /**
   * @param {string} name
   */
  startScene(name) {
    this.currentScene?.destroy();
    // console.debug(`[🚀] SceneManager > startScene [${name}]`);
    this.currentScene = this.#scenes[name];
    this.currentScene?.setup?.();
  }
}
