import { EngineScene } from '@engine';

export class IntroScene extends EngineScene {
  setup() {
    const world = this.config.world;

    setTimeout(() => {
      world.startScene('board');
    }, 1000);
  }

  render() {
    // console.debug('IntroScene > render');
    super.render();
  }

  update() {
    // console.debug('IntroScene > update');
    this.setBackgroundColor('#a7e1fd');
  }
}
