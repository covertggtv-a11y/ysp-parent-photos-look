#!/usr/bin/env node
/**
 * Generates self-contained frame HTML for YSP Parent Photos LOOK.
 * Brand: Miami Hoops navy #011441, orange #ef6908, canvas #f7f8fa.
 */
import fs from 'fs';
import path from 'path';

const DIR = '/workspace/ysp-parent-photos-look/frames';
fs.mkdirSync(DIR, { recursive: true });

const TOKENS = `
:root{
  --navy:#011441; --orange:#ef6908; --canvas:#f7f8fa; --panel:#ffffff;
  --ink:#12141a; --mute:#5c6470; --line:#e6e8ee; --soft:#eef1f6;
  --ok:#0e9f6e; --ok-soft:#e7f6ef; --warn:#b4741a; --warn-soft:#fbf2e3;
  --danger:#d64545; --danger-soft:#fbecec;
  --r-card:14px; --r-row:9px; --r-ctl:8px; --r-pill:999px;
  --sans:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --disp:Anton,"Arial Narrow",Impact,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--sans);color:var(--ink);background:#d9dde5;
  -webkit-font-smoothing:antialiased;letter-spacing:-.01em}
button,input{font:inherit}
.disp{font-family:var(--disp);font-weight:400;text-transform:uppercase;letter-spacing:.02em}
.ribbon{position:fixed;top:10px;left:10px;z-index:50;font-size:10px;font-weight:700;
  letter-spacing:.14em;padding:4px 9px;border-radius:999px;border:1px solid;
  background:rgba(255,255,255,.94)}
.ribbon.before{color:#8a5a00;border-color:#e8dcc0}
.ribbon.after{color:#0e6b4a;border-color:#b7e0cd}
`;

const PHONE_SHELL = (body, { badge = 'AFTER', tab = 'Photos', title = 'Photos' } = {}) => `
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=390, initial-scale=1">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.device{width:390px;height:844px;margin:0 auto;background:var(--canvas);overflow:hidden;position:relative;
  display:flex;flex-direction:column}
.topbar{height:56px;background:var(--panel);border-bottom:1px solid var(--line);
  display:flex;align-items:center;padding:0 14px;gap:10px;flex:0 0 auto}
.logo{width:32px;height:32px;border-radius:8px;background:var(--navy);display:grid;place-items:center;
  color:#fff;font-size:9px;font-weight:700;line-height:1.05;text-align:center;letter-spacing:-.02em}
.brand{font-size:15px;font-weight:700}
.menu{margin-left:auto;width:36px;height:36px;border:1px solid var(--line);border-radius:10px;
  display:grid;place-items:center;background:var(--panel);color:var(--ink);font-size:16px}
.hero{background:var(--navy);color:#fff;padding:16px 16px 0;flex:0 0 auto}
.hero .eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--orange);margin-bottom:4px}
.hero h1{font-family:var(--disp);font-size:28px;line-height:.95;letter-spacing:.01em}
.hero .meta{margin-top:8px;font-size:12.5px;color:rgba(255,255,255,.72);line-height:1.4}
.tabs{display:flex;gap:18px;margin-top:14px;padding-bottom:0}
.tabs span{font-size:14px;font-weight:600;color:rgba(255,255,255,.55);padding-bottom:10px;border-bottom:2px solid transparent}
.tabs .on{color:var(--orange);border-bottom-color:var(--orange)}
.main{flex:1;overflow:hidden;padding:18px 16px 20px;background:var(--canvas)}
.section-h{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px}
.section-h h2{font-family:var(--disp);font-size:18px;letter-spacing:.04em}
.section-h .count{font-size:12.5px;color:var(--mute)}
.chip{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;
  padding:4px 9px;border-radius:var(--r-pill);background:var(--soft);color:var(--navy)}
.chip.ok{background:var(--ok-soft);color:var(--ok)}
.chip.warn{background:var(--warn-soft);color:var(--warn)}
.pill{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  min-height:44px;padding:0 20px;border-radius:var(--r-pill);border:0;
  background:var(--navy);color:#fff;font-weight:700;font-size:14.5px}
.pill.orange{background:var(--orange)}
.pill.ghost{background:transparent;color:var(--navy);border:1px solid var(--line)}
.pill.sm{min-height:34px;padding:0 14px;font-size:13px}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:48px 20px 24px;gap:14px;min-height:420px}
.empty .illus{width:88px;height:88px;border-radius:22px;background:linear-gradient(145deg,#e8ecf4,#d5dbe8);
  display:grid;place-items:center;color:var(--navy);font-size:34px;box-shadow:inset 0 0 0 1px #cfd6e4}
.empty p{font-size:14.5px;color:var(--mute);max-width:28ch;line-height:1.45}
.game-h{display:flex;align-items:center;justify-content:space-between;margin:18px 0 10px}
.game-h:first-child{margin-top:0}
.game-h .left{font-size:13px;font-weight:650}
.game-h .sub{font-size:11.5px;color:var(--mute);font-weight:500}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.tile{aspect-ratio:1;border-radius:10px;overflow:hidden;position:relative;background:#c8d0de}
.tile .ph{position:absolute;inset:0;display:grid;place-items:center;color:rgba(255,255,255,.9);
  font-weight:700;font-size:18px;letter-spacing:.02em}
.tile .heart{position:absolute;left:6px;bottom:6px;background:rgba(0,0,0,.45);color:#fff;
  font-size:10px;font-weight:600;padding:2px 6px;border-radius:999px}
.tile.sel{outline:3px solid var(--orange);outline-offset:-3px}
.tile .check{position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:50%;
  background:var(--orange);color:#fff;display:grid;place-items:center;font-size:12px;font-weight:700}
.bottomnav{flex:0 0 auto;height:64px;background:var(--panel);border-top:1px solid var(--line);
  display:flex;align-items:stretch}
.bottomnav a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:3px;font-size:10.5px;font-weight:600;color:var(--mute);text-decoration:none}
.bottomnav .on{color:var(--navy)}
.bottomnav .dot{width:20px;height:3px;border-radius:2px;background:transparent}
.bottomnav .on .dot{background:var(--orange)}
</style></head><body>
<span class="ribbon ${badge.toLowerCase()}">${badge}</span>
<div class="device">
  <div class="topbar">
    <div class="logo">MH</div>
    <div class="brand">Miami Hoops</div>
    <div class="menu">☰</div>
  </div>
  <div class="hero">
    <div style="display:flex;gap:12px;align-items:flex-start">
      <div class="logo" style="width:44px;height:44px;font-size:11px;border:1px solid rgba(255,255,255,.15)">MH</div>
      <div>
        <div class="eyebrow">TEAM</div>
        <h1>MIAMI HOOPS 7TH</h1>
      </div>
    </div>
    <p class="meta">Ages 12–14 · 6th Grade–7th Grade<br>Photos stay with this roster — not public, not searchable.</p>
    <div class="tabs">
      <span>Team</span><span>Feed</span><span${tab==='Film'?' class="on"':''}>Film</span><span${tab==='Photos'?' class="on"':''}>Photos</span>
    </div>
  </div>
  <div class="main">${body}</div>
</div>
</body></html>`;

