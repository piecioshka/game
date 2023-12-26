import { EngineGame } from '../engine/engine-game';
import { EngineWorld } from '../engine/engine-world';
import { Player } from './player';
import { KEYBOARD } from '../engine/common/keyboard';

export class Game extends EngineGame {
  assets = {
    characterA: 'assets/character.png',
    characterB: 'assets/character.png',
  };

  world = null;

  constructor(props) {
    super(props);

    const world = this.world = new EngineWorld();

    const player = new Player({
      name: 'Player A',
      world,
      assetId: 'characterA',
      x: 100,
      y: 100,
      controlKeys: {
        up: KEYBOARD.UP,
        right: KEYBOARD.RIGHT,
        down: KEYBOARD.DOWN,
        left: KEYBOARD.LEFT,
        a: KEYBOARD.SPACE,
      },
    });
    const enemy = new Player({
      name: 'Player B',
      world,
      assetId: 'characterB',
      x: 400,
      y: 100,
      controlKeys: {
        up: KEYBOARD.W,
        right: KEYBOARD.D,
        down: KEYBOARD.S,
        left: KEYBOARD.A,
        a: KEYBOARD.X,
      },
    });
  }
}
