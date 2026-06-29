import { EngineScene, Countdown, KEYS } from '@engine';
import { Rocket } from '../entities/rocket';
import { FallingEntity } from '../entities/falling-entity';

const DURATION = 30_000;
const SPAWN_INTERVAL = 40; // frames between spawns
const WATCH_BONUS = 5_000; // ms added when collecting a watch
const DIAMOND_POINTS = 10;

// Weighted pool - asteroids are the most common.
const KINDS = [
  'asteroid',
  'asteroid',
  'asteroid',
  'watch',
  'diamond',
  'diamond',
];

// Background changes as the time runs out: purple -> green -> orange -> red.
const COLOR_PHASES = [
  { from: 0.75, color: '#4a148c' },
  { from: 0.5, color: '#1b5e20' },
  { from: 0.25, color: '#e65100' },
  { from: 0.0, color: '#b71c1c' },
];

export class BoardScene extends EngineScene {
  countdown = null;
  rocket = null;
  obstacles = [];
  score = 0;

  #frame = 0;
  #over = false;

  setup() {
    const { world, viewType } = this.config;

    this.score = 0;
    this.obstacles = [];
    this.#frame = 0;
    this.#over = false;

    this.countdown = new Countdown({ duration: DURATION });
    this.countdown.on('complete', () => this._gameOver('timeout'));
    this.countdown.start();

    this.rocket = new Rocket({
      world,
      viewType,
      name: 'Rocket',
      x: (world.width - 48) / 2,
      y: world.height - 90,
      width: 48,
      height: 72,
      deltaMove: 6,
      controlKeys: {
        up: KEYS.UP,
        right: KEYS.RIGHT,
        down: KEYS.DOWN,
        left: KEYS.LEFT,
      },
    });
    this.addEntity(this.rocket);

    this.collision.overlap(this.rocket, this.obstacles, (entity) =>
      this._onHit(entity),
    );
  }

  update() {
    if (this.#over) {
      return;
    }
    this._renderBackground();
    this.countdown.update();
    this._spawn();
    this._cleanup();
    super.update();
    this._renderHud();
  }

  destroy() {
    super.destroy();
    this.countdown?.stop();
  }

  _renderBackground() {
    const ratio = this.countdown.getRemaining() / DURATION;
    const phase =
      COLOR_PHASES.find((p) => ratio >= p.from) ??
      COLOR_PHASES[COLOR_PHASES.length - 1];
    this.setBackgroundColor(phase.color);
  }

  _spawn() {
    this.#frame += 1;
    if (this.#frame % SPAWN_INTERVAL !== 0) {
      return;
    }

    const world = this.config.world;
    const kind = KINDS[Math.floor(Math.random() * KINDS.length)];
    const size = kind === 'diamond' ? 30 : 44;

    const obstacle = new FallingEntity({
      world,
      name: kind,
      kind,
      x: Math.random() * (world.width - size),
      y: -size,
      width: size,
      height: size,
      speed: 2 + Math.random() * 2.5,
    });

    this.obstacles.push(obstacle);
    this.addEntity(obstacle);
  }

  _cleanup() {
    const worldHeight = this.config.world.height;
    for (let i = this.obstacles.length - 1; i >= 0; i -= 1) {
      const obstacle = this.obstacles[i];
      const isOffScreen = obstacle.config.y > worldHeight;
      if (!obstacle.alive || isOffScreen) {
        this.removeEntity(obstacle);
        if (obstacle.alive) {
          obstacle.destroy();
        }
        this.obstacles.splice(i, 1);
      }
    }
  }

  _onHit(entity) {
    if (this.#over || !entity.alive) {
      return;
    }

    switch (entity.kind) {
      case 'asteroid':
        this._gameOver('crash');
        break;
      case 'watch':
        this.countdown.add(WATCH_BONUS);
        entity.destroy(); // removed from the board on the next cleanup
        break;
      case 'diamond':
        this.score += DIAMOND_POINTS;
        entity.destroy();
        break;
      default:
        break;
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

  _renderHud() {
    const world = this.config.world;
    const ctx = world.context;
    const seconds = (this.countdown.getRemaining() / 1000).toFixed(1);

    ctx.font = '16px "Press Start 2P"';
    ctx.fillStyle = '#ffffff';

    ctx.textAlign = 'left';
    ctx.fillText(`*${this.score}`, 16, 34);

    ctx.textAlign = 'right';
    ctx.fillText(`${seconds}s`, world.width - 16, 34);
  }
}
