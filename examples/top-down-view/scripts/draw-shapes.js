// Pixel-art canvas drawers for the rocket game entities. Each shape is built
// from a grid of square "pixels" so everything keeps a consistent retro look,
// without needing binary image assets.

// Paints a sprite described as rows of single-character color keys onto the
// box {x, y, width, height}. A character missing from the palette (e.g. '.')
// is transparent.
function drawPixels(ctx, { x, y, width, height }, rows, palette) {
  const cols = Math.max(...rows.map((r) => r.length));
  const px = width / cols;
  const py = height / rows.length;
  for (let row = 0; row < rows.length; row += 1) {
    const line = rows[row];
    for (let col = 0; col < line.length; col += 1) {
      const color = palette[line[col]];
      if (!color) {
        continue;
      }
      ctx.fillStyle = color;
      // +1 avoids hairline gaps between pixels on fractional scales.
      ctx.fillRect(x + col * px, y + row * py, px + 1, py + 1);
    }
  }
}

const ROCKET = [
  '...WW...',
  '..WBBW..',
  '..WBBW..',
  '.WBGGBW.',
  '.WBGGBW.',
  '.WBBBBW.',
  'WWBBBBWW',
  'R.WBBW.R',
  'RR.FF.RR',
  '...FF...',
];
const ROCKET_PALETTE = {
  W: '#eceff1', // body
  B: '#90a4ae', // body shade
  G: '#42a5f5', // window
  R: '#ef5350', // fins
  F: '#ff7043', // flame
};

export function drawRocket(ctx, box) {
  drawPixels(ctx, box, ROCKET, ROCKET_PALETTE);
}

const ASTEROID = [
  '..AAAA..',
  '.AABBAA.',
  'AABAAABA',
  'ABAAAAAA',
  'AAAAABAA',
  'AABAAAAA',
  '.AAAABA.',
  '..AAAA..',
];
const ASTEROID_PALETTE = {
  A: '#8d6e63',
  B: '#5d4037', // craters
};

export function drawAsteroid(ctx, box) {
  drawPixels(ctx, box, ASTEROID, ASTEROID_PALETTE);
}

const CLOCK = [
  '..YYYY..',
  '.YYYYYY.',
  'YYHYYHYY',
  'YYHHHYYY',
  'YYHHHHYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..YYYY..',
];
const CLOCK_PALETTE = {
  Y: '#ffd54f',
  H: '#5d4037', // hands
};

export function drawClock(ctx, box) {
  drawPixels(ctx, box, CLOCK, CLOCK_PALETTE);
}

const DIAMOND = [
  '.LLLLLL.',
  'LDDDDDDL',
  '.DDDDDD.',
  '.LDDDDL.',
  '..DDDD..',
  '..LDDL..',
  '...DD...',
  '...LL...',
];
const DIAMOND_PALETTE = {
  D: '#26c6da',
  L: '#b2ebf2', // facets / highlights
};

export function drawDiamond(ctx, box) {
  drawPixels(ctx, box, DIAMOND, DIAMOND_PALETTE);
}
