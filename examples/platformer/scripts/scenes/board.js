import { EngineScene, KEYS } from '@engine';
import { Hero } from '../entities/hero';
import { Enemy } from '../entities/enemy';
import { Platform } from '../entities/platform';
import { Goal } from '../entities/goal';
import { drawCloud } from '../draw-shapes';

const LEVEL_WIDTH = 3600;
const GROUND_Y = 360; // top of the ground row (canvas is 400 tall)
const GROUND_H = 200;
const HERO_SIZE = { width: 40, height: 56 };
const ENEMY_SIZE = 40;

// Ground segments leave gaps (pits) the hero must jump over: [x, width].
const GROUND_SEGMENTS = [
  [0, 700],
  [820, 700],
  [1640, 520],
  [2280, 560],
  [2960, 640],
];

// Raised platforms ("murki") to jump onto: { x, y, width, height }.
const LEDGES = [
  { x: 360, y: 280, width: 120, height: GROUND_Y - 280 + GROUND_H },
  { x: 1180, y: 250, width: 140, height: GROUND_Y - 250 + GROUND_H },
  { x: 1820, y: 230, width: 120, height: GROUND_Y - 230 + GROUND_H },
  { x: 2480, y: 270, width: 120, height: GROUND_Y - 270 + GROUND_H },
];

// Enemies: { x, patrol: [minX, maxX], y? }.
const ENEMIES = [
  { x: 520, min: 460, max: 690 },
  { x: 1300, min: 1180, max: 1500 },
  { x: 2050, min: 1900, max: 2150 },
  { x: 3050, min: 2980, max: 3300 },
];

const CLOUDS = [
  { x: 200, y: 50, width: 140, height: 70 },
  { x: 900, y: 80, width: 110, height: 55 },
  { x: 1600, y: 40, width: 160, height: 80 },
  { x: 2400, y: 70, width: 120, height: 60 },
  { x: 3100, y: 50, width: 150, height: 75 },
];

export class BoardScene extends EngineScene {
  hero = null;
  enemies = [];
  cameraX = 0;

  #over = false;
  #dying = false;

  setup() {
    const { world, viewType } = this.config;

    this.enemies = [];
    this.cameraX = 0;
    this.#over = false;
    this.#dying = false;

    // Solid surfaces = ground segments + raised ledges. The side-view uses
    // these as floors and walls; there is no global floor, so the gaps between
    // ground segments become deadly pits.
    const groundPlatforms = GROUND_SEGMENTS.map(([x, width]) => ({
      x,
      y: GROUND_Y,
      width,
      height: GROUND_H,
    }));
    this.platforms = [...groundPlatforms, ...LEDGES];
    viewType.config.platforms = this.platforms;

    // Draw the platforms as entities so they scroll with the camera.
    this.platforms.forEach((p) => {
      this.addEntity(new Platform({ world, name: 'Tile', ...p }));
    });

    this.hero = new Hero({
      world,
      viewType,
      name: 'Hero',
      x: 60,
      y: 200,
      ...HERO_SIZE,
      deltaMove: 5,
      controlKeys: {
        right: KEYS.RIGHT,
        left: KEYS.LEFT,
        up: KEYS.UP,
        a: KEYS.SPACE,
      },
    });
    this.addEntity(this.hero);

    ENEMIES.forEach((e) => {
      const enemy = new Enemy({
        world,
        viewType,
        name: 'Enemy',
        x: e.x,
        y: GROUND_Y - ENEMY_SIZE,
        width: ENEMY_SIZE,
        height: ENEMY_SIZE,
        speed: 1.6,
        minX: e.min,
        maxX: e.max,
      });
      this.enemies.push(enemy);
      this.addEntity(enemy);
    });

    this.goal = new Goal({
      world,
      name: 'Goal',
      x: LEVEL_WIDTH - 120,
      y: GROUND_Y - 180,
      width: 80,
      height: 180,
    });
    this.addEntity(this.goal);

    this.collision.overlap(this.hero, this.enemies, (enemy) =>
      this._onEnemyTouch(enemy),
    );
    this.collision.overlap(this.hero, [this.goal], () => this._win());
  }

  update() {
    if (this.#over) {
      return;
    }

    this._renderSky();
    this._renderClouds();

    if (this.#dying) {
      this._renderWorld(() => this.render());
      this._renderHud();
      return;
    }

    this._updateCamera();
    this._renderWorld(() => super.update());
    this._checkFell();
    this._renderHud();
  }

  destroy() {
    super.destroy();
    this.config.viewType.config.platforms = [];
  }

  // Runs `draw` with the world translated by the camera, so entities scroll.
  _renderWorld(draw) {
    const ctx = this.config.world.context;
    ctx.save();
    ctx.translate(-Math.round(this.cameraX), 0);
    draw();
    ctx.restore();
  }

  _updateCamera() {
    const world = this.config.world;
    // Keep the hero around 1/3 from the left edge.
    const target = this.hero.config.x - world.width / 3;
    const maxCamera = LEVEL_WIDTH - world.width;
    this.cameraX = Math.max(0, Math.min(target, maxCamera));
  }

  _checkFell() {
    // Fell into a pit (below the canvas) -> game over.
    if (this.hero.config.y > this.config.world.height + 40) {
      this._gameOver('fell');
    }
  }

  _onEnemyTouch(enemy) {
    if (this.#over || this.#dying || !enemy.alive || enemy.squashed) {
      return;
    }

    const hero = this.hero.config;
    const heroFoot = hero.y + hero.height;
    const isFalling = (this.hero.velocityY ?? 0) > 0;
    const isAbove = heroFoot <= enemy.config.y + enemy.config.height * 0.6;

    enemy.stopped = true;

    if (isFalling && isAbove) {
      enemy.squashed = true;
      enemy.animation = null;
      this.hero.velocityY = -10;
      setTimeout(() => {
        enemy.destroy();
        this.removeEntity(enemy);
        const i = this.enemies.indexOf(enemy);
        if (i >= 0) {
          this.enemies.splice(i, 1);
        }
      }, 350);
    } else {
      this._gameOver('enemy');
    }
  }

  _gameOver(reason) {
    if (this.#over || this.#dying) {
      return;
    }
    const state = this.config.state;
    if (state) {
      state.reason = reason;
      state.won = false;
    }
    this.#dying = true;
    setTimeout(() => {
      this.#over = true;
      this.config.world.startScene('over');
    }, 1000);
  }

  _win() {
    if (this.#over || this.#dying) {
      return;
    }
    const state = this.config.state;
    if (state) {
      state.reason = 'win';
      state.won = true;
    }
    this.#dying = true;
    setTimeout(() => {
      this.#over = true;
      this.config.world.startScene('over');
    }, 1000);
  }

  _renderSky() {
    this.setBackgroundColor('#5c94fc');
  }

  _renderClouds() {
    const ctx = this.config.world.context;
    // Clouds scroll slower than the world (parallax).
    ctx.save();
    ctx.translate(-Math.round(this.cameraX * 0.4), 0);
    CLOUDS.forEach((c) => {
      // Reuse the platformer cloud drawer.
      drawCloud(ctx, c);
    });
    ctx.restore();
  }

  _renderHud() {
    const world = this.config.world;
    const ctx = world.context;
    const progress = Math.min(
      100,
      Math.round((this.hero.config.x / (LEVEL_WIDTH - 120)) * 100),
    );

    ctx.font = '14px "Press Start 2P"';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(`META ${progress}%`, 16, 30);
  }
}
