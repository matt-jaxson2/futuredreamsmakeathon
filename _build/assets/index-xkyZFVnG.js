(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();class f{async fetchData(){try{return await(await fetch(`http://${window.location.hostname}:5174/data`)).json()}catch(e){console.error("Error:",e)}}}const y=()=>{document.querySelectorAll(".image-grid__item").forEach(r=>{r.classList.remove("image-grid__item--highlighted")})},l=r=>r.replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e]);class p{constructor(){this.makeathonAPI=new f,this.customRenderEvent=new CustomEvent("gridRendered"),this.setGrid()}getData(){return this.makeathonAPI.fetchData()}async setGrid(){let e="";const s=await this.getData(),a=s.length<50?50:s.length;for(let t=0;t<a;t++){const i=s[t];if(!i)e+=`
          <div class="image-grid__item-wrapper"><div class="image-grid__item image-grid__item--placeholder" aria-hidden="true"></div></div>
        `;else{const{highlight:n,image_small:c,image_medium:m,message:g,name:o,id:d}=i,h=n?" image-grid__item--highlighted":"",u=l(g);e+=`
          <div class="image-grid__item-wrapper">
            <a id="${d}-target" href="#${d}" class="image-grid__item${h}" data-id="${d}" data-image="${m}" data-name="${o}" data-message="${u}">
              <p class="sr-only">See a larger image and read the message from ${o}</p>
              <img
                class="image-grid__image"
                loading="lazy"
                src="${c}"
                alt="Photo of ${o}'s knitted flower"
                onload="this.className = 'image-grid__image image-loaded'"
                onerror="this.className = 'image-grid__image hidden'">
              <div class="image-grid__loader"></div>
            </a>
          </div>
        `}}this.render(e)}renderEvent(){document.dispatchEvent(this.customRenderEvent)}render(e){const s=document.querySelector(".js-image-grid");s.classList.remove("image-grid--loading"),s.innerHTML=e,this.renderEvent()}}class _{constructor(){this.setElements(),this.setEvents()}setElements(){this.elements={body:document.querySelector("body"),grid:document.querySelector(".js-image-grid"),background:document.querySelector(".js-modal-background"),modal:document.querySelector(".js-modal"),image:document.querySelector(".js-modal__image"),message:document.querySelector(".js-modal__message"),name:document.querySelector(".js-modal__cite-name"),closeButton:document.querySelector(".js-modal__close")}}setEvents(){this.elements.closeButton.addEventListener("click",s=>{s.preventDefault(),this.toggleModalState(!1)}),this.elements.background.addEventListener("click",()=>{this.toggleModalState(!1)}),this.elements.grid.addEventListener("click",s=>{const a=s.target;a.tagName==="A"&&(s.preventDefault(),this.elements.source=a,window.location.hash=a.getAttribute("data-id"),this.setModal(this.getModalData(a)))});const e=this.elements.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');this.elements.modal.addEventListener("keydown",function(s){if(s.key==="Tab"){s.preventDefault();const a=Array.from(e).indexOf(document.activeElement);if(a===-1)e[0].focus();else{const t=(a+1)%e.length;e[t].focus()}}})}setModal(e){const{image:s,message:a,name:t}=e;this.resetModal(),this.elements.modal.setAttribute("aria-label",`Image of knitted rose and message by ${t}`),this.elements.image.setAttribute("src",s),this.elements.message.innerHTML=l(a),this.elements.name.innerHTML=t,this.toggleModalState()}resetModal(){this.elements.image.setAttribute("src","")}getModalData(e){return{image:e.getAttribute("data-image"),message:e.getAttribute("data-message"),name:e.getAttribute("data-name")}}toggleModalState(e=!0){this.elements.modal.setAttribute("aria-hidden",!e),e?(this.elements.closeButton.focus(),this.elements.body.classList.add("modal-open")):(this.elements.source.focus(),this.elements.body.classList.remove("modal-open"))}}class v{constructor(){this.setEvents()}setEvents(){document.addEventListener("gridRendered",()=>{this.handleHashChange()}),window.addEventListener("hashchange",()=>{this.handleHashChange()})}handleHashChange(){const s=window.location.hash.replace("#",""),a=document.getElementById(`${s}-target`);a&&(y(),this.setCurrent(a))}setCurrent(e){e.click()}}new p;new _;new v;
