const obs = new IntersectionObserver(
  es => es.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

const barObs = new IntersectionObserver(es => {
  es.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(b => {
        b.style.transform = `scaleX(${b.dataset.w})`;
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const skillSection = document.querySelector('#skills');
if(skillSection) barObs.observe(skillSection);
document.querySelectorAll('.skill-fill').forEach(b => b.style.transform = 'scaleX(0)');


['hero-eyebrow','hero-name','hero-tagline','hero-actions'].forEach((cls,i) => {
  const el = document.querySelector('.'+cls);
  if(el) setTimeout(() => el.style.opacity = '1', 300 + i * 150);
});


// DEMOS 
function calculateTotal(p,q) { return p * q; }
function doCalc() {
  const p = parseFloat(document.getElementById('dp').value)||0;
  const q = parseInt(document.getElementById('dq').value)||0;
  document.getElementById('dresult').textContent = '₹' + calculateTotal(p,q).toLocaleString('en-IN');
}
doCalc();

let isOn = false;
function toggleSt() {
  isOn = !isOn;
  document.getElementById('s-dot').className = isOn ? 'on' : '';
  const t = document.getElementById('s-text');
  t.textContent = isOn ? 'Status: Online' : 'Status: Offline';
  t.className = isOn ? 'on' : '';
}

function hIn() {
  document.getElementById('hov-box').style.borderColor = 'rgba(212,168,83,.4)';
  document.getElementById('hov-txt').innerHTML = 'Tetris<br/>C# · Unity · 2024';
  document.getElementById('hov-txt').style.color = 'var(--accent)';
}
function hOut() {
  document.getElementById('hov-box').style.borderColor = 'var(--border)';
  document.getElementById('hov-txt').textContent = 'Hover to inspect';
  document.getElementById('hov-txt').style.color = 'var(--muted)';
}

function chkPass(v) {
  let s = 0;
  if(v.length >= 8) s++;
  if(/[A-Z]/.test(v)) s++;
  if(/[0-9]/.test(v)) s++;
  if(/[^a-zA-Z0-9]/.test(v)) s++;
  const colors = ['#e05252','#e05252','#d4a853','#52a852'];
  const labels = ['Weak','Fair','Good','Strong'];
  const fill = document.getElementById('sfill');
  fill.style.width = v ? (s*25)+'%' : '0';
  fill.style.background = colors[s-1]||'transparent';
  document.getElementById('smsg').textContent = v ? labels[s-1]||'' : '';
  document.getElementById('smsg').style.color = colors[s-1]||'var(--muted)';
}

const galData = [
  {e:'🌿',bg:'linear-gradient(135deg,#1b2a1e,#2d6a4f)'},
  {e:'🔥',bg:'linear-gradient(135deg,#2a1010,#6b2020)'},
  {e:'🌊',bg:'linear-gradient(135deg,#0a1a30,#1a3a6a)'},
];
function swGal(i,el) {
  const m = document.getElementById('gmain');
  m.style.opacity = '0';
  setTimeout(() => { m.textContent = galData[i].e; m.style.background = galData[i].bg; m.style.opacity = '1'; }, 350);
  document.querySelectorAll('.gal-t').forEach((t,j) => t.classList.toggle('act', j===i));
}

//CONTACT
function submitForm(e) {
  e.preventDefault();
  let ok = true;
  const set = (id, msg) => { const el = document.getElementById(id); el.textContent = msg; };
  const name = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const msg = document.getElementById('fm').value.trim();
  set('fnE',''); set('feE',''); set('fmE','');
  if(name.length < 2)  { set('fnE','Enter your name.'); ok = false; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { set('feE','Enter a valid email.'); ok = false; }
  if(msg.length < 10)  { set('fmE','Message is too short.'); ok = false; }
  if(ok) {
    document.getElementById('fOk').textContent = "Message sent! I'll get back to you soon.";
    document.getElementById('cForm').reset();
    setTimeout(() => document.getElementById('fOk').textContent = '', 5000);
  }
}

//  NAVBAR 
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').style.borderBottomColor =
    window.scrollY > 40 ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.07)';
});