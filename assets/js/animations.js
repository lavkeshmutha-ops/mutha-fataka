document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     1. BASIC SCROLL REVEAL (SAFE)
     =============================== */
  const animated = document.querySelectorAll("[data-animate]");

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


  /* ===============================
     2. GALLERY VIDEO AUTOPLAY (SAFE)
     =============================== */
  const galleryVideos = document.querySelectorAll(".gallery-video");
  if (galleryVideos.length) {
    let activeVideo = null;

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
      video.addEventListener("click", () => (video.muted = false));
    });
  }


  /* ===============================
     3. LIGHTBOX (IMAGES + VIDEOS)
     =============================== */
  const items = document.querySelectorAll(".gallery-img, .gallery-video");
  const overlay = document.getElementById("lightbox-overlay");
  if (!overlay) return;

  const mediaBox = overlay.querySelector(".lightbox-media");
  const closeBtn = overlay.querySelector(".lightbox-close");

  items.forEach(item => {
    item.addEventListener("click", () => {
      mediaBox.innerHTML = "";

      if (item.tagName === "IMG") {
        const img = document.createElement("img");
        img.src = item.src;
        img.className = "lightbox-image";
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
    });
  });

  closeBtn.addEventListener("click", () => {
    mediaBox.innerHTML = "";
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
  });

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeBtn.click();
  });


  /* ===============================
     4. STORE OPEN / CLOSE STATUS
     =============================== */
  const OPEN_HOUR = 9;
  const CLOSE_HOUR = 22;

  function updateStoreStatus() {
    const now = new Date();
    const hour = now.getHours();

    const statusEl = document.getElementById("store-status");
    const timeEl = document.getElementById("store-time");
    if (!statusEl || !timeEl) return;

    if (hour >= OPEN_HOUR && hour < CLOSE_HOUR) {
      statusEl.textContent = "Open Now";
      statusEl.className = "text-green-600 font-bold";
      timeEl.textContent = "Closes at 10:00 PM";
    } else {
      statusEl.textContent = "Closed Now";
      statusEl.className = "text-red-600 font-bold";
      timeEl.textContent = "Opens at 9:00 AM";
    }
  }

  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);

});


