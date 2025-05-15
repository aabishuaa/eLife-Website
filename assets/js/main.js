// Main JavaScript for eLife Website

document.addEventListener("DOMContentLoaded", function () {
  // Add all SVG gradients needed for the site
  addSVGGradients();

  // Initialize all fade-in elements
  initFadeElements();

  // Initialize testimonial slider if it exists
  initTestimonialSlider();

  // Initialize FAQ accordions if they exist
  initFaqAccordions();

  // Initialize form validation
  initFormValidation();

  // Initialize dark mode toggle if it exists
  initDarkModeToggle();

  // Add animation classes to elements
  addAnimationClasses();
});

/**
 * Adds SVG gradients needed for various elements
 */
function addSVGGradients() {
  // Create a hidden SVG with gradient definitions that can be referenced from CSS
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.setAttribute("style", "position: absolute; z-index: -1; opacity: 0;");

  // Add the defs element
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  // Create primary gradient (red)
  const primaryGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  primaryGradient.setAttribute("id", "primary-gradient");
  primaryGradient.setAttribute("x1", "0%");
  primaryGradient.setAttribute("y1", "0%");
  primaryGradient.setAttribute("x2", "100%");
  primaryGradient.setAttribute("y2", "100%");

  const primaryStop1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  primaryStop1.setAttribute("offset", "0%");
  primaryStop1.setAttribute("stop-color", "#e74c3c");

  const primaryStop2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  primaryStop2.setAttribute("offset", "100%");
  primaryStop2.setAttribute("stop-color", "#c0392b");

  primaryGradient.appendChild(primaryStop1);
  primaryGradient.appendChild(primaryStop2);

  // Create secondary gradient (purple)
  const secondaryGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  secondaryGradient.setAttribute("id", "secondary-gradient");
  secondaryGradient.setAttribute("x1", "0%");
  secondaryGradient.setAttribute("y1", "0%");
  secondaryGradient.setAttribute("x2", "100%");
  secondaryGradient.setAttribute("y2", "100%");

  const secondaryStop1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  secondaryStop1.setAttribute("offset", "0%");
  secondaryStop1.setAttribute("stop-color", "#6c5ce7");

  const secondaryStop2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  secondaryStop2.setAttribute("offset", "100%");
  secondaryStop2.setAttribute("stop-color", "#5541d9");

  secondaryGradient.appendChild(secondaryStop1);
  secondaryGradient.appendChild(secondaryStop2);

  // Create mixed gradient (purple to red)
  const mixedGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  mixedGradient.setAttribute("id", "mixed-gradient");
  mixedGradient.setAttribute("x1", "0%");
  mixedGradient.setAttribute("y1", "0%");
  mixedGradient.setAttribute("x2", "100%");
  mixedGradient.setAttribute("y2", "100%");

  const mixedStop1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  mixedStop1.setAttribute("offset", "0%");
  mixedStop1.setAttribute("stop-color", "#6c5ce7");

  const mixedStop2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  mixedStop2.setAttribute("offset", "100%");
  mixedStop2.setAttribute("stop-color", "#e74c3c");

  mixedGradient.appendChild(mixedStop1);
  mixedGradient.appendChild(mixedStop2);

  // Add all gradients to defs
  defs.appendChild(primaryGradient);
  defs.appendChild(secondaryGradient);
  defs.appendChild(mixedGradient);

  // Add defs to SVG
  svg.appendChild(defs);

  // Add SVG to body
  document.body.appendChild(svg);
}

/**
 * Initializes fade-in animations for elements as they enter the viewport
 */
function initFadeElements() {
  // Select all elements with fade-in classes
  const fadeElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right"
  );

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Stop observing the element after it's activated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // viewport
      threshold: 0.1, // trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px", // margin around the root
    }
  );

  // Observe each fade element
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Initialize a testimonial slider if it exists on the page
 */
