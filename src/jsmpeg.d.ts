// src/types/jsmpeg.d.ts
declare module 'jsmpeg' {
  interface JsmpegPlayer {
      constructor(websocket: WebSocket, options: { canvas: HTMLCanvasElement; autoplay: boolean; loop: boolean }): void;
  }

  const jsmpeg: new (websocket: WebSocket, options: { canvas: HTMLCanvasElement; autoplay: boolean; loop: boolean }) => JsmpegPlayer;

  export = jsmpeg;
}
