import { EngineAssetsLoader } from '../engine/engine-assets-loader';

const console = {
  log: require('debug')('game:EngineGame:log'),
};

export class EngineGame {
  assets = {};

  config = {
    $placeHolder: null,
    width: 200,
    height: 200,
  };

  world = null;

  constructor(settings) {
    // console.log('new');
    Object.assign(this.config, settings);
  }

  loop() {
    this.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  async start() {
    // console.log('start');
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
