import { EngineWorld } from './world';
import { EngineAssetsLoader } from '../internal/assets-loader';
import { setupDevMode } from '../internal/dev-mode';

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

    // Dev mode: double-tap "b" to toggle bounding boxes.
    setupDevMode(this.world);

    try {
      await EngineAssetsLoader.load(this.assets);
    } catch (err) {
      // TODO(piecioshka): handle missing asset
    }

    this.render();
    this.loop();
  }

  render() {
    // console.log('EngineGame > render');
    this.world.render(this.config.$placeHolder);
  }

  update() {
    // console.log('EngineGame > update');
    this.world.update();
  }
}
