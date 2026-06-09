import { EngineScene, ArcadeEntity, SpriteAnimation, KEYS } from '@engine';

export class BoardScene extends EngineScene {
  setup() {
    const { world, viewType } = this.config;

    const player = new ArcadeEntity({
      world,
      viewType,
      name: 'Player',
      assetId: 'mario',
      x: 100,
      y: -104,
      width: 82,
      height: 100,

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
      assetId: 'goomba',
      x: 500,
      y: -104,
      width: 66,
      height: 66,
    });

    // INFO: Animate the goomba by cycling its sprite frames during rendering
    enemy.setAnimation(
      new SpriteAnimation({
        frames: ['goomba', 'goomba2', 'goomba3'],
        fps: 6,
      }),
    );

    this.addEntity(enemy);

    const enemies = this.getEntities().filter(
      (x) => x.config.name !== player.config.name,
    );

    const isPlayerCollideWithEnemyFromBottom = ({ type, who }) =>
      ['top-left', 'top-right'].includes(type) && who.config.name === 'Enemy';

    this.collision.overlap(player, enemies, (entity, options) => {
      if (isPlayerCollideWithEnemyFromBottom(options)) {
        entity.destroy();
        this.removeEntity(entity);
      }
    });
  }

  render() {
    // console.debug('BoardScene > render');
    super.render();
  }

  update() {
    // console.debug('BoardScene > update');
    this.setBackgroundColor('#a7e1fd');
    super.update();
    this.collision.update();
  }
}
