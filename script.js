document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carTrack");
  const viewport = document.getElementById("carViewport");
  const dotsWrap = document.getElementById("carDots");
  const prevBtn = document.querySelector(".car-btn.prev");
  const nextBtn = document.querySelector(".car-btn.next");

  console.log("Carousel init:", { track, viewport, prevBtn, nextBtn }); // debug

  if (!track || !viewport || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.querySelectorAll(".car-slide"));
  let index = 0;

  // Dots
  let dots = [];
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dot" + (i === 0 ? " active" : "");
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });
  }

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Swipe
  let startX = 0;
  viewport.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  viewport.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 40) {
      diff < 0 ? goTo(index + 1) : goTo(index - 1);
    }
  });

  update();
});
