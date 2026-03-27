// Initialize Lucide Icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initScrollToTop();
    initNavbarScroll();
    initFormHandler();
    init3DCardEffects();
    initParallaxEffects();
    init3DButtons();
    initPageLoadAnimations();
    initTiltEffect();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('[onclick="toggleMobileMenu()"]');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Form Submission Handler
function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

function handleSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Simulate form submission with loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Hide form, show success
        form.style.display = 'none';
        successMsg.classList.remove('hidden');
        successMsg.classList.add('animate-fade-up');
        
        // Re-initialize icons for success message
        lucide.createIcons();
        
        // Reset button state (in case user navigates back)
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible');
        }
    });
    
    scrollTopBtn.addEventListener('click', scrollToTop);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.service-card, .glass-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// 3D Card Hover Effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.service-card, .glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-10px) translateZ(30px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease-out';
            this.style.transform = 'translateY(0) translateZ(0) rotateX(0)';
        });
    });
}

// Parallax Scroll Effects
function initParallaxEffects() {
    const heroSection = document.getElementById('home');
    const projectImages = document.querySelectorAll('#projects img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        // Parallax for hero background
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.backgroundPositionY = `${rate}px`;
        }
        
        // Subtle parallax for project images
        projectImages.forEach((img, index) => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.05 * (index % 3 + 1);
                img.style.transform = `translateY(${scrolled * speed}px) scale(1.05)`;
            }
        });
    });
}

// 3D Button Press Effects
function init3DButtons() {
    const buttons = document.querySelectorAll('button, .bg-primary, .bg-secondary, a[href^="#contact"], a[href^="tel"]');
    
    buttons.forEach(btn => {
        btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95) translateY(2px)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05) translateY(0)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Page Load Animations
function initPageLoadAnimations() {
    // Stagger animation for stats
    const stats = document.querySelectorAll('.stats-counter');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px) rotateX(-15deg)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0) rotateX(0)';
        }, 200 * (index + 1));
    });
    
    // Animate navbar items
    const navItems = document.querySelectorAll('#navbar a, #navbar button');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
}

// 3D Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
            this.style.transition = 'transform 0.5s ease-out';
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease-out';
        });
    });
}

// Smooth Counter Animation with 3D flip effect
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 16);
}

// Intersection Observer for 3D entrance animations
function init3DScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered 3D entrance
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0) scale(1)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards with initial 3D state
    document.querySelectorAll('.service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px) rotateX(-30deg) scale(0.9)';
        el.style.transformStyle = 'preserve-3d';
        el.style.perspective = '1000px';
        observer.observe(el);
    });
}

// Enhanced scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
    
    // Initialize all animation systems
    initScrollAnimations();
    init3DScrollAnimations();
});

// Phone number formatter
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 10) {
        value = value.substring(0, 10);
        const area = value.substring(0, 3);
        const prefix = value.substring(3, 6);
        const line = value.substring(6);
        input.value = `(${area}) ${prefix}-${line}`;
    }
}