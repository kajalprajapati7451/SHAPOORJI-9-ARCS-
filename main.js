// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
const form = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-links a');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animation
const fadeElements = document.querySelectorAll('.fade-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send data to server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your interest! We will contact you shortly.');
    form.reset();
});

// Hero image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const heroImg = document.querySelector('.hero-img');
    
    // Preload the image
    const img = new Image();
    img.src = heroImg.src;
    img.onload = () => {
        heroImg.style.opacity = '1';
    };
});

// Add active class to current nav link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial fade animations
    setTimeout(() => {
        const fadeUps = document.querySelectorAll('.fade-up');
        fadeUps.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 100);
});
// Limited Inventory Functionality
function updateCountdown() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 5); // 5 days from now
    
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance < 0) {
        countdownDate.setDate(countdownDate.getDate() + 5);
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update inventory numbers with animation
function updateInventoryNumbers() {
    const availableUnits = document.getElementById('available-units');
    const bookedUnits = document.getElementById('booked-units');
    const reservedUnits = document.getElementById('reserved-units');
    
    let available = 18;
    let booked = 32;
    let reserved = 10;
    
    // Animate counting up
    const animateCount = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    };
    
    setTimeout(() => {
        animateCount(availableUnits, available);
        animateCount(bookedUnits, booked);
        animateCount(reservedUnits, reserved);
    }, 500);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Initialize inventory numbers
    updateInventoryNumbers();
    
    // Add pulse animation to urgency badge
    const urgencyBadge = document.querySelector('.inventory-badge');
    if (urgencyBadge) {
        setInterval(() => {
            urgencyBadge.style.boxShadow = urgencyBadge.style.boxShadow === 'var(--shadow-md)' 
                ? '0 5px 25px rgba(255, 77, 77, 0.5)' 
                : 'var(--shadow-md)';
        }, 2000);
    }
    
    // Add hover effects to cards
    const inventoryCards = document.querySelectorAll('.inventory-card');
    inventoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.inventory-card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.inventory-card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});
// Popup Functionality
const popupOverlay = document.getElementById('popup-overlay');
const bookVisitPopup = document.getElementById('book-visit-popup');
const brochurePopup = document.getElementById('brochure-popup');
const successPopup = document.getElementById('success-popup');
const successMessage = document.getElementById('success-message');
const successClose = document.getElementById('success-close');
const popupCloseButtons = document.querySelectorAll('.popup-close');
const openPopupButtons = document.querySelectorAll('.open-popup');

// Open Popup Function
function openPopup(popupId) {
    // Close any open popups first
    closeAllPopups();
    
    // Show overlay
    popupOverlay.classList.add('active');
    
    // Show specific popup
    if (popupId === 'book-visit') {
        bookVisitPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else if (popupId === 'brochure') {
        brochurePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Popup Function
function closeAllPopups() {
    popupOverlay.classList.remove('active');
    bookVisitPopup.classList.remove('active');
    brochurePopup.classList.remove('active');
    successPopup.classList.remove('active');
    document.body.style.overflow = '';
}

// Open Success Popup
function showSuccess(message) {
    successMessage.textContent = message;
    closeAllPopups();
    successPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Event Listeners for Open Popup Buttons
openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popupType = button.getAttribute('data-popup');
        openPopup(popupType);
    });
});

// Event Listeners for Close Buttons
popupCloseButtons.forEach(button => {
    button.addEventListener('click', closeAllPopups);
});

// Close on overlay click
popupOverlay.addEventListener('click', closeAllPopups);

// Close success popup
successClose.addEventListener('click', () => {
    successPopup.classList.remove('active');
    document.body.style.overflow = '';
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllPopups();
    }
});

// Form Submissions
const bookVisitForm = document.getElementById('book-visit-form');
const brochureForm = document.getElementById('brochure-form');
const contactForm = document.getElementById('contact-form');

// Set minimum date for visit date (tomorrow)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
if (document.getElementById('visit-date')) {
    document.getElementById('visit-date').min = tomorrowFormatted;
}

// Book Visit Form Submission
if (bookVisitForm) {
    bookVisitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookVisitForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send data to server
        console.log('Book Visit Form submitted:', data);
        
        // Show success message
        showSuccess('Your site visit has been booked successfully! Our representative will call you shortly to confirm.');
        
        // Reset form
        bookVisitForm.reset();
    });
}

// Brochure Form Submission
if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(brochureForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send data to server
        console.log('Brochure Form submitted:', data);
        
        // Show success message
        showSuccess('Thank you! Your brochure download link has been sent to your email.');
        
        // In a real scenario, you would trigger download here
        // For demo, we'll just show success message
        brochureForm.reset();
    });
}

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send data to server
        console.log('Contact Form submitted:', data);
        
        // Show success message
        showSuccess('Thank you for your interest! Our property expert will contact you within 24 hours.');
        
        // Reset form
        contactForm.reset();
    });
}

// Prevent popup from closing when clicking inside
bookVisitPopup.addEventListener('click', (e) => e.stopPropagation());
brochurePopup.addEventListener('click', (e) => e.stopPropagation());
successPopup.addEventListener('click', (e) => e.stopPropagation());

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to buttons
    const buttons = document.querySelectorAll('.btn, .open-popup');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});