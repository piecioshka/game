import { EngineGame } from '@engine';
import { IntroScene } from './scenes/intro';
import { BoardScene } from './scenes/board';
import { OverScene } from './scenes/over';

export class Game extends EngineGame {
  assets = {
    characterA: 'assets/character.png',
    characterB: 'assets/character.png',
  };

  constructor(props) {
    super(props);

    const world = this.world;

    world.addScene('intro', new IntroScene({ world }));
    world.addScene('board', new BoardScene({ world }));
    world.addScene('over', new OverScene({ world }));

    world.startScene('intro');
  }
}
