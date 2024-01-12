import { EngineGame, EngineSideView } from '@engine';
import { BoardScene } from './board';

export class Game extends EngineGame {
  assets = {
    characterA: 'assets/character.png',
    characterB: 'assets/character.png',
  };

  constructor(props) {
    super(props);

    const world = this.world;

    const viewType = new EngineSideView({
      gravity: 1,
      jump: 70,
    });

    world.addScene('board', new BoardScene({ world, viewType }));

    world.startScene('board');
  }
}
