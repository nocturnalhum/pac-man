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

  if (direction === 'LEFT') {
    pacman.x -= speed;
    if (pacman.x + size / 2 < 0) {
      // Wrap around to the right
      pacman.x = canvasSize + size / 2;
    }
  }
  if (direction === 'RIGHT') {
    pacman.x += speed;
    if (x - size / 2 > canvasSize) {
      // Wrap around to the left
      pacman.x = -size / 2;
    }
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

export interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
  corners: [number, number, number, number];
}

export const isCollidingWithWalls = (
  pacman: Pacman,
  walls: Wall[]
): boolean => {
  return walls.some((wall) => {
    const pacmanLeft = pacman.x - pacman.size / 2;
    const pacmanRight = pacman.x + pacman.size / 2;
    const pacmanTop = pacman.y - pacman.size / 2;
    const pacmanBottom = pacman.y + pacman.size / 2;

    const wallLeft = wall.x;
    const wallRight = wall.x + wall.width;
    const wallTop = wall.y;
    const wallBottom = wall.y + wall.height;

    return (
      pacmanRight > wallLeft &&
      pacmanLeft < wallRight &&
      pacmanBottom > wallTop &&
      pacmanTop < wallBottom
    );
  });
};
