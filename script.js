const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const demoTabs = document.querySelectorAll("[data-demo-target]");
const demoPanels = document.querySelectorAll("[data-demo-panel]");
const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "aphelion-theme";

const getStoredTheme = () => {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
};

const setStoredTheme = (theme) => {
  try {
    if (theme) {
      localStorage.setItem(themeStorageKey, theme);
    } else {
      localStorage.removeItem(themeStorageKey);
    }
  } catch {
    return;
  }
};

const getSystemTheme = () => (themeQuery.matches ? "dark" : "light");
const getEffectiveTheme = () => getStoredTheme() || getSystemTheme();

const applyTheme = () => {
  const storedTheme = getStoredTheme();

  if (storedTheme) {
    document.documentElement.dataset.theme = storedTheme;
  } else {
    delete document.documentElement.dataset.theme;
  }

  if (themeLabel) {
    themeLabel.textContent = storedTheme
      ? storedTheme.charAt(0).toUpperCase() + storedTheme.slice(1)
      : "System";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      `Color mode: ${storedTheme || "system"}. Click to change.`
    );
  }
};

const updateHeader = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
};

applyTheme();
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
themeQuery.addEventListener("change", applyTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const storedTheme = getStoredTheme();
    const nextTheme = storedTheme === "light" ? "dark" : storedTheme === "dark" ? null : "light";
    setStoredTheme(nextTheme);
    applyTheme();
  });
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", () => {
    formStatus.textContent = "Opening your email app with the project note.";
  });
}

demoTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.demoTarget;

    demoTabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
    });

    demoPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.demoPanel === target);
    });
  });
});
