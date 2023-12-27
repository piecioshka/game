import { EngineScene, Entity } from '@engine';

export class OverScene extends EngineScene {
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

  update() {
    this.setBackgroundColor('#293d51');
    super.update();
  }
}
