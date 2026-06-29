import { CollisionDetector } from '../internal/collision-detector';
import { EntitiesManager } from '../internal/entities-manager';

export class EngineScene extends EntitiesManager {
  config = {
    /**
     * @type {import('./world').EngineWorld|null}
     */
    world: null,
    /**
     * @type {import('../views/view').EngineView|null}
     */
    viewType: null,
  };

  collision = new CollisionDetector();

  constructor(props) {
    super();
    Object.assign(this.config, props);
  }

  setBackgroundColor(color) {
    const world = this.config.world;
    const ctx = world.context;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, world.width, world.height);
  }

  setup() {
    // [to be implement in inherited classes]
  }

  render() {
    this.runOnAllEntities('render');
  }

  update() {
    this.runOnAllEntities('update');
    this.collision.update();
  }

  destroy() {
    // console.debug(
    //   `[❌] EngineScene > destroy [${this.__proto__.constructor.name}]`,
    // );
    this.runOnAllEntities('destroy');
    this.destroyEntities();
    this.collision.reset();
  }
}
