import { ArcadeEntity } from '@engine';
import { drawHero } from '../draw-shapes';

// The player-controlled hero. Reuses ArcadeEntity (keyboard + side-view
// gravity/jumping) and only overrides how it draws itself.
export class Hero extends ArcadeEntity {
  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    drawHero(ctx, this.config);
  }
}