// Photo tile backgrounds — court/ball/jersey-from-behind/silhouette, NO faces
const TILES = [
  { bg: 'linear-gradient(160deg,#1a3a6e 0%,#0a1f44 55%,#ef6908 160%)', label: '7', heart: 4 },
  { bg: 'radial-gradient(circle at 40% 35%,#f4a261 0%,#e76f51 35%,#011441 90%)', label: '●', heart: 7 },
  { bg: 'linear-gradient(135deg,#2b2b2b,#5a5a5a 40%,#011441)', label: 'JM', heart: 2 },
  { bg: 'linear-gradient(180deg,#c8d4e8,#8fa3c4 50%,#011441)', label: '14', heart: 5 },
  { bg: 'linear-gradient(145deg,#0d2818,#1b4332 40%,#ef6908)', label: '●', heart: 3 },
  { bg: 'linear-gradient(160deg,#3d2b1f,#8b5e3c 45%,#011441)', label: 'AS', heart: 6 },
  { bg: 'linear-gradient(120deg,#011441,#243b6b 60%,#ef6908)', label: '22', heart: 1 },
  { bg: 'radial-gradient(circle at 60% 40%,#ddd 0%,#889 40%,#011441)', label: '●', heart: 8 },
  { bg: 'linear-gradient(200deg,#1f2937,#4b5563 50%,#ef6908)', label: 'KR', heart: 2 },
];

function tileHTML(t, i, { selected = false, showHeart = true } = {}) {
  return `<div class="tile${selected ? ' sel' : ''}" style="background:${t.bg}">
    <div class="ph">${t.label}</div>
    ${showHeart ? `<div class="heart">♥ ${t.heart}</div>` : ''}
    ${selected ? `<div class="check">✓</div>` : ''}
  </div>`;
}

// ========== PHONE FRAMES ==========

fs.writeFileSync(path.join(DIR, 'before-phone-team.html'), PHONE_SHELL(`
  <div class="section-h"><h2>GAMES</h2><span class="count">3 games</span></div>
  ${[['Sat, Aug 15, 2026','vs South Florida Select','OPENS ON YOUTUBE'],
     ['Sun, Aug 9, 2026','vs Palm Beach Prep','OPENS ON DROPBOX'],
     ['Fri, Aug 1, 2026','vs Doral Academy','OPENS ON GOOGLE DRIVE']].map(([d,o,b])=>`
    <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 14px;margin-bottom:10px">
      <div style="font-size:12px;color:var(--mute);font-weight:600">${d}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px;gap:8px">
        <div style="font-size:15px;font-weight:700">${o}</div>
        <div style="color:var(--orange);font-weight:700;font-size:13.5px;white-space:nowrap">Open →</div>
      </div>
      <div style="margin-top:10px"><span style="font-size:10.5px;font-weight:700;letter-spacing:.04em;background:var(--soft);color:var(--mute);padding:4px 9px;border-radius:999px">${b}</span></div>
    </div>`).join('')}
  <p style="margin-top:22px;font-size:12.5px;color:var(--mute);text-align:center;line-height:1.4">
    Film is link cards only. No team Photos home today.<br>Player profile has roster headshot upload only.
  </p>
`, { badge: 'BEFORE', tab: 'Film', title: 'BEFORE · Team Film (no Photos)' }));

