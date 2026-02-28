import React, { useRef, useEffect } from 'react';

export default function App() {
  const iframeRef = useRef(null);

  // Proactive integration: If you need to interface with the game later
  // (e.g., tracking high scores in a React Context), you can attach a 
  // window.postMessage listener here without touching the legacy code.
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'THRUST_EVENT') {
        console.log('Event from legacy game:', event.data.payload);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#000', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <iframe
        ref={iframeRef}
        src="/thrust/index.html"
        style={{ 
          width: '960px', 
          height: '500px', 
          border: 'none',
          overflow: 'hidden'
        }}
        title="Thrust Classic"
      />
    </div>
  );
}