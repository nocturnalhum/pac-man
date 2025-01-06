'use client';

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import {
  updatePacmanPosition,
  animatePacmanMouth,
  isCollidingWithWalls,
  Pacman,
  Wall,
} from '../utils/GameLogic';
import { handleKeyPress } from '../utils/Controls';

const PacmanGame: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically import p5 to avoid SSR issues
    import('p5').then((p5) => {
      const sketch = (p: p5) => {
        let pacman: Pacman = {
          x: 300,
          y: 300,
          size: 50,
        };
        const speed = 2;
        let direction = 'RIGHT'; // Initial direction

        let mouthAngle = 30; // Initial mouth angle
        let mouthDirection = 1; // 1 for opening, -1 for closing

        // Define walls
        const walls: Wall[] = [
          // Top
          {
            x: 0,
            y: 0,
            width: 1000,
            height: 20,
            corners: [10, 10, 10, 10],
          },
          // Left
          {
            x: 0,
            y: 0,
            width: 20,
            height: 460,
            corners: [10, 10, 10, 10],
          },
          {
            x: 0,
            y: 540,
            width: 20,
            height: 460,
            corners: [10, 10, 10, 10],
          },
          // Right
          {
            x: 980,
            y: 0,
            width: 20,
            height: 460,
            corners: [10, 10, 10, 10],
          },
          {
            x: 980,
            y: 540,
            width: 20,
            height: 460,
            corners: [10, 10, 10, 10],
          },
          // Bottom
          {
            x: 200,
            y: 200,
            width: 600,
            height: 20,
            corners: [10, 10, 10, 10],
          },
          {
            x: 500,
            y: 200,
            width: 20,
            height: 200,
            corners: [10, 10, 10, 10],
          },
          {
            x: 100,
            y: 700,
            width: 800,
            height: 20,
            corners: [10, 10, 10, 10],
          },
        ];

        p.setup = () => {
          p.createCanvas(1000, 1000);
        };

        p.draw = () => {
          p.background(10);

          // Draw walls

          walls.forEach((wall) => {
            p.noStroke();
            p.fill(100, 100, 255);
            p.rect(wall.x, wall.y, wall.width, wall.height, ...wall.corners);
          });
          walls.forEach((wall) => {
            p.noStroke();
            p.fill(10);
            p.rect(
              wall.x + 2,
              wall.y + 2,
              wall.width - 5,
              wall.height - 5,
              ...wall.corners
            );
          });

          // Re-enable stroke for other elements
          p.stroke(0); // Restore stroke for other elements
          p.strokeWeight(1); // Optional: set stroke weight

          // Animate mouth opening and closing
          const updatedMouth = animatePacmanMouth(mouthAngle, mouthDirection);
          mouthAngle = updatedMouth.mouthAngle;
          mouthDirection = updatedMouth.mouthDirection;

          // Save current position
          const previousPosition = { ...pacman };

          // Update Pac-Man's position
          pacman = updatePacmanPosition(pacman, direction, p.width, speed);

          // Check for collisions with walls
          if (isCollidingWithWalls(pacman, walls)) {
            pacman = previousPosition; // Revert to previous position
          }

          // Draw Pac-Man with rotation based on direction
          p.push();
          p.translate(pacman.x, pacman.y); // Move to Pac-Man's position
          if (direction === 'RIGHT') p.rotate(0);
          if (direction === 'DOWN') p.rotate(p.HALF_PI);
          if (direction === 'LEFT') p.rotate(p.PI);
          if (direction === 'UP') p.rotate(-p.HALF_PI);

          // Draw Pac-Man
          p.fill(255, 255, 0);
          p.arc(
            0,
            0,
            pacman.size,
            pacman.size,
            p.radians(mouthAngle),
            p.radians(360 - mouthAngle)
          );
          p.pop();
        };

        p.keyPressed = () => {
          // Update direction and start moving
          direction = handleKeyPress(p.keyCode, direction);
        };
      };

      // Check if sketchRef.current is not null before passing it
      if (sketchRef.current) {
        const canvas = new p5.default(sketch, sketchRef.current as HTMLElement);

        // Cleanup the p5 instance when the component unmounts
        return () => {
          if (canvas) {
            canvas.remove();
          }
        };
      }
    });
  }, []);

  return <div ref={sketchRef} />;
};

export default PacmanGame;
