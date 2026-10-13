/* =====================================================
   EDIT YOUR CONTACT DETAILS HERE (one place only)
   ===================================================== */
const PROFILE = {
  email: "your-email@gmail.com", // <-- put Ma'am Saman's Gmail here
  phone: "+92 300 0000000", // <-- phone / WhatsApp number
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
};

(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Fill contact details from PROFILE ---- */
  const email = $("#emailLink"),
    phone = $("#phoneLink"),
    li = $("#liLink"),
    gh = $("#ghLink");
  email.href = "mailto:" + PROFILE.email;
  email.textContent = PROFILE.email;
  phone.href = "tel:" + PROFILE.phone.replace(/\s+/g, "");
  phone.textContent = PROFILE.phone;
  li.href = PROFILE.linkedin;
  li.textContent = PROFILE.linkedin.replace(/^https?:\/\/(www\.)?/, "");
  gh.href = PROFILE.github;
  gh.textContent = PROFILE.github.replace(/^https?:\/\/(www\.)?/, "");
  $("#year").textContent = new Date().getFullYear();

  /* ---- Medal edge ticks ---- */
  const ticks = $(".ticks");
  if (ticks) {
    let d = "";
    for (let i = 0; i < 60; i++) {
      const a = (i * 6 * Math.PI) / 180,
        r1 = 100,
        r2 = i % 5 === 0 ? 108 : 104;
      d += `<line x1="${150 + r1 * Math.cos(a)}" y1="${240 + r1 * Math.sin(a)}" x2="${150 + r2 * Math.cos(a)}" y2="${240 + r2 * Math.sin(a)}"/>`;
    }
    ticks.innerHTML = d;
  }

  /* ---- Nav: scrolled state, progress bar, mobile menu ---- */
  const nav = $("#nav"),
    bar = $("#progress"),
    burger = $("#burger"),
    links = $("#links");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 40);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    links.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Typing effect ---- */
  const words = [
    "Brilliant problem solver.",
    "Gifted mind.",
    "An inspiration to many.",
  ];
  const typed = $("#typed");
  if (reduce) {
    typed.textContent = words[0];
    typed.style.borderRight = "0";
  } else {
    let w = 0,
      c = 0,
      del = false;
    const tick = () => {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (!del && c === word.length) {
        del = true;
        return setTimeout(tick, 1800);
      }
      if (del && c === 0) {
        del = false;
        w = (w + 1) % words.length;
        return setTimeout(tick, 400);
      }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 75);
    };
    setTimeout(tick, 1500);
  }

  /* ---- Floating code glyphs in hero ---- */
  const box = $("#glyphs");
  if (!reduce && box) {
    const set = ["{ }", "</>", "01", "λ", "∑", "&&", "[ ]", "=>", "π", "10"];
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("span");
      s.textContent = set[i % set.length];
      s.style.left = Math.random() * 100 + "%";
      s.style.fontSize = 16 + Math.random() * 28 + "px";
      s.style.animationDuration = 12 + Math.random() * 14 + "s";
      s.style.animationDelay = -Math.random() * 20 + "s";
      box.appendChild(s);
    }
  }

  /* ---- Medal 3D tilt follows pointer ---- */
  const wrap = $("#medal"),
    medal = $(".medal");
  if (!reduce && wrap && matchMedia("(hover:hover)").matches) {
    let ready = false;
    setTimeout(() => (ready = true), 2200);
    wrap.addEventListener("mousemove", (e) => {
      if (!ready) return;
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      medal.style.animation = "none";
      medal.style.transform = `rotateY(${x * 28}deg) rotateX(${-y * 22}deg)`;
    });
    wrap.addEventListener("mouseleave", () => {
      medal.style.transform = "";
      medal.style.animation = "sway 6s ease-in-out infinite";
    });
  }

  /* ---- Scroll reveal ---- */
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
  } else els.forEach((el) => el.classList.add("in"));

  /* ---- Copy email ---- */
  const copyBtn = $("#copyBtn");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      copyBtn.textContent = "Copied";
    } catch {
      copyBtn.textContent = "Press Ctrl+C";
    }
    setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
  });

  /* ---- Contact form -> opens the visitor's email app ---- */
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("#fname").value.trim(),
      m = $("#femail").value.trim(),
      msg = $("#fmsg").value.trim();
    const err = $("#err");
    if (!n || !m || !msg) {
      err.textContent = "Please fill in your name, email and message.";
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(m)) {
      err.textContent = "Please enter a valid email address.";
      return;
    }
    err.textContent = "";
    const body = `${msg}\n\nFrom: ${n} (${m})`;
    location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Message from " + n)}&body=${encodeURIComponent(body)}`;
  });
})();
