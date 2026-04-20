document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CAROUSEL CODE
  ========================= */
  const track = document.querySelector(".carousel-track");
  let items = document.querySelectorAll(".carousel-item");

  if (track && items.length > 0) {
    const gap = 24;
    let index = 0;

    function visibleCount() {
      return window.innerWidth <= 768 ? 1 : 3;
    }

    function setupClones() {
      const visible = visibleCount();
      for (let i = 0; i < visible; i++) {
        const clone = items[i].cloneNode(true);
        clone.classList.add("clone");
        track.appendChild(clone);
      }
      items = document.querySelectorAll(".carousel-item");
    }

    setupClones();

    function moveCarousel(animated = true) {
      const itemWidth = items[0].offsetWidth + gap;
      track.style.transition = animated
        ? "transform 0.6s ease-in-out"
        : "none";
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    function rotateCarousel() {
      index++;
      moveCarousel(true);

      const visible = visibleCount();
      const maxIndex = items.length - visible;

      if (index === maxIndex) {
        setTimeout(() => {
          index = 0;
          moveCarousel(false);
        }, 600);
      }
    }

    setInterval(rotateCarousel, 3000);
  }

  /* =========================
     BOOKING MODAL CODE
  ========================= */
  const modal = document.getElementById("booking-modal");
  const closeModal = document.querySelector(".close-modal");
  const bookingForm = document.getElementById("booking-form");
  const successMessage = document.getElementById("success-message");
  const selectedItem = document.getElementById("selected-item");

  // Open modal from red buttons
  document.querySelectorAll(".book-now-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedItem.value = btn.dataset.item;
      modal.style.display = "block";
      document.body.classList.add("modal-open");
    });
  });

  // Open modal from footer button
  const footerBookBtn = document.querySelector(".footer-book-btn");
  if (footerBookBtn) {
    footerBookBtn.addEventListener("click", () => {
      selectedItem.value = "General Inquiry";
      modal.style.display = "block";
      document.body.classList.add("modal-open");
    });
  }

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });

  /* =========================
     FORM SUBMIT (FORMSPREE)
  ========================= */
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(bookingForm.action, {
      method: "POST",
      body: new FormData(bookingForm),
      headers: {
        Accept: "application/json"
      }
    })
    .then(() => {
      bookingForm.style.display = "none";
      successMessage.style.display = "block";
      document.querySelector(".modal-title").style.display = "none";

      // Refresh page after success
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch(() => {
      alert("There was a problem sending your request. Please try again.");
    });
  });

});
``