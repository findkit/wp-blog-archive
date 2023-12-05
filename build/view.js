(()=>{var t={184:(t,e)=>{var s;!function(){"use strict";var i={}.hasOwnProperty;function r(){for(var t=[],e=0;e<arguments.length;e++){var s=arguments[e];if(s){var n=typeof s;if("string"===n||"number"===n)t.push(s);else if(Array.isArray(s)){if(s.length){var o=r.apply(null,s);o&&t.push(o)}}else if("object"===n){if(s.toString!==Object.prototype.toString&&!s.toString.toString().includes("[native code]")){t.push(s.toString());continue}for(var a in s)i.call(s,a)&&s[a]&&t.push(a)}}}return t.join(" ")}t.exports?(r.default=r,t.exports=r):void 0===(s=function(){return r}.apply(e,[]))||(t.exports=s)}()}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,s),n.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=s(184),e=s.n(t),i=class{constructor(t){this.o=new Map,this.u=t}on(t,e){let s=this.o.get(t)||new Set;return this.o.set(t,s),s.add(e),()=>{this.off(t,e)}}once(t,e){let s=this.on(t,(t=>{s(),e(t)}));return s}off(t,e){this.o.get(t)?.delete(e)}dispose(){this.o.clear()}emit(t,e){Object.assign(e,{source:this.u});let s=this.o.get(t);if(typeof document<"u"){let t=new Event("findkit-ui-event");Object.assign(t,{payload:e}),document.dispatchEvent(t)}if(s)for(let t of s)t(e)}},r=class{constructor(t){this.s=new Set,this.i=!1,this.create=t=>{if(this.i)return()=>{};let e=t();return this.s.add(e),()=>{this.s.has(e)&&(this.s.delete(e),e())}},this.child=t=>{let e=new r((()=>{this.s.delete(e.dispose),t?.()}));return this.disposed?e.dispose():this.create((()=>e.dispose)),e},this.dispose=()=>{this.i=!0;let t=Array.from(this.s);this.s.clear(),t.forEach((t=>t())),this.d?.()},this.d=t}get disposed(){return this.i}get size(){return this.s.size}};function n(t,e,s,i){return t.addEventListener(e,s,i),()=>{t.removeEventListener(e,s)}}var o=()=>document;function a(t){let e="https://cdn.findkit.com/ui/v0.16.0";return t.endsWith(".js")?`${e}/esm/${t}`:`${e}/${t}`}var l=!1;function c(t,e,s){let i=t=>{let i=(Array.isArray(t)||t instanceof NodeList?Array.from(t):[t]).filter((t=>t instanceof e));0===i.length?console.error("[findkit] select(): No elements found for selector",t):s(i[0],...i.slice(1))};"string"==typeof t?function(t){/interactive|complete/.test(o().readyState)?t():n(o(),"DOMContentLoaded",(()=>{t()}),{once:!0})}((()=>{i(o().querySelectorAll(t))})):i(t)}var d={};function h(t){return(...e)=>{let s=d[t];if(!s)throw new Error(`[findkit] Implementation for "${t}" not loaded yet!`);return s(...e)}}var u={},p=h("html"),f=(h("h"),h("useCustomRouterData"));async function m(t){let e="string"==typeof t?t:t.href;if(!e)return;let s=o().createElement("link");s.rel="preload",s.as="style",s.href=e;let i=new Promise((t=>{setTimeout(t,2e3),n(s,"load",t,{once:!0}),n(s,"error",(()=>{console.error(`[findkit] Failed to load stylesheet ${e}`),t({})}),{once:!0})}));o().head?.appendChild(s),await i,s.remove()}new Proxy({},{get:(t,e)=>{let s=u;return t[e]||(t[e]=(...t)=>{if(!s)throw new Error(`[findkit] Cannot use '${String(e)}': Preact not loaded yet!`);return s[e](...t)}),t[e]}}),h("useTerms"),h("useTotal"),h("useResults"),h("useParams"),h("useGroups"),h("useTotalHitCount"),h("useLoading"),h("useInput"),h("useLang");var g=class{constructor(t){this.c=!1,this.a=new r,this.t=function(){let t,e=new i("lazyValue");return Object.assign((s=>{void 0!==t?s(t):e.once("value",(e=>{t=e.value,s(t)}))}),{get:()=>t,provide:s=>{if(void 0!==t)throw new Error("Value already provided");t=s,e.emit("value",{value:s})}})}(),this.close=this.r("close"),this.setUIStrings=this.r("setUIStrings"),this.setLang=this.r("setLang"),this.addTranslation=this.r("addTranslation"),this.updateGroups=this.r("updateGroups"),this.setCustomRouterData=this.r("setCustomRouterData"),this.updateParams=this.r("updateParams"),this.preload=async()=>{await this.l(),await new Promise((t=>{this.t(t)}))},this.f=t=>{t.target instanceof HTMLAnchorElement&&(t.ctrlKey||t.shiftKey||t.metaKey||2===t.which)||(t.preventDefault(),this.open())},this.e=t,this.n=new i(this),this.emitLoadingEvents(),(this.m()||!1===t.modal||"boolean"!=typeof t.modal&&t.container)&&this.open(),this.n.emit("init",{})}emitLoadingEvents(){let t,e=this.n,s=0,i=!1,r=()=>{s++,!t&&(t=setTimeout((()=>{t=void 0,i||(i=!0,e.emit("loading",{}),this.t((t=>{t.state.loading=i})))}),this.e.loadingThrottle??1e3))},n=()=>{setTimeout((()=>{s--,!(s>0)&&(clearTimeout(t),t=void 0,i&&(i=!1,e.emit("loading-done",{}),this.t((t=>{t.state.loading=i}))))}),10)};e.on("fetch",r),e.on("fetch-done",n),e.once("request-open",(t=>{t.preloaded||(r(),e.once("loaded",n))}))}get groups(){return this.t.get()?.getGroups()??this.e.groups??[]}get params(){return this.t.get()?.getParams()??this.e.params??{tagQuery:[]}}on(t,e){return this.n.on(t,e)}once(t,e){return this.n.once(t,e)}terms(){return this.t.get()?.state.usedTerms??""}status(){return this.t.get()?.state.status??"waiting"}dispose(){this.close(),this.a.dispose()}r(t){return(...e)=>{this.t((s=>{s[t](...e)}))}}get id(){return this.e.instanceId??"fdk"}m(){if(typeof window>"u")return!1;let t=location.search;return"hash"===this.e.router&&(t=location.hash.slice(1)),new URLSearchParams(t).has(this.id+"_q")}p(){let t=[];return this.e.load||t.push({href:a("styles.css"),layer:"findkit.core"}),this.e.styleSheet&&t.push({href:this.e.styleSheet,layer:"findkit.user"}),t}open(t){this.n.emit("request-open",{preloaded:!!this.t.get()}),function(){if(l)return;l=!0;let t=o().createElement("link");t.rel="preconnect",t.href="https://search.findkit.com",o().head?.appendChild(t)}(),this.l(),this.t((e=>{e.open(t)}))}async h(){let t,e=Promise.all(this.p().map(m));return t=this.e.load?this.e.load():async function(t,e){let s=window,i=`${t}_promise`;if(s[i])return s[i];let r=new Promise(((s,i)=>{let r=o().createElement("script");r.type="module";let n=setTimeout((()=>{i(new Error(`[findkit] Timeout loading script ${e} with ${t}`))}),1e4);Object.assign(window,{[t](e){delete window[t],clearTimeout(n),r.remove(),s(e)}}),r.src=e,o().head?.appendChild(r)}));return s[i]=r,r}("FINDKIT_LOADED_0.16.0",a("implementation.js")).then((t=>({js:t}))),await e,await t}async l(){if(this.c||this.t.get())return;this.c=!0;let t=await this.h();if(typeof location<"u"){let t=new URLSearchParams(location.search),e=Number(t.get("__fdk_simulate_slow_load"));e&&await new Promise((t=>setTimeout(t,e)))}Object.assign(d,t.js),Object.assign(u,t.js.preact);let{styleSheet:e,load:s,css:i,...r}=this.e,n=this.p();t.css&&n.push({css:t.css,layer:"findkit.core"}),i&&n.push({css:i,layer:"findkit.user"});let o=e=>{this.a.create((()=>{let{engine:s,host:i}=t.js.init({...r,container:e,layeredCSS:n,instanceId:this.id,events:this.n,searchEndpoint:this.e.searchEndpoint});return this.c=!0,this.container=i,this.t.provide(s),this.n.emit("loaded",{container:i}),s.start(),s.dispose}))};this.e.container?c(this.e.container,Element,o):o()}trapFocus(t){let e=this.a.child();return c(t,HTMLElement,((...t)=>{this.t((s=>{e.create((()=>s.trapFocus(t)))}))})),e.dispose}openFrom(t){let e=this.a.child();return c(t,HTMLElement,((...t)=>{for(let s of t)e.create((()=>n(s,"click",this.f))),e.create((()=>n(s,"keydown",(t=>{t.target instanceof HTMLElement&&"Enter"===t.key&&"button"===t.target.role&&(t.preventDefault(),this.open())})))),e.create((()=>n(s,"mouseover",this.preload,{once:!0,passive:!0})))})),e.dispose}bindInput(t){let e=this.a.child();return c(t,HTMLInputElement,((...t)=>{for(let s of t)e.create((()=>n(s,"focus",this.preload))),this.t((t=>{e.create((()=>t.bindInput(s)))}))})),e.dispose}};const v="wp_taxonomy/category/";function y(t){const s=t.dataset.publicToken,i=t.dataset.instanceId,r=t.querySelector("input.findkit-search-blog"),n=t.querySelector("form.findkit-tag-form"),o=t.querySelector(".findkit-blog-archive-results"),a=new g({instanceId:i,container:o,publicToken:s,minTerms:0,header:!1,shadowDom:!1,slots:{Hit:function(t){var s;const i=t.hit.customFields.excerpt?.value,r=null!==(s=t.hit.customFields.author?.value)&&void 0!==s?s:"Findkit Crew",n=t.hit.customFields.featuredImage?.value,o=t.hit.highlight,[a]=f(),c=a.selectedTag,d=t.hit.tags.flatMap((t=>t.startsWith(v)?t.slice(21):[])),h=(new Intl.DateTimeFormat).format(new Date(t.hit.created));return p`
            <div>
                <h2 class="wp-block-post-title">
                    <a href=${t.hit.url} target="_self"
                        >${t.hit.title}</a
                    >
                </h2>

                <div class="findkit-preview">
                    ${n?p`<img src="${n}" />`:""}

                    <p class="wp-block-post-excerpt__more-text">
                        <span
                            dangerouslySetInnerHTML=${{__html:o||i}}
                        />
                        ${" "}
                        <a class="findkit-read-more" href=${t.hit.url}>
                            Read more
                        </a>
                    </p>
                </div>

                <div class="wp-block-post-author__content">
                    <p class="wp-block-post-author__name">
                        ${r} at ${h}
                    </p>
                </div>

                <div class="findkit-hit-tags">
                    ${d.map((t=>p`
                            <button
                                type="button"
                                className=${e()("findkit-tag",{active:t===c})}
                                onClick=${()=>{l(t)}}
                            >
                                #${t}
                            </button>
                        `))}
                </div>
            </div>
        `}},params:{filter:{tags:"wp_post_type/post"},sort:{created:{$order:"desc"}}}});function l(t){t&&k(n,{tag:t}),a.setCustomRouterData(Object.fromEntries(new FormData(n))),c()}function c(){a.updateParams((t=>{const e=Object.fromEntries(new FormData(n));e.tag?t.filter.tags=v+e.tag:t.filter.tags="wp_post_type/post"}))}a.bindInput(r),n.addEventListener("submit",(t=>{t.preventDefault()})),n.addEventListener("input",(()=>{l()})),n.addEventListener("reset",(()=>{setTimeout((()=>{l()}),1)})),a.on("custom-router-data",(t=>{k(n,t.data),c()})),n.addEventListener("keydown",(t=>{if("Enter"===t.key&&t.target instanceof HTMLLabelElement){const e=n.querySelector("#"+t.target.htmlFor);e?.click()}})),a.on("fetch",(t=>{""!==t.terms.trim()&&t.transientUpdateParams((t=>{delete t.sort}))}));const d=t.querySelector(".findkit-blog-archive-loading");a.on("loading",(()=>{d.classList.remove("hide")})),a.on("loading-done",(()=>{d.classList.add("hide")})),a.addTranslation("en-US",{"all-results-shown":"All blog posts shown"})}const w=document.querySelectorAll(".findkit-blog-archive");for(const t of w)y(t);function k(t,e){for(const[s,i]of Object.entries(e)){const e=t.elements.namedItem(s),r=Array.isArray(i)?i:[i];for(const t of r){const s=e instanceof RadioNodeList?Array.from(e):[e];for(const e of s)if(e instanceof HTMLSelectElement)for(const s of e.options)s.value!==t||(s.selected=!0);else if(e instanceof HTMLInputElement)if("checkbox"===e.type||"radio"===e.type){if(e.value===t){e.checked=!0;continue}}else e.value=t}}}})()})();