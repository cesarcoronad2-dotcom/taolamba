import { html } from '../htm.js';
import { CREAM, MUSTARD, CRIMSON } from '../constants.js';

const Label = ({ r }) => html`
  <g>
    <circle cx="200" cy="200" r=${r} fill=${CRIMSON} />
    <circle cx="200" cy="200" r=${r - 1.5} fill="none" stroke=${MUSTARD} strokeWidth="2" />
    <image href="./assets/images/label.webp" x=${200 - r * 0.46} y=${200 - r * 0.55} width=${r * 0.92} height=${r * 1.1} preserveAspectRatio="xMidYMid meet" />
    <circle cx="200" cy="200" r=${r * 0.07} fill="#0a0605" stroke=${MUSTARD} strokeWidth="1.2" />
  </g>
`;

export default Label;
