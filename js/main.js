/**
 * Cinematic Birthday Website
 * Enhanced JavaScript - main.js
 */

// === Particle Background ===
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const particleCount = Math.min(60, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < particleCount; i++) {
    const span = document.createElement('span');
    const size = Math.random() * 4 + 2;
    span.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px; height: ${size}px;
      --size: ${size * 2}px;
      --dur: ${3 + Math.random() * 4}s;
      animation-delay: ${Math.random() * 3}s;
    `;
    container.appendChild(span);
  }
}
initParticles();

// === Mobile Menu Toggle ===
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('mobile-open');
    });
  });
}

// === Smooth Scroll Navigation ===
document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.getAttribute('data-scroll'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// === Floating Hearts in Hero ===
function createFloatingHearts() {
  const heartsLayer = document.querySelector('.hearts-layer');
  if (!heartsLayer) return;
  const heartCount = Math.min(20, Math.floor(window.innerWidth / 45));
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${10 + Math.random() * 14}px;
      height: ${10 + Math.random() * 14}px;
      opacity: ${0.1 + Math.random() * 0.25};
      animation: floatHeart ${8 + Math.random() * 8}s linear ${Math.random() * 4}s infinite;
    `;
    heart.innerHTML = '&#10084;';
    heart.style.color = 'rgba(255, 90, 165, 0.35)';
    heart.style.fontSize = '1em';
    heartsLayer.appendChild(heart);
  }
}
createFloatingHearts();

// === Message Slider ===
const slides = document.querySelectorAll('.slide');
const sliderDots = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;

if (slides.length > 0 && sliderDots) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => setSlide(i));
    sliderDots.appendChild(dot);
  });

  function setSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    sliderDots.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentSlide = index;
  }

  prevBtn?.addEventListener('click', () => setSlide((currentSlide - 1 + slides.length) % slides.length));
  nextBtn?.addEventListener('click', () => setSlide((currentSlide + 1) % slides.length));


  
// Tap on slide to go to next (no auto-advance - user controls the pace)
slides.forEach(slide => {
  slide.addEventListener('click', () => {
    setSlide((currentSlide + 1) % slides.length);
  });
});

// Also add keyboard navigation
if (slides.length > 0) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') setSlide((currentSlide + 1) % slides.length);
    if (e.key === 'ArrowLeft') setSlide((currentSlide - 1 + slides.length) % slides.length);
  });
}

// === Celebration Section ===
const celebrationStage = document.getElementById('celebrationStage');
const stepButtons = document.querySelectorAll('.action-btn');
const balloonLayer = document.querySelector('.balloon-layer');
const bgMusic = document.getElementById('bgMusic');
let music = bgMusic;
let musicStarted = false;

function activateStep(action) {
  stepButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.action === action));
}

function launchBalloons() {
  if (!balloonLayer) return;
  balloonLayer.innerHTML = '';
  const palette = [
    'linear-gradient(180deg,#ff7db8,#d61d63)',
    'linear-gradient(180deg,#ffd76d,#f28f01)',
    'linear-gradient(180deg,#ffbfdc,#ff5aa5)',
    'linear-gradient(180deg,#ffe9a4,#f5c96f)',
    'linear-gradient(180deg,#ff6ba7,#8c124b)'
  ];
  const balloonCount = Math.min(14, Math.floor(window.innerWidth / 28));
  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = `${3 + Math.random() * 92}%`;
    balloon.style.background = palette[i % palette.length];
    balloon.style.animationDuration = `${7 + Math.random() * 5}s`;
    balloon.style.animationDelay = `${Math.random() * 1.2}s`;
    balloon.style.setProperty('--drift', `${-50 + Math.random() * 100}px`);
    balloonLayer.appendChild(balloon);
  }
}

stepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    if (action === 'lights') {
      celebrationStage?.classList.toggle('lit');
      activateStep(action);
    } else if (action === 'music') {
      if (music && !musicStarted) {
        music.play().then(() => { musicStarted = true; }).catch(() => {});
      } else if (music && musicStarted) {
        music.paused ? music.play() : music.pause();
      }
      activateStep(action);
    } else if (action === 'balloons') {
      launchBalloons();
      activateStep(action);
    } else if (action === 'continue') {
      celebrationStage?.classList.add('lit');
      launchBalloons();
      activateStep(action);
      setTimeout(() => {
        document.querySelector('#curtain')?.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    }
  });
});

// === Curtain Reveal ===
const curtainShell = document.getElementById('curtainShell');
document.getElementById('revealCurtainBtn')?.addEventListener('click', () => {
  curtainShell?.classList.toggle('open');
});

// === Replay Button ===
document.querySelectorAll('[data-replay]').forEach(btn => {
  btn.addEventListener('click', () => {
    celebrationStage?.classList.remove('lit');
    curtainShell?.classList.remove('open');
    stepButtons.forEach(b => b.classList.remove('active'));
    currentSlide = 0;
    if (slides.length > 0) setSlide(0);
    if (balloonLayer) balloonLayer.innerHTML = '';
    if (music) { music.pause(); musicStarted = false; music.currentTime = 0; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// === Background Music - Play on first user interaction ===
function tryPlayMusic() {
  if (bgMusic && !musicStarted) {
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
  document.removeEventListener('click', tryPlayMusic);
  document.removeEventListener('scroll', tryPlayMusic);
  document.removeEventListener('touchstart', tryPlayMusic);
}
document.addEventListener('click', tryPlayMusic, { once: true });
document.addEventListener('scroll', tryPlayMusic, { once: true });
document.addEventListener('touchstart', tryPlayMusic, { once: true });

// === Scroll Animations (Intersection Observer) ===
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -10% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  sectionObserver.observe(section);
});

// === Header Scroll Effect ===
const header = document.querySelector('.site-header');
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (currentY > 80) header?.classList.add('scrolled');
  else header?.classList.remove('scrolled');
  lastScrollY = currentY;
}, { passive: true });

// === Active Nav Link Highlight ===
const sections = document.querySelectorAll('.section[id]');
const navLinksArr = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksArr.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(sec => navObserver.observe(sec));

// === Memory Card Lightbox (Simple) ===
document.querySelectorAll('.memory-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (!img) return;
    // Create a fullscreen overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;transition:opacity 0.3s ease;';
    const overlayImg = document.createElement('img');
    overlayImg.src = img.src;
    overlayImg.alt = img.alt;
    overlayImg.style.cssText = 'max-width:90vw;max-height:80vh;object-fit:contain;border-radius:var(--radius-xl);box-shadow:0 20px 80px rgba(0,0,0,0.5);';
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
    });
  });
});
