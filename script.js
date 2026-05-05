document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loader
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 500);
        });
    }

    // 2. ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        delay: 200,
        reset: false
    });
    sr.reveal('.reveal', { interval: 100 });

    // 3. Navigation
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const rotateBtn = document.getElementById('rotate-btn');
    const zoomBtn = document.getElementById('zoom-btn');
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentIndex = 0;
    let currentRotation = 0;
    let isZoomed = false;

    const images = Array.from(portfolioItems).map(item => item.querySelector('img').src);

    const openLightbox = (index) => {
        currentIndex = index;
        currentRotation = 0;
        isZoomed = false;
        updateLightbox();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const updateLightbox = () => {
        lightboxImg.src = images[currentIndex];
        lightboxImg.style.transform = `rotate(${currentRotation}deg) scale(${isZoomed ? 1.5 : 1})`;
    };

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    });

    rotateBtn.addEventListener('click', () => {
        currentRotation += 90;
        updateLightbox();
    });

    zoomBtn.addEventListener('click', () => {
        isZoomed = !isZoomed;
        updateLightbox();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
