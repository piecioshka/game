import { EngineScene } from '@engine';

const KEY_ENTER = 13;
const KEY_SPACE = 32;

const FONT = 'Press Start 2P';
const BLINK_ON = 700;
const BLINK_OFF = 500;

export class OverScene extends EngineScene {
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
    const won = this.config.state?.won;
    this.setBackgroundColor(won ? '#1b3a1b' : '#1a1a2e');
    this._render(won);
  }

  _render(won) {
    const world = this.config.world;
    const ctx = world.context;
    const cx = world.width / 2;
    const cy = world.height / 2;

    ctx.textAlign = 'center';

    if (won) {
      ctx.fillStyle = '#69f0ae';
      ctx.font = `30px "${FONT}"`;
      ctx.fillText('WYGRANA!', cx, cy - 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = `12px "${FONT}"`;
      ctx.fillText('DOTARLES DO METY', cx, cy + 15);
    } else {
      ctx.fillStyle = '#ff5252';
      ctx.font = `28px "${FONT}"`;
      ctx.fillText('GAME OVER', cx, cy - 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = `12px "${FONT}"`;
      ctx.fillText(this._reasonText(this.config.state?.reason), cx, cy + 15);
    }

    if (this._isPromptVisible()) {
      ctx.fillStyle = '#90a4ae';
      ctx.font = `10px "${FONT}"`;
      ctx.fillText('NACISNIJ ENTER, ABY ZAGRAC PONOWNIE', cx, cy + 70);
    }
  }

  _isPromptVisible() {
    const elapsed =
      (performance.now() - this.#startedAt) % (BLINK_ON + BLINK_OFF);
    return elapsed < BLINK_ON;
  }

  _reasonText(reason) {
    if (reason === 'enemy') {
      return 'DOPADL CIE WROG!';
    }
    if (reason === 'fell') {
      return 'WPADLES W PRZEPASC!';
    }
    return '';
  }
}
