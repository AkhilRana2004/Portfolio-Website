const projectData = [
  {
    title: "E-Commerce Website",
    meta: "Full-stack project · 2025",
    desc: "An end-to-end online store where users can browse products, manage a cart, and place orders. The project combines a clean frontend with authentication, product management, and order processing backed by MongoDB.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/AkhilRana2004/Ecommerce-Website"
  },
  {
    title: "Sushi Restaurant Website",
    meta: "Full-stack project · 2024",
    desc: "A responsive restaurant website with menu filtering, reservation and contact forms, and a Node.js and MongoDB backend for handling customer enquiries and dynamic content.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    link: "https://github.com/AkhilRana2004/Sushi-Lover-Website"
  },
  {
    title: "Job Finder & Expense Tracker",
    meta: "Frontend projects · 2023–2024",
    desc: "A pair of focused applications: a Job Finder with search, filtering, and REST API integration, plus a Personal Expense Tracker with live balance updates.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    link: "https://github.com/AkhilRana2004/Projects-frontend"
  },
  {
    title: "Movie Web Application",
    meta: "Media dashboard · JavaScript",
    desc: "A feature-rich, mobile-first multimedia dashboard for seamless cinematic discovery across devices. Built with modern JavaScript, it ingests and filters real-time data without heavy framework overhead. It includes adaptive responsive media grids, asynchronous search and pagination workflows powered by Promises, and component-based styling designed to minimize layout shifts.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design", "Async APIs"],
    link: "https://github.com/AkhilRana2004/Movie-Website"
  },
  {
    title: "Professional Portfolio Ecosystem",
    meta: "Personal platform · ES modules",
    desc: "A lightweight, high-performance portfolio for presenting technical proficiencies and project milestones. Its modular architecture keeps critical rendering paths lean for smooth interaction across desktop and mobile. It features custom particle-node physics, a native terminal-style typewriter engine, and an isolated production layout with clean standalone structures.",
    stack: ["HTML", "CSS", "JavaScript", "ES Modules", "Performance"],
    link: "https://github.com/AkhilRana2004/Portfolio-Website"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.getElementById("site-navigation");
  const modal = document.getElementById("projectModal");
  const closeModalButton = document.getElementById("closeModal");
  const projectCards = document.querySelectorAll(".project-card");
  let lastTrigger = null;

  const closeNavigation = () => {
    navigation?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastTrigger?.focus();
  };

  const openProject = (card) => {
    const data = projectData[card.dataset.project];
    if (!data) return;

    lastTrigger = card;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalMeta").textContent = data.meta;
    document.getElementById("modalDesc").textContent = data.desc;
    document.getElementById("modalLink").href = data.link;

    const stack = document.getElementById("modalStack");
    stack.replaceChildren(...data.stack.map((technology) => {
      const tag = document.createElement("span");
      tag.className = "pill";
      tag.textContent = technology;
      return tag;
    }));

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeModalButton.focus();
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

  closeModalButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) closeModal();
    if (event.key === "Escape") closeNavigation();
  });

  const navLinks = document.querySelectorAll(".navlinks a[data-section]");
  const sections = document.querySelectorAll("main section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.dataset.section === entry.target.id));
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
});
