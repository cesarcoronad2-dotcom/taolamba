import { html } from '../htm.js';

const MenuPanel = ({ cat, pn, open }) => html`
  <section class=${'panel' + (open ? ' on' : '')} style=${pn} aria-label=${'Carta de ' + cat.name}>
    <h2 class="ptitle">${cat.name}</h2>
    <div class="rule"></div>
    <ul style="listStyle:none;margin:0;padding:0">
      ${cat.items.map(it => html`
        <li class="item" key=${it[0]}>
          <div class="irow">
            <h3 class="iname">${it[0]}</h3>
            <span class="iprice">${it[1]}</span>
          </div>
          <p class="idesc">${it[2]}</p>
        </li>
      `)}
    </ul>
  </section>
`;

export default MenuPanel;