fs.writeFileSync(path.join(DIR, 'after-phone-empty.html'), PHONE_SHELL(`
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
    <div class="section-h" style="margin:0"><h2>PHOTOS</h2></div>
    <span class="chip ok">● Team only</span>
  </div>
  <div class="empty">
    <div class="illus">📷</div>
    <p>Photos from this team's games. Only families on the roster see them.</p>
    <button class="pill">Add photos from today</button>
  </div>
`, { badge: 'AFTER', tab: 'Photos', title: 'AFTER · Team Photos empty' }));

fs.writeFileSync(path.join(DIR, 'after-phone-grid.html'), PHONE_SHELL(`
  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:14px">
    <div>
      <div class="section-h" style="margin:0"><h2>PHOTOS</h2></div>
      <div style="font-size:12px;color:var(--mute);margin-top:2px">12 photos · roster only</div>
    </div>
    <div style="display:flex;gap:8px;align-items:center">
      <span class="chip ok">● Team only</span>
      <button class="pill sm">Add photos</button>
    </div>
  </div>
  <div class="game-h">
    <div><div class="left">Sat, Aug 15 · vs South Florida Select</div><div class="sub">Game day · 6 photos</div></div>
  </div>
  <div class="grid">${TILES.slice(0,6).map((t,i)=>tileHTML(t,i)).join('')}</div>
  <div class="game-h">
    <div><div class="left">Sun, Aug 9 · vs Palm Beach Prep</div><div class="sub">Game day · 3 photos</div></div>
  </div>
  <div class="grid">${TILES.slice(6,9).map((t,i)=>tileHTML(t,i)).join('')}</div>
`, { badge: 'AFTER', tab: 'Photos', title: 'AFTER · Team Photos grid' }));

// Upload sheet overlay
fs.writeFileSync(path.join(DIR, 'after-phone-upload.html'), `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=390, initial-scale=1">
<title>AFTER · Add photos from today</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.device{width:390px;height:844px;margin:0 auto;background:var(--canvas);overflow:hidden;position:relative}
.backdrop{position:absolute;inset:0;background:rgba(1,20,65,.45)}
.sheet{position:absolute;left:0;right:0;bottom:0;background:var(--panel);border-radius:20px 20px 0 0;
  padding:10px 16px 28px;max-height:92%;display:flex;flex-direction:column;box-shadow:0 -12px 40px rgba(0,0,0,.18)}
.handle{width:36px;height:4px;border-radius:4px;background:#d0d5de;margin:4px auto 14px}
.sheet h1{font-size:18px;font-weight:700;letter-spacing:-.02em}
.sheet .help{font-size:12.5px;color:var(--mute);margin-top:4px;line-height:1.4}
.event{margin-top:12px;background:var(--soft);border-radius:10px;padding:10px 12px;font-size:12.5px;font-weight:600}
.event span{color:var(--mute);font-weight:500}
.roll{margin-top:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;flex:1;overflow:hidden}
.tile{aspect-ratio:1;border-radius:10px;overflow:hidden;position:relative;background:#c8d0de}
.tile .ph{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-weight:700;font-size:16px}
.tile.sel{outline:3px solid var(--orange);outline-offset:-3px}
.tile .check{position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:50%;
  background:var(--orange);color:#fff;display:grid;place-items:center;font-size:12px;font-weight:700}
.tags{margin-top:12px}
.tags .lbl{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);margin-bottom:8px}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chips span{font-size:12.5px;font-weight:600;padding:6px 11px;border-radius:999px;border:1px solid var(--line);background:var(--panel);color:var(--ink)}
.chips .on{background:var(--navy);color:#fff;border-color:var(--navy)}
.chips .opt{color:var(--mute);border-style:dashed}
.foot{margin-top:14px;display:flex;gap:10px}
.pill{flex:1;min-height:48px;border:0;border-radius:999px;background:var(--navy);color:#fff;font-weight:700;font-size:15px}
.pill.ghost{background:transparent;color:var(--navy);border:1px solid var(--line);flex:0 0 auto;padding:0 16px}
</style></head><body>
<span class="ribbon after">AFTER</span>
<div class="device">
  <div class="backdrop"></div>
  <div class="sheet">
    <div class="handle"></div>
    <h1>Add photos from today</h1>
    <p class="help">From your camera roll. Only this team's families will see them.</p>
    <div class="event">Sat, Aug 15 · vs South Florida Select <span>· Game day</span></div>
    <div class="roll">
      ${TILES.slice(0,9).map((t,i)=>`
        <div class="tile${i<4?' sel':''}" style="background:${t.bg}">
          <div class="ph">${t.label}</div>
          ${i<4?'<div class="check">✓</div>':''}
        </div>`).join('')}
    </div>
    <div class="tags">
      <div class="lbl">Tag kids in these shots <span style="font-weight:500;letter-spacing:0;text-transform:none;color:var(--mute)">(optional)</span></div>
      <div class="chips">
        <span class="on">Jordan M.</span>
        <span class="on">Ava S.</span>
        <span>Kai R.</span>
        <span class="opt">+ Add</span>
      </div>
    </div>
    <div class="foot">
      <button class="pill ghost">Cancel</button>
      <button class="pill">Add 4 photos</button>
    </div>
  </div>
</div>
</body></html>`);

