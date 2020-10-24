import './index.html';
import './main.css';
import { Game } from './scripts/core/game';

require('debug').enable('game:*');

function main() {
  const $area = document.querySelector('#game');

  const game = new Game({
    $placeHolder: $area,
    width: 600,
    height: 300
  });

  game.start();
}

main();
