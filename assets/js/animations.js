document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SCROLL REVEAL (DATA-ANIMATE)
     =============================== */

  const animatedEls = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animatedEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    animatedEls.forEach(el => revealObserver.observe(el));
  }

  /* ===============================
     OPTIONAL: HERO TEXT REVEAL
     =============================== */

  const hero = document.querySelector(".hero-bg");

  if (hero && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            hero.classList.add("animate-in");
            heroObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    heroObserver.observe(hero);
  }

  /* ===============================
     REDUCED MOTION SAFETY
     =============================== */

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduce-motion");
  }

});
