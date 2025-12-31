// ========= EDIT THESE ONLY =========
const CONFIG = {
  herName: "Vaishnavi",
  herNick: "Vaishu",
  yourName: "Rohit",

  myTZ: "Europe/London",
  herTZ: "Asia/Kolkata",

  // Change this if your official date is different (YYYY-MM-DD)
  startDate: "2024-01-01",

  // Choose your meeting date in May or June 2026
  // Example May: "2026-05-20T10:00:00"
  nextMeet: "2026-06-01T10:00:00",

  // New Year target (Vaishu time)
  newYearTarget: "2026-01-01T00:00:00",

  reasons: [
    "Vaishu, you are my peace.",
    "You make distance feel small.",
    "Your voice fixes my whole day.",
    "Your heart and care are rare.",
    "You feel like home to me.",
    "I’m proud of you always.",
    "You are my favourite person.",
    "I choose you — again and again.",
    "You make me want to be better.",
    "Because the way I love you, I can’t love anyone else."
  ],

  // Optional photos if assets/vaishu.jpg fails to load
  photoPool: [
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1520975958225-68d4aefc6586?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?auto=format&fit=crop&w=1400&q=60"
  ]
};
// ==================================

const $ = (id) => document.getElementById(id);

// Helpers
function fmtTime(tz){
  return new Intl.DateTimeFormat([], { hour:"2-digit", minute:"2-digit", hour12:true, timeZone: tz }).format(new Date());
}
function prettyDate(d){
  return new Intl.DateTimeFormat("en-GB", { day:"2-digit", month:"short", year:"numeric" }).format(d);
}
function nowInTZ(tz){
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz, year:"numeric", month:"2-digit", day:"2-digit",
    hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false
  }).formatToParts(new Date());
  const o = {};
  for(const p of parts) o[p.type] = p.value;
  return new Date(`${o.year}-${o.month}-${o.day}T${o.hour}:${o.minute}:${o.second}`);
}
function clamp(n,a,b){ return Math.max(a, Math.min(b, n)); }

// Names
$("herNameBig").textContent = CONFIG.herName;

// Times
function tickTimes(){
  $("myTime").textContent = fmtTime(CONFIG.myTZ);
  $("herTime").textContent = fmtTime(CONFIG.herTZ);
}
tickTimes();
setInterval(tickTimes, 1000);

// Days together
function daysTogether(){
  const start = new Date(CONFIG.startDate + "T00:00:00");
  const now = new Date();
  const diff = now - start;
  const days = Math.floor(diff / (1000*60*60*24));
  $("daysTogether").textContent = `${days} days`;
  const sp = $("startPretty");
  if(sp) sp.textContent = prettyDate(start);
}
daysTogether();
setInterval(daysTogether, 60_000);

// Meet countdown
function meetCountdown(){
  const t = new Date(CONFIG.nextMeet);
  const now = new Date();
  const diff = t - now;
  if(diff <= 0){
    $("countdownMeet").textContent = "I’m with you now 💖";
    return;
  }
  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);
  $("countdownMeet").textContent = `${d}d ${h}h ${m}m`;
}
meetCountdown();
setInterval(meetCountdown, 1000);

// New Year countdown (Vaishu time)
function nyCountdown(){
  const nowHer = nowInTZ(CONFIG.herTZ);
  const target = new Date(CONFIG.newYearTarget);
  const diff = target - nowHer;
  if(diff <= 0){
    $("nyCountdown").textContent = "🎉 Happy New Year, Vaishu! 🎉";
    sparkleBurst(30);
    return;
  }
  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);
  const s = Math.floor((diff/1000)%60);
  $("nyCountdown").textContent = `${d}d ${h}h ${m}m ${s}s`;
}
nyCountdown();
setInterval(nyCountdown, 1000);

// Reasons
function newReason(){
  const r = CONFIG.reasons[Math.floor(Math.random() * CONFIG.reasons.length)];
  $("reasonText").textContent = r;
  return r;
}
newReason();

$("newReason").addEventListener("click", () => {
  newReason();
  sparkleBurst(18);
});

$("copyReason").addEventListener("click", async () => {
  const text = $("reasonText").textContent.trim();
  try{ await navigator.clipboard.writeText(text); toast("Copied 💖"); }
  catch{ toast("Copy not allowed here 😅"); }
});

// Open when
document.querySelectorAll(".chipbtn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    $("openWhenNote").textContent = btn.dataset.msg;
    sparkleBurst(14);
  });
});

