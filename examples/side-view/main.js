import './index.html';
import './main.css';
import { Game } from './scripts/game';

async function main() {
  const $area = document.querySelector('#game');

  const game = new Game({
    $placeHolder: $area,
    width: 900,
    height: 400,
  });

  // game.world.config.isVisiblePlayerLabel = true;
  // game.world.config.isVisibleBoundingBox = true;
  // game.world.config.isVisibleBoundingPoints = true;

  // Make sure the pixel font is ready before the canvas draws any text.
  await document.fonts.load('16px "Press Start 2P"');

  game.start();
}

main();
