// src/components/Camera.tsx
'use client'
import React, { useEffect, useRef } from 'react';
import jsmpeg from 'jsmpeg';
interface CameraProps {
    id: string;
    wsUrl: string;
}

const Camera: React.FC<CameraProps> = ({ id, wsUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const websocket = new WebSocket(wsUrl);
        const canvas = canvasRef.current;

        if (canvas) {
            const player = new jsmpeg(websocket, { canvas, autoplay: true, loop: true });

            websocket.onopen = () => {
                console.log(`WebSocket connected for ${id}`);
            };

            websocket.onerror = (event: Event) => {
                console.error(`WebSocket error for ${id}:`, event);
            };

            websocket.onclose = () => {
                console.log(`WebSocket closed for ${id}`);
            };
        }

        return () => {
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.close();
            }
        };
    }, [wsUrl, id]);

    return (
        <div className="camera-container" style={{ width: '50%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <canvas ref={canvasRef} id={id} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default Camera;
