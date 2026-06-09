import { EngineAssetsLoader } from '../internal/assets-loader';

/**
 * A tile-based map.
 *
 * Holds a 2D grid of tile ids and renders each cell either as a flat color
 * (via the `colors` legend) or as a loaded image (via the `assets` legend,
 * which takes precedence). Useful as a scene background or level layout.
 *
 * @example
 *   const map = new EngineMap({
 *     world,
 *     tileSize: 32,
 *     tiles: [
 *       [0, 0, 1],
 *       [1, 1, 1],
 *     ],
 *     colors: { 0: '#7cb342', 1: '#5d4037' },
 *   });
 *   map.render();
 */
export class EngineMap {
  config = {
    /**
     * @type {import('./world').EngineWorld|null}
     */
    world: null,
    /**
     * Grid of tile ids, row by row.
     * @type {Array<Array<string|number>>}
     */
    tiles: [],
    tileSize: 32,
    /**
     * Tile id -> fill color.
     * @type {Object<string|number, string>}
     */
    colors: {},
    /**
     * Tile id -> loaded asset id (takes precedence over `colors`).
     * @type {Object<string|number, string>}
     */
    assets: {},
  };

  constructor(props = {}) {
    Object.assign(this.config, props);
  }

  get rows() {
    return this.config.tiles.length;
  }

  get cols() {
    return this.config.tiles[0]?.length ?? 0;
  }

  get width() {
    return this.cols * this.config.tileSize;
  }

  get height() {
    return this.rows * this.config.tileSize;
  }

  /**
   * @returns tile id at the given column/row (undefined when out of bounds)
   */
  getTile(col, row) {
    return this.config.tiles[row]?.[col];
  }

  render() {
    const { world, tiles, tileSize, colors, assets } = this.config;
    const ctx = world?.context;
    if (!ctx) {
      return;
    }

    tiles.forEach((columns, row) => {
      columns.forEach((id, col) => {
        const x = col * tileSize;
        const y = row * tileSize;

        const assetId = assets[id];
        if (assetId) {
          const img = EngineAssetsLoader.getLoadedAsset(assetId);
          if (img) {
            ctx.drawImage(img, x, y, tileSize, tileSize);
          }
          return;
        }

        const color = colors[id];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      });
    });
  }
}
