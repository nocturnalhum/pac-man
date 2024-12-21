'use client';

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const PacmanGame: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically import p5 to avoid SSR issues
    import('p5').then((p5) => {
      const sketch = (p: p5) => {
        const pacmanX = 300;
        const pacmanY = 300;
        const pacmanSize = 50;

        p.setup = () => {
          p.createCanvas(1000, 1000);
        };

        p.draw = () => {
          p.background(10);

          // Draw Pac-man
          p.fill(255, 255, 0);

          p.arc(
            pacmanX,
            pacmanY,
            pacmanSize,
            pacmanSize,
            p.radians(30),
            p.radians(-30)
          );
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
