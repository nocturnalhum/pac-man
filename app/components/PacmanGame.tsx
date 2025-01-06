'use client';

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import {
  updatePacmanPosition,
  animatePacmanMouth,
  Pacman,
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

        p.setup = () => {
          p.createCanvas(1000, 1000);
        };

        p.draw = () => {
          p.background(10);

          // Animate mouth opening and closing
          const updatedMouth = animatePacmanMouth(mouthAngle, mouthDirection);
          mouthAngle = updatedMouth.mouthAngle;
          mouthDirection = updatedMouth.mouthDirection;

          pacman = updatePacmanPosition(pacman, direction, p.width, speed);

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
