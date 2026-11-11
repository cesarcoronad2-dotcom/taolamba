import { html } from '../htm.js';
import Label from './Label.js';

const Mini = ({ cat, uid }) => html`
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <radialGradient id=${'m' + uid}>
        <stop offset="0" stopColor=${cat.hi} />
        <stop offset=".5" stopColor=${cat.hi} />
        <stop offset=".8" stopColor=${cat.lo} />
        <stop offset="1" stopColor="#060404" />
      </radialGradient>
    </defs>
    <circle cx="200" cy="200" r="198" fill=${`url(#m${uid})`} />
    <circle cx="200" cy="200" r="197" fill="none" stroke="#fdb644" strokeOpacity=".5" strokeWidth="3" />
    ${[170, 150, 130, 110, 92].map(r => html`
      <circle key=${r} cx="200" cy="200" r=${r} fill="none" stroke="rgba(0,0,0,.4)" strokeWidth="2" />
    `)}
    <${Label} r=${78} />
  </svg>
`;

export default Mini;
