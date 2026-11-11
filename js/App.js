import { html, React } from '../htm.js';
import { useState, useRef, useEffect } from 'https://esm.sh/react@18.3.1';
import { CATS } from '../assets/data/menu.js';
import { W, H, CX, CY, D, K, PX, PY, REST, TOP, T, BASE, EASE, lerp } from '../geometry.js';
import { IMG, PIN, LOGO } from '../constants.js';
import Vinyl from './Vinyl.js';
import Mini from './Mini.js';
import Tonearm from './Tonearm.js';
import MenuPanel from './MenuPanel.js';

function App() {
  const [ci, setCi] = useState(0);
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [pn, setPn] = useState({ top: 400, bottom: 14, left: 0, right: 0, margin: '0 auto', maxWidth: 460 });
  const discRef = useRef(null);
  const spinRef = useRef(null);
  const spA = useRef(null);
  const fin = useRef(null);
  const busy = useRef(false);
  const tm = useRef([]);
  const cat = CATS[ci];
  const pct = v => `${v * 100}%`;

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const openDisc = () => {
    if (open || busy.current || leaving) return;
    busy.current = true;
    const el = discRef.current;
    const sp = spinRef.current;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const wide = vw >= 860 && vw > vh * 1.1;
    let size, cx, cy, p;
    if (wide) {
      size = Math.min(vh * 0.74, vw * 0.42, 560);
      cx = Math.max(vw * 0.3, size / 2 + 32);
      cy = vh / 2;
      p = { top: vh * 0.1, bottom: vh * 0.1, left: cx + size / 2 + 56, right: 32, margin: 0, maxWidth: 480 };
    } else {
      size = Math.min(vw * 0.8, vh * 0.4, 400);
      cx = vw / 2;
      cy = TOP + size / 2;
      p = { top: TOP + size + 14, bottom: 'calc(env(safe-area-inset-bottom,0px) + 14px)', left: 0, right: 0, margin: '0 auto', maxWidth: 460 };
    }
    const s = size / r.width;
    const dx = cx - (r.left + r.width / 2);
    const dy = cy - (r.top + r.height / 2);
    fin.current = { dx, dy, s };
    setPn(p);
    setUp(true);
    setOpen(true);
    const m = new DOMMatrix(getComputedStyle(sp).transform);
    let ang = Math.atan2(m.b, m.a) * 180 / Math.PI;
    if (ang < 0) ang += 360;
    sp.classList.remove('spin');
    sp.style.transform = `rotate(${ang}deg)`;
    spA.current = sp.animate([
      { transform: `rotate(${ang}deg)` },
      { transform: `rotate(${ang > 180 ? 360 : 0}deg)` }
    ], { duration: 1400, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
    const a = el.animate([
      { transform: T(0, 0, 1, K, 0, 0) },
      { offset: 0.3, transform: T(dx * 0.06, dy * 0.06 - 40, 1.25, lerp(0.45), 22, -12) },
      { offset: 0.65, transform: T(dx * 0.65, dy * 0.65 - 26, (1 + s) / 2 * 1.06, lerp(0.9), -9, 9) },
      { transform: T(dx, dy, s, 1, 0, 0) }
    ], { duration: 1400, easing: EASE, fill: 'forwards' });
    a.onfinish = () => {
      el.style.transform = T(dx, dy, s, 1, 0, 0);
      a.cancel();
      busy.current = false;
    };
  };

  const closeDisc = () => {
    if (!open || busy.current) return;
    busy.current = true;
    const el = discRef.current;
    const sp = spinRef.current;
    const { dx, dy, s } = fin.current;
    setOpen(false);
    el.style.transform = BASE;
    const a = el.animate([
      { transform: T(dx, dy, s, 1, 0, 0) },
      { offset: 0.4, transform: T(dx * 0.4, dy * 0.4 - 30, 1.1, lerp(0.8), -10, 8) },
      { transform: T(0, 0, 1, K, 0, 0) }
    ], { duration: 1000, easing: EASE, fill: 'forwards' });
    a.onfinish = () => {
      a.cancel();
      setUp(false);
      busy.current = false;
    };
    if (spA.current) spA.current.cancel();
    sp.style.transform = '';
    sp.classList.add('spin');
  };

  const pick = i => {
    if (open || i === ci || leaving) return;
    tm.current.forEach(clearTimeout);
    setLifted(true);
    setLeaving(true);
    tm.current = [
      setTimeout(() => { setCi(i); setLeaving(false); }, 750),
      setTimeout(() => setLifted(false), 1700)
    ];
  };

  useEffect(() => {
    const k = e => { if (e.key === 'Escape') closeDisc(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  return html`
    <${React.Fragment}>
      <header class="hd"><img class="logo" src=${LOGO} width="984" height="360" alt="Taolamba Gastrobar" /></header>

      <main class="main">
        <div class="stage">
          <img class="base" src=${IMG} alt="Gramófono antiguo de latón y caoba" draggable="false" decoding="async" />
          <div ref=${discRef} class="disc" role="button" tabIndex="0" aria-label=${'Abrir la carta de ' + cat.name}
            onClick=${openDisc} onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDisc(); } }}
            style=${{ left: pct((CX - D / 2) / W), top: pct((CY - D / 2) / H), width: pct(D / W), aspectRatio: '1', zIndex: up ? 50 : 1, transform: BASE }}>
            <div key=${cat.id} class=${(leaving ? 'leave' : 'swap') + ' in'}>
              <div ref=${spinRef} class="spin sp"><${Vinyl} cat=${cat} uid=${cat.id} /></div>
            </div>
            <div class="sheen"></div>
            ${!up && html`<div class="ping"></div>`}
          </div>
          <img src=${PIN} alt="" aria-hidden="true" style=${{ position: 'absolute', pointerEvents: 'none', zIndex: 15, left: pct(690 / W), top: pct(640 / H), width: pct(50 / W) }} />
          <${Tonearm} on=${ready && !up && !lifted} />
        </div>
        <p class="hint" style=${{ opacity: open ? 0 : 1 }}>Toca el disco para ver la carta</p>
      </main>

      <footer class="shelf">
        <div class="board"></div>
        <div class="row">
          ${CATS.map((c, i) => html`
            <button key=${c.id} class=${'slot' + (i === ci ? ' on' : '')} onClick=${() => pick(i)} aria-pressed=${i === ci} aria-label=${c.name}>
              <span class="rec"><${Mini} cat=${c} uid=${c.id} /><span class="rsh"></span></span>
              <span class="plq">${c.name}</span>
            </button>
          `)}
        </div>
      </footer>

      <div class=${'veil' + (open ? ' on' : '')} onClick=${closeDisc}></div>
      <button class=${'x' + (open ? ' on' : '')} onClick=${closeDisc} aria-label="Cerrar la carta">×</button>
      <${MenuPanel} cat=${cat} pn=${pn} open=${open} />
    <//>
  `;
}

export default App;
