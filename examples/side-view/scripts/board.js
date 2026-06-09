import { EngineScene, ArcadeEntity, Countdown, KEYS } from '@engine';
import { Mushroom } from './entities/mushroom';
import { Brick } from './entities/brick';
import { Enemy } from './entities/enemy';

const DURATION = 30_000;
const MUSHROOM_INTERVAL = 80; // frames between mushroom spawns
const MAX_MUSHROOMS = 6;
const MUSHROOM_POINTS = 10;
const MUSHROOM_SIZE = 34;

// The wall/ledge ("murek") the player can jump onto.
const BRICK = { x: 380, y: 250, width: 140, height: 150 };

export class BoardScene extends EngineScene {
  countdown = null;
  player = null;
  mushrooms = [];
  enemies = [];
  score = 0;

  #frame = 0;
  #over = false;

  setup() {
    const { world, viewType } = this.config;
    const ground = world.height;

    this.score = 0;
    this.mushrooms = [];
    this.enemies = [];
    this.#frame = 0;
    this.#over = false;

    // The player can land on the brick.
    viewType.config.platforms = [BRICK];

    this.countdown = new Countdown({ duration: DURATION });
    this.countdown.on('complete', () => this._gameOver('timeout'));
    this.countdown.start();

    const brick = new Brick({
      world,
      name: 'Brick',
      ...BRICK,
    });
    this.addEntity(brick);

    this.player = new ArcadeEntity({
      world,
      viewType,
      name: 'Player',
      assetId: 'mario',
      x: 60,
      y: 0,
      width: 82,
      height: 100,
      deltaMove: 6,
      controlKeys: {
        right: KEYS.RIGHT,
        left: KEYS.LEFT,
        up: KEYS.UP,
        a: KEYS.SPACE,
      },
    });
    this.addEntity(this.player);

    this._spawnEnemy(220, ground - 66, 2.2);
    this._spawnEnemy(680, ground - 66, -1.6);

    this.collision.overlap(this.player, this.enemies, () =>
      this._gameOver('enemy'),
    );
    this.collision.overlap(this.player, this.mushrooms, (mushroom) =>
      this._collect(mushroom),
    );
  }

  update() {
    if (this.#over) {
      return;
    }
    this.setBackgroundColor('#5c94fc'); // classic sky blue
    this._renderGround();
    this.countdown.update();
    this._spawnMushroom();
    super.update();
    this._renderHud();
  }

  destroy() {
    super.destroy();
    this.countdown?.stop();
    this.config.viewType.config.platforms = [];
  }

  _spawnEnemy(x, y, speed) {
    const enemy = new Enemy({
      world: this.config.world,
      name: 'Enemy',
      assetId: 'goomba',
      x,
      y,
      width: 66,
      height: 66,
      speed,
    });
    this.enemies.push(enemy);
    this.addEntity(enemy);
  }

  _spawnMushroom() {
    this.#frame += 1;
    if (this.#frame % MUSHROOM_INTERVAL !== 0) {
      return;
    }
    if (this.mushrooms.length >= MAX_MUSHROOMS) {
      return;
    }

    const world = this.config.world;
    const x = 20 + Math.random() * (world.width - 40 - MUSHROOM_SIZE);
    const isOverBrick =
      x + MUSHROOM_SIZE > BRICK.x && x < BRICK.x + BRICK.width;
    const baseY = isOverBrick ? BRICK.y : world.height;
    const y = baseY - MUSHROOM_SIZE;

    const mushroom = new Mushroom({
      world,
      name: 'Mushroom',
      x,
      y,
      width: MUSHROOM_SIZE,
      height: MUSHROOM_SIZE,
    });
    this.mushrooms.push(mushroom);
    this.addEntity(mushroom);
  }

  _collect(mushroom) {
    if (this.#over || !mushroom.alive) {
      return;
    }
    this.score += MUSHROOM_POINTS;
    mushroom.destroy();
    this.removeEntity(mushroom);
    const index = this.mushrooms.indexOf(mushroom);
    if (index >= 0) {
      this.mushrooms.splice(index, 1);
    }
  }

  _gameOver(reason) {
    if (this.#over) {
      return;
    }
    this.#over = true;

    const state = this.config.state;
    if (state) {
      state.score = this.score;
      state.reason = reason;
    }

    this.config.world.startScene('over');
  }

  _renderGround() {
    const world = this.config.world;
    const ctx = world.context;
    ctx.fillStyle = '#3a7d2c';
    ctx.fillRect(0, world.height - 16, world.width, 16);
  }

  _renderHud() {
    const world = this.config.world;
    const ctx = world.context;
    const seconds = (this.countdown.getRemaining() / 1000).toFixed(1);

    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#ffffff';

    ctx.textAlign = 'left';
    ctx.fillText(`🍄 ${this.score}`, 16, 30);

    ctx.textAlign = 'right';
    ctx.fillText(`⏱ ${seconds}s`, world.width - 16, 30);
  }
}
