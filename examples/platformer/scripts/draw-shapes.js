// Pixel-art canvas drawers for the platformer. Each shape is built from a grid
// of square "pixels" so everything keeps a consistent retro, blocky look.

// Paints a sprite described as rows of single-character color keys onto the
// box {x, y, width, height}. A space (or '.') means transparent.
function drawPixels(ctx, { x, y, width, height }, rows, palette) {
  const cols = Math.max(...rows.map((r) => r.length));
  const px = width / cols;
  const py = height / rows.length;
  for (let row = 0; row < rows.length; row += 1) {
    const line = rows[row];
    for (let col = 0; col < line.length; col += 1) {
      const key = line[col];
      const color = palette[key];
      if (!color) {
        continue;
      }
      ctx.fillStyle = color;
      // +1 avoids hairline gaps between pixels on fractional scales.
      ctx.fillRect(x + col * px, y + row * py, px + 1, py + 1);
    }
  }
}

const HERO = [
  '..HHHH..',
  '.HHHHHH.',
  '.SSFFSS.',
  '.SFFFFS.',
  '.SSFFSS.',
  '..BBBB..',
  '.BBBBBB.',
  'BB.BB.BB',
  'B..BB..B',
];
const HERO_PALETTE = {
  H: '#2e7d32', // helmet
  S: '#1b5e20', // helmet shade
  F: '#ffcc80', // face
  B: '#1565c0', // body
};

export function drawHero(ctx, box) {
  drawPixels(ctx, box, HERO, HERO_PALETTE);
}

const SLIME = [
  '........',
  '..XXXX..',
  '.XXXXXX.',
  'XXXXXXXX',
  'XEEXXEEX',
  'XXXXXXXX',
  'XX.XX.XX',
];
const SLIME_PALETTE = {
  X: '#8e24aa',
  E: '#ffffff', // eyes
};

export function drawSlime(ctx, box) {
  drawPixels(ctx, box, SLIME, SLIME_PALETTE);
}

// A squashed slime (after being stomped).
const SLIME_FLAT = [
  '........',
  '........',
  '........',
  '........',
  '.XXXXXX.',
  'XXEXXEXX',
  'XXXXXXXX',
];

export function drawSlimeFlat(ctx, box) {
  drawPixels(ctx, box, SLIME_FLAT, SLIME_PALETTE);
}

// A single ground/platform tile: brick with a grass cap when `top` is set.
export function drawTile(ctx, { x, y, width, height }, top = false) {
  ctx.fillStyle = '#8d5524';
  ctx.fillRect(x, y, width, height);

  // brick seams
  ctx.fillStyle = '#6d3f17';
  const brickH = 16;
  const brickW = 32;
  for (let ry = 0; ry < height; ry += brickH) {
    ctx.fillRect(x, y + ry, width, 2);
    const offset = (ry / brickH) % 2 === 0 ? 0 : brickW / 2;
    for (let bx = offset; bx < width; bx += brickW) {
      ctx.fillRect(x + bx, y + ry, 2, brickH);
    }
  }

  if (top) {
    ctx.fillStyle = '#43a047';
    ctx.fillRect(x, y, width, 8);
    ctx.fillStyle = '#2e7d32';
    ctx.fillRect(x, y + 8, width, 3);
  }
}

// The goal flag at the end of the level.
export function drawGoal(ctx, { x, y, width, height }) {
  const poleW = Math.max(4, width * 0.12);
  ctx.fillStyle = '#cfd8dc';
  ctx.fillRect(x + width / 2 - poleW / 2, y, poleW, height);

  // flag
  ctx.fillStyle = '#e53935';
  const flagW = width * 0.55;
  const flagH = height * 0.28;
  ctx.fillRect(x + width / 2, y + 6, flagW, flagH);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + width / 2 + flagW * 0.55, y + 6 + flagH * 0.3, 6, 6);

  // base knob
  ctx.fillStyle = '#ffd54f';
  ctx.fillRect(x + width / 2 - poleW, y - 6, poleW * 2, 8);
}

// A blocky cloud.
export function drawCloud(ctx, { x, y, width, height }) {
  const u = width / 6;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + u, y + height * 0.4, u * 4, height * 0.6);
  ctx.fillRect(x + u * 1.5, y + height * 0.15, u, height * 0.85);
  ctx.fillRect(x + u * 2.5, y, u * 1.5, height);
  ctx.fillRect(x + u * 4, y + height * 0.25, u, height * 0.75);
}
