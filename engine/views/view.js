export class EngineView {
  update(entity) {
    // [to be implemented in inherited class]
  }

  onPressLeft(entity) {
    // [to be implemented in inherited class]
  }

  onPressRight(entity) {
    // [to be implemented in inherited class]
  }

  onPressUp(entity) {
    // [to be implemented in inherited class]
  }

  onPressDown(entity) {
    // [to be implemented in inherited class]
  }

  onPressAButton(entity) {
    // [to be implemented in inherited class]
  }

  onPressBButton(entity) {
    // [to be implemented in inherited class]
  }

  _applyBoundaries(entity, props) {
    const cfg = entity.config;
    let x = props.x ?? cfg.x;
    let y = props.y ?? cfg.y;
    // console.debug('EngineView > _applyBoundaries', { x, y });
    const world = cfg.world;
    const entityWidth = cfg.width;
    const entityHeight = cfg.height;

    const isOutOfLeft = x < 0;
    const isOutOfRight = x + entityWidth > world.width;
    const isOutOfTop = y < 0;
    const isOutOfBottom = y + entityHeight > world.height;

    if (isOutOfLeft) {
      x = 0;
    } else if (isOutOfRight) {
      x = world.width - entityWidth;
    }

    if (isOutOfTop) {
      y = 0;
    } else if (isOutOfBottom) {
      y = world.height - entityHeight;
    }

    return { x, y };
  }
}
