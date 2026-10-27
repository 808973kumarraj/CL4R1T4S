import sys

html_content = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Spark Partitions</title>
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400&family=Silkscreen&family=Space+Mono:wght@400;700&family=Archivo:wdth,wght@75,800;100,800&display=block" rel="stylesheet">
<style>
  html, body { margin: 0; height: 100%; background: #E4E1D4; overflow: hidden }
  svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block }
  .hdr { font-family: 'Silkscreen', monospace; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .space { font-family: 'Space Mono', monospace; font-weight: 700; }
  .sans { font-family: 'IBM Plex Sans', sans-serif; }
  .display { font-family: 'Archivo', sans-serif; font-weight: 800; font-stretch: 75%; }
</style>
</head>
<body>
<svg id="stage" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="frame"><rect width="1080" height="1920"/></clipPath>
    <radialGradient id="bgGrad" cx="540" cy="700" r="1250" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F2EFE2"/><stop offset="0.55" stop-color="#E6E3D6"/><stop offset="1" stop-color="#CFCCBF"/>
    </radialGradient>
    <pattern id="gridPat" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M12.5 0V24M0 12.5H24" stroke="#5A5440" stroke-opacity="0.075" stroke-width="1" fill="none"/>
    </pattern>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="soft4" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  <g clip-path="url(#frame)">
    <rect id="bg" width="1080" height="1920" fill="url(#bgGrad)"/>
    <rect id="grid" width="1080" height="1920" fill="url(#gridPat)"/>
    <g id="scenes"></g>
    <g id="header"></g>
  </g>
</svg>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
(() => {
const DUR = 30; // 30 seconds
const NS = 'http://www.w3.org/2000/svg';
const C = {
  ink: '#1E1A14', inkSoft: '#3A342C', gray: '#6E685B', grayLight: '#9C9585', line: '#CBC7B8',
  paper: '#EFECE0', paperDark: '#E3DFD1', side: '#DCD8C9', sideDark: '#D2CDBC',
  green: '#3D7A62', greenDim: '#B9C4B2', red: '#A23B2C', redDim: '#E3B9AC',
  blue: '#24428A', blueLight: '#C9D4EA', orange: '#C98A4B', term: '#1F1B15', termText: '#E9E4D6'
};

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, p) => a + (b - a) * p;
const EC = {}; const ease = n => EC[n] || (EC[n] = gsap.parseEase(n));
const prog = (t, a, b, e = 'none') => ease(e)(clamp((t - a) / (b - a)));
const f1 = v => (Math.round(v * 10) / 10).toString();

function E(tag, attrs = {}, parent = null) {
  const el = document.createElementNS(NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}
function T(parent, str, attrs) { const el = E('text', attrs, parent); el.textContent = str; return el; }
const S = (el, attrs) => { for (const k in attrs) el.setAttribute(k, attrs[k]); };
const op = (el, v) => el.setAttribute('opacity', f1(v));
const show = (el, on) => el.setAttribute('display', on ? 'inline' : 'none');

// header
function buildHeader() {
  const hg = document.getElementById('header');
  T(hg, '> BINARY HABIT / SPARK PERF / PARTITIONS', { class: 'hdr', x: 66, y: 220, 'font-size': 24.5, 'letter-spacing': 5.25, fill: '#4F493E' });
  E('line', { x1: 66, x2: 1014, y1: 236, y2: 236, stroke: C.line, 'stroke-width': 1.5 }, hg);
}

// scene 1: Partitions
const sg = document.getElementById('scenes');

// A large dataset block
const s1 = E('g', {}, sg);
const s1Title = T(s1, 'A Large Dataset', { class: 'space', x: 540, y: 350, 'font-size': 50, 'text-anchor': 'middle', fill: C.ink });

// Create a big rectangle representing a dataset, which will break into pieces
const dataGrid = E('g', {}, s1);
const pieces = [];
const cols = 4;
const rows = 4;
const pw = 150;
const ph = 150;
const gap = 10;
const startX = 540 - (cols * pw + (cols - 1) * gap) / 2;
const startY = 700 - (rows * ph + (rows - 1) * gap) / 2;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const x = startX + c * (pw + gap);
    const y = startY + r * (ph + gap);
    const g = E('g', { transform: `translate(${x} ${y})` }, dataGrid);
    const rect = E('rect', { width: pw, height: ph, rx: 8, fill: C.paper, stroke: C.inkSoft, 'stroke-width': 2 }, g);
    T(g, `Block ${r*cols+c}`, { class: 'mono', x: pw/2, y: ph/2 + 6, 'font-size': 20, 'text-anchor': 'middle', fill: C.inkSoft });
    pieces.push({ g, c, r, x, y });
  }
}

// Spark Executors
const executors = [];
for (let i = 0; i < 4; i++) {
  const g = E('g', {}, s1);
  const ex = 140 + i * 260;
  const ey = 1300;
  E('rect', { x: ex - 100, y: ey - 50, width: 200, height: 100, rx: 10, fill: '#E9E5D8', stroke: C.inkSoft, 'stroke-width': 2 }, g);
  T(g, `EXECUTOR ${i+1}`, { class: 'space', x: ex, y: ey + 6, 'font-size': 20, 'text-anchor': 'middle', fill: C.inkSoft });
  executors.push({ g, ex, ey });
}

// Titles
const s2Title = T(s1, 'is divided into Partitions', { class: 'space', x: 540, y: 420, 'font-size': 40, 'text-anchor': 'middle', fill: C.blue });
const s3Title = T(s1, 'assigned to Executors for parallel processing', { class: 'space', x: 540, y: 1500, 'font-size': 35, 'text-anchor': 'middle', fill: C.green });

function render(t) {
  // Title 1
  op(s1Title, prog(t, 1, 2) * (1 - prog(t, 28, 29)));

  // Grid breaking into partitions
  const breakP = prog(t, 4, 6, 'power2.inOut');
  op(s2Title, prog(t, 5, 6) * (1 - prog(t, 28, 29)));

  // Assign to executors
  const assignP = prog(t, 9, 12, 'power2.inOut');
  op(s3Title, prog(t, 10, 11) * (1 - prog(t, 28, 29)));

  executors.forEach((e, i) => {
    op(e.g, prog(t, 8 + i*0.2, 9 + i*0.2));
  });

  pieces.forEach((p, i) => {
    // Break apart
    let curX = p.x + (p.c - cols/2 + 0.5) * 40 * breakP;
    let curY = p.y + (p.r - rows/2 + 0.5) * 40 * breakP;

    // Assign to executor (4 pieces per executor)
    const exIdx = i % 4; // distribute
    const ex = executors[exIdx];
    const targetX = ex.ex - pw/2 + ((Math.floor(i/4) % 2) - 0.5) * (pw + 10);
    const targetY = ex.ey - 200 - Math.floor(i/8) * (ph + 10);

    curX = lerp(curX, targetX, assignP);
    curY = lerp(curY, targetY, assignP);

    // Process (shrink)
    const procP = prog(t, 14 + i*0.1, 16 + i*0.1, 'power1.in');
    const scale = 1 - procP;

    S(p.g, { transform: `translate(${f1(curX)} ${f1(curY)}) scale(${f1(scale)})` });
    op(p.g, 1 - procP);
  });
}

const clock = { t: 0 };
const tl = gsap.timeline({ paused: true, repeat: -1 });
tl.fromTo(clock, { t: 0 }, { t: DUR, duration: DUR, ease: 'none', immediateRender: false, onUpdate: () => render(clock.t) });
window.anim = {
  tl, duration: DUR,
  seek(t) { t = clamp(t, 0, DUR); tl.pause(); tl.time(t, true); render(t); },
  play(from = 0) { tl.restart(); tl.time(from); tl.play(); },
  pause() { tl.pause(); }
};

const qs = new URLSearchParams(location.search);
const fontsReady = Promise.race([
  Promise.all([
    document.fonts.load('700 100px "Space Mono"', '0123456789'), document.fonts.load('24px "Silkscreen"', 'BINARY'),
    document.fonts.load('400 24px "IBM Plex Mono"', 'SPARK'), document.fonts.load('500 24px "IBM Plex Mono"', 'ALL'),
    document.fonts.load('600 24px "IBM Plex Mono"', 'topic'), document.fonts.load('400 24px "IBM Plex Sans"', 'Episode'),
    document.fonts.load('800 100px "Archivo"', 'SHUFFLE'), document.fonts.ready]),
  new Promise(r => setTimeout(r, 6000))
]);
fontsReady.then(() => {
  buildHeader();
  anim.seek(0);
  if (qs.has('t')) anim.seek(parseFloat(qs.get('t')));
  else if (!qs.has('external')) tl.play(0);
  document.documentElement.dataset.ready = '1';
});
})();
</script>
</body>
</html>
"""

with open("src/index-6.html", "w") as f:
    f.write(html_content)
