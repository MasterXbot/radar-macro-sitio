const C='radar-v4';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||e.request.url.includes('vivo.json')||e.request.url.includes('opciones.json')||e.request.url.includes('congreso.json')||e.request.url.includes('insiders.json'))return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r})
.catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={t:'Radar Macro',b:e.data?e.data.text():''}}
const corto=(d.b||'').split('\n')[0].slice(0,140);
e.waitUntil(self.registration.showNotification(d.t||'Radar Macro',{body:corto,icon:'icono-192.png',badge:'icono-192.png',
tag:'rm-'+Date.now(),renotify:true,requireInteraction:(d.p||0)>=5,data:{t:d.t||'',u:d.u||''}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const d=e.notification.data||{};const s=self.registration.scope;
const destino=new URL('./?alerta='+encodeURIComponent(d.t||''),s).href;
e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{const c=l.find(x=>x.url.startsWith(s));
if(c)return c.focus().then(w=>{(w||c).postMessage({rmAlerta:d.t||''})}).catch(()=>clients.openWindow(destino));
return clients.openWindow(destino)}))});