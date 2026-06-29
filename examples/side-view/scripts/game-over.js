import { EngineScene } from '@engine';

const KEY_ENTER = 13;
const KEY_SPACE = 32;

const FONT = 'Press Start 2P';
// Slow blink: visible for BLINK_ON ms, hidden for BLINK_OFF ms.
const BLINK_ON = 700;
const BLINK_OFF = 500;

export class GameOverScene extends EngineScene {
  #removeListeners = null;
  #startedAt = 0;

  setup() {
    const world = this.config.world;
    const restart = () => world.startScene('board');
    this.#startedAt = performance.now();

    const onKey = (evt) => {
      if (evt.keyCode === KEY_ENTER || evt.keyCode === KEY_SPACE) {
        restart();
      }
    };
    const onClick = () => restart();

    window.addEventListener('keydown', onKey);
    world.$canvas.addEventListener('click', onClick);

    this.#removeListeners = () => {
      window.removeEventListener('keydown', onKey);
      world.$canvas.removeEventListener('click', onClick);
    };
  }

  destroy() {
    this.#removeListeners?.();
    this.#removeListeners = null;
    super.destroy();
  }

  update() {
    this.setBackgroundColor('#1a1a2e');
    this._render();
  }

  _render() {
    const world = this.config.world;
    const ctx = world.context;
    const cx = world.width / 2;
    const cy = world.height / 2;
    const state = this.config.state ?? { score: 0, reason: null };

    ctx.textAlign = 'center';

    ctx.fillStyle = '#ff5252';
    ctx.font = `28px "${FONT}"`;
    ctx.fillText('GAME OVER', cx, cy - 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = `12px "${FONT}"`;
    ctx.fillText(this._reasonText(state.reason), cx, cy);

    ctx.fillStyle = '#ffd54f';
    ctx.font = `16px "${FONT}"`;
    ctx.fillText(`GRZYBKI: ${state.score}`, cx, cy + 45);

    if (this._isPromptVisible()) {
      ctx.fillStyle = '#90a4ae';
      ctx.font = `10px "${FONT}"`;
      ctx.fillText('NACISNIJ ENTER, ABY ZAGRAC PONOWNIE', cx, cy + 95);
    }
  }

  _isPromptVisible() {
    const elapsed =
      (performance.now() - this.#startedAt) % (BLINK_ON + BLINK_OFF);
    return elapsed < BLINK_ON;
  }

  _reasonText(reason) {
    if (reason === 'enemy') {
      return 'DOTKNAL CIE WROG!';
    }
    if (reason === 'timeout') {
      return 'CZAS SIE SKONCZYL!';
    }
    return '';
  }
}
