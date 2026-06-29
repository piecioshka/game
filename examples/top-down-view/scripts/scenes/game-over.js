import { EngineScene } from '@engine';

const KEY_ENTER = 13;
const KEY_SPACE = 32;

export class GameOverScene extends EngineScene {
  #removeListeners = null;

  setup() {
    const world = this.config.world;
    const restart = () => world.startScene('board');

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
    ctx.font = 'bold 52px monospace';
    ctx.fillText('GAME OVER', cx, cy - 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = '22px monospace';
    ctx.fillText(this._reasonText(state.reason), cx, cy);

    ctx.fillStyle = '#ffd54f';
    ctx.font = 'bold 30px monospace';
    ctx.fillText(`Zebrane diamenty: ${state.score}`, cx, cy + 45);

    ctx.fillStyle = '#90a4ae';
    ctx.font = '16px monospace';
    ctx.fillText(
      'Naciśnij ENTER lub kliknij, aby zagrać ponownie',
      cx,
      cy + 90,
    );
  }

  _reasonText(reason) {
    if (reason === 'crash') {
      return 'Rozbiłeś się o asteroidę!';
    }
    if (reason === 'timeout') {
      return 'Czas się skończył!';
    }
    return '';
  }
}
