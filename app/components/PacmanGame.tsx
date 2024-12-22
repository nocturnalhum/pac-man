'use client';

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const PacmanGame: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically import p5 to avoid SSR issues
    import('p5').then((p5) => {
      const sketch = (p: p5) => {
        const PACMAN_SIZE = 40;
        const SPEED = 3;
        const MOUTH_SPEED = 5;
        let pacmanX = 300;
        let pacmanY = 300;
        let direction = 'RIGHT'; // Initial direction
        let isMoving = false; // Check if Pac-Man is moving
        let mouthAngle = 30; // Initial mouth angle
        let mouthDirection = 1; // 1 for opening, -1 for closing

        p.setup = () => {
          p.createCanvas(1000, 1000);
        };

        p.draw = () => {
          p.background(10);

          if (isMoving) {
            // Animate mouth opening and closing
            mouthAngle += mouthDirection * MOUTH_SPEED;
            if (mouthAngle >= 45 || mouthAngle <= 5) {
              mouthDirection *= -1; // Reverse direction
            }

            // Move Pac-Man based on direction with collision detection:
            if (direction === 'LEFT' && pacmanX - PACMAN_SIZE / 2 > 0)
              pacmanX -= SPEED;
            if (direction === 'RIGHT' && pacmanX + PACMAN_SIZE / 2 < p.width)
              pacmanX += SPEED;
            if (direction === 'UP' && pacmanY - PACMAN_SIZE / 2 > 0)
              pacmanY -= SPEED;
            if (direction === 'DOWN' && pacmanY + PACMAN_SIZE / 2 < p.height)
              pacmanY += SPEED;
          }

          // Draw Pac-Man with rotation based on direction
          p.push();
          p.translate(pacmanX, pacmanY); // Move to Pac-Man's position
          if (direction === 'RIGHT') p.rotate(0);
          if (direction === 'DOWN') p.rotate(p.HALF_PI);
          if (direction === 'LEFT') p.rotate(p.PI);
          if (direction === 'UP') p.rotate(-p.HALF_PI);

          // Draw Pac-Man
          p.fill(255, 255, 0);
          p.arc(
            0,
            0,
            PACMAN_SIZE,
            PACMAN_SIZE,
            p.radians(mouthAngle),
            p.radians(360 - mouthAngle)
          );
          p.pop();
        };

        p.keyPressed = () => {
          // Update direction and start moving
          if (p.keyCode === p.LEFT_ARROW) direction = 'LEFT';
          if (p.keyCode === p.RIGHT_ARROW) direction = 'RIGHT';
          if (p.keyCode === p.UP_ARROW) direction = 'UP';
          if (p.keyCode === p.DOWN_ARROW) direction = 'DOWN';

          isMoving = true; // Start moving on key press
        };

        p.keyReleased = () => {
          // Stop moving when the key is released
          isMoving = false;
        };
      };

      // Check if sketchRef.current is not null before passing it
      if (sketchRef.current) {
        const canvas = new p5.default(sketch, sketchRef.current);

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
