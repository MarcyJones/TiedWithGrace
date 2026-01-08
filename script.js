// Hero background rotator
const heroImages = [
  "assets/images/CF436ADA-B655-4727-A304-B2A5E6981CD8.jpeg",
  "assets/images/A782ABD1-83BC-45D2-ACA0-D97854715C3C.jpeg",
];

let heroIndex = 0;

function setHero() {
  const el = document.getElementById("heroMedia");
  if (!el) return;
  el.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  heroIndex = (heroIndex + 1) % heroImages.length;
}

setHero();
setInterval(setHero, 6500);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Simple email signup (front-end only)
function handleSignup(e) {
  e.preventDefault();
  const msg = document.getElementById("signupMsg");
  msg.textContent = "Thanks for joining! You’re on the list 💗";
  e.target.reset();
  return false;
}

// Mobile nav toggle (simple)
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.style.display === "flex";
    nav.style.display = isOpen ? "none" : "flex";
    nav.style.flexDirection = "column";
    nav.style.position = "absolute";
    nav.style.right = "18px";
    nav.style.top = "76px";
    nav.style.padding = "14px";
    nav.style.background = "rgba(0,0,0,.92)";
    nav.style.border = "1px solid rgba(255,255,255,.12)";
    nav.style.borderRadius = "16px";
    nav.style.gap = "12px";
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
}
