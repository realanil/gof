import * as PIXI from 'pixi.js'
export {};

declare global {
  interface Window {
    PIXI: PIXI;
  }
}