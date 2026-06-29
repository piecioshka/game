import { EngineGame, EngineSideView } from '@engine';
import { BoardScene, LEVEL_WIDTH } from './scenes/board';
import { OverScene } from './scenes/over';

export class Game extends EngineGame {
  constructor(props) {
    super(props);

    const world = this.world;

    // A very low floor means the only solid surfaces are the level's
    // platforms, so the gaps between them act as bottomless pits.
    const viewType = new EngineSideView({
      gravity: 1.3,
      jump: 150,
      worldHeight: 100_000,
      worldWidth: LEVEL_WIDTH,
    });

    const state = { reason: null, won: false };

    world.addScene('board', new BoardScene({ world, viewType, state }));
    world.addScene('over', new OverScene({ world, state }));

    world.startScene('board');
  }
}
