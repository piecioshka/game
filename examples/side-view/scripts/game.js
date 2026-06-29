import { EngineGame, EngineSideView } from '@engine';
import { BoardScene } from './board';
import { GameOverScene } from './game-over';

export class Game extends EngineGame {
  assets = {
    mario: 'static/mario.png',
    goomba: 'static/goomba-1.png',
  };

  constructor(props) {
    super(props);

    const world = this.world;

    const viewType = new EngineSideView({
      gravity: 1.3,
      jump: 80,
      worldHeight: props.height,
    });

    // Shared state passed between scenes (final score + how the game ended).
    const state = { score: 0, reason: null };

    world.addScene('board', new BoardScene({ world, viewType, state }));
    world.addScene('over', new GameOverScene({ world, state }));

    world.startScene('board');
  }
}
