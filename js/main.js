// Enhanced Navbar Functionality
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        // Focus on first menu item when opening
        setTimeout(() => navLinks[0].focus(), 100);
    } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        // Return focus to toggle button when closing
        menuToggle.focus();
    }
}

// Close menu when clicking on a link
function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}

// Event listeners
menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            closeMenu();
        }
    });
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
        const isClickInsideNavbar = navbar.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        
        if (!isClickInsideNavbar && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }
});

// Close menu on escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Update navbar on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Smooth scrolling with offset
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Different offset for mobile
            const offset = window.innerWidth <= 992 ? 70 : 80;
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close menu if open on mobile
            if (window.innerWidth <= 992) {
                closeMenu();
            }
        }
    });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Modal functionality
const contactModal = document.getElementById('contactModal');
const contactButtons = document.querySelectorAll('[href="#contact"]');
const closeModal = document.querySelector('.close-modal');

contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
    }
});