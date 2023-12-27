import { EngineWorld } from './world';
import { EngineAssetsLoader } from '../internal/assets-loader';

export class EngineGame {
  assets = {};

  config = {
    $placeHolder: null,
    width: 200,
    height: 200,
  };

  /**
   * @type {EngineWorld}
   */
  world = new EngineWorld();

  constructor(props) {
    Object.assign(this.config, props);
  }

  loop() {
    this.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  async start() {
    this.world.setSize(this.config);

    await EngineAssetsLoader.load(this.assets);

    this.render();
    this.loop();
  }

  render() {
    // console.log('render');
    this.world.render(this.config.$placeHolder);
  }

  update() {
    // console.log('update');
    this.world.update();
  }
}
