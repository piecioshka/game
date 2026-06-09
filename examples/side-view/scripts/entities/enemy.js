import { Entity } from '@engine';

// A goomba that patrols horizontally and bounces off the world edges.
export class Enemy extends Entity {
  constructor(props) {
    const { speed, ...rest } = props;
    super(rest);
    this.direction = speed >= 0 ? 1 : -1;
    this.speed = Math.abs(speed ?? 2);
  }

  update() {
    const world = this.config.world;
    const { x, width } = this.config;
    let nextX = x + this.direction * this.speed;

    if (nextX <= 0) {
      nextX = 0;
      this.direction = 1;
    } else if (nextX + width >= world.width) {
      nextX = world.width - width;
      this.direction = -1;
    }

    this.moveTo({ x: nextX });
    super.update();
  }
}
