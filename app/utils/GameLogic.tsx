export interface Pacman {
  x: number;
  y: number;
  size: number;
}

export const updatePacmanPosition = (
  pacman: Pacman,
  direction: string,
  canvasSize: number,
  speed: number
) => {
  const { x, y, size } = pacman;

  if (direction === 'LEFT' && x - size / 2 > 0) {
    pacman.x -= speed;
  }
  if (direction === 'RIGHT' && x + size / 2 < canvasSize) {
    pacman.x += speed;
  }
  if (direction === 'UP' && y - size / 2 > 0) {
    pacman.y -= speed;
  }
  if (direction === 'DOWN' && y + size / 2 < canvasSize) {
    pacman.y += speed;
  }

  return pacman;
};

export const animatePacmanMouth = (
  mouthAngle: number,
  mouthDirection: number
): { mouthAngle: number; mouthDirection: number } => {
  mouthAngle += mouthDirection * 5;
  if (mouthAngle >= 45 || mouthAngle <= 10) {
    mouthDirection *= -1;
  }
  return { mouthAngle, mouthDirection };
};
