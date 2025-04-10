// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggleMenuIcon();
});

// Function to toggle menu icon
function toggleMenuIcon() {
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
});

// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = modal.querySelector('.modal-content img');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        const imgSrc = galleryItems[index].querySelector('img').src;
        modalImg.src = imgSrc;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        modalImg.src = '';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        modalImg.src = imgSrc;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        modalImg.src = imgSrc;
    }

    // Event Listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch Events
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                showPrevImage();
            } else {
                showNextImage();
            }
        }
    }
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !phone || !message) {
        alert('Por favor, complete todos los campos');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un email válido');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Por favor, ingrese un número de teléfono válido');
        return;
    }

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.');
    contactForm.reset();
});

// Intersection Observer for fade-in animations
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

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'all 0.5s ease-out';
});

// Language handling
const languageHandler = {
    currentLang: 'en',
    supportedLangs: ['en', 'es'],

    init() {
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const detectedLang = browserLang.split('-')[0];
        
        // Set initial language
        this.setLanguage(this.supportedLangs.includes(detectedLang) ? detectedLang : 'en');
        
        // Add language switcher to navbar
        this.addLanguageSwitcher();
    },

    setLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) return;
        
        this.currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update all translatable elements
        document.querySelectorAll('[data-en]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute(`data-${lang}`);
            } else {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        });

        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    },

    addLanguageSwitcher() {
        const navLinks = document.querySelector('.nav-links');
        const langSwitcher = document.createElement('div');
        langSwitcher.className = 'language-switcher';
        
        this.supportedLangs.forEach(lang => {
            const button = document.createElement('button');
            button.className = `lang-btn ${lang === this.currentLang ? 'active' : ''}`;
            button.textContent = lang.toUpperCase();
            button.onclick = () => this.setLanguage(lang);
            langSwitcher.appendChild(button);
        });

        navLinks.appendChild(langSwitcher);
    }
};

// Initialize language handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    languageHandler.init();
    
    // Check for stored language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && languageHandler.supportedLangs.includes(storedLang)) {
        languageHandler.setLanguage(storedLang);
    }
}); 