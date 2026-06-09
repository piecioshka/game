import { EngineScene, ArcadeEntity, EngineMap, KEYS } from '@engine';

const TILE_SIZE = 100;

function buildCheckerboard(world) {
  const cols = Math.ceil(world.width / TILE_SIZE);
  const rows = Math.ceil(world.height / TILE_SIZE);
  const tiles = [];
  for (let row = 0; row < rows; row += 1) {
    const columns = [];
    for (let col = 0; col < cols; col += 1) {
      columns.push((row + col) % 2);
    }
    tiles.push(columns);
  }
  return tiles;
}

export class BoardScene extends EngineScene {
  map = null;

  setup() {
    const { world, viewType } = this.config;

    this.map = new EngineMap({
      world,
      tileSize: TILE_SIZE,
      tiles: buildCheckerboard(world),
      colors: { 0: '#7cb342', 1: '#689f38' },
    });

    const player = new ArcadeEntity({
      world,
      viewType,
      name: 'Player',
      assetId: 'characterA',
      x: 200,
      y: 120,
      width: 104,
      height: 168,

      deltaMove: 5,
      controlKeys: {
        up: KEYS.UP,
        right: KEYS.RIGHT,
        down: KEYS.DOWN,
        left: KEYS.LEFT,
        a: KEYS.SPACE,
      },
    });
    this.addEntity(player);

    const enemy = new ArcadeEntity({
      world,
      viewType,
      name: 'Enemy',
      assetId: 'characterB',
      x: 550,
      y: 120,
      width: 104,
      height: 168,

      deltaMove: 3,
      controlKeys: {
        up: KEYS.W,
        right: KEYS.D,
        down: KEYS.S,
        left: KEYS.A,
        a: KEYS.X,
      },
    });
    this.addEntity(enemy);
  }

  render() {
    // console.debug('BoardScene > render');
    super.render();
  }

  update() {
    // console.debug('BoardScene > update');
    this.map.render();
    super.update();
  }
}
