import { EngineScene } from '@engine';

export class IntroScene extends EngineScene {
  setup() {
    const world = this.config.world;

    setTimeout(() => {
      world.startScene('board');
    }, 1000);
  }

  update() {
    this.setBackgroundColor('#a7e1fd');
  }
}
