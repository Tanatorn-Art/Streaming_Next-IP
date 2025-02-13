'use client';
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ใช้ dynamic import ใน client-side เท่านั้น
      import('jsmpeg').then((module) => {
        const Jsmpeg = module.default;

        // WebSocket connections for each camera
        const websocket1 = new WebSocket('ws://10.35.105.35:9999');
        const websocket2 = new WebSocket('ws://10.35.105.35:1000');
        const websocket3 = new WebSocket('ws://10.35.105.35:1100');
        const websocket4 = new WebSocket('ws://10.35.105.35:1200');

        // Set up WebSocket connection and player for each camera
        const setupWebSocket = (websocket: WebSocket, cameraId: string) => {
          websocket.onopen = () => {
            console.log(`WebSocket connected for ${cameraId}`);
          };
          websocket.onerror = (error) => {
            console.error(`WebSocket error for ${cameraId}:`, error);
          };
          websocket.onclose = () => {
            console.log(`WebSocket closed for ${cameraId}`);
          };

          const canvas = document.getElementById(cameraId) as HTMLCanvasElement;
          if (canvas) {
            new Jsmpeg(websocket, { canvas: canvas, autoplay: true, loop: true });
          }
        };

        setupWebSocket(websocket1, 'camera1');
        setupWebSocket(websocket2, 'camera2');
        setupWebSocket(websocket3, 'camera3');
        setupWebSocket(websocket4, 'camera4');
      });
    }
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '10px',
      padding: '10px',
      height: '100vh',
      backgroundColor: '#333',
      overflow: 'auto',
    }}>
      {/* Camera 1 */}
      <div style={{ backgroundColor: 'black', padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>Camera 1</h3>
        <canvas id="camera1" style={{ width: '100%', height: '100%' }}></canvas>
      </div>

      {/* Camera 2 */}
      <div style={{ backgroundColor: 'black', padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>Camera 2</h3>
        <canvas id="camera2" style={{ width: '100%', height: '100%' }}></canvas>
      </div>

      {/* Camera 3 */}
      <div style={{ backgroundColor: 'black', padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>Camera 3</h3>
        <canvas id="camera3" style={{ width: '100%', height: '100%' }}></canvas>
      </div>

      {/* Camera 4 */}
      <div style={{ backgroundColor: 'black', padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>Camera 4</h3>
        <canvas id="camera4" style={{ width: '100%', height: '100%' }}></canvas>
      </div>

    </div>
  );
};

export default Home;
