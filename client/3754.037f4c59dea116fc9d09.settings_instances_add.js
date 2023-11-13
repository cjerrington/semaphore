"use strict";(this.webpackChunksemaphore=this.webpackChunksemaphore||[]).push([[3754],{8319:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var a=n(4178),r=n(2192),o=n(1728),s=n(2159),i=n(5277),c=n(385),l=n(4886);const d="read write follow push";var h=n(281),g=n(3973),m=n(1169),u=n(2307),p=n(7376),I=n(1162);const f=["gab.com","gab.ai"];function v(e){const t=new Error(e);return t.knownError=!0,t}function y(){return`${location.origin}/settings/instances/add`}async function _(){let{instanceNameInSearch:e,loggedInInstances:t}=i.h.get();if(e=e.replace(/^https?:\/\//,"").replace(/\/+$/,"").toLowerCase(),Object.keys(t).includes(e))throw v(`You've already logged in to ${e}`);const n=new URL(`http://${e}`).hostname;if(f.some((e=>new RegExp(`(?:\\.|^)${e}$`,"i").test(n))))throw v("This service is blocked");const a=y(),r=function(e,t){const n=`${(0,l.E)(e)}/api/v1/apps`;return(0,c.v_)(n,{client_name:"Semaphore",redirect_uris:t,scopes:d,website:"https://semaphore.social"},null,{timeout:c.$Q})}(e,a);try{const t=await(0,h.s)(e);await I.F.setInstanceInfo(e,t)}catch(g){if(401!==g.status)throw g}const o=await r;i.h.set({currentRegisteredInstanceName:e,currentRegisteredInstance:o}),i.h.save();const s=function(e,t,n){const a=(0,c.pe)({client_id:t,redirect_uri:n,response_type:"code",scope:d});return`${(0,l.E)(e)}/oauth/authorize?${a}`}(e,o.client_id,a);setTimeout((()=>{document.location.href=s}),200)}async function w(e){const{currentRegisteredInstanceName:t,currentRegisteredInstance:n}=i.h.get(),a=y(),r=await function(e,t,n,a,r){const o=`${(0,l.E)(e)}/oauth/token`;return(0,c.v_)(o,new URLSearchParams({client_id:t,client_secret:n,redirect_uri:r,grant_type:"authorization_code",code:a}),null,{timeout:c.$Q})}(t,n.client_id,n.client_secret,e,a),{loggedInInstances:o,loggedInInstancesInOrder:s,instanceThemes:d}=i.h.get();d[t]=m.t0,o[t]=r,s.includes(t)||s.push(t),i.h.set({instanceNameInSearch:"",currentRegisteredInstanceName:null,currentRegisteredInstance:null,loggedInInstances:o,currentInstance:t,loggedInInstancesInOrder:s,instanceThemes:d}),i.h.save();const{enableGrayscale:h}=i.h.get();(0,m.Xi)(m.t0,h),(0,u.Ac)(t),(0,p.Mj)(t),(0,g.E9)("/")}var $=n(2665),b=n(4607);var E={onSubmitInstance(e){e.preventDefault(),e.stopPropagation(),async function(){i.h.set({logInToInstanceLoading:!0,logInToInstanceError:null});try{await _()}catch(e){console.error(e);const t=`${e.message||e.name}. `+(e.knownError?"":navigator.onLine?'\n  Is this a valid Mastodon instance? Is a browser extension\n  blocking the request? Are you in private browsing mode?\n  If you believe this is a problem with your instance, please send\n  <a href="https://github.com/NickColley/semaphore/blob/main/docs/Admin-Guide.md"\n    target="_blank" rel="noopener">this link</a> to the administrator of your instance.':"Are you offline?"),{instanceNameInSearch:n}=i.h.get();i.h.set({logInToInstanceError:t,logInToInstanceErrorForText:n})}finally{i.h.set({logInToInstanceLoading:!1})}}()}};async function L(){const e=new URLSearchParams(location.search).get("code");e?await async function(e){try{i.h.set({logInToInstanceLoading:!0}),await w(e)}catch(t){i.h.set({logInToInstanceError:`${t.message||t.name}. Failed to connect to instance.`})}finally{i.h.set({logInToInstanceLoading:!1})}}(e):this.set({hasIndexedDB:await(0,$.m)(),hasLocalStorage:(0,$.I)()})}function T(e,t){var n,r;return{c(){n=(0,a.az)("div"),r=(0,a.rw)("It seems Semaphore cannot store data locally. Is your browser in private mode or blocking cookies? Semaphore stores all data locally, and requires LocalStorage and IndexedDB to work correctly."),this.h()},l(e){n=(0,a.d$)(e,"DIV",{class:!0,role:!0},!1);var t=(0,a.pI)(n);r=(0,a.M4)(t,"It seems Semaphore cannot store data locally. Is your browser in private mode or blocking cookies? Semaphore stores all data locally, and requires LocalStorage and IndexedDB to work correctly."),t.forEach(a.r2),this.h()},h(){n.className="form-error form-error-user-error svelte-gnr0mr",(0,a.P$)(n,"role","alert")},m(e,t){(0,a.$T)(e,n,t),(0,a.R3)(n,r)},d(e){e&&(0,a.r2)(n)}}}function R(e,t){var n,r,o;return{c(){n=(0,a.az)("div"),r=(0,a.rw)("Error: "),o=(0,a.az)("noscript"),this.h()},l(e){n=(0,a.d$)(e,"DIV",{class:!0,role:!0},!1);var t=(0,a.pI)(n);r=(0,a.M4)(t,"Error: "),o=(0,a.az)("noscript"),t.forEach(a.r2),this.h()},h(){n.className="form-error form-error-user-error svelte-gnr0mr",(0,a.P$)(n,"role","alert")},m(e,s){(0,a.$T)(e,n,s),(0,a.R3)(n,r),(0,a.R3)(n,o),o.insertAdjacentHTML("afterend",t.$logInToInstanceError)},p(e,t){e.$logInToInstanceError&&((0,a.R6)(o),o.insertAdjacentHTML("afterend",t.$logInToInstanceError))},d(e){e&&(0,a.r2)(n)}}}function x(e,t){var n,r,o,s,i,c=new b.Z({root:e.root,store:e.store,data:{text:"instance",tooltipText:"An instance is your Mastodon home server, such as mastodon.social or cybre.space."}});return{c(){n=(0,a.az)("p"),r=(0,a.rw)("Don't have an\n      "),c._fragment.c(),o=(0,a.rw)("\n      ?\n      "),s=(0,a.az)("a"),i=(0,a.rw)("Join Mastodon!"),this.h()},l(e){n=(0,a.d$)(e,"P",{},!1);var t=(0,a.pI)(n);r=(0,a.M4)(t,"Don't have an\n      "),c._fragment.l(t),o=(0,a.M4)(t,"\n      ?\n      "),s=(0,a.d$)(t,"A",{rel:!0,target:!0,href:!0},!1);var l=(0,a.pI)(s);i=(0,a.M4)(l,"Join Mastodon!"),l.forEach(a.r2),t.forEach(a.r2),this.h()},h(){s.rel="noopener",s.target="_blank",s.href="https://joinmastodon.org"},m(e,t){(0,a.$T)(e,n,t),(0,a.R3)(n,r),c._mount(n,null),(0,a.R3)(n,o),(0,a.R3)(n,s),(0,a.R3)(s,i)},d(e){e&&(0,a.r2)(n),c.destroy()}}}function N(e){var t;if((0,a.S1)(this,e),this.store=i.h,this._state=(0,a.f0)((0,a.f0)(this.store._init(["isUserLoggedIn","logInToInstanceError","logInToInstanceErrorForText","instanceNameInSearch","logInToInstanceLoading"]),{hasIndexedDB:!0,hasLocalStorage:!0}),e.data),this.store._add(this,["isUserLoggedIn","logInToInstanceError","logInToInstanceErrorForText","instanceNameInSearch","logInToInstanceLoading"]),this._recompute({$isUserLoggedIn:1},this._state),this._intro=!0,this._handlers.destroy=[a.iT],document.getElementById("svelte-gnr0mr-style")||((t=(0,a.az)("style")).id="svelte-gnr0mr-style",t.textContent=".add-new-instance.svelte-gnr0mr{background:var(--form-bg);padding:5px 10px 15px;margin:20px auto;border:1px solid var(--form-border);border-radius:4px}.form-error.svelte-gnr0mr{border:2px solid var(--warn-color);border-radius:2px;padding:10px;font-size:1.3em;margin:5px;background-color:var(--main-bg)}input.svelte-gnr0mr{min-width:70%;max-width:100%;background-color:var(--input-bg)}label.svelte-gnr0mr,input.svelte-gnr0mr,button.svelte-gnr0mr,.add-new-instance-aside{display:block;margin:20px 5px}@media(max-width: 767px){input.svelte-gnr0mr{min-width:95%}}",(0,a.R3)(document.head,t)),this._fragment=function(e,t){var n,r,o,i,c,l,d,h,g,m,u,p,I,f,v,y,_,w,$=!1,b=(!t.hasIndexedDB||!t.hasLocalStorage)&&T(),E=t.$logInToInstanceError&&t.$logInToInstanceErrorForText===t.$instanceNameInSearch&&R(0,t);function L(){$=!0,e.store.set({instanceNameInSearch:p.value}),$=!1}function N(t){e.onSubmitInstance(t)}var S=!t.$isUserLoggedIn&&x(e),k={page:"settings/instances/add",label:t.pageLabel},M=new s.Z({root:e.root,store:e.store,slots:{default:(0,a.xJ)()},data:k});return{c(){n=(0,a.az)("h1"),r=(0,a.rw)(t.pageLabel),o=(0,a.rw)("\n\n  "),i=(0,a.az)("div"),c=(0,a.az)("form"),b&&b.c(),l=(0,a.rw)("\n\n      "),E&&E.c(),d=(0,a.rw)("\n\n      "),h=(0,a.rw)("\n\n      "),g=(0,a.az)("label"),m=(0,a.rw)("Instance:"),u=(0,a.rw)("\n      "),p=(0,a.az)("input"),I=(0,a.rw)("\n      "),f=(0,a.az)("button"),v=(0,a.rw)("Log in"),_=(0,a.rw)("\n\n  "),S&&S.c(),w=(0,a.Yr)(),M._fragment.c(),this.h()},l(e){n=(0,a.d$)(e,"H1",{id:!0},!1);var s=(0,a.pI)(n);r=(0,a.M4)(s,t.pageLabel),s.forEach(a.r2),o=(0,a.M4)(e,"\n\n  "),i=(0,a.d$)(e,"DIV",{class:!0},!1);var y=(0,a.pI)(i);c=(0,a.d$)(y,"FORM",{"aria-labelledby":!0},!1);var $=(0,a.pI)(c);b&&b.l($),l=(0,a.M4)($,"\n\n      "),E&&E.l($),d=(0,a.M4)($,"\n\n      "),h=(0,a.M4)($,"\n\n      "),g=(0,a.d$)($,"LABEL",{for:!0,class:!0},!1);var L=(0,a.pI)(g);m=(0,a.M4)(L,"Instance:"),L.forEach(a.r2),u=(0,a.M4)($,"\n      "),p=(0,a.d$)($,"INPUT",{type:!0,inputmode:!0,autocapitalize:!0,spellcheck:!0,id:!0,placeholder:!0,required:!0,class:!0},!1),(0,a.pI)(p).forEach(a.r2),I=(0,a.M4)($,"\n      "),f=(0,a.d$)($,"BUTTON",{class:!0,type:!0,id:!0,disabled:!0},!1);var T=(0,a.pI)(f);v=(0,a.M4)(T,"Log in"),T.forEach(a.r2),$.forEach(a.r2),y.forEach(a.r2),_=(0,a.M4)(e,"\n\n  "),S&&S.l(e),w=(0,a.Yr)(),M._fragment.l(e),this.h()},h(){n.id="add-an-instance-h1",g.htmlFor="instanceInput",g.className="svelte-gnr0mr",(0,a.NH)(p,"input",L),(0,a.P$)(p,"type","text"),(0,a.P$)(p,"inputmode","url"),(0,a.P$)(p,"autocapitalize","none"),p.spellcheck="false",p.id="instanceInput",p.placeholder="Enter instance name",p.required=!0,p.className="svelte-gnr0mr",f.className="primary svelte-gnr0mr",f.type="submit",f.id="submitButton",f.disabled=y=!t.$instanceNameInSearch||t.$logInToInstanceLoading,(0,a.NH)(c,"submit",N),(0,a.P$)(c,"aria-labelledby","add-an-instance-h1"),i.className="add-new-instance svelte-gnr0mr"},m(e,s){(0,a.R3)(M._slotted.default,n),(0,a.R3)(n,r),(0,a.R3)(M._slotted.default,o),(0,a.R3)(M._slotted.default,i),(0,a.R3)(i,c),b&&b.m(c,null),(0,a.R3)(c,l),E&&E.m(c,null),(0,a.R3)(c,d),(0,a.R3)(c,h),(0,a.R3)(c,g),(0,a.R3)(g,m),(0,a.R3)(c,u),(0,a.R3)(c,p),p.value=t.$instanceNameInSearch,(0,a.R3)(c,I),(0,a.R3)(c,f),(0,a.R3)(f,v),(0,a.R3)(M._slotted.default,_),S&&S.m(M._slotted.default,null),(0,a.R3)(M._slotted.default,w),M._mount(e,s)},p(t,n){t.pageLabel&&(0,a.a_)(r,n.pageLabel),n.hasIndexedDB&&n.hasLocalStorage?b&&(b.d(1),b=null):b||((b=T()).c(),b.m(c,l)),n.$logInToInstanceError&&n.$logInToInstanceErrorForText===n.$instanceNameInSearch?E?E.p(t,n):((E=R(0,n)).c(),E.m(c,d)):E&&(E.d(1),E=null),!$&&t.$instanceNameInSearch&&(p.value=n.$instanceNameInSearch),(t.$instanceNameInSearch||t.$logInToInstanceLoading)&&y!==(y=!n.$instanceNameInSearch||n.$logInToInstanceLoading)&&(f.disabled=y),n.$isUserLoggedIn?S&&(S.d(1),S=null):S||((S=x(e)).c(),S.m(w.parentNode,w));var o={};t.pageLabel&&(o.label=n.pageLabel),M._set(o)},d(e){b&&b.d(),E&&E.d(),(0,a.ys)(p,"input",L),(0,a.ys)(c,"submit",N),S&&S.d(),M.destroy(e)}}}(this,this._state),this.root._oncreate.push((()=>{L.call(this),this.fire("update",{changed:(0,a.lZ)({},this._state),current:this._state})})),e.target){var n=(0,a.pI)(e.target);e.hydrate?this._fragment.l(n):this._fragment.c(),n.forEach(a.r2),this._mount(e.target,e.anchor),(0,a.yl)(this)}}(0,a.f0)(N.prototype,a.uS),(0,a.f0)(N.prototype,E),N.prototype._recompute=function(e,t){e.$isUserLoggedIn&&this._differs(t.pageLabel,t.pageLabel=function({$isUserLoggedIn:e}){return e?"Add instance":"Log in"}(t))&&(e.pageLabel=!0)};const S=N;function k(e){var t,n,s,i,c,l,d;if((0,a.S1)(this,e),this._state=(0,a.f0)((0,a.f0)(this.store._init(["isUserLoggedIn"]),{pageComponent:S}),e.data),this.store._add(this,["isUserLoggedIn"]),this._recompute({$isUserLoggedIn:1},this._state),this._intro=!0,this._handlers.destroy=[a.iT],this._fragment=(t=this,n=this._state,i={name:n.titleName,settingsPage:!0},c=new r.Z({root:t.root,store:t.store,data:i}),l={pageComponent:n.pageComponent,params:n.params},d=new o.Z({root:t.root,store:t.store,data:l}),{c(){c._fragment.c(),s=(0,a.rw)("\n\n  "),d._fragment.c()},l(e){c._fragment.l(e),s=(0,a.M4)(e,"\n\n  "),d._fragment.l(e)},m(e,t){c._mount(e,t),(0,a.$T)(e,s,t),d._mount(e,t)},p(e,t){var n={};e.titleName&&(n.name=t.titleName),c._set(n);var a={};e.pageComponent&&(a.pageComponent=t.pageComponent),e.params&&(a.params=t.params),d._set(a)},d(e){c.destroy(e),e&&(0,a.r2)(s),d.destroy(e)}}),e.target){var h=(0,a.pI)(e.target);e.hydrate?this._fragment.l(h):this._fragment.c(),h.forEach(a.r2),this._mount(e.target,e.anchor),(0,a.yl)(this)}}(0,a.f0)(k.prototype,a.uS),k.prototype._recompute=function(e,t){e.$isUserLoggedIn&&this._differs(t.titleName,t.titleName=function({$isUserLoggedIn:e}){return e?"Add instance":"Log in"}(t))&&(e.titleName=!0)};const M=k},7376:(e,t,n)=>{n.d(t,{Q0:()=>g,ic:()=>h,Mj:()=>d});var a=n(1370),r=n(1162),o=n(4886),s=n(385);var i=n(5277),c=n(4285);async function l(e,t){await t((()=>{const{loggedInInstances:t}=i.h.get(),n=t[e].access_token;return function(e,t){const n=`${(0,o.E)(e)}/api/v1/custom_emojis`;return(0,s.U2)(n,(0,o.I)(t),{timeout:s.EH})}(e,n)}),(()=>r.F.getCustomEmoji(e)),(t=>r.F.setCustomEmoji(e,t)),(t=>{const{customEmoji:n}=i.h.get();(0,c.Xy)(n[e],t)||(n[e]=t,i.h.set({customEmoji:n}))}))}async function d(e){await l(e,a.u)}async function h(e){await l(e,a.o)}function g(e,t){const n=t.unicode||`:${t.name}:`,{composeSelectionStart:a}=i.h.get(),r=a||0,o=i.h.getComposeData(e,"text")||"",s=`${o.substring(0,r)}${n} ${o.substring(r)}`;i.h.setComposeData(e,{text:s})}},2625:(e,t,n)=>{n.d(t,{D:()=>s,Q:()=>o});var a=n(385),r=n(4886);function o(e,t){const n=`${(0,r.E)(e)}/api/v1/accounts/verify_credentials`;return(0,a.U2)(n,(0,r.I)(t),{timeout:a.EH})}function s(e,t,n){const o=`${(0,r.E)(e)}/api/v1/accounts/${n}`;return(0,a.U2)(o,(0,r.I)(t),{timeout:a.EH})}},1162:(e,t,n)=>{n.d(t,{F:()=>a});const a=new Proxy({},{get:function(e,t){return async function(...a){if(!e[t]){const a=await Promise.all([n.e(4285),n.e(4970)]).then(n.bind(n,4970));e[t]=a[t]}return e[t].apply(null,a)}}})},1370:(e,t,n)=>{async function a(e,t,n,a){const r=e();let o;try{o=await t()}catch(s){console.error("ignored DB error",s)}finally{o&&a(o);const e=r.then((e=>{n(e),a(e)}));o||await e}}async function r(e,t,n,a){let r;try{r=await t()}catch(o){console.error("ignored DB error",o)}if(r)a(r);else{const t=await e();n(t),a(t)}}n.d(t,{o:()=>r,u:()=>a})}}]);
//# sourceMappingURL=3754.037f4c59dea116fc9d09.settings_instances_add.js.map