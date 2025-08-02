// File: captain-saltie-draft3/js/script.js

// ===== NAUTICAL ADVENTURE JAVASCRIPT - CAPTAIN SALTIE DRAFT 3 =====

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeHeroAnimations();
    initializeProductCards();
    setupScrollEffects();
    initializeLifestyleItems();
    
    console.log('⚓ Captain Saltie Draft 3 - Nautical Adventure Theme! 🌊');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Enhanced scroll effect for navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// ===== HERO ANIMATIONS =====
function initializeHeroAnimations() {
    const heroElements = {
        badge: document.querySelector('.hero-badge'),
        title: document.querySelector('.hero-title'),
        subtitle: document.querySelector('.hero-subtitle'),
        actions: document.querySelector('.hero-actions'),
        tagline: document.querySelector('.hero-tagline'),
        image: document.querySelector('.hero-img')
    };
    
    // Stagger animation for hero elements
    Object.values(heroElements).forEach((element, index) => {
        if (element) {
            element.style.animationDelay = `${index * 0.2}s`;
        }
    });
    
    // Enhanced parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (scrolled < window.innerHeight && heroElements.image) {
            heroElements.image.style.transform = `translateY(${rate}px) scale(1.02)`;
        }
    });
}

// ===== PRODUCT CARD INTERACTIONS =====
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 80px rgba(255, 51, 51, 0.25)';
            
            // Glow effect for featured cards
            if (card.classList.contains('featured')) {
                card.style.borderColor = 'var(--saltie-red)';
                card.style.boxShadow = '0 25px 80px rgba(255, 51, 51, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
        });
        
        // Enhanced click animation with ripple effect
        card.addEventListener('click', function(e) {
            if (!e.target.matches('.product-cta')) {
                createRippleEffect(e, this);
            }
        });
    });
}

// ===== LIFESTYLE ITEMS INTERACTION =====
function initializeLifestyleItems() {
    const lifestyleItems = document.querySelectorAll('.lifestyle-item');
    
    lifestyleItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Enhanced overlay color transition
            const overlay = item.querySelector('.lifestyle-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(transparent, rgba(255, 51, 51, 0.9))';
            }
            
            // Add scale and glow effect
            item.style.transform = 'scale(1.03)';
            item.style.boxShadow = '0 20px 60px rgba(255, 51, 51, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.lifestyle-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(transparent, rgba(26, 61, 82, 0.9))';
            }
            
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });
}

// ===== ENHANCED RIPPLE EFFECT =====
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 51, 51, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        animation: ripple 0.8s ease-out;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    // Product cards entrance animation with stagger
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Lifestyle items entrance animation with stagger
    const lifestyleItems = document.querySelectorAll('.lifestyle-item');
    lifestyleItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Removed parallax effect for story image to prevent positioning issues
}

