import { ArcadeEntity } from '@engine';
import { drawRocket } from '../draw-shapes';

// Player-controlled rocket. Reuses ArcadeEntity (keyboard + view movement)
// and only overrides how it draws itself.
export class Rocket extends ArcadeEntity {
  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    drawRocket(ctx, this.config);
  }
}
