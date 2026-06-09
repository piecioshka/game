import { EngineGame, EngineSideView } from '@engine';
import { BoardScene } from './board';

export class Game extends EngineGame {
  assets = {
    mario: 'static/mario.png',
    goomba: 'static/goomba-1.png',
    goomba2: 'static/goomba-2.png',
    goomba3: 'static/goomba-3.png',
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
