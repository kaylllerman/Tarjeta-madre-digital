// Dynamic Floating Elements (Hearts/Confetti-like)
document.addEventListener("DOMContentLoaded", () => {
  const maxFloatingElements = 13; // Máximo número de elementos flotantes
  let currentFloatingElements = 0; // Contador de elementos flotantes

  const createFloatingElement = () => {
    if (currentFloatingElements >= maxFloatingElements) return; // No crear más si se alcanza el límite

    const element = document.createElement("div");
    element.classList.add("floating-element");
    // Randomize starting position, size, duration, and delay
    const startLeft = Math.random() * 100;
    element.style.left = `${startLeft}vw`;
    const size = Math.random() * 20 + 20; // Size between 20px and 40px
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.animationDuration = `${Math.random() * 7 + 8}s`; // Duration between 8 and 15 seconds
    element.style.animationDelay = `${Math.random() * 5}s`; // Delay up to 5 seconds
    element.style.opacity = Math.random() * 0.6 + 0.2; // Opacity between 0.2 and 0.8

    // Vary the shape slightly (simulate hearts or confetti)
    if (Math.random() > 0.5) {
      // 50% chance of being a "heart" shape
      element.style.backgroundColor = `rgba(${Math.random() * 155 + 100}, ${
        Math.random() * 100
      }, ${Math.random() * 100 + 155}, 0.6)`; // Shades of pink/red
      element.style.borderRadius = "50% 50% 0 50%";
      element.style.transform = `rotate(${Math.random() * 360}deg)`; // Random initial rotation
    } else {
      // Circle/confetti shape
      element.style.borderRadius = "50%";
      element.style.backgroundColor = `rgba(${Math.random() * 200 + 55}, ${
        Math.random() * 200 + 55
      }, ${Math.random() * 200 + 55}, 0.6)`; // Various light colors
      element.style.transform = `rotate(${Math.random() * 360}deg)`;
    }

    document.body.appendChild(element);
    currentFloatingElements++; // Incrementar el contador

    // Remove element after animation ends to prevent performance issues
    element.addEventListener("animationend", () => {
      element.remove();
      currentFloatingElements--; // Decrementar el contador al eliminar el elemento
    });
  };

  // Create a continuous flow of floating elements
  setInterval(createFloatingElement, 500); // Create a new element every 0.5 seconds (adjust frequency)

  // Smooth Scroll Reveal Animation
  const sections = document.querySelectorAll(".section");

  const revealSection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15, // Trigger when 15% of the section is visible
  });

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Carousel Functionality for Multiple Carousels
  const initializeCarousel = (carouselId) => {
    const carousel = document.getElementById(carouselId);
    const images = carousel.querySelectorAll("img");
    const prevButton = document.querySelector(
      `.carousel-button.prev[data-carousel="${carouselId}"]`
    );
    const nextButton = document.querySelector(
      `.carousel-button.next[data-carousel="${carouselId}"]`
    );
    let currentIndex = 0;

    const setup = () => {
      const imageWidth = images[0].clientWidth;

      const updateCarousel = () => {
        const imageWidth = images[0].clientWidth;
        carousel.style.transform = `translateX(${
          -currentIndex * imageWidth
        }px)`;
      };

      prevButton.addEventListener("click", () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        updateCarousel();
      });

      nextButton.addEventListener("click", () => {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
      });

      window.addEventListener("resize", updateCarousel);
    };

    if (images[0].complete) {
      // Imagen ya está cargada
      setup();
    } else {
      // Espera a que se cargue
      images[0].addEventListener("load", setup);
    }
  };

  // Initialize both carousels
  initializeCarousel("moments-carousel");
  initializeCarousel("gifts-carousel");

  // Personalized Messages Functionality
  const messageInput = document.getElementById("mom-message");
  const sendMessageButton = document.getElementById("send-message");
  const messagesList = document.getElementById("messages-list");

  sendMessageButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.textContent = messageText;

      // Add a simple fade-in animation for new messages
      messageElement.style.opacity = 0;
      messagesList.prepend(messageElement); // Add new message at the top

      setTimeout(() => {
        messageElement.style.transition = "opacity 0.5s ease-in";
        messageElement.style.opacity = 1;
      }, 10); // Small delay to allow element to be added to DOM

      messageInput.value = ""; // Clear the input field
    }
  });
});
