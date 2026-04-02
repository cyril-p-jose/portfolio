/* =====================================================
   CYRIL P JOSE — PORTFOLIO  |  script.js
   ===================================================== */

/* ─── Hardcoded credentials ─────────────────────────── */
const VALID_EMAIL = "cyrilpjose2025@gmail.com";
const VALID_PHONE = "9446265371";

/* ─── Typing animation strings ──────────────────────── */
const ROLES = [
  "B.Tech CS Student",
  "Web Developer",
  "Problem Solver",
  "Open Source Enthusiast",
];

/* =====================================================
   DOM READY
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initLogin();
  initHamburger();
  initLogout();
  initSidebarOverlay();
});

/* =====================================================
   LOGIN
   ===================================================== */
function initLogin() {
  const form     = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    /* ── Validate format ── */
    const emailPatternRx = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    const phonePatternRx  = /^[0-9]{10}$/;

    if (!emailPatternRx.test(email)) {
      showError(errorMsg, "⚠ Please enter a valid email address.");
      return;
    }

    if (!phonePatternRx.test(phone)) {
      showError(errorMsg, "⚠ Phone number must be exactly 10 digits.");
      return;
    }

    /* ── Check credentials ── */
    if (email !== VALID_EMAIL || phone !== VALID_PHONE) {
      showError(errorMsg, "⚠ Invalid credentials. Access denied.");
      return;
    }

    /* ── Success: hide login, show portfolio ── */
    errorMsg.textContent = "";
    const loginPage     = document.getElementById("loginPage");
    const portfolioPage = document.getElementById("portfolioPage");

    loginPage.style.transition = "opacity 0.5s ease";
    loginPage.style.opacity    = "0";

    setTimeout(() => {
      loginPage.style.display = "none";
      portfolioPage.classList.remove("hidden");
      portfolioPage.style.opacity = "0";
      portfolioPage.style.transition = "opacity 0.5s ease";

      requestAnimationFrame(() => {
        portfolioPage.style.opacity = "1";
      });

      /* Start portfolio features */
      startTypingAnimation();
      animateSkillBars();
    }, 500);
  });
}

function showError(el, msg) {
  el.textContent = msg;
  /* Re-trigger shake animation */
  el.style.animation = "none";
  void el.offsetWidth;
  el.style.animation = "shake 0.4s ease";
}

/* =====================================================
   SECTION NAVIGATION
   ===================================================== */
function showSection(sectionId, navBtn) {
  /* Hide all sections */
  document.querySelectorAll(".section").forEach((sec) => {
    sec.classList.remove("active");
  });

  /* Show target section */
  const target = document.getElementById(sectionId);
  if (target) target.classList.add("active");

  /* Update active nav button */
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (navBtn) {
    navBtn.classList.add("active");
  }

  /* Animate skill bars when skills section becomes active */
  if (sectionId === "skills") {
    setTimeout(animateSkillBars, 100);
  }

  /* Close sidebar on mobile after navigation */
  closeSidebar();
}

/* =====================================================
   HAMBURGER MENU
   ===================================================== */
function initHamburger() {
  const btn     = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (!btn || !sidebar) return;

  btn.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    if (overlay) overlay.classList.toggle("active", isOpen);
    btn.setAttribute("aria-expanded", isOpen);
  });
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const btn     = document.getElementById("hamburgerBtn");
  const overlay = document.getElementById("sidebarOverlay");

  if (sidebar) sidebar.classList.remove("open");
  if (btn)     { btn.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  if (overlay) overlay.classList.remove("active");
}

/* =====================================================
   SIDEBAR OVERLAY (close on tap)
   ===================================================== */
function initSidebarOverlay() {
  const overlay = document.getElementById("sidebarOverlay");
  if (!overlay) return;
  overlay.addEventListener("click", closeSidebar);
}

/* =====================================================
   LOGOUT
   ===================================================== */
function initLogout() {
  const logoutBtn     = document.getElementById("logoutBtn");
  const loginPage     = document.getElementById("loginPage");
  const portfolioPage = document.getElementById("portfolioPage");
  const loginForm     = document.getElementById("loginForm");
  const errorMsg      = document.getElementById("errorMsg");

  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    /* Fade out portfolio */
    portfolioPage.style.transition = "opacity 0.4s ease";
    portfolioPage.style.opacity    = "0";

    setTimeout(() => {
      portfolioPage.classList.add("hidden");
      portfolioPage.style.opacity = "";

      /* Reset login form */
      if (loginForm)  loginForm.reset();
      if (errorMsg)   errorMsg.textContent = "";

      /* Show login page */
      loginPage.style.display = "flex";
      loginPage.style.opacity = "0";
      loginPage.style.transition = "opacity 0.4s ease";

      requestAnimationFrame(() => {
        loginPage.style.opacity = "1";
      });

      /* Reset section to Home */
      showSection("home", document.getElementById("nav-home"));

      /* Stop typing animation */
      stopTypingAnimation();
    }, 400);
  });
}

/* =====================================================
   TYPING ANIMATION
   ===================================================== */
let typingTimer  = null;
let roleIndex    = 0;
let charIndex    = 0;
let isDeleting   = false;
const TYPING_EL  = () => document.getElementById("typingText");
const TYPE_SPEED = 90;
const DEL_SPEED  = 55;
const PAUSE      = 2000;

function startTypingAnimation() {
  stopTypingAnimation();
  roleIndex  = 0;
  charIndex  = 0;
  isDeleting = false;
  typeStep();
}

function stopTypingAnimation() {
  clearTimeout(typingTimer);
  typingTimer = null;
  const el = TYPING_EL();
  if (el) el.textContent = "";
}

function typeStep() {
  const el = TYPING_EL();
  if (!el) return;

  const currentRole = ROLES[roleIndex];

  if (isDeleting) {
    charIndex--;
    el.textContent = currentRole.substring(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % ROLES.length;
      typingTimer = setTimeout(typeStep, 400);
      return;
    }
    typingTimer = setTimeout(typeStep, DEL_SPEED);
  } else {
    charIndex++;
    el.textContent = currentRole.substring(0, charIndex);

    if (charIndex === currentRole.length) {
      isDeleting  = true;
      typingTimer = setTimeout(typeStep, PAUSE);
      return;
    }
    typingTimer = setTimeout(typeStep, TYPE_SPEED);
  }
}

/* =====================================================
   SKILL BAR ANIMATIONS
   ===================================================== */
let skillsAnimated = false;

function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width");
    if (targetWidth) {
      bar.style.width = "0%"; // reset
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = targetWidth + "%";
        });
      });
    }
  });
}