function initTestimonialSlider() {
  const sliderContainer = document.querySelector(".testimonial-slider");
  if (!sliderContainer) return;

  const slides = sliderContainer.querySelectorAll(".testimonial-slide");
  const prevBtn = sliderContainer.querySelector(".prev-btn");
  const nextBtn = sliderContainer.querySelector(".next-btn");
  const indicators = sliderContainer.querySelectorAll(".indicator");

  let currentSlide = 0;

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    // Show the current slide
    slides[index].classList.add("active");

    // Highlight the current indicator
    indicators[index].classList.add("active");
  }

  // Initialize the first slide
  showSlide(currentSlide);

  // Event listener for previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      showSlide(currentSlide);
    });
  }

  // Event listener for next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    });
  }

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-advance the slider every 5 seconds
  setInterval(() => {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }, 5000);
}

/**
 * Initializes accordions for FAQ sections
 */
function initFaqAccordions() {
  const accordionItems = document.querySelectorAll(".faq-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".faq-question");
    const content = item.querySelector(".faq-answer");

    if (header && content) {
      header.addEventListener("click", () => {
        // Check if current item is active
        const isActive = item.classList.contains("active");

        // Close all accordion items
        accordionItems.forEach((accItem) => {
          accItem.classList.remove("active");

          const accContent = accItem.querySelector(".faq-answer");
          if (accContent) {
            accContent.style.maxHeight = null;
          }
        });

        // If the clicked item wasn't active, open it
        if (!isActive) {
          item.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  });
}

/**
 * Initializes form validation for contact and subscription forms
 */
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!submitBtn) return;

    form.addEventListener("submit", function (e) {
      // Prevent default form submission
      e.preventDefault();

      // Get all required inputs
      const requiredInputs = form.querySelectorAll("[required]");
      let isValid = true;

      // Check each required input
      requiredInputs.forEach((input) => {
        // Remove any existing error message
        const existingError =
          input.parentElement.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }

        // Check if input is empty
        if (!input.value.trim()) {
          isValid = false;

          // Add error class
          input.classList.add("error");

          // Create error message
          const errorMessage = document.createElement("div");
          errorMessage.classList.add("error-message");
          errorMessage.textContent = "This field is required";

          // Add error message after input
          input.parentElement.appendChild(errorMessage);
        } else {
          // Remove error class
          input.classList.remove("error");

          // Validate email format if this is an email input
          if (input.type === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
              isValid = false;

              // Add error class
              input.classList.add("error");

              // Create error message
              const errorMessage = document.createElement("div");
              errorMessage.classList.add("error-message");
              errorMessage.textContent = "Please enter a valid email address";

              // Add error message after input
              input.parentElement.appendChild(errorMessage);
            }
          }
        }
      });

      // If form is valid, submit (in a real implementation this would send data to backend)
      if (isValid) {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

        // Simulate form submission delay
        setTimeout(() => {
          // Reset form
          form.reset();

          // Reset button
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Sent!";

          // Show success message
          const successMessage = document.createElement("div");
          successMessage.classList.add("success-message");
          successMessage.textContent =
            "Your message has been sent successfully!";

          // Insert after form
          form.parentElement.insertBefore(successMessage, form.nextSibling);

          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
            submitBtn.innerHTML = "Submit";
          }, 5000);
        }, 2000);
      }
    });
  });
}

/**
 * Initializes dark mode toggle functionality
 */
