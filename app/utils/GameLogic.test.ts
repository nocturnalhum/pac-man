import { updatePacmanPosition } from './GameLogic';

describe('updatePacmanPosition', () => {
  const canvasSize = 1000;
  const speed = 5;

  it('moves Pac-Man left', () => {
    const pacman = { x: 500, y: 500, size: 50 };
    const updatedPacman = updatePacmanPosition(
      pacman,
      'LEFT',
      canvasSize,
      speed
    );
    expect(updatedPacman.x).toBe(495);
    expect(updatedPacman.y).toBe(500);
  });

  it('wraps Pac-Man from left edge to right', () => {
    const pacman = { x: -26, y: 500, size: 50 };
    const updatedPacman = updatePacmanPosition(
      pacman,
      'LEFT',
      canvasSize,
      speed
    );
    expect(updatedPacman.x).toBe(1000 + pacman.size / 2);
    expect(updatedPacman.y).toBe(500);
  });

  it('moves Pac-Man right', () => {
    const pacman = { x: 500, y: 500, size: 50 };
    const updatedPacman = updatePacmanPosition(
      pacman,
      'RIGHT',
      canvasSize,
      speed
    );
    expect(updatedPacman.x).toBe(505);
    expect(updatedPacman.y).toBe(500);
  });

  it('wraps Pac-Man from right edge to left', () => {
    const pacman = { x: 1026, y: 500, size: 50 };
    const updatedPacman = updatePacmanPosition(
      pacman,
      'RIGHT',
      canvasSize,
      speed
    );
    expect(updatedPacman.x).toBe(-pacman.size / 2);
    expect(updatedPacman.y).toBe(500);
  });

  it('moves Pac-Man up', () => {
    const pacman = { x: 500, y: 500, size: 50 };
    const updatedPacman = updatePacmanPosition(pacman, 'UP', canvasSize, speed);
    expect(updatedPacman.x).toBe(500);
    expect(updatedPacman.y).toBe(495);
  });

  it('moves Pac-Man down', () => {
    const pacman = { x: 500, y: 500, size: 50 };
    const updatedPacman = updatePacmanPosition(
      pacman,
      'DOWN',
      canvasSize,
      speed
    );
    expect(updatedPacman.x).toBe(500);
    expect(updatedPacman.y).toBe(505);
  });
});
