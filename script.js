function toggleMenu() {
    document.querySelector(".hamburger").classList.toggle("active");
    document.querySelector(".nav-menu").classList.toggle("active");
}

function closeMenu() {
    document.querySelector(".hamburger").classList.remove("active");
    document.querySelector(".nav-menu").classList.remove("active");
}

let slideIndex = 1;
let autoSlideTimer;

// Esperar a que el DOM esté cargado para iniciar el carrusel
document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex);
    startAutoSlide();
});

function plusSlides(n) { 
    clearInterval(autoSlideTimer); 
    showSlides(slideIndex += n); 
    startAutoSlide(); // Reiniciar el temporizador después de interacción manual
}

function showSlides(n) {
    let i; 
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) { 
        slides[i].style.display = "none"; 
    }
    if (slides.length > 0) {
        slides[slideIndex-1].style.display = "block";  
    }
}

function startAutoSlide() { 
    autoSlideTimer = setInterval(function() { 
        showSlides(slideIndex += 1); 
    }, 4000); 
}
