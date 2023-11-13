"use strict";(this.webpackChunksemaphore=this.webpackChunksemaphore||[]).push([[6949],{9905:t=>{var e=0;function n(t,e){var n=e.data;if(Array.isArray(n)&&!(n.length<2)){var r=n[0],a=n[1],o=n[2],s=t._callbacks[r];s&&(delete t._callbacks[r],s(a,o))}}function r(t){var e=this;e._worker=t,e._callbacks={},t.addEventListener("message",(function(t){n(e,t)}))}r.prototype.postMessage=function(t){var r=this,a=e++,o=[a,t];return new Promise((function(t,e){if(r._callbacks[a]=function(n,r){if(n)return e(new Error(n.message));t(r)},void 0!==r._worker.controller){var s=new MessageChannel;s.port1.onmessage=function(t){n(r,t)},r._worker.controller.postMessage(o,[s.port2])}else r._worker.postMessage(o)}))},t.exports=r},6949:(t,e,n)=>{n.d(e,{B:()=>b,F:()=>v});var r=n(85),a=n(8183);function o(){return new Worker(n.p+"blurhash.ef9e7ca2b2b022bba07d.blurhash.js")}var s=n(9905);const c=new(n(4698).c)({maxSize:150});let i,l,u;function h(){i=i||new s(new o)}async function f(t){l||(l=document.createElement("canvas"),l.height=32,l.width=32,u=l.getContext("2d")),u.putImageData(t,0,0);const e=await new Promise((t=>l.toBlob(t)));return URL.createObjectURL(e)}async function d(t){let e=c.get(t);return e||(e=await async function(t){h();const{decoded:e,imageData:n}=await i.postMessage(t);return e||f(n)}(t),c.set(t,e)),e}c.on("evict",((t,e)=>{URL.revokeObjectURL(t)}));var g=n(9970),m=n(9006);function w(t){return(0,r.U2)(t,["status"])||(0,r.U2)(t,["notification","status"])}function b(){try{h()}catch(t){console.error("could not start blurhash worker",t)}}async function p(t){const e=w(t);if(!e)return;const n=(0,r.U2)(e,["media_attachments"],[]).concat((0,r.U2)(e,["reblog","media_attachments"],[])).filter((t=>t.blurhash));n.length&&((0,a.B)(`decodeBlurhash-${e.id}`),await Promise.all(n.map((async t=>{try{t.decodedBlurhash=await d(t.blurhash)}catch(e){console.warn("Could not decode blurhash, ignoring",e)}}))),(0,a.s)(`decodeBlurhash-${e.id}`))}async function k(t){const e=w(t);if(!e)return;const n=e.reblog?e.reblog:e,r=n.content||"",a=n.mentions||[];await new Promise((t=>{(0,g.F)((()=>{n.plainTextContent=(0,m.g)(r,a),t()}))}))}async function v(t){await Promise.all([p(t),k(t)])}},9006:(t,e,n)=>{n.d(e,{g:()=>s});var r=n(8183),a=n(6028);const o=new DOMParser;function s(t,e){if(!t)return"";(0,r.B)("statusHtmlToPlainText"),t=(0,a.e)(t);const n=o.parseFromString(t,"text/html");!function(t,e){const n=t.querySelectorAll("a.mention");for(let r=0;r<n.length;r++){const t=n[r],a=t.getAttribute("href"),o=e.find((t=>t.url===a));o&&(t.innerText=`@${o.acct}`)}}(n,e);const s=function(t){let e="";const n=t.querySelectorAll("p");for(let r=0;r<n.length;r++){const a=n[r],o=a.querySelectorAll("br");for(let e=0;e<o.length;e++){const n=o[e];n.parentNode.replaceChild(t.createTextNode("\n"),n)}e+=(r>0?"\n\n":"")+a.textContent}return e}(n);return(0,r.s)("statusHtmlToPlainText"),s}}}]);
//# sourceMappingURL=6949.5bd884d1c3e383836fb0.6949.js.map