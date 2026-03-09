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
        const templateID = 'template_taj0kdg'; // Tu nuevo ID actualizado

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Éxito: Ocultar formulario y mostrar mensaje
                contactForm.style.display = 'none'; 
                mensajeExito.style.display = 'block'; 
                window.scrollTo({ top: mensajeExito.offsetTop - 150, behavior: 'smooth' });
            }, (error) => {
                alert("Ocurrió un error al enviar. Por favor intente nuevamente.");
                console.error("EmailJS Error:", error);
                btnEnviar.innerText = "Enviar Cotización";
                btnEnviar.disabled = false;
            });
    });
}