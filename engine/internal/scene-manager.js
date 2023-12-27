export class SceneManager {
  scenes = [];
  /**
   * @type {EngineScene|null}
   */
  currentScene = null;

  /**
   * @param {string} name
   * @param {EngineScene} scene
   */
  addScene(name, scene) {
    // console.debug(`[💾] SceneManager > addScene [${name}]`);
    this.scenes[name] = scene;
  }

  /**
   * @param {string} name
   */
  startScene(name) {
    this.currentScene?.destroy();
    // console.debug(`[🚀] SceneManager > startScene [${name}]`);
    this.currentScene = this.scenes[name];
    this.currentScene.clearScene();
    this.currentScene.setup?.();
  }
}
