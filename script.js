/* ============================================================
   Aphelion Systems — interactions
   - constellation / particle background (canvas #space)
   - scroll reveal (IntersectionObserver on [data-reveal])
   - sticky header shadow, mobile nav, footer year
   ============================================================ */
(function () {
  "use strict";

  /* ---------- constellation background ---------- */
  const canvas = document.getElementById("space");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1, points = [], raf = null;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }
    function seed() {
      const count = Math.max(36, Math.min(96, Math.floor(window.innerWidth / 16)));
      points = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.14 * dpr,
          vy: (Math.random() - 0.5) * 0.14 * dpr,
          r: (Math.random() * 1.3 + 0.4) * dpr,
        });
      }
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const maxd = 132 * dpr;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxd) {
            ctx.strokeStyle = "rgba(131,141,255," + (1 - d / maxd) * 0.45 + ")";
            ctx.lineWidth = dpr;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      for (const p of points) {
        ctx.fillStyle = "rgba(216,222,255,0.9)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    size(); seed();
    if (reduce) { frame(); cancelAnimationFrame(raf); } else { frame(); }
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => { size(); seed(); }, 180);
    });
    /* pause the animation when the tab is hidden to save CPU and battery */
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
      else if (!reduce && raf === null) { frame(); }
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
    /* safety net: reveal anything still hidden after load */
    window.addEventListener("load", () => {
      setTimeout(() => revealEls.forEach((el) => el.classList.add("is-visible")), 1400);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- sticky header shadow ---------- */
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- contact form status ---------- */
  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");
  if (form && status) {
    form.addEventListener("submit", () => {
      status.textContent = "Sending your project note...";
    });
  }

  /* ---------- footer year ---------- */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
