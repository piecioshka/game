import { EngineScene, ArcadeEntity, KEYS } from '@engine';

export class BoardScene extends EngineScene {
  setup() {
    const { world, viewType } = this.config;

    // setTimeout(() => {
    //   world.startScene('over');
    // }, 3000);

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

    const enemy = new ArcadeEntity({
      world,
      viewType,
      name: 'Enemy',
      assetId: 'characterB',
      x: 550,
      y: 120,
      width: 104,
      height: 168,

      deltaMove: 3,
      // INFO: Controlled by computer - chases the player around the board
      autoMove: {
        pattern: 'chase',
        target: player,
      },
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
