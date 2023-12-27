import './index.html';
import './main.css';
import { Game } from './scripts/core/game';

require('debug').enable('game:*');

function main() {
  const $area = document.querySelector('#game');

  const game = new Game({
    $placeHolder: $area,
    width: 900,
    height: 400,
  });

  game.world.config.isVisiblePlayerTitle = true;
  game.world.config.isVisibleBoundingBox = true;

  game.start();
}

main();
