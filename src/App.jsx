import React, { useState, useLayoutEffect } from 'react';

export default function App() {
  const [scale, setScale] = useState(1);
  const GAME_WIDTH = 960;
  const GAME_HEIGHT = 521;

  const updateScale = () => {
    const widthScale = window.innerWidth / GAME_WIDTH;
    const heightScale = window.innerHeight / GAME_HEIGHT;
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
          margin: 0; padding: 0; width: 100vw; height: 100vh;
          overflow: hidden; background-color: #000;
          display: flex; justify-content: center; align-items: center;
        }
        .game-container {
          width: ${GAME_WIDTH}px; height: ${GAME_HEIGHT}px;
          display: flex; justify-content: center; align-items: center;
        }
        iframe {
          width: ${GAME_WIDTH}px; height: ${GAME_HEIGHT}px; border: none;
          transform: scale(${scale}); transform-origin: center center;
          image-rendering: pixelated;
        }
      `}</style>
      <div className="game-container">
        <iframe src="/thrust/index.html" title="Thrust Legacy" scrolling="no" />
      </div>
    </>
  );
}