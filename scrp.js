// --- HEADER & MENU LOGIC ---
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }
});

const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('is-open'); 
    });
}

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('is-open');
        }
    });
});

// --- LÓGICA DE GALERÍA (CAMBIO DE IMÁGENES) ---
function cambiarImagen(element) {
    const card = element.closest('.proyecto-card');
    const mainImg = card.querySelector('.img-principal-tarjeta');
    
    if (mainImg) {
        mainImg.style.opacity = '0.4';
        setTimeout(() => {
            mainImg.src = element.src;
            mainImg.style.opacity = '1';
        }, 150);
    }

    const allMinis = card.querySelectorAll('.miniatura');
    allMinis.forEach(img => img.classList.remove('activa'));
    element.classList.add('activa');
}

// --- LÓGICA DE LIGHTBOX (ZOOM / AMPLIAR) ---
const lightbox = document.getElementById('lightbox');
const imgAmpliada = document.getElementById('imgAmpliada');

function abrirLightbox(src) {
    if (lightbox && imgAmpliada) {
        imgAmpliada.src = src;
        lightbox.style.display = 'flex'; // Usamos flex para centrar la imagen
    }
}

// Delegación de eventos para clics en imágenes y botones de zoom
document.addEventListener('click', function(e) {
    // 1. Clic en la imagen principal de cualquier tarjeta
    if (e.target.classList.contains('img-principal-tarjeta')) {
        abrirLightbox(e.target.src);
    }
    
    // 2. Clic en el botón azul "Ampliar" (o en el icono de la lupa dentro)
    if (e.target.closest('.zoom-icon')) {
        const card = e.target.closest('.proyecto-card');
        const mainImg = card.querySelector('.img-principal-tarjeta');
        if (mainImg) abrirLightbox(mainImg.src);
    }

    // 3. Cerrar Lightbox al clickear la X o fuera de la imagen (el fondo oscuro)
    if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
        lightbox.style.display = 'none';
    }
});

// --- EMAILJS SEND LOGIC ---
const contactForm = document.getElementById('cotizacionForm');
const btnEnviar = document.getElementById('btnEnviar');
const mensajeExito = document.getElementById('mensajeExito');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        btnEnviar.innerText = "ENVIANDO...";
        btnEnviar.disabled = true;

        const serviceID = 'service_zoho'; 
        const templateID = 'template_taj0kdg';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                contactForm.style.display = 'none'; 
                if (mensajeExito) {
                    mensajeExito.style.display = 'block'; 
                    window.scrollTo({ top: mensajeExito.offsetTop - 150, behavior: 'smooth' });
                }
            }, (error) => {
                alert("Ocurrió un error al enviar. Por favor intente nuevamente.");
                console.error("EmailJS Error:", error);
                btnEnviar.innerText = "Enviar Cotización";
                btnEnviar.disabled = false;
            });
    });
}