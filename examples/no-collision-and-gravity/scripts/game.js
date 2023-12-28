import { EngineGame, EngineTopDownView } from '@engine';
import { IntroScene } from './scenes/intro';
import { BoardScene } from './scenes/board';
import { GameOverScene } from './scenes/game-over';

export class Game extends EngineGame {
  assets = {
    characterA: 'assets/character.png',
    characterB: 'assets/character.png',
  };

  constructor(props) {
    super(props);

    const world = this.world;

    const viewType = new EngineTopDownView();

    world.addScene('intro', new IntroScene({ world }));
    world.addScene('board', new BoardScene({ world, viewType }));
    world.addScene('over', new GameOverScene({ world }));

    world.startScene('intro');
  }
}