// Detail
fs.writeFileSync(path.join(DIR, 'after-phone-detail.html'), `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=390, initial-scale=1">
<title>AFTER · Photo detail</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.device{width:390px;height:844px;margin:0 auto;background:#0a1224;overflow:hidden;position:relative;display:flex;flex-direction:column;color:#fff}
.bar{height:52px;display:flex;align-items:center;padding:0 14px;gap:12px;flex:0 0 auto}
.bar .back{font-size:22px;line-height:1;width:36px}
.bar .meta{flex:1;font-size:13px;font-weight:600}
.bar .meta small{display:block;font-size:11px;font-weight:500;color:rgba(255,255,255,.55);margin-top:1px}
.chip{font-size:10.5px;font-weight:700;padding:4px 8px;border-radius:999px;background:rgba(14,159,110,.2);color:#6ee7b7}
.photo{flex:1;margin:0 12px;border-radius:14px;overflow:hidden;position:relative;
  background:linear-gradient(160deg,#1a3a6e 0%,#0a1f44 50%,#ef6908 160%);
  display:grid;place-items:center}
.photo .sil{width:140px;height:180px;border-radius:70px 70px 40px 40px;
  background:linear-gradient(180deg,rgba(255,255,255,.15),rgba(0,0,0,.35));
  position:relative}
.photo .sil::before{content:"";position:absolute;top:-36px;left:50%;transform:translateX(-50%);
  width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.18)}
.photo .cap{position:absolute;left:12px;bottom:12px;font-size:12px;color:rgba(255,255,255,.75)}
.actions{padding:16px 16px 28px;display:flex;flex-direction:column;gap:10px}
.row{display:flex;gap:10px}
.btn{flex:1;min-height:46px;border-radius:999px;border:0;font-weight:700;font-size:14px;
  display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn.pri{background:#fff;color:var(--navy)}
.btn.sec{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.18)}
.btn.warn{background:transparent;color:#fca5a5;border:1px solid rgba(252,165,165,.35);font-size:13px}
.note{font-size:11.5px;color:rgba(255,255,255,.5);text-align:center;line-height:1.4}
</style></head><body>
<span class="ribbon after">AFTER</span>
<div class="device">
  <div class="bar">
    <div class="back">←</div>
    <div class="meta">vs South Florida Select<small>Sat, Aug 15 · uploaded by Coach Lee</small></div>
    <span class="chip">Team only</span>
  </div>
  <div class="photo">
    <div class="sil"></div>
    <div class="cap">Jersey from behind · no face shown</div>
  </div>
  <div class="actions">
    <div class="row">
      <button class="btn pri">♥ Heart · 7</button>
      <button class="btn sec">Save to My kid's album</button>
    </div>
    <button class="btn warn">Report · Hide my kid</button>
    <p class="note">Hide is instant for you. Coach is told so they can remove it for the team.</p>
  </div>
</div>
</body></html>`);

// Consent
fs.writeFileSync(path.join(DIR, 'after-phone-consent.html'), `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=390, initial-scale=1">
<title>AFTER · Photo consent</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.device{width:390px;height:844px;margin:0 auto;background:var(--canvas);overflow:hidden;display:flex;flex-direction:column}
.topbar{height:56px;background:var(--panel);border-bottom:1px solid var(--line);
  display:flex;align-items:center;padding:0 14px;gap:10px}
.back{font-size:20px;width:32px}.brand{font-size:15px;font-weight:700}
.main{padding:22px 16px;flex:1}
h1{font-size:22px;font-weight:700;letter-spacing:-.03em}
.help{margin-top:8px;font-size:13.5px;color:var(--mute);line-height:1.45;max-width:34ch}
.card{margin-top:20px;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);padding:16px}
.kid{display:flex;align-items:center;gap:12px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.av{width:44px;height:44px;border-radius:50%;background:linear-gradient(145deg,var(--navy),#243b6b);
  color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px}
.kid .name{font-size:15px;font-weight:700}.kid .sub{font-size:12px;color:var(--mute);margin-top:2px}
.radio{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--line)}
.radio:last-child{border-bottom:0;padding-bottom:0}
.radio .dot{width:22px;height:22px;border-radius:50%;border:2px solid #c5ccd8;flex:0 0 auto;margin-top:1px;
  display:grid;place-items:center}
.radio.on .dot{border-color:var(--navy)}
.radio.on .dot::after{content:"";width:12px;height:12px;border-radius:50%;background:var(--navy)}
.radio .t{font-size:14.5px;font-weight:650}.radio .d{font-size:12.5px;color:var(--mute);margin-top:2px;line-height:1.35}
.foot{margin-top:18px;font-size:12.5px;color:var(--mute);line-height:1.45;background:var(--warn-soft);
  border:1px solid #e8dcc0;border-radius:12px;padding:12px 14px}
.pill{margin-top:18px;width:100%;min-height:48px;border:0;border-radius:999px;background:var(--navy);color:#fff;font-weight:700;font-size:15px}
</style></head><body>
<span class="ribbon after">AFTER</span>
<div class="device">
  <div class="topbar"><div class="back">←</div><div class="brand">Settings · Photo consent</div></div>
  <div class="main">
    <h1>Photo consent</h1>
    <p class="help">Choose how Jordan appears in this team's private album. Default is protective — you can change anytime.</p>
    <div class="card">
      <div class="kid">
        <div class="av">JM</div>
        <div><div class="name">Jordan M.</div><div class="sub">Miami Hoops 7th · #14</div></div>
      </div>
      <div class="radio"><div class="dot"></div><div><div class="t">Allow in team album</div><div class="d">Photos with Jordan can show to roster families right away.</div></div></div>
      <div class="radio on"><div class="dot"></div><div><div class="t">Ask me first</div><div class="d">Coach holds any shot with Jordan until you say yes. <b>Default</b>.</div></div></div>
      <div class="radio"><div class="dot"></div><div><div class="t">Never</div><div class="d">Jordan stays out of the team album. Shots with them are held or excluded.</div></div></div>
    </div>
    <div class="foot">Group shots with any kid on <b>Never</b> or unanswered <b>Ask</b> go to coach Held for review. No auto-blur in v1.</div>
    <button class="pill">Save preference</button>
  </div>
</div>
</body></html>`);

