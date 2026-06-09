import { EngineGame, EngineTopDownView } from '@engine';
import { IntroScene } from './scenes/intro';
import { BoardScene } from './scenes/board';
import { GameOverScene } from './scenes/game-over';

export class Game extends EngineGame {
  // The rocket game draws everything with canvas primitives, so no image
  // assets are needed.
  assets = {};

  constructor(props) {
    super(props);

    const world = this.world;

    const viewType = new EngineTopDownView();

    // Shared state passed between scenes (final score + how the game ended).
    const state = { score: 0, reason: null };

    world.addScene('intro', new IntroScene({ world }));
    world.addScene('board', new BoardScene({ world, viewType, state }));
    world.addScene('over', new GameOverScene({ world, state }));

    world.startScene('intro');
  }
}
