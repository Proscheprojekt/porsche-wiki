
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const navToggle = $(".nav-toggle");
const mainNav = $(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  $$(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const currentPage = document.body.dataset.page || "index.html";
$$(".main-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

const backToTop = $(".back-to-top");

function updateBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 500) {
    backToTop.classList.add("is-visible");
  } else {
    backToTop.classList.remove("is-visible");
  }
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("reveal-visible"));
}

const modelSearch = $("#modelSearch");
const modelFilter = $("#modelFilter");
const modelCards = $$(".model-card");
const modelCount = $("#modelCount");

function updateModelCards() {
  if (!modelCards.length) return;

  const searchValue = modelSearch ? modelSearch.value.trim().toLowerCase() : "";
  const filterValue = modelFilter ? modelFilter.value : "all";
  let visible = 0;

  modelCards.forEach((card) => {
    const searchText = card.dataset.search || card.textContent.toLowerCase();
    const category = card.dataset.category || "";
    const matchesSearch = searchValue === "" || searchText.includes(searchValue);
    const matchesFilter = filterValue === "all" || category === filterValue;

    if (matchesSearch && matchesFilter) {
      card.classList.remove("is-hidden");
      visible += 1;
    } else {
      card.classList.add("is-hidden");
    }
  });

  if (modelCount) {
    modelCount.textContent = visible === 1 ? "1 Modell" : `${visible} Modelle`;
  }
}

if (modelSearch) modelSearch.addEventListener("input", updateModelCards);
if (modelFilter) modelFilter.addEventListener("change", updateModelCards);
updateModelCards();

const techTabs = $$(".tech-tab");
const techPanels = $$(".tech-panel");

techTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.target;

    techTabs.forEach((button) => button.classList.remove("active"));
    techPanels.forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) targetPanel.classList.add("active");
  });
});

const timelineItems = $$(".timeline-item");

if ("IntersectionObserver" in window && timelineItems.length) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("timeline-on");
      }
    });
  }, { threshold: 0.35 });

  timelineItems.forEach((item) => timelineObserver.observe(item));
} else {
  timelineItems.forEach((item) => item.classList.add("timeline-on"));
}
