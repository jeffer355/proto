// 1. Manejo del Scroll para el Header
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Lógica del Menú Hamburguesa para móviles
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        menuToggle.classList.toggle('is-open'); 
    });
}

// 3. Cerrar el menú automáticamente al hacer clic en un enlace (Anclas)
const navLinks = document.querySelectorAll('#nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ==========================================
// 4. FUNCIONALIDAD LIGHTBOX (FONDOS OSCUROS)
// ==========================================
const lightbox = document.getElementById("lightbox");
const modalImg = document.getElementById("img01");
const imagenesGaleria = document.querySelectorAll(".foto-galeria");
const spanClose = document.getElementsByClassName("lightbox-close")[0];

if (lightbox && imagenesGaleria.length > 0) {
    // Abrir foto al hacer clic
    imagenesGaleria.forEach(img => {
        img.addEventListener("click", function(e) {
            e.preventDefault(); 
            lightbox.style.display = "flex"; 
            modalImg.src = this.src;
        });
    });

    // Cerrar con la X
    if(spanClose) {
        spanClose.addEventListener("click", function() {
            lightbox.style.display = "none";
        });
    }

    // Cerrar haciendo clic en el fondo oscuro
    lightbox.addEventListener("click", function(e) {
        if (e.target !== modalImg) {
            lightbox.style.display = "none";
        }
    });
}

// ==========================================
// 5. FUNCIONALIDAD MINIATURAS EN TARJETAS
// ==========================================
function cambiarImagen(elementoMiniatura) {
    // 1. Encontramos la tarjeta específica
    const tarjeta = elementoMiniatura.closest('.proyecto-card');
    
    // 2. Encontramos la imagen principal
    const imgPrincipal = tarjeta.querySelector('.img-principal-tarjeta');
    
    // 3. Cambiamos la ruta de la imagen
    imgPrincipal.src = elementoMiniatura.src;
    
    // 4. Quitamos el borde azul a todas las miniaturas de esta tarjeta
    const miniaturas = tarjeta.querySelectorAll('.miniatura');
    miniaturas.forEach(min => min.classList.remove('activa'));
    
    // 5. Ponemos el borde azul a la miniatura clickeada
    elementoMiniatura.classList.add('activa');
}