// Held for coach
fs.writeFileSync(path.join(DIR, 'after-phone-held.html'), `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=390, initial-scale=1">
<title>AFTER · Held for review</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.device{width:390px;height:844px;margin:0 auto;background:var(--canvas);overflow:hidden;display:flex;flex-direction:column}
.topbar{height:56px;background:var(--panel);border-bottom:1px solid var(--line);
  display:flex;align-items:center;padding:0 14px;gap:10px}
.back{font-size:20px;width:32px}.brand{font-size:15px;font-weight:700}
.main{padding:20px 16px;flex:1}
h1{font-size:22px;font-weight:700;letter-spacing:-.03em}
.help{margin-top:6px;font-size:13.5px;color:var(--mute);line-height:1.45}
.badge{display:inline-block;margin-top:12px;font-size:11px;font-weight:700;padding:4px 9px;border-radius:999px;
  background:var(--warn-soft);color:var(--warn)}
.card{margin-top:14px;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);padding:12px;
  display:grid;grid-template-columns:88px 1fr;gap:12px}
.thumb{aspect-ratio:1;border-radius:10px;background:linear-gradient(160deg,#1a3a6e,#0a1f44 60%,#ef6908)}
.thumb.b{background:linear-gradient(145deg,#2b2b2b,#5a5a5a 40%,#011441)}
.meta .why{font-size:12.5px;font-weight:650;color:var(--warn);margin-top:2px}
.meta .t{font-size:14px;font-weight:700;margin-top:4px}
.meta .s{font-size:12px;color:var(--mute);margin-top:3px;line-height:1.35}
.acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.pill{min-height:34px;padding:0 12px;border-radius:999px;border:0;font-weight:700;font-size:12.5px}
.pill.go{background:var(--navy);color:#fff}
.pill.ghost{background:transparent;border:1px solid var(--line);color:var(--ink)}
</style></head><body>
<span class="ribbon after">AFTER</span>
<div class="device">
  <div class="topbar"><div class="back">←</div><div class="brand">Coach · Held for review</div></div>
  <div class="main">
    <h1>Held for review</h1>
    <p class="help">These shots include a kid on Ask me first or Never. Approve after a parent says yes, or ask again.</p>
    <span class="badge">2 waiting</span>
    <div class="card">
      <div class="thumb"></div>
      <div class="meta">
        <div class="why">Ask pending — Jordan M.</div>
        <div class="t">vs South Florida Select</div>
        <div class="s">Uploaded by Maya P. · Sat 4:12 PM<br>Tags: Jordan M., Ava S.</div>
        <div class="acts">
          <button class="pill go">Approve</button>
          <button class="pill ghost">Ask parent again</button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="thumb b"></div>
      <div class="meta">
        <div class="why">Never — Kai R.</div>
        <div class="t">vs South Florida Select</div>
        <div class="s">Uploaded by Coach Lee · Sat 4:40 PM<br>Exclude Kai or don't post.</div>
        <div class="acts">
          <button class="pill ghost">Remove shot</button>
          <button class="pill ghost">Ask parent again</button>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`);

