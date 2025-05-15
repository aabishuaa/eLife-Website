// Navigation Script for eLife Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize active navigation highlighting
    initActiveNavHighlighting();
});

/**
 * Initializes the mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', function() {
        // Toggle the active class on the navigation
        mainNav.classList.toggle('active');
        
        // Toggle the icon between hamburger and close
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close the mobile menu when a link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) { // Only on mobile/tablet
                mainNav.classList.remove('active');
                
                // Reset the icon
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Close the mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = mainNav.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInside && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            
            // Reset the icon
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the header height to offset the scroll position
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                
                // Calculate the target position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initializes active navigation highlighting based on scroll position
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // No sections with IDs, return early
    if (sections.length === 0) return;
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        
        // Calculate the top position of each section and determine which one is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for header
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Get the corresponding nav link
                const targetId = '#' + section.getAttribute('id');
                const targetLink = document.querySelector(`.main-nav a[href="${targetId}"]`);
                
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add 'active' class to current link
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }
        });
        
        // If we're at the top of the page, highlight the first link
        if (scrollPosition < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[0]) {
                navLinks[0].classList.add('active');
            }
        }
    }
    
    // Update active link on page load
    updateActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
}

/**
 * Scrolls to top of the page when back-to-top button is clicked
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Show button when user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button if it exists
document.addEventListener('DOMContentLoaded', initBackToTop);