import React, { useState, useEffect, useLayoutEffect } from 'react';

export default function App() {
  const [scale, setScale] = useState(1);

  // The original game dimensions from thrust.css and thrust.js
  const GAME_WIDTH = 960;
  const GAME_HEIGHT = 521;

  // Calculate the scale factor to fit the window perfectly
  const updateScale = () => {
    const widthScale = window.innerWidth / GAME_WIDTH;
    const heightScale = window.innerHeight / GAME_HEIGHT;
    // Use 'Math.min' to fit the whole game without cropping, 
    // or 'Math.max' if you want it to fill the screen (with cropping)
    setScale(Math.min(widthScale, heightScale));
  };

  useLayoutEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .game-container {
          width: ${GAME_WIDTH}px;
          height: ${GAME_HEIGHT}px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        iframe {
          width: ${GAME_WIDTH}px;
          height: ${GAME_HEIGHT}px;
          border: none;
          transform: scale(${scale});
          transform-origin: center center;
          image-rendering: pixelated; /* Keeps the retro look sharp */
        }
      `}</style>

      <div className="game-container">
        <iframe
          src="/thrust/index.html"
          title="Thrust Legacy"
          scrolling="no"
        />
      </div>
    </>
  );
}