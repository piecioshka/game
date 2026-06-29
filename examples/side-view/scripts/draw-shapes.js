// Canvas drawers for the side-view game props that have no image asset.

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

// Classic toadstool: red cap, white spots, pale stem. 11x11 grid keeps the
// 66x66 footprint square so the sprite is not stretched.
const MUSHROOM = [
  '...RRRRR...',
  '..RRRRRRR..',
  '.RRWRRRWRR.',
  '.RRRRRRRRR.',
  'RRWRRRRRWRR',
  'RRRRRRRRRRR',
  'RRRWRRRWRRR',
  '.RRRRRRRRR.',
  '...SSSSS...',
  '...STTTS...',
  '...SSSSS...',
];
const MUSHROOM_PALETTE = {
  R: '#e53935', // cap
  W: '#ffffff', // spots
  S: '#d7a86e', // stem shade
  T: '#ffe0b2', // stem fill
};

export function drawMushroom(ctx, box) {
  drawPixels(ctx, box, MUSHROOM, MUSHROOM_PALETTE);
}

// A puffy cloud: white body ('C') with a darker blue outline ('O'). 14x8 grid.
const CLOUD = [
  '......OOOO....',
  '....OOCCCCOO..',
  '...OCCCCCCCCO.',
  '.OOCCCCCCCCCCO',
  'OCCCCCCCCCCCCO',
  'OCCCCCCCCCCCCO',
  'OCCCCCCCCCCCCO',
  '.OOOOOOOOOOOO.',
];
const CLOUD_PALETTE = {
  C: '#ffffff', // body
  O: '#3a48b8', // outline
};

export function drawCloud(ctx, box) {
  drawPixels(ctx, box, CLOUD, CLOUD_PALETTE);
}

export function drawBrick(ctx, { x, y, width, height }) {
  ctx.fillStyle = '#8d5524';
  ctx.fillRect(x, y, width, height);

  // Brick pattern
  ctx.strokeStyle = '#5d3a17';
  ctx.lineWidth = 2;
  const brickH = 20;
  const brickW = 40;
  for (let row = 0; row * brickH < height; row += 1) {
    const offset = row % 2 === 0 ? 0 : brickW / 2;
    const ry = y + row * brickH;
    ctx.beginPath();
    ctx.moveTo(x, ry);
    ctx.lineTo(x + width, ry);
    ctx.stroke();
    for (let bx = x + offset; bx < x + width; bx += brickW) {
      ctx.beginPath();
      ctx.moveTo(bx, ry);
      ctx.lineTo(bx, Math.min(ry + brickH, y + height));
      ctx.stroke();
    }
  }
}
