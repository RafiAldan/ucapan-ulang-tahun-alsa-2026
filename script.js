/* ============================================================
   Birthday Web — Alsa & Aldan
   ============================================================ */

// ------------------------------------------------------------
// CONFIG — ubah di sini
// ------------------------------------------------------------
const CONFIG = {
  password: "191007",   // ganti password aksesnya di sini
  birthdayNumber: 19
};

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. PASSWORD GATE
     ============================================================ */
  const gate = document.getElementById('gate');
  const gateForm = document.getElementById('gate-form');
  const gateInput = document.getElementById('gate-input');
  const gateError = document.getElementById('gate-error');
  const gateIcon = document.getElementById('gate-icon');
  const gateToggle = document.getElementById('gate-toggle');
  const gateEyeIcon = document.getElementById('gate-eye-icon');
  const app = document.getElementById('app');

  // show/hide password toggle
  gateToggle.addEventListener('click', () => {
    const isHidden = gateInput.type === 'password';
    gateInput.type = isHidden ? 'text' : 'password';
    gateEyeIcon.textContent = isHidden ? '🙈' : '👁️';
    gateInput.focus();
  });

  gateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = gateInput.value.trim().toLowerCase();
    if (value === CONFIG.password.toLowerCase()) {
      gateIcon.textContent = '🔓';
      gate.classList.remove('active');
      gate.style.display = 'none';
      app.style.display = 'block';
      startExperience();
    } else {
      gateError.classList.add('show');
      gateIcon.classList.add('shake');
      setTimeout(() => gateIcon.classList.remove('shake'), 400);
      gateInput.value = '';
      gateInput.focus();
    }
  });

  /* ============================================================
     2. STAR / PARTICLE BACKGROUND (runs always, behind gate too)
     ============================================================ */
  function spawnParticles() {
    const container = document.getElementById('particles');
    const symbols = ['✦', '✧', '❄', '💙'];
    const count = window.innerWidth < 600 ? 18 : 30;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const isStar = Math.random() > 0.5;
      el.className = isStar ? 'particle star' : 'particle';
      if (isStar) {
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      } else {
        const size = 4 + Math.random() * 6;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
      }
      el.style.left = Math.random() * 100 + 'vw';
      const duration = 10 + Math.random() * 14;
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = (Math.random() * duration) + 's';
      el.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      container.appendChild(el);
    }
  }
  spawnParticles();

  /* ============================================================
     3. MAIN EXPERIENCE (starts after password unlock)
     ============================================================ */
  function startExperience() {
    initConfetti();
    initCounter();
    initEnvelope();
    initGallery();
    initLightbox();
    initMusic();
    initNavigation();
  }

  /* ---------- 3a. Confetti on hero ---------- */
  function initConfetti() {
    const layer = document.getElementById('confetti-layer');
    const colors = ['#3b8ef0', '#8cc6ff', '#5aa9ff', '#ffffff', '#2d6fd6'];
    const count = window.innerWidth < 600 ? 26 : 40;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetto';
      el.style.left = Math.random() * 100 + '%';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = (2.4 + Math.random() * 2) + 's';
      el.style.animationDelay = (Math.random() * 1.8) + 's';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      layer.appendChild(el);
    }
  }

  /* ---------- 3b. Animated "19" counter ---------- */
  function initCounter() {
    const el = document.getElementById('counter-number');
    const target = CONFIG.birthdayNumber;
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / target), 40);
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, stepTime);
  }

  /* ---------- 3c. Love letter envelope reveal ---------- */
  function initEnvelope() {
    const envelopeBtn = document.getElementById('envelope-btn');
    const envelopeWrap = document.getElementById('envelope-wrap');
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letter-paper');
    const revealBtn = document.getElementById('reveal-btn');

    let opened = false;

    envelopeBtn.addEventListener('click', () => {
      if (opened) return;
      opened = true;

      // Step 1: flap opens, paper slides fully out of the sealed envelope
      envelope.classList.add('open');
      envelopeBtn.disabled = true;
      envelopeBtn.textContent = 'Membuka...';

      // Step 2: after the paper has slid all the way out, fade the
      // envelope away and reveal the full letter to read
      setTimeout(() => {
        envelopeWrap.classList.add('fade-out');
        setTimeout(() => {
          envelopeWrap.hidden = true;
          envelopeWrap.style.display = 'none';
          letterPaper.hidden = false;
          letterPaper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }, 800);
    });

    let currentParagraph = 1;
    const totalParagraphs = 4;

    revealBtn.addEventListener('click', () => {
      // show current, then advance
      const nextP = document.querySelector(`.letter-paragraph[data-p="${currentParagraph + 1}"]`);
      if (nextP) {
        currentParagraph++;
        nextP.hidden = false;
        if (currentParagraph >= totalParagraphs) {
          revealBtn.textContent = 'Selesai 💙';
        }
        nextP.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // already at the end, just scroll
        revealBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ---------- 3d. Gallery (lightbox is wired separately) ---------- */
  function initGallery() {
    // nothing extra needed here; click handling lives in initLightbox
  }

  /* ---------- 3e. Lightbox ---------- */
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-img');
        lightboxImg.src = src;
        lightbox.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
      }
    });
  }

  /* ---------- 3f. Background music ---------- */
  function initMusic() {
    const audio = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    let isPlaying = false;

    // try autoplay (muted-less autoplay is usually blocked by browsers,
    // so we attempt play and gracefully fall back to a tap-to-play state)
    const tryAutoplay = () => {
      audio.play().then(() => {
        isPlaying = true;
        icon.textContent = '❚❚';
      }).catch(() => {
        isPlaying = false;
        icon.textContent = '▶';
      });
    };
    tryAutoplay();

    toggleBtn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        icon.textContent = '▶';
      } else {
        audio.play();
        icon.textContent = '❚❚';
      }
      isPlaying = !isPlaying;
    });
  }

  /* ---------- 3g. Window navigation (next / back) ---------- */
  function initNavigation() {
    const windows = Array.from(document.querySelectorAll('.window'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    let currentIndex = 0; // index into windows array, 0..length-1 (last = final)

    function showWindow(index) {
      windows.forEach((w, i) => {
        w.classList.toggle('active', i === index);
      });
      // update dots: only first 4 "real" windows have dots (0-3), final screen keeps last dot state
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === Math.min(index, dots.length - 1));
      });
      currentIndex = index;
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }

    document.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentIndex < windows.length - 1) {
          showWindow(currentIndex + 1);
        }
      });
    });

    document.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentIndex > 0) {
          showWindow(currentIndex - 1);
        }
      });
    });

    const finishBtn = document.getElementById('finish-btn');
    finishBtn.addEventListener('click', () => {
      showWindow(windows.length - 1); // final screen
    });

    const replayBtn = document.getElementById('replay-btn');
    replayBtn.addEventListener('click', () => {
      showWindow(0);
    });

    showWindow(0);
  }

});