// ========== IPAD ==========
fs.writeFileSync(path.join(DIR, 'after-ipad-grid.html'), `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=820, initial-scale=1">
<title>AFTER · iPad Photos grid</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.device{width:820px;height:1180px;margin:0 auto;background:var(--canvas);overflow:hidden;display:flex;flex-direction:column}
.topbar{height:60px;background:var(--panel);border-bottom:1px solid var(--line);
  display:flex;align-items:center;padding:0 22px;gap:12px}
.logo{width:34px;height:34px;border-radius:8px;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:700}
.brand{font-size:16px;font-weight:700}.spacer{flex:1}
.nav a{margin:0 10px;font-size:13.5px;font-weight:600;color:var(--mute);text-decoration:none}
.nav a.on{color:var(--navy)}
.hero{background:var(--navy);color:#fff;padding:22px 28px 0}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--orange)}
h1{font-family:var(--disp);font-size:36px;margin-top:4px;letter-spacing:.01em}
.meta{margin-top:8px;font-size:14px;color:rgba(255,255,255,.7);max-width:48ch;line-height:1.4}
.tabs{display:flex;gap:22px;margin-top:18px}
.tabs span{font-size:15px;font-weight:600;color:rgba(255,255,255,.5);padding-bottom:12px;border-bottom:2px solid transparent}
.tabs .on{color:var(--orange);border-bottom-color:var(--orange)}
.main{padding:24px 28px;flex:1}
.head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.head h2{font-family:var(--disp);font-size:22px;letter-spacing:.04em}
.chip{font-size:12px;font-weight:650;padding:5px 11px;border-radius:999px;background:var(--ok-soft);color:var(--ok)}
.pill{min-height:40px;padding:0 18px;border-radius:999px;border:0;background:var(--navy);color:#fff;font-weight:700;font-size:14px}
.game{font-size:14px;font-weight:650;margin:18px 0 10px}.game span{font-weight:500;color:var(--mute);font-size:12.5px;margin-left:8px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.tile{aspect-ratio:1;border-radius:12px;position:relative;overflow:hidden}
.tile .ph{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-weight:700;font-size:22px}
.tile .heart{position:absolute;left:8px;bottom:8px;background:rgba(0,0,0,.45);color:#fff;font-size:11px;font-weight:600;padding:3px 8px;border-radius:999px}
</style></head><body>
<span class="ribbon after">AFTER</span>
<div class="device">
  <div class="topbar">
    <div class="logo">MH</div><div class="brand">Miami Hoops</div>
    <div class="spacer"></div>
    <nav class="nav"><a>Home</a><a class="on">Teams</a><a>Calendar</a><a>Photos</a><a>Film</a><a>Settings</a></nav>
  </div>
  <div class="hero">
    <div class="eyebrow">TEAM</div>
    <h1>MIAMI HOOPS 7TH</h1>
    <p class="meta">Photos from this team's games. Only families on the roster see them.</p>
    <div class="tabs"><span>Team</span><span>Feed</span><span>Film</span><span class="on">Photos</span></div>
  </div>
  <div class="main">
    <div class="head">
      <div style="display:flex;align-items:center;gap:12px"><h2>PHOTOS</h2><span class="chip">● Team only</span></div>
      <button class="pill">Add photos from today</button>
    </div>
    <div class="game">Sat, Aug 15 · vs South Florida Select <span>6 photos</span></div>
    <div class="grid">${TILES.slice(0,8).map(t=>`<div class="tile" style="background:${t.bg}"><div class="ph">${t.label}</div><div class="heart">♥ ${t.heart}</div></div>`).join('')}</div>
    <div class="game">Sun, Aug 9 · vs Palm Beach Prep <span>3 photos</span></div>
    <div class="grid">${[...TILES.slice(6,9),TILES[0]].map(t=>`<div class="tile" style="background:${t.bg}"><div class="ph">${t.label}</div><div class="heart">♥ ${t.heart}</div></div>`).join('')}</div>
  </div>
</div>
</body></html>`);

// ========== DESKTOP ==========
const DESK_SHELL = (main, { badge = 'AFTER', active = 'Photos', title = 'Desktop' } = {}) => `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=1440, initial-scale=1">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.desk{width:1440px;height:900px;margin:0 auto;background:var(--canvas);display:flex;overflow:hidden}
.side{width:236px;flex:0 0 236px;background:var(--panel);border-right:1px solid var(--line);
  display:flex;flex-direction:column;padding:18px 14px}
.logo-block{display:flex;align-items:center;gap:10px;padding:4px 8px 16px}
.logo{width:34px;height:34px;border-radius:8px;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:700}
.logo-block .t{font-size:14px;font-weight:700;line-height:1.15}
.logo-block .s{font-size:10px;color:var(--mute);font-weight:500;letter-spacing:.04em;margin-top:2px}
.cta{display:block;width:100%;min-height:40px;border:0;border-radius:999px;background:var(--orange);color:#fff;
  font-weight:700;font-size:13.5px;margin-bottom:14px}
.nav{display:flex;flex-direction:column;gap:2px}
.nav a{display:block;padding:9px 11px;border-radius:9px;font-size:13.5px;font-weight:500;color:var(--ink);text-decoration:none}
.nav a.on{background:var(--navy);color:#fff;font-weight:600}
.spacer{flex:1}
.util a{display:block;padding:9px 11px;border-radius:9px;font-size:13px;color:var(--mute);text-decoration:none}
.foot{font-size:9.5px;color:var(--mute);padding:10px 8px 4px;letter-spacing:.04em}
.main{flex:1;padding:22px 26px;overflow:hidden;display:flex;flex-direction:column}
.phdr{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px}
.phdr h1{font-size:24px;font-weight:650;letter-spacing:-.02em}
.phdr .sub{font-size:13px;color:var(--mute);margin-top:4px;max-width:52ch;line-height:1.4}
.phdr .right{display:flex;align-items:center;gap:10px}
.chip{font-size:12px;font-weight:650;padding:5px 11px;border-radius:999px;background:var(--ok-soft);color:var(--ok)}
.pill{min-height:40px;padding:0 18px;border-radius:999px;border:0;background:var(--navy);color:#fff;font-weight:700;font-size:14px}
.game{font-size:13.5px;font-weight:650;margin:14px 0 10px}.game span{font-weight:500;color:var(--mute);font-size:12.5px;margin-left:8px}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.tile{aspect-ratio:1;border-radius:12px;position:relative;overflow:hidden}
.tile .ph{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-weight:700;font-size:20px}
.tile .heart{position:absolute;left:8px;bottom:8px;background:rgba(0,0,0,.45);color:#fff;font-size:11px;font-weight:600;padding:3px 8px;border-radius:999px}
</style></head><body>
<span class="ribbon ${badge.toLowerCase()}">${badge}</span>
<div class="desk">
  <aside class="side">
    <div class="logo-block">
      <div class="logo">MH</div>
      <div><div class="t">Miami Hoops</div><div class="s">7TH GRADE · PARENT</div></div>
    </div>
    <button class="cta">Add photos from today</button>
    <nav class="nav">
      ${['Home','Teams','Calendar','Photos','Film','Settings'].map(n=>
        `<a${n===active?' class="on"':''}>${n}</a>`).join('')}
    </nav>
    <div class="spacer"></div>
    <div class="util"><a>Messages</a><a>Sign out</a></div>
    <div class="foot">MIAMI HOOPS · TEAM VAULT</div>
  </aside>
  <div class="main">${main}</div>
</div>
</body></html>`;

