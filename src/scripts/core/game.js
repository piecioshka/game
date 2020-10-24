import { EngineGame } from '../engine/engine-game';
import { EngineWorld } from '../engine/engine-world';
import { Player } from './player';

export class Game extends EngineGame {
  assets = {
    player: 'assets/figure.png',
  };

  world = null;
  player = null;

  constructor(props) {
    super(props);

    this.world = new EngineWorld();
    this.player = new Player({
      world: this.world,
      assetId: 'player',
      x: 200,
      y: 200,
    });
    this.enemy = new Player({
      world: this.world,
      assetId: 'player',
      x: 100,
      y: 100,
    });
  }
}
