// Simple gallery slider (buttons + swipe)
(function () {
  const track = document.getElementById("sliderTrack");
  const dotsWrap = document.getElementById("dots");
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let index = 0;

  // Build dots
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.className = "dot" + (i === 0 ? " active" : "");
    b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
    return b;
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  // Buttons
  const prev = document.querySelector(".slider-btn.prev");
  const next = document.querySelector(".slider-btn.next");
  prev?.addEventListener("click", () => goTo(index - 1));
  next?.addEventListener("click", () => goTo(index + 1));

  // Swipe support
  let startX = 0;
  let isDown = false;

  const viewport = document.querySelector(".slider-viewport");
  if (viewport) {
    viewport.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].clientX;
    });

    viewport.addEventListener("touchend", (e) => {
      if (!isDown) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      isDown = false;

      if (Math.abs(diff) > 40) {
        if (diff < 0) goTo(index + 1);
        else goTo(index - 1);
      }
    });
  }

  update();
})();
