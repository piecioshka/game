import { EngineScene, ArcadeEntity, KEYS } from '@engine';

export class BoardScene extends EngineScene {
  setup() {
    const { world, viewType } = this.config;

    const player = new ArcadeEntity({
      world,
      viewType,
      name: 'Player',
      assetId: 'characterA',
      x: 200,
      y: 120,
      width: 104,
      height: 168,

      deltaMove: 5,
      controlKeys: {
        up: KEYS.UP,
        right: KEYS.RIGHT,
        down: KEYS.DOWN,
        left: KEYS.LEFT,
        a: KEYS.SPACE,
      },
    });
    this.addEntity(player);
  }

  render() {
    // console.debug('BoardScene > render');
    super.render();
  }

  update() {
    // console.debug('BoardScene > update');
    this.setBackgroundColor('#a7e1fd');
    super.update();
  }
}