// Quiz
let score = 0, answered = 0;
document.querySelectorAll(".opt").forEach(b=>{
  b.addEventListener("click", ()=>{
    if(b.classList.contains("locked")) return;
    b.classList.add("locked");
    answered++;

    if(b.dataset.correct === "1") score++;

    if(answered === 3){
      const msg =
        score === 3 ? `Perfect 💯 — ${CONFIG.herNick}, you know us too well 😭❤️` :
        score === 2 ? `So close 🥺❤️ but still cute!` :
                      `It’s okay 😄 I’ll remind you with kisses.`;
      $("quizResult").textContent = `Score: ${score}/3 — ${msg}`;
      sparkleBurst(22);
    }
  });
});

// Photo rotate (only affects fallback pool)
let pIndex = 0;
$("swapPhoto").addEventListener("click", ()=>{
  pIndex = (pIndex + 1) % CONFIG.photoPool.length;
  $("mainPhoto").src = CONFIG.photoPool[pIndex];
  sparkleBurst(12);
});

$("sparkle").addEventListener("click", ()=> sparkleBurst(20));

// Theme
$("toggleTheme").addEventListener("click", ()=>{
  document.body.classList.toggle("light");
  $("toggleTheme").textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Modal
const modal = $("letterModal");
$("openLetter").addEventListener("click", ()=> openModal());
$("closeLetter").addEventListener("click", ()=> closeModal());
modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });

function openModal(){
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  sparkleBurst(10);
}
function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

$("copyLetter").addEventListener("click", async ()=>{
  const text = $("letterBody").innerText.trim();
  try{ await navigator.clipboard.writeText(text); toast("Letter copied 💌"); }
  catch{ toast("Copy not allowed here 😅"); }
});
$("moreMagic").addEventListener("click", ()=> sparkleBurst(26));

// Celebrate
$("celebrate").addEventListener("click", ()=>{
  sparkleBurst(35); sparkleBurst(35); sparkleBurst(35);
});

// Sparkles
function sparkleBurst(n=18){
  for(let i=0;i<n;i++){
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = Math.random() > 0.5 ? "✨" : (Math.random() > 0.5 ? "💖" : "🎆");
    s.style.left = (Math.random()*90 + 5) + "vw";
    s.style.top = (Math.random()*45 + 10) + "vh";
    s.style.fontSize = (Math.random()*16 + 14) + "px";
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 900);
  }
}

// Toast
let toastEl;
function toast(msg){
  if(!toastEl){
    toastEl = document.createElement("div");
    toastEl.style.position="fixed";
    toastEl.style.left="50%";
    toastEl.style.bottom="18px";
    toastEl.style.transform="translateX(-50%)";
    toastEl.style.padding="10px 12px";
    toastEl.style.border="1px solid rgba(255,255,255,.14)";
    toastEl.style.borderRadius="14px";
    toastEl.style.background="rgba(0,0,0,.55)";
    toastEl.style.color="white";
    toastEl.style.zIndex="60";
    toastEl.style.fontWeight="800";
    toastEl.style.backdropFilter="blur(10px)";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.style.opacity="1";
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(()=> toastEl.style.opacity="0", 1100);
}

// Canvas fireworks background
const canvas = $("bg");
const ctx = canvas.getContext("2d");
let w,h;
let particles = [];
let stars = [];

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  const starCount = clamp(Math.floor((w*h)/9000), 80, 220);
  stars = Array.from({length: starCount}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*1.4 + 0.2,
    v: Math.random()*0.25 + 0.04,
    a: Math.random()*0.6 + 0.3
  }));
}
window.addEventListener("resize", resize);
resize();

function spawnFirework(){
  const x = Math.random()*w;
  const y = Math.random()*h*0.55 + h*0.08;
  const count = Math.floor(Math.random()*22) + 26;

  for(let i=0;i<count;i++){
    const ang = (Math.PI*2) * (i / count);
    const spd = Math.random()*2.6 + 1.2;
    particles.push({
      x, y,
      vx: Math.cos(ang)*spd,
      vy: Math.sin(ang)*spd,
      life: 80 + Math.random()*40,
      size: Math.random()*2 + 1
    });
  }
}

let fwTimer = 0;
function draw(){
  ctx.clearRect(0,0,w,h);

  for(const s of stars){
    s.y += s.v;
    if(s.y > h){ s.y = -5; s.x = Math.random()*w; }
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  for(let i=particles.length-1;i>=0;i--){
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.985;
    p.vy *= 0.985;
    p.vy += 0.01;
    p.life -= 1;

    const alpha = clamp(p.life/120, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,.95)";
    ctx.fill();

    if(p.life <= 0) particles.splice(i,1);
  }

  fwTimer++;
  if(fwTimer % 120 === 0) spawnFirework();

  requestAnimationFrame(draw);
}
draw();
