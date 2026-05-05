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
        navMenu.classList.toggle('hidden');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });

    // 4. Lightbox Logic Fix
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const rotateBtn = document.getElementById('rotate-btn');
    const zoomBtn = document.getElementById('zoom-btn');
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentRotation = 0;
    let isZoomed = false;

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-img');
            lightboxImg.src = imgSrc;
            currentRotation = 0;
            isZoomed = false;
            updateLightboxTransform();
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    });

    const updateLightboxTransform = () => {
        lightboxImg.style.transform = `rotate(${currentRotation}deg) scale(${isZoomed ? 1.5 : 1})`;
    };

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
    });

    rotateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentRotation += 90;
        updateLightboxTransform();
    });

    zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isZoomed = !isZoomed;
        zoomBtn.textContent = isZoomed ? "Zoom Out" : "Zoom In";
        updateLightboxTransform();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeBtn.click();
        }
    });
});
