import { EngineGame, EngineSideView } from '@engine';
import { BoardScene } from './board';

export class Game extends EngineGame {
  assets = {
    mario: 'assets/mario.png',
    goomba: 'assets/goomba-1.png',
  };

  constructor(props) {
    super(props);

    const world = this.world;

    const viewType = new EngineSideView({
      gravity: 1.3,
      jump: 80,
    });

    world.addScene('board', new BoardScene({ world, viewType }));

    world.startScene('board');
  }
}
