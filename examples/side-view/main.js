import './index.html';
import './main.css';
import { Game } from './scripts/game';

function main() {
  const $area = document.querySelector('#game');

  const game = new Game({
    $placeHolder: $area,
    width: 900,
    height: 400,
  });

  // game.world.config.isVisiblePlayerLabel = true;
  // game.world.config.isVisibleBoundingBox = true;
  // game.world.config.isVisibleBoundingPoints = true;

  game.start();
}

main();
