// Animation Script for eLife Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create SVG gradient for the logo (needs to be added programmatically)
    addLogoGradient();
    
    // Handle the intro animation sequence
    handleIntroAnimation();
    
    // Initialize other animations when scrolling
    initScrollAnimations();
});

/**
 * Adds a gradient definition to the SVG logo
 */
function addLogoGradient() {
    // Create the SVG namespace element
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Find all SVG elements with the fingerprint logo class
    const svgElements = document.querySelectorAll('.fingerprint-logo, .logo-icon');
    
    // For each SVG element, add the gradient definition
    svgElements.forEach(svg => {
        // Create defs element
        const defs = document.createElementNS(svgNS, 'defs');
        
        // Create linear gradient
        const gradient = document.createElementNS(svgNS, 'linearGradient');
        gradient.setAttribute('id', 'logo-gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        
        // Create first stop
        const stop1 = document.createElementNS(svgNS, 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#6c5ce7');
        
        // Create second stop
        const stop2 = document.createElementNS(svgNS, 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#e74c3c');
        
        // Append stops to gradient
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        
        // Append gradient to defs
        defs.appendChild(gradient);
        
        // Append defs to SVG
        svg.insertBefore(defs, svg.firstChild);
    });
}

/**
 * Handles the intro animation and transition to the main content
 */
function handleIntroAnimation() {
    const introContainer = document.getElementById('intro-animation');
    
    // If there's no intro container, return early
    if (!introContainer) return;
    
    // After animation completes, fade out the intro and show the main content
    setTimeout(() => {
        introContainer.classList.add('fade-out');
        
        // After fade out animation completes, remove the intro container
        setTimeout(() => {
            introContainer.style.display = 'none';
            
            // Trigger entrance animations for the hero section
            animateHeroEntrance();
        }, 500); // Match this with the fade-out transition duration
    }, 3500); // Wait for logo and text animations to complete
}

/**
 * Animates the hero section entrance after intro animation
 */
function animateHeroEntrance() {
    const heroElements = [
        document.querySelector('.hero h1'),
        document.querySelector('.hero p'),
        document.querySelector('.cta-buttons'),
        document.querySelector('.hero-image')
    ];
    
    // Add fade-in-up class to each element with increasing delays
    heroElements.forEach((element, index) => {
        if (element) {
            element.classList.add('fade-in');
            element.classList.add(`delay-${index + 1}`);
            
            // Trigger the animation
            setTimeout(() => {
                element.classList.add('active');
            }, 100);
        }
    });
}

/**
 * Initializes animations that trigger on scroll
 */
function initScrollAnimations() {
    // Get all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    // Add active class when elements come into view
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // How many pixels from the viewport edge to start animation
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Run once to check for elements already in view
    checkScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', checkScroll);
    
    // Also handle header style on scroll
    handleHeaderScroll();
}

/**
 * Changes header appearance on scroll
 */
function handleHeaderScroll() {
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Creates a ripple effect when buttons are clicked
 */
function createRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove any existing ripple elements
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // Create a new ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Position the ripple where clicked
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.top = `${y}px`;
            ripple.style.left = `${x}px`;
            
            // Add the ripple to the button
            button.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

// Apply the ripple effect to buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', createRippleEffect);