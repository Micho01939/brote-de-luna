(()=>{'use strict';
const DB_NAME='cancha-libre-graphics-v1',STORE='logos',MAX_FILE_SIZE=6*1024*1024;
const urls=new Map(),records=new Map();
const allowedElements=new Set(['svg','g','path','rect','circle','ellipse','line','polyline','polygon','text','defs','clipPath','linearGradient','radialGradient','stop']);
const allowedAttributes=new Set(['xmlns','viewBox','width','height','preserveAspectRatio','fill','fill-opacity','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-opacity','opacity','transform','cx','cy','r','rx','ry','x','y','x1','y1','x2','y2','d','points','offset','stop-color','stop-opacity','id','font-family','font-size','font-weight','text-anchor','letter-spacing','gradientUnits','gradientTransform','clip-path','class','role','aria-label','color']);
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function openDb(){
 if(!('indexedDB'in window))return Promise.reject(new Error('Este navegador no ofrece almacenamiento local de gráficos.'));
 return new Promise((resolve,reject)=>{
  const request=indexedDB.open(DB_NAME,1);
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE,{keyPath:'id'})};
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error||new Error('No se pudo abrir el almacenamiento de gráficos.'));
 });
}
function readAll(db){
 return new Promise((resolve,reject)=>{
  const transaction=db.transaction(STORE,'readonly'),request=transaction.objectStore(STORE).getAll();
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error||new Error('No se pudieron leer los escudos guardados.'));
 });
}
async function load(){
 const db=await openDb();
 try{
  const saved=await readAll(db);
  for(const record of saved){
   if(!record||typeof record.id!=='string'||!(record.blob instanceof Blob))continue;
   const previous=urls.get(record.id);
   if(previous)URL.revokeObjectURL(previous);
   records.set(record.id,record);
   urls.set(record.id,URL.createObjectURL(record.blob));
  }
  return saved.length;
 }finally{db.close()}
}
function validClubId(id){return typeof id==='string'&&/^[A-Za-z0-9][A-Za-z0-9:_-]{0,179}$/.test(id)}
function assetPath(id,extension){return `assets/logos/${encodeURIComponent(id)}.${extension}`}
function logoMarkup(club,large,generatedSvg){
 const id=String(club.id),customUrl=urls.get(id),stage=customUrl?'custom':'png';
 const source=customUrl||assetPath(id,'png');
 return `<img class="${large?'detail-crest':'crest'} custom-crest" src="${escapeHtml(source)}" alt="Escudo de ${escapeHtml(club.name)}" data-club-logo="${escapeHtml(id)}" data-logo-stage="${stage}" data-generated-svg="${encodeURIComponent(generatedSvg)}">`;
}
document.addEventListener('error',event=>{
 const image=event.target;
 if(!(image instanceof HTMLImageElement)||!image.dataset.clubLogo)return;
 const id=image.dataset.clubLogo,stage=image.dataset.logoStage;
 if(stage==='custom'){image.dataset.logoStage='png';image.src=assetPath(id,'png');return}
 if(stage==='png'){image.dataset.logoStage='svg';image.src=assetPath(id,'svg');return}
 if(stage==='svg'){
  image.dataset.logoStage='generated';
  image.src=`data:image/svg+xml;charset=utf-8,${image.dataset.generatedSvg}`;
 }
},true);
function sanitizeSvg(source){
 if(/<!DOCTYPE|<!ENTITY/i.test(source))throw new Error('El SVG no puede incluir declaraciones XML externas.');
 const parser=new DOMParser(),documentSvg=parser.parseFromString(source,'image/svg+xml'),root=documentSvg.documentElement;
 if(documentSvg.doctype||!root||root.localName!=='svg'||root.namespaceURI!=='http://www.w3.org/2000/svg'||documentSvg.querySelector('parsererror'))throw new Error('El SVG no es válido.');
 const elements=[root,...root.querySelectorAll('*')],ids=new Set();
 for(const element of elements){
  if(!allowedElements.has(element.localName)||element.namespaceURI!=='http://www.w3.org/2000/svg')throw new Error('El SVG contiene elementos no compatibles; usa un SVG vectorial sencillo.');
  const id=element.getAttribute('id');
  if(id){if(!/^[A-Za-z_][A-Za-z0-9_.-]*$/.test(id)||ids.has(id))throw new Error('El SVG contiene identificadores no válidos.');ids.add(id)}
  for(const attribute of [...element.attributes]){
   const name=attribute.name,value=attribute.value;
   if(!allowedAttributes.has(name)||/^on/i.test(name)||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value))throw new Error('El SVG contiene atributos no compatibles o inseguros.');
   if(/url\s*\(/i.test(value)&&!/^url\(#([A-Za-z_][A-Za-z0-9_.-]*)\)$/.test(value))throw new Error('El SVG solo puede usar referencias internas.');
   if(name==='clip-path'||/url\s*\(/i.test(value)){const ref=value.match(/#([A-Za-z_][A-Za-z0-9_.-]*)/);if(ref&&!ids.has(ref[1])&&!elements.some(item=>item.getAttribute('id')===ref[1]))throw new Error('El SVG hace referencia a un elemento inexistente.')}
  }
 }
 if(!root.hasAttribute('viewBox'))throw new Error('El SVG debe definir un viewBox.');
 return new XMLSerializer().serializeToString(root);
}
async function save(id,blob){
 if(!validClubId(id))throw new Error('No se pudo identificar el club para guardar el escudo.');
 const db=await openDb();
 try{
  await new Promise((resolve,reject)=>{
   const transaction=db.transaction(STORE,'readwrite');
   transaction.objectStore(STORE).put({id,blob});
   transaction.oncomplete=resolve;
   transaction.onerror=()=>reject(transaction.error||new Error('No se pudo guardar el escudo.'));
   transaction.onabort=()=>reject(transaction.error||new Error('Se canceló el guardado del escudo.'));
  });
  const previous=urls.get(id);
  if(previous)URL.revokeObjectURL(previous);
  records.set(id,{id,blob});
  urls.set(id,URL.createObjectURL(blob));
 }finally{db.close()}
}
async function saveFile(id,file){
 if(!file||!Number.isSafeInteger(file.size)||file.size===0)throw new Error('Selecciona un archivo de imagen válido.');
 if(file.size>MAX_FILE_SIZE)throw new Error('El archivo supera el límite de 6 MB.');
 const extension=file.name.toLowerCase().split('.').pop();
 if(extension==='png'){
  if(file.type&&file.type!=='image/png')throw new Error('La extensión y el tipo de archivo no coinciden.');
  const signature=new Uint8Array(await file.slice(0,8).arrayBuffer());
  if(signature.length!==8||signature.some((byte,index)=>byte!==[137,80,78,71,13,10,26,10][index]))throw new Error('El archivo no contiene una imagen PNG válida.');
  await save(id,new Blob([file],{type:'image/png'}));
  return;
 }
 if(extension==='svg'){
  if(file.type&&file.type!=='image/svg+xml')throw new Error('La extensión y el tipo de archivo no coinciden.');
  const source=await file.text();
  if(source.length>MAX_FILE_SIZE)throw new Error('El SVG supera el límite de 6 MB.');
  await save(id,new Blob([sanitizeSvg(source)],{type:'image/svg+xml'}));
  return;
 }
 throw new Error('Elige un archivo PNG o SVG.');
}
async function saveSvg(id,source){
 await save(id,new Blob([sanitizeSvg(source)],{type:'image/svg+xml'}));
}
async function remove(id){
 const db=await openDb();
 try{
  await new Promise((resolve,reject)=>{
   const transaction=db.transaction(STORE,'readwrite');
   transaction.objectStore(STORE).delete(id);
   transaction.oncomplete=resolve;
   transaction.onerror=()=>reject(transaction.error||new Error('No se pudo borrar el escudo.'));
   transaction.onabort=()=>reject(transaction.error||new Error('Se canceló el borrado del escudo.'));
  });
  const previous=urls.get(id);
  if(previous)URL.revokeObjectURL(previous);
  urls.delete(id);records.delete(id);
 }finally{db.close()}
}
window.CANCHA_GRAPHICS={load,logoMarkup,saveFile,saveSvg,remove,hasCustom:id=>records.has(id),MAX_FILE_SIZE};
})();
