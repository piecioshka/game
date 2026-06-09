import { EngineScene, ArcadeEntity, Countdown, KEYS } from '@engine';

export class BoardScene extends EngineScene {
  countdown = new Countdown({ duration: 30_000 });

  setup() {
    const { world, viewType } = this.config;

    this.countdown.start();
    this.countdown.on('complete', () => {
      world.startScene('over');
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
    this.setBackgroundColor('#a7e1fd');
    super.update();
    this.countdown.update();
    this._renderCountdown();
  }

  _renderCountdown() {
    const world = this.config.world;
    const ctx = world.context;
    const seconds = (this.countdown.getRemaining() / 1000).toFixed(1);

    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#293d51';
    ctx.fillText(`⏱ ${seconds}s`, world.width - 16, 36);
  }
}
