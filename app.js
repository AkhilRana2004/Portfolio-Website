const projectData = [
  {
    title: "E-Commerce Website",
    meta: "Full-Stack Project · Production Architecture",
    desc: "An end-to-end digital commerce ecosystem engineered with Node.js, Express, and MongoDB. Includes tokenized JWT authentication, stateful cart management, secure checkout processing, catalog filtering, and comprehensive database indexing for responsive read performance.",
    stack: ["Node.js", "Express", "MongoDB", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    link: "https://github.com/AkhilRana2004/Ecommerce-Website"
  },
  {
    title: "Sushi Restaurant Website",
    meta: "Web Platform · Dynamic UX",
    desc: "An elegant Japanese culinary showcase platform. Features interactive category-based menu filtering, booking & table reservation workflows, responsive multimedia showcases, and dynamic MongoDB backend connectivity for real-time customer inquiries.",
    stack: ["JavaScript", "Node.js", "MongoDB", "Express", "CSS Flexbox/Grid", "Responsive Design"],
    link: "https://github.com/AkhilRana2004/Sushi-Lover-Website"
  },
  {
    title: "Job Finder & Expense Tracker",
    meta: "Productivity Applications · Modern Frontend",
    desc: "A dual-utility productivity suite consisting of: (1) An intelligent Job Finder application querying asynchronous job boards with filtered query parameters, and (2) A reactive Personal Expense Tracker with continuous balance calculation and local persistence.",
    stack: ["React", "JavaScript", "Node.js", "REST APIs", "Modern CSS"],
    link: "https://github.com/AkhilRana2004/Projects-frontend"
  },
  {
    title: "Movie Web Application",
    meta: "Media Discovery · Performance-First",
    desc: "A feature-rich, high-performance multimedia cinema dashboard for rapid film and television discovery. Implements asynchronous API search debouncing, infinite scroll pagination, fluid genre tagging, and optimized lazy-loaded movie posters with zero layout shift.",
    stack: ["Vanilla JavaScript", "Async APIs", "HTML5", "CSS3", "Performance Optimization"],
    link: "https://github.com/AkhilRana2004/Movie-Website"
  },
  {
    title: "Professional Portfolio Ecosystem",
    meta: "Engineering Platform · Modular Architecture",
    desc: "A bespoke software engineering portfolio platform. Built with vanilla JavaScript modules, hardware-accelerated HTML5 Canvas particle systems, dynamic mouse-tracking lighting effects, and an accessible, semantic UI architecture.",
    stack: ["HTML5 Canvas", "ES6+ Modules", "CSS Custom Properties", "Semantic HTML", "Responsive Layout"],
    link: "https://github.com/AkhilRana2004/Portfolio-Website"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------------
   * 1. Dynamic Typewriter Effect for Hero
   * ------------------------------------------------------------- */
  const words = [
    "Web Applications.",
    "Full-Stack Systems.",
    "Scalable Backend APIs.",
    "Interactive UI/UX.",
    "Digital Products."
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTarget = document.getElementById("typedText");
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1600;

  function typeStep() {
    if (!typedTarget) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      typedTarget.textContent = currentWord.substring(0, charIndex);
      if (charIndex <= 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeStep, 350);
        return;
      }
      setTimeout(typeStep, deletingSpeed);
    } else {
      charIndex++;
      typedTarget.textContent = currentWord.substring(0, charIndex);
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeStep, pauseEnd);
        return;
      }
      setTimeout(typeStep, typingSpeed);
    }
  }
  typeStep();

  /* -------------------------------------------------------------
   * 2. Interactive Ambient Canvas (Constellation Particles)
   * ------------------------------------------------------------- */
  const canvas = document.getElementById("ambientCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.6 + 0.8;
        this.alpha = Math.random() * 0.4 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    let mouseX = -999;
    let mouseY = -999;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = (1 - dist / 110) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse interaction line
        if (mouseX > 0) {
          const mdx = p1.x - mouseX;
          const mdy = p1.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const mOpacity = (1 - mdist / 140) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(6, 182, 212, ${mOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  /* -------------------------------------------------------------
   * 3. Spotlight Mouse-Tracker Effect for Cards
   * ------------------------------------------------------------- */
  const spotlightCards = document.querySelectorAll(".spotlight-card");
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  /* -------------------------------------------------------------
   * 4. Ambient Cursor Glow (Desktop)
   * ------------------------------------------------------------- */
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorGlow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0";
    });

    function renderCursor() {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  /* -------------------------------------------------------------
   * 5. Scroll Progress Bar & Scroll Indicator
   * ------------------------------------------------------------- */
  const progressBar = document.getElementById("progressBar");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && progressBar) {
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  /* -------------------------------------------------------------
   * 6. Scroll Reveal Animation via IntersectionObserver
   * ------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  /* -------------------------------------------------------------
   * 7. Mobile Navigation Toggle
   * ------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navigation = document.getElementById("site-navigation");

  const closeNavigation = () => {
    navigation?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navigation?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  /* -------------------------------------------------------------
   * 8. Project Details Modal with Enhanced Interactivity
   * ------------------------------------------------------------- */
  const modal = document.getElementById("projectModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const closeModalButton = document.getElementById("closeModal");
  const projectCards = document.querySelectorAll(".project-card");
  let lastTrigger = null;

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastTrigger?.focus();
  };

  const openProject = (card) => {
    const data = projectData[card.dataset.project];
    if (!data) return;

    lastTrigger = card;
    const titleEl = document.getElementById("modalTitle");
    const metaEl = document.getElementById("modalMeta");
    const descEl = document.getElementById("modalDesc");
    const linkEl = document.getElementById("modalLink");
    const stackEl = document.getElementById("modalStack");

    if (titleEl) titleEl.textContent = data.title;
    if (metaEl) metaEl.textContent = data.meta;
    if (descEl) descEl.textContent = data.desc;
    if (linkEl) linkEl.href = data.link;

    if (stackEl) {
      stackEl.replaceChildren(
        ...data.stack.map((tech) => {
          const tag = document.createElement("span");
          tag.className = "pill";
          tag.textContent = tech;
          return tag;
        })
      );
    }

    modal?.classList.add("show");
    modal?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeModalButton?.focus();
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openProject(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(card);
      }
    });
  });

  closeModalButton?.addEventListener("click", closeModal);
  modalBackdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (modal?.classList.contains("show")) closeModal();
      closeNavigation();
    }
  });

  /* -------------------------------------------------------------
   * 9. Active Navigation Indicator on Scroll
   * ------------------------------------------------------------- */
  const navLinks = document.querySelectorAll(".navlinks a[data-section]");
  const sections = document.querySelectorAll("main section[id]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === entry.target.id);
        });
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
  );

  sections.forEach((section) => navObserver.observe(section));
});
