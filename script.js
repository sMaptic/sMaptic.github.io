const ELEMENTS = {
  themeToggle: document.querySelector("#theme-toggle"),
  pageScroll: document.querySelector(".page-scroll")
}

const THEME_STORAGE_KEY = "theme";
const SYSTEM_THEME = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";


// set the theme based on stored preference or system preference
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  ELEMENTS.themeToggle.querySelector("span").textContent = theme === "dark" ? "☀" : "☾";
  ELEMENTS.themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
setTheme(storedTheme === "dark" || storedTheme === "light" ? storedTheme : SYSTEM_THEME);

// listen for theme button clicked and toggle theme
ELEMENTS.themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  setTheme(nextTheme);
});


// update padding based on scrollbar visibility
function updateScrollbarPadding() {
  ELEMENTS.pageScroll.classList.toggle(
    "has-scrollbar",
    ELEMENTS.pageScroll.scrollHeight > ELEMENTS.pageScroll.clientHeight
  );
}


// observer for scrollbar visibility changes to update padding
new ResizeObserver(updateScrollbarPadding).observe(ELEMENTS.pageScroll);
