document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MOBILE MENU TOGGLE (ROBUST)
     =============================== */
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.querySelector("header");

  if (menuButton && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.remove("hidden");
      menuButton.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      mobileMenu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    menuButton.addEventListener("click", e => {
      e.stopPropagation();
      mobileMenu.classList.contains("hidden") ? openMenu() : closeMenu();
    });

    // Close when clicking a link
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close when clicking outside
    document.addEventListener("click", e => {
      if (
        !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(e.target) &&
        !menuButton.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on ESC
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
        closeMenu();
        menuButton.focus();
      }
    });
  }


  /* ===============================
     SMOOTH SCROLL WITH HEADER OFFSET
     =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const href = anchor.getAttribute("href");

      // Ignore empty or external hashes
      if (!href || href === "#" || href.length === 1) return;

      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      const elementTop = targetEl.getBoundingClientRect().top;
      const offsetPosition =
        elementTop + window.pageYOffset - headerOffset - 12;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Accessibility: move focus
      targetEl.setAttribute("tabindex", "-1");
      targetEl.focus({ preventScroll: true });
    });
  });

});
