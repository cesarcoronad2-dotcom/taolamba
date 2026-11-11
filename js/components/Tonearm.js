import { html } from '../htm.js';
import { W, H, PX, PY, REST } from '../geometry.js';

const Tonearm = ({ on }) => {
  const tube = 'M938 498 Q885 580 805 636';
  return html`
    <svg viewBox=${`0 0 ${W} ${H}`} style="position:absolute;inset:0;width:100%;height:100%;pointerEvents:none;zIndex:20" aria-hidden="true">
      <defs>
        <linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="800" y1="520" x2="940" y2="600">
          <stop offset="0" stopColor="#8f6420" />
          <stop offset=".5" stopColor="#ffe9a0" />
          <stop offset="1" stopColor="#a8782a" />
        </linearGradient>
        <radialGradient id="cg">
          <stop offset="0" stopColor="#fff3bf" />
          <stop offset=".6" stopColor="#d9ad46" />
          <stop offset="1" stopColor="#6e4a12" />
        </radialGradient>
        <filter id="bl"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <g style=${{
        transformOrigin: `${PX}px ${PY}px`,
        transform: `rotate(${on ? 0 : REST}deg)`,
        transition: on ? 'transform 1.25s cubic-bezier(.3,1.25,.5,1)' : 'transform 1s cubic-bezier(.45,.1,.25,1)'
      }}>
        <g class=${on ? 'wob' : ''}>
          <g filter="url(#bl)" opacity=${on ? 0.5 : 0.3} style=${{
            transform: on ? 'translate(5px,8px)' : 'translate(16px,30px)',
            transition: 'transform 1s, opacity 1s'
          }}>
            <path d=${tube} fill="none" stroke="#000" strokeWidth="11" strokeLinecap="round" />
            <rect x="-24" y="-10" width="48" height="20" rx="7" transform="translate(805 636) rotate(-40)" />
          </g>
          <path d=${tube} fill="none" stroke="#6e4a12" strokeWidth="12" strokeLinecap="round" />
          <path d=${tube} fill="none" stroke="url(#tg)" strokeWidth="8.5" strokeLinecap="round" />
          <path d=${tube} fill="none" stroke="#fff6cf" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" transform="translate(-2 -2)" />
          <g transform="translate(805 636) rotate(-40)">
            <rect x="-24" y="-10" width="48" height="20" rx="7" fill="url(#cg)" stroke="#5b3a0c" strokeWidth="2" />
            <rect x="-24" y="-10" width="48" height="6" rx="3" fill="#fff6cf" opacity=".5" />
            <circle cx="-14" cy="0" r="4" fill="#2a1d06" />
            <path d="M-14 2 L-20 16" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>
      </g>
      <circle cx=${PX} cy=${PY} r="19" fill="url(#cg)" stroke="#5b3a0c" strokeWidth="2.5" />
      <circle cx=${PX} cy=${PY} r="9" fill="#2a1d06" stroke="#e9c45f" strokeWidth="1.5" />
      <circle cx=${PX - 4} cy=${PY - 5} r="3" fill="#fff6cf" opacity=".7" />
    </svg>
  `;
};

export default Tonearm;
