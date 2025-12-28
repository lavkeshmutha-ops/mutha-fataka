// main.js
// Core site functionality

document.addEventListener("DOMContentLoaded", () => {

  // ✅ Mobile menu toggle
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

});
  // ✅ Smooth scrolling with sticky header offset
  const header = document.querySelector("header");

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset - 12;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });


