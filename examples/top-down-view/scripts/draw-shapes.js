// Lightweight canvas drawers for the rocket game entities. Keeping them as
// plain functions lets both the controllable Rocket (ArcadeEntity) and the
// FallingEntity (Entity) reuse the same look without binary image assets.

export function drawRocket(ctx, { x, y, width, height }) {
  const cx = x + width / 2;

  // Exhaust flame
  ctx.fillStyle = '#ff7043';
  ctx.beginPath();
  ctx.moveTo(x + width * 0.32, y + height * 0.92);
  ctx.lineTo(cx, y + height * 1.18);
  ctx.lineTo(x + width * 0.68, y + height * 0.92);
  ctx.closePath();
  ctx.fill();

  // Body
  ctx.fillStyle = '#eceff1';
  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(x + width * 0.82, y + height * 0.7);
  ctx.lineTo(x + width * 0.82, y + height * 0.92);
  ctx.lineTo(x + width * 0.18, y + height * 0.92);
  ctx.lineTo(x + width * 0.18, y + height * 0.7);
  ctx.closePath();
  ctx.fill();

  // Fins
  ctx.fillStyle = '#ef5350';
  ctx.beginPath();
  ctx.moveTo(x + width * 0.18, y + height * 0.7);
  ctx.lineTo(x, y + height * 0.92);
  ctx.lineTo(x + width * 0.18, y + height * 0.92);
  ctx.closePath();
  ctx.moveTo(x + width * 0.82, y + height * 0.7);
  ctx.lineTo(x + width, y + height * 0.92);
  ctx.lineTo(x + width * 0.82, y + height * 0.92);
  ctx.closePath();
  ctx.fill();

  // Window
  ctx.fillStyle = '#42a5f5';
  ctx.beginPath();
  ctx.arc(cx, y + height * 0.45, width * 0.15, 0, Math.PI * 2);
  ctx.fill();
}

export function drawAsteroid(ctx, { x, y, width, height }) {
  const r = Math.min(width, height) / 2;
  const cx = x + width / 2;
  const cy = y + height / 2;

  ctx.fillStyle = '#8d6e63';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#6d4c41';
  ctx.beginPath();
  ctx.arc(cx - r * 0.3, cy - r * 0.25, r * 0.28, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.35, cy + r * 0.3, r * 0.18, 0, Math.PI * 2);
  ctx.fill();
}

export function drawClock(ctx, { x, y, width, height }) {
  const r = Math.min(width, height) / 2;
  const cx = x + width / 2;
  const cy = y + height / 2;

  ctx.fillStyle = '#ffd54f';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#f57f17';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy - r * 0.6);
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + r * 0.45, cy);
  ctx.stroke();
}

export function drawDiamond(ctx, { x, y, width, height }) {
  const cx = x + width / 2;
  const shoulder = y + height * 0.35;

  ctx.fillStyle = '#26c6da';
  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(x + width, shoulder);
  ctx.lineTo(cx, y + height);
  ctx.lineTo(x, shoulder);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#b2ebf2';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, shoulder);
  ctx.lineTo(x + width, shoulder);
  ctx.moveTo(cx, y);
  ctx.lineTo(cx, y + height);
  ctx.stroke();
}
