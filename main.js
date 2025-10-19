// ===========================
// Navigation & Smooth Scrolling
// ===========================

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
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

// Active navigation link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const sectionTop = targetSection.offsetTop;
            const sectionBottom = sectionTop + targetSection.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===========================
// Scroll to Top Button
// ===========================
const scrollToTopBtn = document.querySelector('.scroll-to-top');

function handleScrollToTopVisibility() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    // In a real application, you would send this data to a server
    try {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log form data to console (for demonstration)
        console.log('Form submitted:', formData);
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide success message and show form again after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
            contactForm.style.display = 'block';
        }, 5000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error submitting your message. Please try again or contact us directly.');
        
        // Reset button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
    }
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, feature items, and other animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .feature-item, .service-item, .benefit-item, .contact-card, .info-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===========================
// Parallax Effect for Hero Section
// ===========================
function handleParallax() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
}

// ===========================
// Counter Animation for Statistics (if needed in future)
// ===========================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===========================
// Form Input Focus Effect
// ===========================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ===========================
// Prevent Default for Hash Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Window Scroll Event Listeners
// ===========================
let ticking = false;

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleNavbarScroll();
            handleScrollToTopVisibility();
            updateActiveNavLink();
            handleParallax();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll);

// ===========================
// Page Load Initialization
// ===========================
window.addEventListener('load', () => {
    // Initial checks
    handleNavbarScroll();
    handleScrollToTopVisibility();
    updateActiveNavLink();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ===========================
// Resize Event Handler
// ===========================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// ===========================
// Prevent Right Click on Images (Optional)
// ===========================
// Uncomment if you want to prevent right-click on images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/

// ===========================
// Loading Animation (Optional)
// ===========================
// Add a loading animation when navigating
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only add loading for external links or page navigation
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            // Add loading animation here if needed
        }
    });
});

// ===========================
// Console Log for Development
// ===========================
console.log('%c nxelite IT Solutions ', 'background: linear-gradient(135deg, #6366f1, #10b981); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('%c Website successfully loaded! ', 'color: #6366f1; font-size: 14px; font-weight: bold;');
console.log('For inquiries, contact: info@nxelite.in');

// ===========================
// Export functions if needed for modules
// ===========================
// export { animateCounter, handleScroll };
