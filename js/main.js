/**
 * Great Emu War - Main JavaScript
 * 
 * This file contains general JavaScript functionality for the Great Emu War website.
 * Includes navigation, animations, and interactive features outside of the game.
 * 
 * Author: Great Emu War Project
 * Version: 1.0.0
 */

/**
 * Initialize the website when the DOM is fully loaded
 * Sets up event listeners and starts background animations
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🦆 Great Emu War website loaded successfully!');
    
    // Initialize navigation functionality
    initializeNavigation();
    
    // Start background emu animations
    initializeEmuAnimations();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize accessibility features
    initializeAccessibility();
});

/**
 * Initialize smooth scrolling navigation
 * Sets up click handlers for anchor links
 */
function initializeNavigation() {
    console.log('📍 Initializing navigation...');
    
    // Find all anchor links that point to sections on the same page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Smooth scroll to target
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
                
                console.log(`🎯 Navigated to ${targetId}`);
            }
        });
    });
}

/**
 * Initialize background emu animations
 * Creates random movements for decorative emu silhouettes
 */
function initializeEmuAnimations() {
    console.log('🦆 Starting emu animations...');
    
    // Find all emu silhouette elements
    const emuElements = document.querySelectorAll('.emu-silhouette');
    
    if (emuElements.length === 0) {
        console.log('ℹ️ No emu silhouettes found for animation');
        return;
    }
    
    /**
     * Animate emus with random movements
     * Creates a subtle, playful effect
     */
    function animateEmus() {
        emuElements.forEach((emu, index) => {
            // Only animate some emus on each cycle (30% chance)
            if (Math.random() > 0.7) {
                // Generate random movement within small bounds
                const moveX = Math.random() * 10 - 5; // -5 to 5 pixels
                const moveY = Math.random() * 10 - 5; // -5 to 5 pixels
                
                // Apply movement with smooth transition
                emu.style.transition = 'transform 0.5s ease-out';
                emu.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
                
                // Return to original position after a delay
                setTimeout(() => {
                    emu.style.transform = 'translateX(0) translateY(0)';
                }, 500);
                
                console.log(`🦆 Animated emu ${index + 1}`);
            }
        });
    }
    
    // Run animation every 3 seconds
    setInterval(animateEmus, 3000);
    
    // Run initial animation after a short delay
    setTimeout(animateEmus, 1000);
}

/**
 * Initialize scroll-based effects
 * Adds parallax and reveal animations based on scroll position
 */
function initializeScrollEffects() {
    console.log('📜 Initializing scroll effects...');
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    /**
     * Handle scroll events
     * Updates navigation state and triggers scroll-based animations
     */
    function handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Update navigation bar appearance based on scroll
        updateNavigationOnScroll(scrollY);
        
        // Add parallax effect to hero section
        addParallaxEffect(scrollY);
    }
    
    /**
     * Update navigation bar styling based on scroll position
     * @param {number} scrollY - Current scroll position
     */
    function updateNavigationOnScroll(scrollY) {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        if (scrollY > 50) {
            nav.classList.add('scrolled');
            // You can add additional styling here
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    /**
     * Add subtle parallax effect to hero background
     * @param {number} scrollY - Current scroll position
     */
    function addParallaxEffect(scrollY) {
        const heroSection = document.querySelector('section'); // First section (hero)
        if (!heroSection) return;
        
        // Move background slightly slower than scroll for parallax effect
        const parallaxSpeed = 0.5;
        const yPos = -(scrollY * parallaxSpeed);
        
        heroSection.style.backgroundPosition = `center ${yPos}px`;
    }
}

/**
 * Initialize accessibility features
 * Enhances keyboard navigation and screen reader support
 */
function initializeAccessibility() {
    console.log('♿ Initializing accessibility features...');
    
    // Add skip link functionality
    addSkipLink();
    
    // Enhance keyboard navigation
    enhanceKeyboardNavigation();
    
    // Add ARIA labels where needed
    addAriaLabels();
}

/**
 * Add skip link for keyboard navigation
 * Allows users to quickly jump to main content
 */
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#timeline';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Enhance keyboard navigation
 * Adds proper focus management and keyboard shortcuts
 */
function enhanceKeyboardNavigation() {
    // Add keyboard shortcut for game (G key)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'g' || e.key === 'G') {
            if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts
            
            const gameSection = document.getElementById('emu-game');
            if (gameSection) {
                gameSection.scrollIntoView({ behavior: 'smooth' });
                e.preventDefault();
            }
        }
    });
    
    // Ensure all interactive elements are focusable
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
}

/**
 * Add ARIA labels for better screen reader support
 * Improves accessibility for visually impaired users
 */
function addAriaLabels() {
    // Add ARIA label to navigation
    const nav = document.querySelector('nav');
    if (nav && !nav.hasAttribute('aria-label')) {
        nav.setAttribute('aria-label', 'Main navigation');
    }
    
    // Add ARIA labels to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (!section.hasAttribute('aria-label')) {
            const heading = section.querySelector('h1, h2, h3');
            if (heading) {
                section.setAttribute('aria-labelledby', heading.id || `section-${index}`);
                if (!heading.id) {
                    heading.id = `section-${index}`;
                }
            }
        }
    });
}

/**
 * Utility function to create smooth scroll to element
 * @param {string} elementId - ID of the target element
 * @param {number} offset - Optional offset from top (default: 0)
 */
function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID '${elementId}' not found`);
        return;
    }
    
    const elementTop = element.offsetTop - offset;
    
    window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
    });
}

/**
 * Utility function to check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} True if element is visible in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other scripts if needed
window.EmuWarUtils = {
    scrollToElement,
    isElementInViewport,
    debounce
};
