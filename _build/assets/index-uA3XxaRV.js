(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class f{searchResults(e,t){return e.filter(n=>{if(n.name.toLowerCase().includes(t.toLowerCase())||n.message.toLowerCase().includes(t.toLowerCase()))return n})}setData(e,t){return e?this.searchResults(t,e):t}async fetchData(e){const{url:t,query:n,options:s={}}=e,a=sessionStorage.getItem(t);if(a){const r=JSON.parse(a);return this.setData(n,r)}else try{const i=await(await fetch(t,{...s})).json();return sessionStorage.setItem(t,JSON.stringify(i)),this.setData(n,i)}catch(r){console.error("MakeathonAPI Error:",r)}}}class p{constructor(){this.keyPress=this.keyPress.bind(this),this.setElements(),this.setEvents()}setElements(){this.elements={body:document.querySelector("body"),modal:document.querySelector(".js-modal"),content:document.querySelector(".js-modal__content"),closeButton:document.querySelector(".js-modal__close")},this.defaultModalClass=this.elements.modal.className}setEvents(){document.addEventListener("mouseup",e=>{!this.elements.modal.contains(e.target)&&!e.target.className.includes("image-grid__item")&&this.closeModal()}),this.elements.closeButton.addEventListener("click",e=>{e.preventDefault(),this.closeModal()})}setContent(e,t){this.elements.content.innerHTML!==e&&(this.elements.content.innerHTML=e,this.elements.modal.className=this.defaultModalClass,t&&this.elements.modal.classList.add(t))}keyPress(e){e.key==="Escape"&&this.closeModal()}openModal(){this.elements.body.classList.add("modal-open"),this.elements.closeButton.focus(),document.addEventListener("keydown",this.keyPress)}closeModal(){this.elements.body.classList.remove("modal-open"),document.removeEventListener("keydown",this.keyPress)}}const m=(o="")=>{window.location.hash=o},g=o=>o.replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e]);class y{constructor(){this.customRenderEvent=new CustomEvent("grid:rendered")}init(){this.makeathonAPI=new f,this.modal=new p,this.setElements(),this.setEvents()}setElements(){this.elements={grid:document.querySelector(".js-image-grid")}}setEvents(){document.addEventListener("grid:rendered",()=>{const e=window.location.hash;if(!e.includes("entry"))return;const t=document.querySelector(`${e}-target`);this.setModalContent(t)}),document.addEventListener("route:home",()=>{this.modal.closeModal(),this.setGrid()}),document.addEventListener("route:entry",()=>{const e=document.querySelector(`${window.location.hash}-target`);e?this.setModalContent(e):this.setGrid()}),this.elements.grid.addEventListener("click",e=>{const t=e.target;t.tagName==="A"&&this.setModalContent(t)})}async setModalContent(e){if(!e)return;const{dataset:{image:t,message:n,name:s}}=e,a=`
      <figure>
        <div class="modal__image-wrapper">
          <img src="${t}" class="modal__image" alt="Photo of ${s}'s knitted flower">
          <div class="content-loader"></div>
        </div>
        <figcaption class="modal__text">
          <p id="modalDescription" class="modal__message">${g(n)}</p>
          <cite class="modal__cite" id="modalLabel">By ${s}</cite>
        </figcaption>
      </figure>
    `;this.modal.setContent(a),this.modal.openModal()}lazyImages(e){const t=new IntersectionObserver(n=>{n.forEach(s=>{if(s.isIntersecting){const a=s.target,{dataset:{alt:r,src:i}}=a;a.src=i,a.alt=r,t.unobserve(a)}})});e.forEach(n=>t.observe(n))}async setGrid(e){const t=e||await this.makeathonAPI.fetchData({url:"entries/data.json"}),n=t.length<50?50:t.length;let s="";for(let a=0;a<n;a++){const r=t[a];if(!r)s+=`
          <div class="image-grid__item-wrapper"><div class="image-grid__item image-grid__item--placeholder" aria-hidden="true"></div></div>
        `;else{const{imageSmall:i,imageMedium:v,message:_,name:h,id:w}=r,c=`entry${w}`,l=h.trim()?h:"Anonymous",u={small:`https://futuredreamsmakeathon.org.uk/${i}`,medium:`https://futuredreamsmakeathon.org.uk/${v}`};s+=`
          <div class="image-grid__item-wrapper">
            <a id="${c}-target" href="#${c}" class="image-grid__item js-image-grid__item" data-id="${c}" data-image="${u.medium}" data-name="${l}" data-message="${g(_)}">
              <p class="sr-only">Read the message from ${l}</p>
              <img class="image-grid__image js-lazy-image" data-src="${u.small}" data-alt="Photo of ${l}'s knitted flower" />
            </a>
          </div>
        `}}this.render(s)}renderEvent(){document.dispatchEvent(this.customRenderEvent)}render(e){const t=document.querySelector(".js-image-grid");t.classList.remove("image-grid--loading"),t.innerHTML=e,this.lazyImages(t.querySelectorAll(".js-lazy-image")),this.renderEvent()}}class L{constructor(){this.grid=new y,this.modal=new p,this.makeathonAPI=new f}init(){this.setElements(),this.setEvents()}setElements(){this.elements={modalContent:document.querySelector(".js-modal__content"),openButton:document.querySelector(".js-open-search-button")}}setEvents(){document.addEventListener("route:search",e=>{this.query=this.getQueryFromRoute(e.detail.route),this.openSearch(),this.searchResults()}),this.elements.openButton.addEventListener("click",e=>{e.preventDefault(),this.openSearch()})}openSearch(){this.setContent(),this.modal.openModal()}async searchResults(e){this.isLoading();const t=await this.makeathonAPI.fetchData({url:"entries/data.json",query:this.query});t.length>0&&!e&&this.isResults(),t.length===0&&(this.noResults(),this.grid.setGrid([])),(t.length>0||e)&&this.grid.setGrid(t),this.isLoaded()}getQueryFromRoute(e=window.location.hash){return e.split("/")[1]}isLoading(){document.querySelector(".js-main-content").classList.add("content-loading")}isLoaded(){document.querySelector(".js-main-content").classList.remove("content-loading")}isResults(){this.elements.container.classList.add("search--has-results")}noResults(){this.elements.container.classList.remove("search--has-results"),this.setMessage("no-results")}clearResults(){this.elements.container.classList.remove("search--has-results"),this.query="",m(),this.elements.searchInput.value="",this.resetMessage(),this.searchResults(!0)}setMessage(e){let t="";switch(e){case"no-results":t="Your search came up empty.";break;case"characters":t="Search with at least 3 characters.";break;default:t="Looks like our search got a little lost."}this.elements.searchMessage.classList.add("search__message--show"),this.elements.searchMessage.innerHTML=t}resetMessage(){this.elements.searchMessage.classList.remove("search__message--show"),this.elements.searchMessage.innerHTML=""}setContent(){const e=`
      <form class="search js-search">
        <label for="search-input" id="modalLabel">Search for an entry</label>
        <input id="search-input" class="search__input js-search__input" type="text" aria-describedby="search-message" value="${this.query}">
        <span id="search-message" class="search__message js-search__message" aria-live="assertive"></span>
        <div class="search__buttons">
          <button class="button button--style2 search__button js-search__button">Search</button>
          <button class="button button--style3 search__clear-button js-search__clear-button">Clear results</button>
        </div>
      </form>
    `;this.modal.setContent(e,"modal--search"),this.afterRender()}setInputValue(e){e.value=this.getQueryFromRoute()||""}afterRender(){this.elements.container=document.querySelector(".js-search"),this.elements.searchButton=document.querySelector(".js-search__button"),this.elements.searchClearButton=document.querySelector(".js-search__clear-button"),this.elements.searchInput=document.querySelector(".js-search__input"),this.elements.searchMessage=document.querySelector(".js-search__message"),this.setInputValue(this.elements.searchInput),setTimeout(()=>{this.elements.searchInput.focus()},10),this.elements.searchButton.addEventListener("click",e=>{e.preventDefault(),this.query=this.elements.searchInput.value.trim(),this.resetMessage(),this.query.length>=3?m(`search/${this.query}`):this.setMessage("characters")}),this.elements.searchClearButton.addEventListener("click",e=>{e.preventDefault(),this.clearResults()})}}class E{constructor(e){this.routes=e,this.handleRouteChange=this.handleRouteChange.bind(this),window.addEventListener("hashchange",this.handleRouteChange),window.addEventListener("load",()=>{this.handleRouteChange(),window.removeEventListener("load",this.handleRouteChange)})}handleRouteChange(){const e=window.location.pathname,t=window.location.hash.slice(1);let n;if(e in this.routes&&(n=this.routes[e]),!n&&(n=this.routes[t],!n)){const a=Object.keys(this.routes).filter(r=>r.includes("*"));for(const r of a)if(new RegExp("^"+r.replace("*",".*")+"$").test(t)){n=this.routes[r];break}}const s=this.routes.default;n&&typeof n=="function"?n():s&&typeof s=="function"?s():console.error(`No route found for path/hash: ${e}/${t}`)}}const b=new y;b.init();const M=new L;M.init();const d=(o,e={})=>{const t=new CustomEvent(o,{detail:e});document.dispatchEvent(t)};new E({"":()=>{d("route:home")},"entry*":()=>{d("route:entry")},"search/*":()=>{d("route:search")}});window.addEventListener("beforeunload",()=>{sessionStorage.clear()});
