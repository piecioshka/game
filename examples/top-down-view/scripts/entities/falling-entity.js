import { Entity } from '@engine';
import { drawAsteroid, drawClock, drawDiamond } from '../draw-shapes';

const RENDERERS = {
  asteroid: drawAsteroid,
  watch: drawClock,
  diamond: drawDiamond,
};

// An item that falls from the top of the board towards the rocket.
export class FallingEntity extends Entity {
  constructor(props) {
    const { kind, speed, ...rest } = props;
    super(rest);
    this.kind = kind;
    this.speed = speed ?? 2;
  }

  update() {
    this.moveTo({ y: this.config.y + this.speed });
    super.update();
  }

  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    RENDERERS[this.kind]?.(ctx, this.config);
  }
}
