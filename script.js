document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");
    const projectButtons = document.querySelectorAll(".project-media");

    const closeMenu = () => {
        if (!navToggle || !navMenu) return;
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        body.classList.remove("menu-open");
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!isOpen));
            navMenu.classList.toggle("is-open", !isOpen);
            body.classList.toggle("menu-open", !isOpen);
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    const openLightbox = (imageSrc, imageAlt) => {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt || "Imagen ampliada del proyecto";
        lightbox.hidden = false;
        body.classList.add("menu-open");
        lightboxClose?.focus();
    };

    const closeLightbox = () => {
        if (!lightbox || !lightboxImage) return;
        lightbox.hidden = true;
        lightboxImage.src = "";
        body.classList.remove("menu-open");
    };

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const imageSrc = button.dataset.image;
            const imageAlt = button.querySelector("img")?.alt;
            if (imageSrc) openLightbox(imageSrc, imageAlt);
        });
    });

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            closeLightbox();
        }
    });

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }
});
