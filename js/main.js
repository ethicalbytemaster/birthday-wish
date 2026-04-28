/**
 * Cinematic Birthday Website
 * Main JavaScript - main.js
 */

// Smooth scroll navigation
document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.getAttribute('data-scroll'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Floating hearts in hero section
function createFloatingHearts() {
  const heartsLayer = document.querySelector('.hearts-layer');
  if (!heartsLayer) return;
  for (let i = 0; i < 24; i++) {
    const heart = document.createElement('div');
    heart.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${12 + Math.random() * 16}px;
      height: ${12 + Math.random() * 16}px;
      opacity: ${0.12 + Math.random() * 0.28};
      animation: floatHeart ${9 + Math.random() * 9}s linear ${Math.random() * 4}s infinite;
    `;
    heart.innerHTML = '<svg viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.6 0C20.5 0 17.9 1.6 16 4.1C14.1 1.6 11.5 0 8.4 0C3.8 0 0 3.8 0 8.5C0 17.5 16 29 16 29C16 29 32 17.5 32 8.5C32 3.8 28.2 0 23.6 0Z" fill="rgba(255,105,180,.84)"/></svg>';
    heartsLayer.appendChild(heart);
  }
}
createFloatingHearts();

// Message slider
document.addEventListener('DOMContentLoaded', () => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  let currentSlide = 0;

  function setSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentSlide = index;
  }

  dots.forEach((dot, index) => dot.addEventListener('click', () => setSlide(index)));
  setInterval(() => setSlide((currentSlide + 1) % slides.length), 3800);
});

// Celebration stage interactions
document.addEventListener('DOMContentLoaded', () => {
  const celebrationStage = document.getElementById('celebrationStage');
  const fairyLayer = document.getElementById('fairyLayer');
  const balloonLayer = document.getElementById('balloonLayer');
  const hintText = document.getElementById('hintText');
  const music = document.getElementById('birthdayMusic');
  const stepButtons = document.querySelectorAll('.step-btn');

  // Create fairy bulbs
  for (let i = 0; i < 11; i++) {
    const bulb = document.createElement('div');
    bulb.className = 'bulb';
    bulb.style.left = `${8 + i * 8.1}%`;
    bulb.style.top = `${84 + Math.sin(i / 1.6) * 20}px`;
    fairyLayer?.appendChild(bulb);
  }

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
    for (let i = 0; i < 16; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.left = `${4 + Math.random() * 90}%`;
      balloon.style.background = palette[i % palette.length];
      balloon.style.animationDuration = `${8 + Math.random() * 6}s`;
      balloon.style.animationDelay = `${Math.random() * 1.4}s`;
      balloon.style.setProperty('--drift', `${-60 + Math.random() * 120}px`);
      balloonLayer.appendChild(balloon);
    }
  }

  // Step 1: Lights
  document.querySelector('[data-action="lights"]')?.addEventListener('click', () => {
    activateStep('lights');
    celebrationStage?.classList.add('bright');
    document.querySelectorAll('.bulb').forEach((bulb, i) => setTimeout(() => bulb.classList.add('on'), i * 80));
    if (hintText) hintText.textContent = 'The fairy lights are glowing now. Start the music to deepen the mood of the scene.';
  });

  // Step 2: Music
  document.querySelector('[data-action="music"]')?.addEventListener('click', async () => {
    activateStep('music');
    try {
      await music?.play();
      if (hintText) hintText.textContent = 'The music is playing softly. Now let the balloons rise and brighten the whole frame.';
    } catch {
      if (hintText) hintText.textContent = 'Add your real song to assets/audio/birthday.mp3, then tap again if the browser blocks playback before interaction.';
    }
  });

  // Step 3: Balloons
  document.querySelector('[data-action="balloons"]')?.addEventListener('click', () => {
    activateStep('balloons');
    launchBalloons();
    if (hintText) hintText.textContent = 'The balloons are floating beautifully. Continue to the next scene for the letter reveal.';
  });

  // Step 4: Continue
  document.querySelector('[data-action="continue"]')?.addEventListener('click', () => {
    activateStep('continue');
    if (hintText) hintText.textContent = 'The next scene is ready. Scroll down and open the curtain.';
    document.querySelector('#curtain')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Curtain reveal
document.addEventListener('DOMContentLoaded', () => {
  const curtainShell = document.getElementById('curtainShell');
  const sparklesLayer = document.getElementById('sparklesLayer');

  document.getElementById('revealCurtainBtn')?.addEventListener('click', () => {
    curtainShell?.classList.toggle('open');
  });

  // Create sparkles
  if (sparklesLayer) {
    for (let i = 0; i < 24; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 2.4}s`;
      sparklesLayer.appendChild(sparkle);
    }
  }
});

// Replay button
document.addEventListener('DOMContentLoaded', () => {
  const replayBtn = document.getElementById('replayBtn');
  const music = document.getElementById('birthdayMusic');
  const balloonLayer = document.getElementById('balloonLayer');
  const curtainShell = document.getElementById('curtainShell');
  const celebrationStage = document.getElementById('celebrationStage');
  const hintText = document.getElementById('hintText');

  replayBtn?.addEventListener('click', () => {
    curtainShell?.classList.remove('open');
    celebrationStage?.classList.remove('bright');
    if (balloonLayer) balloonLayer.innerHTML = '';
    document.querySelectorAll('.bulb').forEach(b => b.classList.remove('on'));
    music?.pause();
    if (music) music.currentTime = 0;
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');
    slides.forEach(s => s.classList.remove('active'));
    slides[0]?.classList.add('active');
    dots.forEach(d => d.classList.remove('active'));
    dots[0]?.classList.add('active');
    document.querySelectorAll('.step-btn').forEach(btn => btn.classList.remove('active'));
    if (hintText) hintText.textContent = 'Tap the first step to wake the fairy lights above the stage.';
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  });
});
