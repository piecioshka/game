import { Entity } from '@engine';

// A goomba that patrols horizontally. It bounces off the world edges and turns
// around at the edge of whatever surface it is standing on (so it never walks
// off a ledge), while gravity (applied by the side-view) keeps it grounded.
export class Enemy extends Entity {
  // Set to true once the player has touched this enemy: it freezes in place.
  stopped = false;

  constructor(props) {
    const { speed, ...rest } = props;
    super(rest);
    this.direction = speed >= 0 ? 1 : -1;
    this.speed = Math.abs(speed ?? 2);
  }

  update() {
    if (this.stopped) {
      // Touched by the player: stop patrolling (gravity/render still run).
      super.update();
      return;
    }

    const world = this.config.world;
    const { x, width } = this.config;
    let nextX = x + this.direction * this.speed;

    if (nextX <= 0) {
      nextX = 0;
      this.direction = 1;
    } else if (nextX + width >= world.width) {
      nextX = world.width - width;
      this.direction = -1;
    } else if (
      this._blockedByPlatform(nextX) ||
      this._wouldWalkOffLedge(nextX)
    ) {
      // A wall ("murek") in the way, or the edge of the surface: turn around.
      this.direction *= -1;
      nextX = x;
    }

    this.moveTo({ x: nextX });
    super.update();
  }

  // True when moving to `nextX` would push the enemy into the side of a
  // platform it is standing beside (i.e. it cannot pass through a wall).
  _blockedByPlatform(nextX) {
    const view = this.config.viewType;
    const platforms = view?.config.platforms ?? [];
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

  // True when the leading foot at `nextX` would no longer have a surface under
  // it (i.e. the enemy would step off the platform it is currently standing on).
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
      // Standing on the world floor - there is ground everywhere.
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