fs.writeFileSync(path.join(DIR, 'after-desk-grid.html'), DESK_SHELL(`
  <div class="phdr">
    <div>
      <h1>Team photos · Miami Hoops 7th</h1>
      <p class="sub">Photos from this team's games. Only roster parents and coaches see them — no public URL, no SEO, no share-to-web.</p>
    </div>
    <div class="right">
      <span class="chip">● Team only</span>
      <button class="pill">Add photos from today</button>
    </div>
  </div>
  <div class="game">Sat, Aug 15 · vs South Florida Select <span>6 photos</span></div>
  <div class="grid">${TILES.slice(0,5).map(t=>`<div class="tile" style="background:${t.bg}"><div class="ph">${t.label}</div><div class="heart">♥ ${t.heart}</div></div>`).join('')}</div>
  <div class="game">Sun, Aug 9 · vs Palm Beach Prep <span>4 photos</span></div>
  <div class="grid">${[...TILES.slice(5,9),TILES[1]].map(t=>`<div class="tile" style="background:${t.bg}"><div class="ph">${t.label}</div><div class="heart">♥ ${t.heart}</div></div>`).join('')}</div>
`, { badge: 'AFTER', active: 'Photos', title: 'AFTER · Desktop Photos grid' }));

fs.writeFileSync(path.join(DIR, 'after-desk-consent.html'), DESK_SHELL(`
  <div class="phdr">
    <div>
      <h1>Photo consent</h1>
      <p class="sub">Per-kid preference for the team vault. Proposed default: <b>Ask me first</b>.</p>
    </div>
    <div class="right"><span class="chip">● Team only</span></div>
  </div>
  <div style="max-width:640px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--line)">
      <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(145deg,var(--navy),#243b6b);color:#fff;display:grid;place-items:center;font-weight:700">JM</div>
      <div><div style="font-size:16px;font-weight:700">Jordan M.</div><div style="font-size:13px;color:var(--mute);margin-top:2px">Miami Hoops 7th · #14</div></div>
    </div>
    ${[
      ['Allow in team album','Photos with Jordan can show to roster families right away.', false],
      ['Ask me first','Coach holds any shot with Jordan until you say yes. Default.', true],
      ['Never','Jordan stays out of the team album. Shots with them are held or excluded.', false],
    ].map(([t,d,on])=>`
      <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);align-items:flex-start">
        <div style="width:22px;height:22px;border-radius:50%;border:2px solid ${on?'var(--navy)':'#c5ccd8'};display:grid;place-items:center;flex:0 0 auto;margin-top:1px">
          ${on?'<div style="width:12px;height:12px;border-radius:50%;background:var(--navy)"></div>':''}
        </div>
        <div><div style="font-size:14.5px;font-weight:650">${t}</div><div style="font-size:13px;color:var(--mute);margin-top:2px;line-height:1.4">${d}</div></div>
      </div>`).join('')}
    <button class="pill" style="margin-top:18px">Save preference</button>
  </div>
`, { badge: 'AFTER', active: 'Settings', title: 'AFTER · Desktop consent' }));

// BEFORE desktop — team page without Photos nav
fs.writeFileSync(path.join(DIR, 'before-desk-team.html'), DESK_SHELL(`
  <div class="phdr">
    <div>
      <h1>Film · Miami Hoops 7th</h1>
      <p class="sub">Tap a game to open it on YouTube, Dropbox, or Drive. We don't host or upload video. <b>No team Photos home today.</b></p>
    </div>
  </div>
  <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-bottom:14px">
    <div style="font-family:var(--disp);font-size:16px;letter-spacing:.04em;margin-bottom:6px">POST A GAME</div>
    <div style="font-size:13px;color:var(--mute);margin-bottom:14px">Paste a YouTube, Dropbox, or Google Drive URL. Families on this roster will see it.</div>
    <div style="height:40px;border:1px solid var(--line);border-radius:8px;background:var(--canvas);margin-bottom:12px"></div>
    <button class="pill">Post film</button>
  </div>
  ${[['Sat, Aug 15','vs South Florida Select','YOUTUBE'],['Sun, Aug 9','vs Palm Beach Prep','DROPBOX']].map(([d,o,b])=>`
    <div style="background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px">
      <div style="font-size:13px;font-weight:600;color:var(--mute);min-width:100px">${d}</div>
      <div style="font-size:15px;font-weight:700;flex:1">${o}</div>
      <span style="font-size:10.5px;font-weight:700;background:var(--soft);color:var(--mute);padding:4px 9px;border-radius:999px">OPENS ON ${b}</span>
      <div style="color:var(--orange);font-weight:700;font-size:13.5px">Open →</div>
    </div>`).join('')}
`, { badge: 'BEFORE', active: 'Film', title: 'BEFORE · Desktop team Film (no Photos)' }).replace(
  `<button class="cta">Add photos from today</button>`,
  `<button class="cta" style="background:var(--navy)">Post film link</button>`
).replace(
  `<a class="on">Photos</a>`,
  ``  // remove Photos from before nav — handled below
));

