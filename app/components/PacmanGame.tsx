'use client';

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const PacmanGame: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically import p5 to avoid SSR issues
    import('p5').then((p5) => {
      const sketch = (p: p5) => {
        let pacmanX = 300;
        let pacmanY = 300;
        const pacmanSize = 50;
        const speed = 2;
        let direction = 'RIGHT'; // Initial direction
        let isMoving = false; // Check if Pac-Man is moving

        p.setup = () => {
          p.createCanvas(1000, 1000);
        };

        p.draw = () => {
          p.background(10);

          if (isMoving) {
            // Move Pac-Man based on direction
            if (direction === 'LEFT') pacmanX -= speed;
            if (direction === 'RIGHT') pacmanX += speed;
            if (direction === 'UP') pacmanY -= speed;
            if (direction === 'DOWN') pacmanY += speed;
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
          p.arc(0, 0, pacmanSize, pacmanSize, p.radians(30), p.radians(-30));
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
