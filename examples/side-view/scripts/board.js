import { EngineScene, ArcadeEntity, KEYS } from '@engine';

export class BoardScene extends EngineScene {
  setup() {
    const { world, viewType } = this.config;

    const player = new ArcadeEntity({
      world,
      viewType,
      name: 'Player',
      assetId: 'mario',
      x: 100,
      y: -104,
      width: 82,
      height: 100,

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

    const enemy = new ArcadeEntity({
      world,
      viewType,
      name: 'Enemy',
      assetId: 'goomba',
      x: 500,
      y: -104,
      width: 66,
      height: 66,

      deltaMove: 3,
    });

    this.addEntity(enemy);
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
