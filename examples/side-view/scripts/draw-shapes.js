// Canvas drawers for the side-view game props that have no image asset.

export function drawMushroom(ctx, { x, y, width, height }) {
  const capHeight = height * 0.55;
  const cx = x + width / 2;

  // Cap
  ctx.fillStyle = '#e53935';
  ctx.beginPath();
  ctx.moveTo(x, y + capHeight);
  ctx.quadraticCurveTo(x, y, cx, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + capHeight);
  ctx.closePath();
  ctx.fill();

  // Spots
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, y + capHeight * 0.5, width * 0.12, 0, Math.PI * 2);
  ctx.arc(x + width * 0.25, y + capHeight * 0.7, width * 0.08, 0, Math.PI * 2);
  ctx.arc(x + width * 0.75, y + capHeight * 0.7, width * 0.08, 0, Math.PI * 2);
  ctx.fill();

  // Stem
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(x + width * 0.3, y + capHeight, width * 0.4, height - capHeight);
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
