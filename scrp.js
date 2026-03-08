// Manejo del Scroll para el Header
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lógica del Menú Hamburguesa
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('is-open'); 
    });
}

// Cerrar menú al clic
const navLinks = document.querySelectorAll('#nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) navMenu.classList.remove('active');
    });
});

// Cambiar imágenes en tarjetas
function cambiarImagen(elementoMiniatura) {
    const tarjeta = elementoMiniatura.closest('.proyecto-card');
    const imgPrincipal = tarjeta.querySelector('.img-principal-tarjeta');
    imgPrincipal.src = elementoMiniatura.src;
    const miniaturas = tarjeta.querySelectorAll('.miniatura');
    miniaturas.forEach(min => min.classList.remove('activa'));
    elementoMiniatura.classList.add('activa');
}

// ENVÍO AJAX - SIN SALIR DE LA WEB
const contactForm = document.getElementById('cotizacionForm');
const btnEnviar = document.getElementById('btnEnviar');
const mensajeExito = document.getElementById('mensajeExito');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        btnEnviar.innerText = "ENVIANDO...";
        btnEnviar.disabled = true;

        const formData = new FormData(contactForm);

        fetch("https://formsubmit.co/ajax/ventas@a3el.pe", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            contactForm.style.display = 'none'; 
            mensajeExito.style.display = 'block'; 
        })
        .catch(error => {
            alert("Error al enviar. Intente nuevamente.");
            btnEnviar.innerText = "Enviar Cotización";
            btnEnviar.disabled = false;
        });
    });
}