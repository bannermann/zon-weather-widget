const burgerMenu = document.querySelector(".header__burger-menu");
const expandLinks = document.querySelectorAll("[data-expand]");
const burgerMenuOpenBtn = document.querySelector(".header__burger_open");
const burgerMenuCloseBtn = document.querySelector(".header__burger_close");


const body = document.body;
let currentEl = null;

document.addEventListener("DOMContentLoaded", () => {
  if (document.documentElement.clientWidth < 768) {
    console.log("small device")
    onMinResizeHandler();
  }
  window.addEventListener("resize", (e) => {
    if (document.documentElement.clientWidth <= 768) {
      onMinResizeHandler();
    }
    if (document.documentElement.clientWidth <= 1024) {
      onMinResizeHandler();
    }
    if (
      document.documentElement.clientWidth >= 960 &&
      document.documentElement.clientWidth <= 1280
    ) {
      console.log("tablet")
      //onMinResizeHandler();
      document.location.reload();
    }
  });

  burgerMenuOpenBtn.addEventListener("click", () => {
    burgerMenu.classList.add("active");
    body.classList.add("lock-scroll");
  });
  burgerMenuCloseBtn.addEventListener("click", () => {
    burgerMenu.classList.remove("active");
    body.classList.remove("lock-scroll");
  });

});

expandLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const menu = link.querySelector(`.list__item__child`);
    currentEl = e.target;
    menu.classList.add("active");

    document.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target !== currentEl) {
        menu.classList.remove("active");
      }
    });
  });
});

function onMinResizeHandler() {
  const headerElementsToHide = document.querySelectorAll(
    "[data-responsive-hide]"
  );

  headerElementsToHide.forEach((wrapper) => {
    burgerMenu.appendChild(wrapper);
  });
}
//dark theme detection
function activateDarkMode() {
  // set style to dark
  if (darkModePreference.matches) {
    document.body.classList.add("dark-theme");
  }
}
function activateLightMode() {
  // remove dark style
  if (lightModePreference.matches) {
    document.body.classList.remove("dark-theme");
  }
}

const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
const lightModePreference = window.matchMedia("(prefers-color-scheme: light)");

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => e.matches && activateDarkMode());
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => e.matches && activateLightMode());

// show weather app
weather();