// Fix before-desk: regenerate without Photos in nav
fs.writeFileSync(path.join(DIR, 'before-desk-team.html'), `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=1440, initial-scale=1">
<title>BEFORE · Desktop team Film</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${TOKENS}
.desk{width:1440px;height:900px;margin:0 auto;background:var(--canvas);display:flex;overflow:hidden}
.side{width:236px;flex:0 0 236px;background:var(--panel);border-right:1px solid var(--line);
  display:flex;flex-direction:column;padding:18px 14px}
.logo-block{display:flex;align-items:center;gap:10px;padding:4px 8px 16px}
.logo{width:34px;height:34px;border-radius:8px;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:700}
.logo-block .t{font-size:14px;font-weight:700}.logo-block .s{font-size:10px;color:var(--mute);margin-top:2px;letter-spacing:.04em}
.cta{display:block;width:100%;min-height:40px;border:0;border-radius:999px;background:var(--navy);color:#fff;font-weight:700;font-size:13.5px;margin-bottom:14px}
.nav a{display:block;padding:9px 11px;border-radius:9px;font-size:13.5px;font-weight:500;color:var(--ink);text-decoration:none}
.nav a.on{background:var(--navy);color:#fff;font-weight:600}
.spacer{flex:1}
.util a{display:block;padding:9px 11px;border-radius:9px;font-size:13px;color:var(--mute);text-decoration:none}
.foot{font-size:9.5px;color:var(--mute);padding:10px 8px 4px;letter-spacing:.04em}
.main{flex:1;padding:22px 26px}
.phdr h1{font-size:24px;font-weight:650;letter-spacing:-.02em}
.phdr .sub{font-size:13px;color:var(--mute);margin-top:4px;max-width:52ch;line-height:1.4}
.pill{min-height:40px;padding:0 18px;border-radius:999px;border:0;background:var(--navy);color:#fff;font-weight:700;font-size:14px}
</style></head><body>
<span class="ribbon before">BEFORE</span>
<div class="desk">
  <aside class="side">
    <div class="logo-block"><div class="logo">MH</div><div><div class="t">Miami Hoops</div><div class="s">7TH GRADE · PARENT</div></div></div>
    <button class="cta">Post film link</button>
    <nav class="nav">
      <a>Home</a><a>Teams</a><a>Calendar</a><a class="on">Film</a><a>Settings</a>
    </nav>
    <div class="spacer"></div>
    <div class="util"><a>Messages</a><a>Sign out</a></div>
    <div class="foot">MIAMI HOOPS · SIGNED IN</div>
  </aside>
  <div class="main">
    <div class="phdr">
      <h1>Film · Miami Hoops 7th</h1>
      <p class="sub">Tap a game to open it on YouTube, Dropbox, or Drive. We don't host video. <b>No Photos nav item today</b> — Film is links only; player profile has roster headshot upload only.</p>
    </div>
    <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin:18px 0 14px">
      <div style="font-family:var(--disp);font-size:16px;letter-spacing:.04em;margin-bottom:6px">POST A GAME</div>
      <div style="font-size:13px;color:var(--mute);margin-bottom:14px">Paste a YouTube, Dropbox, or Google Drive URL.</div>
      <div style="height:40px;border:1px solid var(--line);border-radius:8px;background:var(--canvas);margin-bottom:12px"></div>
      <button class="pill">Post film</button>
    </div>
    <div style="background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px">
      <div style="font-size:13px;font-weight:600;color:var(--mute);min-width:100px">Sat, Aug 15</div>
      <div style="font-size:15px;font-weight:700;flex:1">vs South Florida Select</div>
      <span style="font-size:10.5px;font-weight:700;background:var(--soft);color:var(--mute);padding:4px 9px;border-radius:999px">OPENS ON YOUTUBE</span>
      <div style="color:var(--orange);font-weight:700;font-size:13.5px">Open →</div>
    </div>
    <div style="background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:14px">
      <div style="font-size:13px;font-weight:600;color:var(--mute);min-width:100px">Sun, Aug 9</div>
      <div style="font-size:15px;font-weight:700;flex:1">vs Palm Beach Prep</div>
      <span style="font-size:10.5px;font-weight:700;background:var(--soft);color:var(--mute);padding:4px 9px;border-radius:999px">OPENS ON DROPBOX</span>
      <div style="color:var(--orange);font-weight:700;font-size:13.5px">Open →</div>
    </div>
  </div>
</div>
</body></html>`);

console.log('Frames written:', fs.readdirSync(DIR).filter(f=>f.endsWith('.html')).join(', '));