// ===== SCROLL TO FUNCTIONS =====
function scrollToProducts() {
    const productsSection = document.querySelector('#products');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToStory() {
    const storySection = document.querySelector('#story');
    if (storySection) {
        storySection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== BUTTON INTERACTIONS =====
document.addEventListener('click', function(e) {
    // Enhanced CTA button effects
    if (e.target.matches('.cta-primary, .contact-cta')) {
        createWaveEffect(e.target);
        showNotification('Ahoy! Coming soon! ⚓');
    }
    
    // Product CTA buttons
    if (e.target.matches('.product-cta')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
        
        createSparkEffect(e.target);
        showNotification('Fire \'N The Hold coming soon! 🔥');
    }
    
    // Social links
    if (e.target.matches('.social-link')) {
        e.preventDefault();
        showNotification('Follow us for launch updates! 🌊');
    }
});

// ===== WAVE EFFECT FOR BUTTONS =====
function createWaveEffect(button) {
    const wave = document.createElement('div');
    const rect = button.getBoundingClientRect();
    
    wave.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1;
        animation: wave 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(wave);
    
    // Add wave animation keyframes
    if (!document.querySelector('#wave-animation')) {
        const style = document.createElement('style');
        style.id = 'wave-animation';
        style.textContent = `
            @keyframes wave {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        wave.remove();
    }, 600);
}

// ===== ENHANCED SPARK EFFECT =====
function createSparkEffect(button) {
    const rect = button.getBoundingClientRect();
    const sparks = 8;
    
    for (let i = 0; i < sparks; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #FF6B35, #FF3333);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            box-shadow: 0 0 10px rgba(255, 51, 51, 0.8);
        `;
        
        document.body.appendChild(spark);
        
        const angle = (i / sparks) * Math.PI * 2;
        const velocity = 80;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        spark.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1,
                filter: 'hue-rotate(0deg)'
            },
            { 
                transform: `translate(${x}px, ${y}px) scale(0)`, 
                opacity: 0,
                filter: 'hue-rotate(180deg)'
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => spark.remove();
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #1A3D52, #2C5F7A);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(26, 61, 82, 0.3);
        border: 2px solid #FF3333;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3500);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Press 'S' to scroll to products
    if (e.key === 's' || e.key === 'S') {
        if (!e.target.matches('input, textarea')) {
            e.preventDefault();
            scrollToProducts();
            showNotification('SEND IT! Fire \'N The Hold! 🔥');
        }
    }
    
    // Press 'A' for adventure (lifestyle section)
    if (e.key === 'a' || e.key === 'A') {
        if (!e.target.matches('input, textarea')) {
            e.preventDefault();
            document.querySelector('#lifestyle').scrollIntoView({ behavior: 'smooth' });
            showNotification('Adventure Approved! ⚓');
        }
    }
    
    // Press 'H' for story/heritage
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            e.preventDefault();
            document.querySelector('#story').scrollIntoView({ behavior: 'smooth' });
            showNotification('6th Generation Heritage! 🌊');
        }
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Additional scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ===== ENHANCED EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateNauticalMode();
        konamiCode = [];
    }
});

function activateNauticalMode() {
    // Create epic nautical adventure mode effect
    document.body.style.animation = 'nauticalMode 4s ease-in-out';
    
    // Show special captain's message
    const nauticalMessage = document.createElement('div');
    nauticalMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1A3D52, #2C5F7A);
            color: white;
            padding: 50px;
            border-radius: 20px;
            text-align: center;
            z-index: 10001;
            font-size: 1.3rem;
            box-shadow: 0 30px 100px rgba(26, 61, 82, 0.8);
            font-family: 'Anton', sans-serif;
            border: 3px solid #FF3333;
            max-width: 90vw;
        ">
            <h3 style="margin-bottom: 25px; font-size: 2.5rem; color: #FF3333;">⚓ CAPTAIN'S SECRET NAUTICAL MODE! ⚓</h3>
            <p style="margin-bottom: 20px; font-family: 'Inter', sans-serif; font-size: 1.1rem;">You've discovered the Captain's hidden treasure chest!</p>
            <p style="margin-bottom: 25px; font-family: 'Inter', sans-serif;"><strong style="color: #FF6B35;">Use code: NAUTICAL2024 for exclusive Captain's access!</strong></p>
            <p style="margin-bottom: 30px; font-style: italic; opacity: 0.9; font-family: 'Inter', sans-serif;">🌊 "Fire 'N The Hold will hold your anchor fast!" 🌊</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #FF3333;
                color: white;
                border: none;
                padding: 15px 35px;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 700;
                font-family: 'Roboto Condensed', sans-serif;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 1rem;
                box-shadow: 0 5px 20px rgba(255, 51, 51, 0.4);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">AHOY! SET SAIL!</button>
        </div>
    `;
    
    document.body.appendChild(nauticalMessage);
    
    // Add nautical mode animation with ocean waves effect
    if (!document.querySelector('#nautical-mode-styles')) {
        const style = document.createElement('style');
        style.id = 'nautical-mode-styles';
        style.textContent = `
            @keyframes nauticalMode {
                0%, 100% { 
                    filter: hue-rotate(0deg) saturate(1) brightness(1); 
                    transform: scale(1);
                }
                25% { 
                    filter: hue-rotate(30deg) saturate(1.2) brightness(1.1); 
                    transform: scale(1.005);
                }
                50% { 
                    filter: hue-rotate(60deg) saturate(1.4) brightness(1.2); 
                    transform: scale(1.01);
                }
                75% { 
                    filter: hue-rotate(30deg) saturate(1.2) brightness(1.1); 
                    transform: scale(1.005);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create floating nautical particles
    createNauticalParticles();
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 4000);
}

// ===== NAUTICAL PARTICLES EFFECT =====
function createNauticalParticles() {
    const particles = ['⚓', '🌊', '⛵', '🐚', '🏴‍☠️'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            pointer-events: none;
            z-index: 9999;
            animation: floatUp ${Math.random() * 3 + 2}s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Add floating animation
        if (!document.querySelector('#float-up-animation')) {
            const style = document.createElement('style');
            style.id = 'float-up-animation';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

// ===== LOADING STATES =====
window.addEventListener('load', () => {
    // Hide any loading spinner
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Start entrance animations
    document.body.classList.add('loaded');
    
    // Initialize any additional features
    initializeImageLazyLoading();
});

// ===== LAZY LOADING FOR IMAGES =====
function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.log('Captain Saltie says: "Even the finest sailors encounter rough seas! ⚓"');
    // In production, send to error tracking service
});

// ===== CONSOLE SIGNATURE =====
console.log(`
    ⚓ CAPTAIN SALTIE DRAFT 3 - NAUTICAL ADVENTURE ⚓
    
    🌊 Light Nautical Theme • Enhanced Interactions • Adventure Ready 🌊
    
    Key Features:
    ⚓ Enhanced floating navigation with backdrop blur
    🌊 Nautical blue color scheme with wave dividers
    🔥 Interactive product cards with red glow effects
    ⛵ Dynamic lifestyle grid with hover transitions
    🏴‍☠️ Advanced scroll animations and parallax effects
    
    Keyboard Shortcuts:
    S - Jump to products (SEND IT!)
    A - Jump to adventure (lifestyle)
    H - Jump to heritage (story)
    Konami Code - Secret nautical adventure mode!
    
    Built with modern JavaScript, CSS Grid, and love for the sea
    Optimized for performance and mobile adventure
    
    🔥 FIRE 'N THE HOLD - SEND IT! 🔥
`);

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Focus management for mobile menu
    const hamburger = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('aria-hidden', isExpanded);
        });
        
        // Set initial ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Ensure buttons have proper focus states
    const buttons = document.querySelectorAll('button, .cta-primary, .cta-secondary');
    buttons.forEach(button => {
        button.addEventListener('focus', () => {
            button.style.outline = '2px solid #FF3333';
            button.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', () => {
            button.style.outline = '';
            button.style.outlineOffset = '';
        });
    });
});

// ===== FINAL INITIALIZATION MESSAGE =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('⚓ Captain Saltie\'s nautical adventure ship is ready to sail! 🌊');
    
    // Show welcome message after a short delay
    setTimeout(() => {
        showNotification('Welcome aboard, matey! ⚓');
    }, 2000);
});
