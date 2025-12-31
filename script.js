// ======= PERSONALIZE HERE =======
const CONFIG = {
  herName: "Nischitha",        // change
  yourName: "Rohit",           // change
  // Use local time zones (IANA format). Example India: "Asia/Kolkata"
  myTZ: "Europe/London",
  herTZ: "Asia/Kolkata",

  // Date you started (YYYY-MM-DD). Used for "days together"
  startDate: "2024-01-01",

  // Next meet date/time (YYYY-MM-DDTHH:MM:SS). Used for countdown
  nextMeet: "2026-03-15T10:00:00",

  metDateText: "01 Jan 2024",

  reasons: [
    "You make my heart feel safe.",
    "You believe in me even when I’m tired.",
    "Your smile fixes my mood instantly.",
    "The way you care… it’s rare.",
    "You are my calm and my chaos (in the best way).",
    "You feel like home, even from far away.",
    "I’m proud of you — always.",
    "Every day with you feels like progress.",
    "You’re beautiful inside and out.",
    "I want to build a future with you."
  ]
};
// =================================

const $ = (id) => document.getElementById(id);

// Set names
$("herName").textContent = CONFIG.herName;
$("herName2").textContent = CONFIG.herName;
$("yourName").textContent = CONFIG.yourName;
$("yourName2").textContent = CONFIG.yourName;
$("metDateText").textContent = CONFIG.metDateText;

// Random reason
function newReason(){
  const r = CONFIG.reasons[Math.floor(Math.random() * CONFIG.reasons.length)];
  $("reasonText").textContent = r;
}
$("newReason").addEventListener("click", () => { newReason(); sparkleBurst(); });

// Letter modal
const modal = $("letterModal");
$("openLetter").addEventListener("click", () => { modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); });
$("closeLetter").addEventListener("click", () => { modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); });
modal.addEventListener("click", (e) => { if(e.target === modal) $("closeLetter").click(); });

// Theme toggle
$("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("light");
  $("toggleMode").textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Times
function fmtTime(tz){
  return new Intl.DateTimeFormat([], { hour:"2-digit", minute:"2-digit", hour12:true, timeZone: tz }).format(new Date());
}
function tickTimes(){
  $("myTime").textContent = fmtTime(CONFIG.myTZ);
  $("herTime").textContent = fmtTime(CONFIG.herTZ);
}
setInterval(tickTimes, 1000);
tickTimes();

// Days together
function daysTogether(){
  const start = new Date(CONFIG.startDate + "T00:00:00");
  const now = new Date();
  const diff = now - start;
  const days = Math.floor(diff / (1000*60*60*24));
  $("daysTogether").textContent = `${days} days`;
}
daysTogether();
setInterval(daysTogether, 60_000);

// Countdown to next meet
function countdown(){
  const target = new Date(CONFIG.nextMeet);
  const now = new Date();
  const diff = target - now;
  if(diff <= 0){
    $("countdown").textContent = "I’m with you now 💖";
    return;
  }
  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);
  $("countdown").textContent = `${d}d ${h}h ${m}m`;
}
countdown();
setInterval(countdown, 1000);

// Open-when messages
document.querySelectorAll(".msg").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    $("openWhenNote").textContent = btn.dataset.msg;
    sparkleBurst();
  });
});

// Quiz logic
let score = 0, answered = 0;
document.querySelectorAll(".opt").forEach(b=>{
  b.addEventListener("click", ()=>{
    if(b.dataset.locked) return;
    b.dataset.locked = "1";
    answered++;

    const correct = b.dataset.correct === "1";
    b.style.opacity = correct ? "1" : ".6";
    if(correct) score++;

    if(answered === 3){
      const msg = score === 3 ? "Perfect 💯 — you know us too well 😭❤️"
               : score === 2 ? "So close 🥺❤️"
               : "It’s okay 😄 I’ll remind you with kisses.";
      $("quizResult").textContent = `Score: ${score}/3 — ${msg}`;
      sparkleBurst();
    }
  });
});

// Confetti-ish sparkles (simple, lightweight)
function sparkleBurst(){
  for(let i=0;i<18;i++){
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = Math.random() > 0.5 ? "✨" : "💖";
    s.style.left = (Math.random()*90 + 5) + "vw";
    s.style.top = (Math.random()*30 + 10) + "vh";
    s.style.fontSize = (Math.random()*14 + 14) + "px";
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 900);
  }
}
$("confetti").addEventListener("click", sparkleBurst);

// Sparkle styling injected
const st = document.createElement("style");
st.textContent = `
.sparkle{
  position:fixed; z-index:30; pointer-events:none;
  animation: pop .9s ease forwards;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.35));
}
@keyframes pop{
  0%{transform:translateY(10px) scale(.8); opacity:0}
  20%{opacity:1}
  100%{transform:translateY(-30px) scale(1.2); opacity:0}
}`;
document.head.appendChild(st);

// Stars background (canvas)
const canvas = $("stars");
const ctx = canvas.getContext("2d");
let w,h,stars=[];
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = Array.from({length: Math.min(220, Math.floor((w*h)/8000))}, () => ({
    x: Math.random()*w, y: Math.random()*h,
    r: Math.random()*1.5 + 0.2,
    v: Math.random()*0.25 + 0.05
  }));
}
window.addEventListener("resize", resize);
resize();

function draw(){
  ctx.clearRect(0,0,w,h);
  ctx.globalAlpha = 1;
  for(const s of stars){
    s.y += s.v;
    if(s.y > h) { s.y = -5; s.x = Math.random()*w; }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// Auto-show a reason on load
newReason();
