(() => {
 'use strict';
 const c=window.BODA;
 const q=s=>document.querySelector(s);
 const set=(id,value,selector='.elementor-widget-container')=>{const e=q(`[data-id="${id}"] ${selector}`); if(e)e.textContent=value;};
 const cover=q('#contenedor-a-ocultar'), enter=q('#boton-ocultar');
 const siblings=[...cover.parentElement.children].filter(el=>el!==cover);
 siblings.forEach(el=>{el.inert=true;el.setAttribute('aria-hidden','true');});
 set('582bfb6',`${c.novia} & ${c.novio}`);
 set('4d50116',c.novia,'h2');set('d683edb',c.novio,'h2');
 document.title=`${c.novia} & ${c.novio} — Invitación de boda`;
 if(c.usarFondoReferencia)document.body.classList.add('fondo-referencia');
 let date=new Date(c.fecha), valid=Boolean(c.fecha)&&!Number.isNaN(date.getTime());
 let zone=c.zonaHoraria||'America/Lima';
 try{new Intl.DateTimeFormat('es',{timeZone:zone});}catch{zone='America/Lima';}
 if(valid){
  const f=o=>new Intl.DateTimeFormat('es',{timeZone:zone,...o}).format(date);
  const month=f({month:'long'});set('cf14289',`${month.charAt(0).toUpperCase()+month.slice(1)}  ${f({day:'2-digit'})}  ${f({year:'numeric'})}`);
  set('bb99d92',f({weekday:'long'}).toUpperCase(),'h2');
  set('22098fa',f({day:'2-digit'}),'h2');set('f9f13c4',f({year:'numeric'}),'h2');set('87a04e5',f({month:'long'}).toUpperCase(),'h2');
 }else{
  set('cf14289','Fecha por confirmar');set('bb99d92','POR CONFIRMAR','h2');set('22098fa','—','h2');set('f9f13c4','—','h2');set('87a04e5','FECHA','h2');
 }
 set('fb25e07',c.pais||c.ciudad||'Por confirmar','h2');
 function tick(){
  let t=valid?Math.max(0,Math.floor((date-Date.now())/1000)):0;
  const vals=[Math.floor(t/86400),Math.floor(t/3600)%24,Math.floor(t/60)%60,t%60];
  document.querySelectorAll('.eael-countdown-digits').forEach((el,i)=>{el.textContent=String(vals[i]||0).padStart(2,'0');});
 }
 tick();if(valid&&date>Date.now())setInterval(tick,1000);
 const doveIcon='<img class="icono-en-memoria" src="assets/memorial/paloma-memoria.png" alt="" aria-hidden="true" />';
 function family(id,names,inMemoriam=[]){const el=q(`[data-id="${id}"] .elementor-widget-container`);el.replaceChildren(...names.map(name=>{const p=document.createElement('p');p.append(document.createTextNode(name));if(inMemoriam.includes(name))p.insertAdjacentHTML('beforeend',' '+doveIcon);return p;}));}
 family('b049120',c.familiasNovia,c.familiasNoviaEnMemoria);family('fd302d3',c.familiasNovio);
 set('49fb4e9',c.ceremonia.hora||'Por confirmar','h2');set('0e1c3ff',c.ceremonia.lugar||'Lugar por confirmar','h2');
 set('078426f',c.recepcion.hora||'Por confirmar','h2');set('b82ad4c',c.recepcion.lugar||'Lugar por confirmar','h2');
 // La dirección hereda la tipografía del lugar y se presenta en líneas separadas.
 for(const [id,evento] of [['0e1c3ff',c.ceremonia],['b82ad4c',c.recepcion]]){
  const heading=q(`[data-id="${id}"] h2`);
  if(heading)for(const linea of evento.direccion||[]){
   heading.append(document.createElement('br'),document.createTextNode(linea));
  }
 }
 const dress=q('[data-id="75716e5"] .elementor-widget-container');dress.replaceChildren();
 for(const [i,text] of (c.vestimenta.lineas||[]).entries()){const p=document.createElement('p');if(i===0){const b=document.createElement('strong');b.textContent=text;p.append(b);p.style.marginBottom='1em';}else if(text.startsWith('DAMAS:')){const b=document.createElement('strong');b.textContent='DAMAS';p.append(b,document.createTextNode(text.slice('DAMAS'.length)));}else if(text.startsWith('CABALLEROS')){const b=document.createElement('strong');b.textContent='CABALLEROS';p.append(b,document.createTextNode(text.slice('CABALLEROS'.length)));}else p.textContent=text;dress.append(p);} document.querySelectorAll('.itinerario-boda li p').forEach((el,i)=>{if(c.itinerario[i])el.textContent=c.itinerario[i];});
 const bank=q('#bank-details');bank.replaceChildren();
 for(const [label,value] of [['Banco',c.regalos.banco],['Cuenta',c.regalos.cuenta],['CCI',c.regalos.cci],['Titular',c.regalos.titular]]){if(!value)continue;const p=document.createElement('p'),b=document.createElement('strong');b.textContent=label+': ';p.append(b,document.createTextNode(value));bank.append(p);}
 if(c.regalos.qr){const img=q('#yape-qr')||document.createElement('img');img.id='yape-qr';img.src=c.regalos.qr;img.alt='Código QR de Yape de Lesly';img.width=164;img.loading='lazy';const placeholder=q('.qr-pendiente');if(placeholder)placeholder.replaceWith(img);else if(!img.isConnected)q('[data-id="7f42a0c"] .elementor-widget-container')?.append(img);}
 let timer;
 function notify(text){const e=q('#aviso');clearTimeout(timer);e.textContent=text;e.hidden=false;timer=setTimeout(()=>{e.hidden=true;},5000);}
 function external(a,url){
  if(!a)return;
  a.removeAttribute('href');a.removeAttribute('target');
  try{const u=new URL(url);if(!['https:','http:'].includes(u.protocol))throw Error();a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';}
  catch{a.href='#';a.addEventListener('click',e=>{e.preventDefault();notify('Pronto compartiremos esta información.');});}
 }
 const maps=[...document.querySelectorAll('a')].filter(a=>a.textContent.trim()==='VER UBICACIÓN');
 external(maps[0],c.ceremonia.mapa);external(maps[1],c.recepcion.mapa);

 const urlParams=new URLSearchParams(window.location.search);
 const nombreInvitado=urlParams.get('invitado')||urlParams.get('nombre')||urlParams.get('to')||urlParams.get('i');
 const numPases=urlParams.get('pases')||urlParams.get('pase')||urlParams.get('p');
 if(nombreInvitado){
  const contenedorPase=document.createElement('div');
  contenedorPase.className='pase-personalizado-invitado';
  contenedorPase.style.cssText='margin:15px auto 20px;text-align:center;color:#a7815d;font-family:inherit;';
  let textoPases=numPases?` (${numPases} ${numPases==='1'?'pase':'pases'})`:'';
  contenedorPase.innerHTML=`<span style="display:block;font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;opacity:0.85;margin-bottom:4px;">Invitación especial para:</span><strong style="display:block;font-size:1.15rem;color:#425577;letter-spacing:0.5px;">${nombreInvitado}${textoPases}</strong>`;
  const botonContainer=q('.elementor-element-cc1276c');
  if(botonContainer&&botonContainer.parentElement)botonContainer.parentElement.insertBefore(contenedorPase,botonContainer);
 }
 let finalAsistenciaUrl=c.asistenciaUrl;
 if(nombreInvitado&&finalAsistenciaUrl){
  let nombreFormateado=nombreInvitado+(numPases?` (${numPases} ${numPases==='1'?'pase':'pases'})`:'');
  finalAsistenciaUrl=finalAsistenciaUrl.replace('%5Bescribe%20tu%20nombre%5D',encodeURIComponent(nombreFormateado)).replace('[escribe tu nombre]',encodeURIComponent(nombreFormateado));
 }
 external([...document.querySelectorAll('a')].find(a=>a.textContent.trim()==='Confirmar Asistencia'),finalAsistenciaUrl);
 // Preserve the original music control but don't silently play the sample song.
 const audio=c.musica?new Audio(c.musica):null;
 if(audio){audio.loop=true;audio.preload='none';}
 const music=q('#boton-pausar');
 if(music){music.setAttribute('role','button');music.tabIndex=0;music.setAttribute('aria-label','Reproducir o pausar música');const toggle=()=>{if(!audio){notify('La canción de la boda está por confirmar.');return;}if(audio.paused)audio.play().catch(()=>notify('No se pudo cargar la canción.'));else audio.pause();};music.addEventListener('click',toggle);music.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();toggle();}});}
 let opened=false;
 enter.addEventListener('click',e=>{
  e.preventDefault();if(opened)return;opened=true;
  if(c.pantallaCompletaAlEntrar&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>{});
  if(audio)audio.play().catch(()=>notify('Pulsa el botón de música para reproducir la canción.'));
  siblings.forEach(el=>{el.inert=false;el.removeAttribute('aria-hidden');});
  cover.classList.add('saliendo');document.body.classList.remove('entrada-cerrada');window.scrollTo({top:0,behavior:'instant'});
  const first=q('[data-id="4d50116"] h2');first.tabIndex=-1;first.focus({preventScroll:true});
  setTimeout(()=>{cover.hidden=true;},matchMedia('(prefers-reduced-motion: reduce)').matches?0:2000);
 });
 // Restore the original Lottie animations when their remote JSON is accessible.
 document.querySelectorAll('.elementor-widget-lottie[data-settings]').forEach(widget=>{
  try{
   const settings=JSON.parse(widget.dataset.settings), path=settings.source_json?.url;
   const target=widget.querySelector('.e-lottie__animation')||widget.querySelector('.elementor-widget-container');
   if(!path||!target||!window.lottie)return;
   const live=document.createElement('div');live.style.cssText='width:100%;height:100%;';
   const animation=window.lottie.loadAnimation({container:live,renderer:'svg',loop:true,autoplay:true,path});
   animation.addEventListener('DOMLoaded',()=>target.replaceChildren(live));
   animation.addEventListener('data_failed',()=>animation.destroy());
  }catch{/* Preserve the SVG already saved in the supplied HTML. */}
 });
 // Saved background transform tracks scrolling as in the model.
 const layer=q('.elementor-element-4d38058 .elementor-motion-effects-layer');
 if(layer){const move=()=>layer.style.transform=`translateY(${-Math.min(350,window.scrollY*.074)}px)`;move();window.addEventListener('scroll',move,{passive:true});}
 if(c.particulas&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const s=document.createElement('script');s.src='js/particulas-original.js';document.body.append(s);}
})();

