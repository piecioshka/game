import { EngineScene, KEYS } from '@engine';
import { Player } from '../player';

export class BoardScene extends EngineScene {
  setup() {
    const world = this.config.world;

    setTimeout(() => {
      world.startScene('over');
    }, 3000);

    const player = new Player({
      world,
      name: 'Player',
      assetId: 'characterA',
      x: 200,
      y: 120,
      width: 104,
      height: 168,
      controlKeys: {
        up: KEYS.UP,
        right: KEYS.RIGHT,
        down: KEYS.DOWN,
        left: KEYS.LEFT,
        a: KEYS.SPACE,
      },
    });

    this.addEntity(player);

    const enemy = new Player({
      world,
      name: 'Enemy',
      assetId: 'characterB',
      x: 550,
      y: 120,
      width: 104,
      height: 168,
      controlKeys: {
        up: KEYS.W,
        right: KEYS.D,
        down: KEYS.S,
        left: KEYS.A,
        a: KEYS.X,
      },
    });
    this.addEntity(enemy);
  }

  update() {
    // console.debug('BoardScene > update');
    this.setBackgroundColor('#a7e1fd');
    super.update();
  }
}
