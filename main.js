// Loading Screen
window.addEventListener('load', function () {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('fade-out');

    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 600);
});



// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileCloseBtn = document.querySelector('.mobile-close-btn');

hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileCloseBtn.addEventListener('click', function () {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Modal Functionality
const modal = document.getElementById('contact-modal');
const openModalBtns = document.querySelectorAll('.open-modal');
const closeModalBtn = document.querySelector('.close-modal');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModalBtn.addEventListener('click', function () {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
modal.addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Form Submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Our representative will contact you within 24 hours.');
    this.reset();
});

document.getElementById('modal-contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your interest! We will schedule your site visit and contact you shortly.');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    this.reset();
});

// Tab Switching for Amenities
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Scroll Reveal Animation
const scrollElements = document.querySelectorAll('.scroll-reveal');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initial check on load
window.addEventListener('load', handleScrollAnimation);

// Custom Cursor (Optional - can be removed if not needed)
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Add hover effects for cursor
document.querySelectorAll('a, button, .hover-lift').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'var(--soft-gold)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--soft-gold)';
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});