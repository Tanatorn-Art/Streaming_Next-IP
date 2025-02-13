// src/pages/[wsPort].tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CameraStream: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { wsPort } = router.query;  // รับค่า wsPort จาก URL

  useEffect(() => {
    if (typeof window !== 'undefined' && wsPort) {
      import('jsmpeg').then((module) => {
        const Jsmpeg = module.default;

        const websocket = new WebSocket(`ws://10.35.105.35:${wsPort}`);

        websocket.onopen = () => {
          console.log(`WebSocket connected for camera on port ${wsPort}`);
        };

        websocket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
          console.log('WebSocket closed');
        };

        const canvas = document.getElementById('cameraStream') as HTMLCanvasElement;
        if (canvas) {
          new Jsmpeg(websocket, { canvas, autoplay: true, loop: true });
        }

        setIsLoaded(true);  // Set to true when WebSocket and canvas are ready
      });
    }
  }, [wsPort]);

  if (!isLoaded) {
    return <div>Loading camera stream...</div>;
  }

  return (
    <div>
      <h1>Streaming Camera on Port {wsPort}</h1>
      <canvas id="cameraStream" width="640" height="360"></canvas>
    </div>
  );
};

export default CameraStream;
