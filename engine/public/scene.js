import { EntitiesManager } from '../internal/entities-manager';

export class EngineScene extends EntitiesManager {
  config = {
    /**
     * @type {import('./world').EngineWorld|null}
     */
    world: null,
  };

  constructor(props) {
    super();
    this.config.world = props.world;
  }

  setBackgroundColor(color) {
    const world = this.config.world;
    const ctx = world.context;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, world.width, world.height);
  }

  setup() {
    this.runOnAllEntities('setup');
  }

  render() {
    this.runOnAllEntities('render');
  }

  update() {
    this.runOnAllEntities('update');
  }

  destroy() {
    // console.debug(
    //   `[❌] EngineScene > destroy [${this.__proto__.constructor.name}]`,
    // );
    this.runOnAllEntities('destroy');
    this.destroyEntities();
  }
}
