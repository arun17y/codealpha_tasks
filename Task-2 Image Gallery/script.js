const galleryImgs = document.querySelectorAll('.gallery-img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentImgIndex = 0;
let currentCategory = '';

// Store images by category for navigation
const imagesByCategory = {
    nature: Array.from(document.querySelectorAll('[data-category="nature"]')).map(img => img.src),
    bikes: Array.from(document.querySelectorAll('[data-category="bikes"]')).map(img => img.src),
    cars: Array.from(document.querySelectorAll('[data-category="cars"]')).map(img => img.src),
    superheroes: Array.from(document.querySelectorAll('[data-category="superheroes"]')).map(img => img.src),
    animals: Array.from(document.querySelectorAll('[data-category="animals"]')).map(img => img.src),
};

// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer for section fade-in
const sections = document.querySelectorAll('.gallery-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Lightbox functionality
galleryImgs.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentCategory = img.dataset.category;
        currentImgIndex = imagesByCategory[currentCategory].indexOf(img.src);
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

prevBtn.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex - 1 + imagesByCategory[currentCategory].length) % imagesByCategory[currentCategory].length;
    lightboxImg.src = imagesByCategory[currentCategory][currentImgIndex];
});

nextBtn.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % imagesByCategory[currentCategory].length;
    lightboxImg.src = imagesByCategory[currentCategory][currentImgIndex];
});