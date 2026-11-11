import { html } from '../htm.js';
import { CREAM, MUSTARD } from '../constants.js';
import Label from './Label.js';

const Vinyl = ({ cat, uid }) => html`
  <svg viewBox="0 0 400 400" class="vsvg" aria-hidden="true">
    <defs>
      <radialGradient id=${'b' + uid} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor=${cat.hi} />
        <stop offset=".45" stopColor=${cat.hi} />
        <stop offset=".78" stopColor=${cat.lo} />
        <stop offset="1" stopColor="#060404" />
      </radialGradient>
      ${cat.items.map((_, i) => {
        const r = 176 - i * 17;
        return html`
          <path key=${i} id=${'p' + uid + i} d=${`M200,${200 - r} a${r},${r} 0 1 1 0,${2 * r} a${r},${r} 0 1 1 0,${-2 * r}`} />
        `;
      })}
    </defs>
    <circle cx="200" cy="200" r="198" fill=${`url(#b${uid})`} />
    <circle cx="200" cy="200" r="197" fill="none" stroke=${MUSTARD} strokeOpacity=".5" strokeWidth="1.2" />
    ${Array.from({ length: 40 }, (_, i) => html`
      <circle key=${i} cx="200" cy="200" r=${82 + i * 2.9} fill="none" stroke=${i % 2 ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.35)'} strokeWidth=".6" />
    `)}
    ${cat.items.map((it, i) => {
      const r = 176 - i * 17;
      const circ = 2 * Math.PI * r;
      const len = it[0].length + it[1].length + 8;
      const k = Math.max(1, Math.floor(circ / (len * 6.8)));
      return html`
        <text key=${i} fontFamily="Fraunces,Georgia,serif" fontWeight="600" fontSize="12" style="white-space:pre">
          <textPath href=${'#p' + uid + i} textLength=${circ - 3} lengthAdjust="spacing">
            ${Array.from({ length: k }, (_, j) => html`
              <tspan key=${j}>
                <tspan fill=${CREAM}>${it[0]}</tspan>
                <tspan fill=${MUSTARD}>  ·  ${it[1]}  ·  </tspan>
              </tspan>
            `)}
          </textPath>
        </text>
      `;
    })}
    <circle cx="200" cy="200" r="66" fill="#000" opacity=".45" />
    <${Label} r=${64} />
  </svg>
`;

export default Vinyl;
