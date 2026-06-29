import { Entity } from '@engine';
import { drawSlime, drawSlimeFlat } from '../draw-shapes';

// A slime that patrols horizontally between two x bounds and turns around at
// its limits, a wall, or a platform edge. Gravity keeps it grounded.
export class Enemy extends Entity {
  stopped = false;
  squashed = false;

  constructor(props) {
    const { speed, minX, maxX, ...rest } = props;
    super(rest);
    this.direction = speed >= 0 ? 1 : -1;
    this.speed = Math.abs(speed ?? 1.5);
    this.minX = minX ?? 0;
    this.maxX = maxX ?? Infinity;
  }

  update() {
    if (this.stopped) {
      super.update();
      return;
    }

    const { x, width } = this.config;
    let nextX = x + this.direction * this.speed;

    if (nextX <= this.minX) {
      nextX = this.minX;
      this.direction = 1;
    } else if (nextX + width >= this.maxX) {
      nextX = this.maxX - width;
      this.direction = -1;
    } else if (
      this._blockedByPlatform(nextX) ||
      this._wouldWalkOffLedge(nextX)
    ) {
      this.direction *= -1;
      nextX = x;
    }

    this.moveTo({ x: nextX });
    super.update();
  }

  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    if (this.squashed) {
      drawSlimeFlat(ctx, this.config);
    } else {
      drawSlime(ctx, this.config);
    }
  }

  _blockedByPlatform(nextX) {
    const platforms = this.config.viewType?.config.platforms ?? [];
    const { x, y, width, height } = this.config;
    return platforms.some((platform) => {
      const overlapY =
        y + height > platform.y && y < platform.y + platform.height;
      if (!overlapY) {
        return false;
      }
      const wasLeft = x + width <= platform.x;
      const wasRight = x >= platform.x + platform.width;
      const hitsFromLeft = wasLeft && nextX + width > platform.x;
      const hitsFromRight = wasRight && nextX < platform.x + platform.width;
      return hitsFromLeft || hitsFromRight;
    });
  }

  _wouldWalkOffLedge(nextX) {
    const view = this.config.viewType;
    const platforms = view?.config.platforms ?? [];
    if (platforms.length === 0) {
      return false;
    }
    const { y, width, height } = this.config;
    const footY = y + height;
    const isOnGround = footY >= (view.config.worldHeight ?? footY);
    if (isOnGround) {
      return false;
    }
    const leadingFootX = this.direction > 0 ? nextX + width : nextX;
    return !platforms.some((platform) => {
      const onTop = Math.abs(footY - platform.y) <= 2;
      const withinX =
        leadingFootX >= platform.x &&
        leadingFootX <= platform.x + platform.width;
      return onTop && withinX;
    });
  }
}
