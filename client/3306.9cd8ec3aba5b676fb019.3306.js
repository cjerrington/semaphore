"use strict";(this.webpackChunksemaphore=this.webpackChunksemaphore||[]).push([[3306],{3306:(t,e,s)=>{s.r(e),s.d(e,{default:()=>n});var a=s(4178),o=s(1372);var i={observe:o.N7,push:o.VF,splice:o.db,say(t){this.push("messages",t)},onNewToast(t){this._queue=this._queue.then((()=>(this.set({text:t,shown:!0}),new Promise((t=>{setTimeout(t,5e3)}))))).then((()=>(this.set({shown:!1}),new Promise((t=>{setTimeout(t,1e3)})))))}};function r(){this._queue=Promise.resolve(),this.observe("messages",(t=>{t.length&&(this.onNewToast(t[0]),this.splice("messages",0,1))}))}function h(t){var e,s,o,i,h,n,l;if((0,a.S1)(this,t),this._state=(0,a.f0)({text:"",shown:!1,messages:[]},t.data),this._intro=!0,document.getElementById("svelte-x6x6pr-style")||((e=(0,a.az)("style")).id="svelte-x6x6pr-style",e.textContent=".toast-modal.svelte-x6x6pr{position:fixed;bottom:calc(40px + var(--toast-gap-bottom));left:0;right:0;opacity:0;transition:opacity 0.2s linear;display:flex;flex-direction:column;align-items:center;pointer-events:none;z-index:100000}.toast-container.svelte-x6x6pr{max-width:600px;max-height:20vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;border:2px solid var(--toast-border);background:var(--toast-bg);border-radius:5px;margin:0 40px;padding:20px;font-size:1.3em;color:var(--toast-text)}.toast-modal.shown.svelte-x6x6pr{opacity:0.9}@media(max-width: 767px){.toast-container.svelte-x6x6pr{max-width:80vw}}",(0,a.R3)(document.head,e)),this._fragment=(s=this._state,{c(){o=(0,a.az)("div"),i=(0,a.az)("div"),h=(0,a.rw)(s.text),this.h()},l(t){o=(0,a.d$)(t,"DIV",{class:!0,role:!0,"aria-hidden":!0},!1);var e=(0,a.pI)(o);i=(0,a.d$)(e,"DIV",{class:!0},!1);var r=(0,a.pI)(i);h=(0,a.M4)(r,s.text),r.forEach(a.r2),e.forEach(a.r2),this.h()},h(){i.className="toast-container svelte-x6x6pr",o.className=n="toast-modal "+(s.shown?"shown":"")+" svelte-x6x6pr",(0,a.P$)(o,"role","alert"),(0,a.P$)(o,"aria-hidden",l=!s.shown)},m(t,e){(0,a.$T)(t,o,e),(0,a.R3)(o,i),(0,a.R3)(i,h)},p(t,e){t.text&&(0,a.a_)(h,e.text),t.shown&&n!==(n="toast-modal "+(e.shown?"shown":"")+" svelte-x6x6pr")&&(o.className=n),t.shown&&l!==(l=!e.shown)&&(0,a.P$)(o,"aria-hidden",l)},d(t){t&&(0,a.r2)(o)}}),this.root._oncreate.push((()=>{r.call(this),this.fire("update",{changed:(0,a.lZ)({},this._state),current:this._state})})),t.target){var d=(0,a.pI)(t.target);t.hydrate?this._fragment.l(d):this._fragment.c(),d.forEach(a.r2),this._mount(t.target,t.anchor),(0,a.yl)(this)}}(0,a.f0)(h.prototype,a.uS),(0,a.f0)(h.prototype,i);const n=h}}]);
//# sourceMappingURL=3306.9cd8ec3aba5b676fb019.3306.js.map