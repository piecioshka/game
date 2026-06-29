import { describe, expect, it } from 'vitest';
import { EngineMap } from './map';

describe('EngineMap', () => {
  const map = new EngineMap({
    tiles: [
      [0, 1, 2],
      [3, 4, 5],
    ],
    tileSize: 10,
  });

  it('reports grid dimensions in tiles and pixels', () => {
    expect(map.rows).toBe(2);
    expect(map.cols).toBe(3);
    expect(map.width).toBe(30);
    expect(map.height).toBe(20);
  });

  it('reads tiles by column/row', () => {
    expect(map.getTile(0, 0)).toBe(0);
    expect(map.getTile(2, 1)).toBe(5);
  });

  it('returns undefined for out-of-bounds tiles', () => {
    expect(map.getTile(99, 99)).toBe(undefined);
  });

  it('handles an empty map gracefully', () => {
    const empty = new EngineMap({ tiles: [] });
    expect(empty.rows).toBe(0);
    expect(empty.cols).toBe(0);
    expect(empty.width).toBe(0);
  });
});
