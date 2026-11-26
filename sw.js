const C="carnet-v32",A=["./","index.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;
 const same=new URL(q.url).origin===location.origin,n=same?new Request(q.url,{cache:"no-cache",credentials:"same-origin"}):q;
 e.respondWith(fetch(n).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(q,c))}return r}).catch(()=>caches.match(q).then(m=>m||caches.match("index.html"))))});
