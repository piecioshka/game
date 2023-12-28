import { EngineScene, Entity } from '@engine';

export class GameOverScene extends EngineScene {
  setup() {
    const world = this.config.world;

    const restartButton = new Entity({
      world,
      name: 'RestartButton',
      assetId: 'characterA',
      x: (world.width - 100) / 2,
      y: (world.height - 50) / 2,
      width: 100,
      height: 50,
    });

    restartButton.on('click', () => {
      world.startScene('board');
    });

    this.addEntity(restartButton);
  }

  render() {
    // console.debug('GameOverScene > render');
    super.render();
  }

  update() {
    // console.debug('GameOverScene > update');
    this.setBackgroundColor('#293d51');
    super.update();
  }
}
