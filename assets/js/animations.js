document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     1. BASIC SCROLL REVEAL
     =============================== */
  const animated = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animated.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animated.forEach(el => revealObserver.observe(el));
  }


  /* ===============================
     2. GALLERY VIDEO AUTOPLAY
     =============================== */
  const galleryVideos = document.querySelectorAll(".gallery-video");
  let activeVideo = null;

  if ("IntersectionObserver" in window && galleryVideos.length) {
    const videoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            if (activeVideo && activeVideo !== video) {
              activeVideo.pause();
            }
            video.muted = true;
            video.play().catch(() => {});
            activeVideo = video;
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.6] }
    );

    galleryVideos.forEach(video => {
      videoObserver.observe(video);
      video.addEventListener("click", () => {
        video.muted = false;
      });
    });
  }


  /* ===============================
     3. LIGHTBOX (IMAGES + VIDEOS)
     =============================== */
  const items = document.querySelectorAll(".gallery-img, .gallery-video");
  const overlay = document.getElementById("lightbox-overlay");

  if (overlay && items.length) {
    const mediaBox = overlay.querySelector(".lightbox-media");
    const closeBtn = overlay.querySelector(".lightbox-close");

    const closeLightbox = () => {
      mediaBox.innerHTML = "";
      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    items.forEach(item => {
      item.addEventListener("click", () => {
        mediaBox.innerHTML = "";

        if (item.tagName === "IMG") {
          const img = document.createElement("img");
          img.src = item.src;
          img.alt = item.alt || "Gallery image";
          mediaBox.appendChild(img);
        }

        if (item.tagName === "VIDEO") {
          const video = document.createElement("video");
          video.src = item.currentSrc || item.src;
          video.controls = true;
          video.autoplay = true;
          video.playsInline = true;
          mediaBox.appendChild(video);
        }

        overlay.classList.add("show");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    closeBtn?.addEventListener("click", closeLightbox);

    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && overlay.classList.contains("show")) {
        closeLightbox();
      }
    });
  }


  /* ===============================
     4. STORE OPEN / CLOSE STATUS
     =============================== */
  const statusEl = document.getElementById("store-status");
  const timeEl = document.getElementById("store-time");
  const dotEl = document.getElementById("status-dot");

  // Business hours (IST)
  const OPEN_TIME = { h: 9, m: 30 };
  const CLOSE_TIME = { h: 22, m: 0 };

  function updateStoreStatus() {
    if (!statusEl || !timeEl) return;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = OPEN_TIME.h * 60 + OPEN_TIME.m;
    const closeMinutes = CLOSE_TIME.h * 60 + CLOSE_TIME.m;

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      statusEl.textContent = "Open Now";
      statusEl.className = "font-bold text-green-600";
      dotEl && (dotEl.className = "w-2.5 h-2.5 rounded-full bg-green-500");
      timeEl.textContent = "Closes at 10:00 PM";
    } else {
      statusEl.textContent = "Closed Now";
      statusEl.className = "font-bold text-red-600";
      dotEl && (dotEl.className = "w-2.5 h-2.5 rounded-full bg-red-500");
      timeEl.textContent = "Opens at 9:30 AM";
    }
  }

  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);


  /* ===============================
     5. AOS INIT (SAFE)
     =============================== */
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic",
      offset: 60
    });
  }

});