function initDarkModeToggle() {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");

  if (!darkModeToggle) return;

  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Check if dark mode is saved in localStorage
  const savedDarkMode = localStorage.getItem("darkMode") === "true";

  // Set initial dark mode state
  let isDarkMode = savedDarkMode || prefersDarkMode;

  // Apply dark mode if needed
  if (isDarkMode) {
    document.body.classList.add("dark-mode");

    if (darkModeToggle.querySelector("i")) {
      darkModeToggle.querySelector("i").classList.remove("fa-moon");
      darkModeToggle.querySelector("i").classList.add("fa-sun");
    }
  }

  // Toggle dark mode on click
  darkModeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;

    // Toggle dark mode class on body
    document.body.classList.toggle("dark-mode", isDarkMode);

    // Toggle icon if it exists
    if (darkModeToggle.querySelector("i")) {
      if (isDarkMode) {
        darkModeToggle.querySelector("i").classList.remove("fa-moon");
        darkModeToggle.querySelector("i").classList.add("fa-sun");
      } else {
        darkModeToggle.querySelector("i").classList.remove("fa-sun");
        darkModeToggle.querySelector("i").classList.add("fa-moon");
      }
    }

    // Save preference to localStorage
    localStorage.setItem("darkMode", isDarkMode);
  });
}

/**
 * Adds animation classes to elements for visual effects
 */
function addAnimationClasses() {
  // Add floating animation to specified elements
  document.querySelectorAll(".float-effect").forEach((el) => {
    el.classList.add("animate-float");
  });

  // Add pulse animation to specified elements
  document.querySelectorAll(".pulse-effect").forEach((el) => {
    el.classList.add("animate-pulse");
  });

  // Add gradient animation to specified elements
  document.querySelectorAll(".gradient-effect").forEach((el) => {
    el.classList.add("animate-gradient");
  });
}

/**
 * Handles the analytics tracking for user interactions
 * This is a placeholder function; in a real implementation,
 * it would connect to Google Analytics or a similar service
 */
function trackAnalytics(eventName, eventData) {
  // This is where you would implement actual analytics tracking
  // For example, with Google Analytics:
  // if (window.gtag) {
  //     gtag('event', eventName, eventData);
  // }

  // Just log for demo purposes
  console.log("Analytics event:", eventName, eventData);
}

/**
 * Adds lazy loading to images for performance
 */
function initLazyLoading() {
  // Check if the browser supports IntersectionObserver
  if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");

          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
            img.classList.add("loaded");
          }

          observer.unobserve(img);
        }
      });
    });

    // Target all images with data-src attribute
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      imgObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll("img[data-src]");

    lazyImages.forEach((img) => {
      const src = img.getAttribute("data-src");

      if (src) {
        img.src = src;
        img.removeAttribute("data-src");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Handle FAQ toggles
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const toggle = item.querySelector(".faq-toggle");

    question.addEventListener("click", () => {
      // Check if current item is active
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");
        const faqToggle = faqItem.querySelector(".faq-toggle i");
        faqToggle.classList.remove("fa-minus");
        faqToggle.classList.add("fa-plus");
      });

      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add("active");
        toggle.querySelector("i").classList.remove("fa-plus");
        toggle.querySelector("i").classList.add("fa-minus");
      }
    });
  });

  // Handle form submission
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // In a real implementation, this would send the form data to a server
      // For demo purposes, we'll just show a success message

      // Get form elements
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span> Sending...';

      // Simulate form submission delay
      setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = "Message Sent!";

        // Show success message
        const formContainer = document.querySelector(".form-container");
        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';

        // Insert before form
        formContainer.insertBefore(successMessage, contactForm);

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
          submitButton.innerHTML = "Send Message";
        }, 5000);
      }, 2000);
    });
  }

  // Handle newsletter subscription
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form elements
      const submitButton = newsletterForm.querySelector(
        'button[type="submit"]'
      );
      const emailInput = newsletterForm.querySelector('input[type="email"]');

      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span>';

      // Simulate form submission delay
      setTimeout(() => {
        // Reset form
        emailInput.value = "";

        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = "Subscribed!";

        // Show success message
        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message", "newsletter-success");
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you for subscribing!';

        // Insert after form
        newsletterForm.appendChild(successMessage);

        // Remove success message and reset button after 5 seconds
        setTimeout(() => {
          successMessage.remove();
          submitButton.innerHTML = "Subscribe";
        }, 5000);
      }, 1500);
    });
  }
});

// Initialize lazy loading when DOM is loaded
document.addEventListener("DOMContentLoaded", initLazyLoading);
