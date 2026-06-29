import {
  EngineScene,
  ArcadeEntity,
  Countdown,
  SpriteAnimation,
  EngineAssetsLoader,
  KEYS,
} from '@engine';
import { Mushroom } from './entities/mushroom';
import { Brick } from './entities/brick';
import { Enemy } from './entities/enemy';

const DURATION = 30_000;
const MUSHROOM_INTERVAL = 80; // frames between mushroom spawns
const MAX_MUSHROOMS = 6;
const MUSHROOM_POINTS = 10;
const MUSHROOM_SIZE = 66; // same footprint as an enemy
const GAME_OVER_DELAY = 1000; // ms the board stays frozen before Game Over

// The wall/ledge ("murek") the player can jump onto.
const BRICK = { x: 380, y: 250, width: 140, height: 150 };

// Static background clouds (drawn from the "cloud" image asset).
const CLOUDS = [
  { x: 120, y: 50, scale: 1 },
  { x: 470, y: 90, scale: 0.7 },
  { x: 700, y: 40, scale: 1.2 },
];

export class BoardScene extends EngineScene {
  countdown = null;
  player = null;
  mushrooms = [];
  enemies = [];
  score = 0;

  #frame = 0;
  #over = false;
  #dying = false;

  setup() {
    const { world, viewType } = this.config;
    const ground = world.height;

    this.score = 0;
    this.mushrooms = [];
    this.enemies = [];
    this.#frame = 0;
    this.#over = false;
    this.#dying = false;

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

    this.collision.overlap(this.player, this.enemies, (enemy) =>
      this._onEnemyTouch(enemy),
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
    this._renderClouds();
    this._renderGround();

    if (this.#dying) {
      // Frozen beat before Game Over: keep the scene on screen but stop time,
      // spawning and movement. Draw entities without updating them.
      this.render();
      this._renderHud();
      return;
    }

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
      viewType: this.config.viewType, // subject to gravity, like the player
      name: 'Enemy',
      assetId: 'goomba',
      x,
      y,
      width: 66,
      height: 66,
      speed,
    });
    // INFO: Walk cycle uses two frames; "goomba3" is reserved for the squashed
    // pose shown when the player stomps it from above.
    enemy.setAnimation(
      new SpriteAnimation({
        frames: ['goomba', 'goomba2'],
        fps: 6,
      }),
    );
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

  // The player hit an enemy. Stomping it from above scores a point; touching
  // it from the side is fatal.
  _onEnemyTouch(enemy) {
    if (this.#over || this.#dying || !enemy.alive || enemy.squashed) {
      return;
    }

    const player = this.player.config;
    const playerFoot = player.y + player.height;
    const enemyTop = enemy.config.y;
    const isFalling = (this.player.velocityY ?? 0) > 0;
    const isAbove = playerFoot <= enemyTop + enemy.config.height * 0.6;

    // Once touched, the enemy freezes in place.
    enemy.stopped = true;

    if (isFalling && isAbove) {
      this._stomp(enemy);
    } else {
      this._gameOver('enemy');
    }
  }

  _stomp(enemy) {
    this.score += MUSHROOM_POINTS;

    // Show the squashed pose ("goomba3") instead of the walk cycle, then remove
    // the enemy shortly after.
    enemy.squashed = true;
    enemy.animation = null;
    enemy.setAsset('goomba3');

    // Bounce the player back up.
    this.player.velocityY = -8;

    setTimeout(() => {
      enemy.destroy();
      this.removeEntity(enemy);
      const index = this.enemies.indexOf(enemy);
      if (index >= 0) {
        this.enemies.splice(index, 1);
      }
    }, 400);
  }

  _gameOver(reason) {
    if (this.#over || this.#dying) {
      return;
    }

    const state = this.config.state;
    if (state) {
      state.score = this.score;
      state.reason = reason;
    }

    // Freeze the board for a beat so the player can see what happened, then
    // switch to the Game Over screen.
    this.#dying = true;
    setTimeout(() => {
      this.#over = true;
      this.config.world.startScene('over');
    }, GAME_OVER_DELAY);
  }

  _renderClouds() {
    const ctx = this.config.world.context;
    const img = EngineAssetsLoader.getLoadedAsset('cloud');
    if (!img) {
      return;
    }
    CLOUDS.forEach(({ x, y, scale }) => {
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    });
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

    ctx.font = '16px "Press Start 2P"';
    ctx.fillStyle = '#ffffff';

    ctx.textAlign = 'left';
    ctx.fillText(`x${this.score}`, 16, 34);

    ctx.textAlign = 'right';
    ctx.fillText(`${seconds}s`, world.width - 16, 34);
  }
}
