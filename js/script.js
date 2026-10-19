document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Filter portfolio cards
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectItems.forEach((item) => {
        const show = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !show);
      });
    });
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  });

  // Bootstrap modal populated from the selected project
  const modalElement = document.getElementById("projectModal");
  if (modalElement && window.bootstrap) {
    const modal = new bootstrap.Modal(modalElement);
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        document.getElementById("modalTitle").textContent = card.dataset.title || "Project";
        document.getElementById("modalCategory").textContent = card.dataset.category || "Selected work";
        document.getElementById("modalDescription").textContent = card.dataset.description || "";
        const image = document.getElementById("modalImage");
        image.src = card.dataset.image || "";
        image.alt = card.querySelector("img")?.alt || card.dataset.title || "Project image";
        modal.show();
      });
    });
  }

  // Reveal sections as they enter the viewport; gracefully show all if unsupported
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Close the mobile menu after choosing a navigation link
  const nav = document.getElementById("mainNav");
  if (nav && window.bootstrap) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });
    nav.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992 && nav.classList.contains("show")) collapse.hide();
      });
    });
  }
});
