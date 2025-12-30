document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MOBILE MENU – FANCY MODE
     =============================== */
  const menuBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.querySelector("header");

  let menuOpen = false;

  if (menuBtn && mobileMenu) {
    mobileMenu.style.transform = "translateY(-20px)";
    mobileMenu.style.opacity = "0";
    mobileMenu.style.transition = "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)";

    const openMenu = () => {
      mobileMenu.classList.remove("hidden");
      requestAnimationFrame(() => {
        mobileMenu.style.transform = "translateY(0)";
        mobileMenu.style.opacity = "1";
      });
      menuBtn.classList.add("rotate-90");
      document.body.style.overflow = "hidden";
      menuOpen = true;
    };

    const closeMenu = () => {
      mobileMenu.style.transform = "translateY(-20px)";
      mobileMenu.style.opacity = "0";
      menuBtn.classList.remove("rotate-90");

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);

      document.body.style.overflow = "";
      menuOpen = false;
    };

    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", e => {
      if (menuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }


  /* ===============================
     SMOOTH SCROLL – BUTTERY
     =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.length === 1) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      const y =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset -
        12;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    });
  });


  /* ===============================
     SCROLL SPY – ACTIVE LINK GLOW
     =============================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('a[href^="#"]');

  if ("IntersectionObserver" in window) {
    const spyObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.classList.toggle(
                "text-red-600 font-bold",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => spyObserver.observe(section));
  }


  /* ===============================
     FANCY HEADER SHRINK ON SCROLL
     =============================== */
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (!header) return;

    if (currentScroll > 80) {
      header.classList.add("shadow-xl");
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.classList.remove("shadow-xl");
      header.style.backdropFilter = "none";
    }

    lastScroll = currentScroll;
  });


  /* ===============================
     OPTIONAL: GSAP MAGIC (IF LOADED)
     =============================== */
  if (window.gsap) {
    gsap.from("h1", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    });

    gsap.from(".card-hover", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out"
    });
  }

});
/* ===============================
     Store Status Update
     =============================== */
function updateStoreStatus() {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;

  const statusEl = document.getElementById("store-status");
  const timeEl = document.getElementById("store-time");
  const dotEl = document.getElementById("status-dot");

  if (!statusEl || !timeEl || !dotEl) return;

  if (hour >= 9.5 && hour < 22) {
    statusEl.textContent = "Open Now";
    statusEl.className = "store-open font-bold uppercase";
    dotEl.className = "w-3 h-3 rounded-full store-open-dot";
    timeEl.textContent = "Closes at 10:00 PM";
  } else {
    statusEl.textContent = "Closed Now";
    statusEl.className = "store-closed font-bold uppercase";
    dotEl.className = "w-3 h-3 rounded-full bg-gray-400";
    timeEl.textContent = "Opens at 9:30 AM";
  }
}
/* ===============================
   FESTIVAL CTA AUTO SWAP
   =============================== */
(function () {
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan
  const day = now.getDate();

  const contactHeading = document.querySelector("#contact h2");
  const contactText = document.querySelector("#contact p");

  if (!contactHeading || !contactText) return;

  // Diwali season (Oct–Nov)
  if (month === 9 || month === 10) {
    contactHeading.innerHTML =
      'Celebrate <span class="highlight-gold">Diwali</span> With Us';
    contactText.textContent =
      "Special Diwali collections, family packs, and festive offers available now.";
  }

  // New Year season (Dec 25 – Jan 5)
  if (
    (month === 11 && day >= 25) ||
    (month === 0 && day <= 5)
  ) {
    contactHeading.innerHTML =
      'Welcome the <span class="highlight-gold">New Year</span> in Style';
    contactText.textContent =
      "Ring in the New Year with spectacular fireworks and trusted quality.";
  }
})();


