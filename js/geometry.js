// geometry measured on the photo (1402 x 1122)
export const W = 1402;
export const H = 1122;
export const CX = 713.5;
export const CY = 697;
export const D = 468;
export const K = 0.759;
export const PX = 938;
export const PY = 498;
export const REST = -65;
export const TOP = 56;

export const T = (x, y, s, sy, rx, ry) =>
  `perspective(1100px) translate(${x}px,${y}px) scale(${s}) scaleY(${sy}) rotateX(${rx}deg) rotateY(${ry}deg)`;

export const BASE = `scaleY(${K})`;
export const EASE = 'cubic-bezier(.35,.6,.25,1)';
export const lerp = t => K + (1 - K) * t;
