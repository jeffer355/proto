 (function(){
 const container = document.querySelector('.dandelion-container');
 const easings   = ['linear','ease-in','ease-out','ease-in-out'];
 // Función que crea y anima UNA semilla
 function spawnSeed() {
 const s = document.createElement('div');
 s.className = 'seed';
 // valores aleatorios
 s.style.setProperty('--size',     `${Math.random() * 40 + 10}px`);      // 10px–50px
 s.style.setProperty('--dx',       `${Math.random() * 200 - 100}px`);    // horizontal total
 s.style.setProperty('--dy',       `-${Math.random() * 400 + 150}px`);   // vertical hacia arriba
 s.style.setProperty('--duration', `${Math.random() * 5 + 7}s`);         // 7s–12s
 s.style.setProperty('--delay',    `0s`);                                 // sin delay en animación
 s.style.setProperty('--rotation', `${Math.random() * 360}deg`);         // rotación inicial
 s.style.setProperty('--sway',     `${Math.random() * 40 - 20}px`);      // vaivén ±20px
 // posición de inicio
 s.style.top  = `${Math.random() * 100}%`;
 s.style.left = `${Math.random() * 100}%`;
 // cuando termine la animación, lo eliminamos
 s.addEventListener('animationend', () => container.removeChild(s));
 container.appendChild(s);
 }
 // Programa el siguiente spawn con intervalo aleatorio
 function scheduleNext() {
 const nextIn = Math.random() * 2000 + 1000; // entre 1s y 3s
 setTimeout(() => {
 spawnSeed();
 scheduleNext();
 }, nextIn);
 }
 // Arrancamos
 scheduleNext();
 })(); 