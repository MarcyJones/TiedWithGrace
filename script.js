// Carousel + inquiry email (static GitHub Pages friendly)
(function () {
  // CAROUSEL
  const track = document.getElementById("carTrack");
  const dotsWrap = document.getElementById("carDots");

  if (track && dotsWrap) {
    const slides = Array.from(track.children);
    let index = 0;

    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dot" + (i === 0 ? " active" : "");
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

    document.querySelector(".car-btn.prev")?.addEventListener("click", () => goTo(index - 1));
    document.querySelector(".car-btn.next")?.addEventListener("click", () => goTo(index + 1));

    // Swipe
    const viewport = document.getElementById("carViewport");
    let startX = 0;

    viewport?.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    viewport?.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) goTo(index + 1);
        else goTo(index - 1);
      }
    });

    update();
  }

  // INQUIRY FORM -> opens email with pre-filled text
  const form = document.getElementById("inquiryForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value?.trim() || "";
    const email = document.getElementById("email")?.value?.trim() || "";
    const details = document.getElementById("details")?.value?.trim() || "";

    const subject = encodeURIComponent("Custom Tie Inquiry - Tied With Grace");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nCustom Tie Idea:\n${details}\n\n— Sent from the Tied With Grace website`
    );

    window.location.href = `mailto:marcia.hare@gmail.com?subject=${subject}&body=${body}`;
  });
})();
