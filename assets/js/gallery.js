document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     GALLERY LIGHTBOX (IMAGES + VIDEOS)
     =============================== */

  const galleryItems = Array.from(
    document.querySelectorAll(".gallery-img, .gallery-video")
  );

  const overlay = document.getElementById("lightbox-overlay");
  if (!overlay || !galleryItems.length) return;

  const mediaContainer = overlay.querySelector(".lightbox-media");
  const closeBtn = overlay.querySelector(".lightbox-close");
  const prevBtn = overlay.querySelector(".lightbox-prev");
  const nextBtn = overlay.querySelector(".lightbox-next");

  let currentIndex = -1;
  let lastFocusedEl = null;
  let lightboxOpen = false;

  function openLightbox(index) {
    if (index < 0 || index >= galleryItems.length) return;

    const el = galleryItems[index];
    currentIndex = index;
    lastFocusedEl = document.activeElement;
    lightboxOpen = true;

    mediaContainer.innerHTML = "";

    // IMAGE
    if (el.tagName === "IMG") {
      const img = document.createElement("img");
      img.src = el.src;
      img.alt = el.alt || "Gallery image";
      img.className = "lightbox-image";
      mediaContainer.appendChild(img);
    }

    // VIDEO
    if (el.tagName === "VIDEO") {
      const video = document.createElement("video");
      video.src = el.currentSrc || el.src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.className = "lightbox-image";
      mediaContainer.appendChild(video);
    }

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    const video = mediaContainer.querySelector("video");
    if (video) video.pause();

    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    mediaContainer.innerHTML = "";
    document.body.style.overflow = "";
    currentIndex = -1;
    lightboxOpen = false;

    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showNext() {
    openLightbox((currentIndex + 1) % galleryItems.length);
  }

  function showPrev() {
    openLightbox(
      (currentIndex - 1 + galleryItems.length) % galleryItems.length
    );
  }

  // Open handlers
  galleryItems.forEach((item, index) => {
    item.tabIndex = 0;

    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeBtn?.addEventListener("click", closeLightbox);
  nextBtn?.addEventListener("click", e => {
    e.stopPropagation();
    showNext();
  });
  prevBtn?.addEventListener("click", e => {
    e.stopPropagation();
    showPrev();
  });

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (!lightboxOpen) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });


  /* ===============================
     AUTOPLAY VIDEOS ON SCROLL (SAFE)
     =============================== */

  const galleryVideos = document.querySelectorAll(".gallery-video");

  if ("IntersectionObserver" in window && galleryVideos.length) {
    const videoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;

          // Do not autoplay when lightbox is open
          if (lightboxOpen) {
            video.pause();
            return;
          }

          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            video.muted = true;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.6] }
    );

    galleryVideos.forEach(video => {
      videoObserver.observe(video);

      // Allow user intent to unmute
      video.addEventListener("click", () => {
        video.muted = false;
      });
    });
  }

});
