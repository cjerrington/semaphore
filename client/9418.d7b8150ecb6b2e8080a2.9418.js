"use strict";(this.webpackChunksemaphore=this.webpackChunksemaphore||[]).push([[9418],{9418:(e,t,a)=>{a.r(t),a.d(t,{default:()=>E});var o=a(4178),r=a(3582),i=a(5277),l=a(7376),s=a(9065),c=a(2771),n=a(6288),m=a(6196),d=a(1169);a(7911);var h=a(3482),u=a(3609),k=a(5500),p=a(7749),f=a(4212),g=a(9805);function y({$currentTheme:e}){return t=e,(m.n.find((e=>e.name===t))||m.n.find((e=>e.name===d.t0))).dark;var t}var j={show:s.$,close:c.x,onEmojiSelected(e){const{realm:t}=this.get();(0,l.Q0)(t,e.detail),this.close()},onPickerKeydown(e){"Backspace"===e.key&&e.target.shadowRoot.activeElement&&"INPUT"===e.target.shadowRoot.activeElement.tagName&&e.stopPropagation()}};async function b(){n.U.call(this);const{customEmoji:e}=this.get(),{enableGrayscale:t,isUserTouching:a}=this.store.get(),{picker:o}=this.refs;if(o.customEmoji=e,g.Ay&&(o.i18n=g.Ay),t){const e=document.createElement("style");e.textContent=".emoji { filter: grayscale(100%); }",o.shadowRoot.appendChild(e)}(0,h.Wb)(o.shadowRoot),this.on("destroy",(()=>(0,h.vz)(o.shadowRoot))),a||(0,u.M)((()=>{requestAnimationFrame((()=>{o.shadowRoot.querySelector("input").focus()}))})),(0,p.J)()||(await(0,f.Fh)(),applyFocusVisiblePolyfill(o.shadowRoot))}function v(e){var t;if((0,o.S1)(this,e),this.store=i.h,this.refs={},this._state=(0,o.f0)((0,o.f0)(this.store._init(["currentTheme","currentCustomEmoji","autoplayGifs"]),{emojiPickerLocale:g.FO,emojiPickerDataSource:g.jN}),e.data),this.store._add(this,["currentTheme","currentCustomEmoji","autoplayGifs"]),this._recompute({$currentTheme:1,$currentCustomEmoji:1,$autoplayGifs:1},this._state),this._intro=!0,this._handlers.destroy=[o.iT],document.getElementById("svelte-tllgw8-style")||((t=(0,o.az)("style")).id="svelte-tllgw8-style",t.textContent="emoji-picker.svelte-tllgw8{--indicator-color:var(--main-theme-color);--outline-color:var(--focus-outline);--input-border-radius:var(--input-border-radius-size)}@media(max-width: 479px){.emoji-container.svelte-tllgw8,emoji-picker.svelte-tllgw8{width:100%}}@media(max-width: 320px){emoji-picker.svelte-tllgw8{--emoji-padding:0.25rem;--input-padding:0.125rem}emoji-picker.svelte-tllgw8{--num-columns:6}}@media(max-width: 240px){emoji-picker.svelte-tllgw8{--num-columns:6;--emoji-size:1.125rem;--emoji-padding:0.125rem;height:240px}}@media(max-height: 450px){emoji-picker.svelte-tllgw8{height:calc(100vh - 75px)}}",(0,o.R3)(document.head,t)),this._fragment=function(e,t){var a,i,l;function s(t){e.onEmojiSelected(t)}function c(t){e.onPickerKeydown(t)}var n={id:t.id,label:t.label,title:t.title,shrinkWidthToFit:!0,background:"var(--main-bg)"},m=new r.Z({root:e.root,store:e.store,slots:{default:(0,o.xJ)()},data:n});return{c(){a=(0,o.az)("div"),i=(0,o.az)("emoji-picker"),m._fragment.c(),this.h()},l(e){a=(0,o.d$)(e,"DIV",{class:!0},!1);var t=(0,o.pI)(a);i=(0,o.d$)(t,"EMOJI-PICKER",{locale:!0,"data-source":!0,class:!0},!1),(0,o.pI)(i).forEach(o.r2),t.forEach(o.r2),m._fragment.l(e),this.h()},h(){(0,o.NH)(i,"emoji-click",s),(0,o.NH)(i,"keydown",c),(0,o.E_)(i,"locale",t.emojiPickerLocale),i.dataset.source=t.emojiPickerDataSource,i.className=l=(t.darkMode?"dark":"light")+" svelte-tllgw8",a.className="emoji-container svelte-tllgw8"},m(t,r){(0,o.R3)(m._slotted.default,a),(0,o.R3)(a,i),e.refs.picker=i,m._mount(t,r)},p(e,t){e.emojiPickerLocale&&(0,o.E_)(i,"locale",t.emojiPickerLocale),e.emojiPickerDataSource&&(i.dataset.source=t.emojiPickerDataSource),e.darkMode&&l!==(l=(t.darkMode?"dark":"light")+" svelte-tllgw8")&&(i.className=l);var a={};e.id&&(a.id=t.id),e.label&&(a.label=t.label),e.title&&(a.title=t.title),m._set(a)},d(t){(0,o.ys)(i,"emoji-click",s),(0,o.ys)(i,"keydown",c),e.refs.picker===i&&(e.refs.picker=null),m.destroy(t)}}}(this,this._state),this.root._oncreate.push((()=>{b.call(this),this.fire("update",{changed:(0,o.lZ)({},this._state),current:this._state})})),e.target){var a=(0,o.pI)(e.target);e.hydrate?this._fragment.l(a):this._fragment.c(),a.forEach(o.r2),this._mount(e.target,e.anchor),(0,o.yl)(this)}}(0,o.f0)(v.prototype,o.uS),(0,o.f0)(v.prototype,j),v.prototype._recompute=function(e,t){e.$currentTheme&&this._differs(t.darkMode,t.darkMode=y(t))&&(e.darkMode=!0),(e.$currentCustomEmoji||e.$autoplayGifs)&&this._differs(t.customEmoji,t.customEmoji=function({$currentCustomEmoji:e,$autoplayGifs:t}){return(0,k.x)(e,t)}(t))&&(e.customEmoji=!0)};const w=v;var _=a(3634);function E(e){return(0,_.v)(w,{label:"Emoji",title:"Emoji",realm:e})}},9805:(e,t,a)=>{a.d(t,{Ay:()=>i,FO:()=>l,jN:()=>r});var o=a(7965);const r=`/emoji-${o.M}.json`,i=void 0,l="en-US"===o.M?"en":o.M},6196:(e,t,a)=>{a.d(t,{n:()=>o});const o=[{name:"default",label:"Light",dark:!1,color:"#6248CA"},{name:"scarlet",label:"Scarlet",dark:!1,color:"#e04e41"},{name:"seafoam",label:"Seafoam",dark:!1,color:"#177380"},{name:"hotpants",label:"Hotpants",dark:!1,color:"hotpink"},{name:"oaken",label:"Oaken",dark:!1,color:"saddlebrown"},{name:"majesty",label:"Majesty",dark:!1,color:"blueviolet"},{name:"gecko",label:"Gecko",dark:!1,color:"#4ab92f"},{name:"grayscale",label:"Grayscale",dark:!1,color:"#999999"},{name:"ozark",label:"Dark",dark:!0,color:"#6248CA"},{name:"cobalt",label:"Cobalt",dark:!0,color:"#08439b"},{name:"sorcery",label:"Sorcery",dark:!0,color:"#ae91e8"},{name:"punk",label:"Punk",dark:!0,color:"#e04e41"},{name:"riot",label:"Riot",dark:!0,color:"hotpink"},{name:"hacker",label:"Hacker",dark:!0,color:"#4ab92f"},{name:"mastodon",label:"Mastodon",dark:!0,color:"#282C37"},{name:"pitchblack",label:"Pitch Black",dark:!0,color:"#000"},{name:"dark-grayscale",label:"Dark Grayscale",dark:!0,color:"#666"}]},5500:(e,t,a)=>{function o(e,t){return e?e.filter((e=>e.visible_in_picker)).map((e=>({name:e.shortcode,shortcodes:[e.shortcode],url:t?e.url:e.static_url,category:e.category}))):[]}a.d(t,{x:()=>o})}}]);
//# sourceMappingURL=9418.d7b8150ecb6b2e8080a2.9418.js.map