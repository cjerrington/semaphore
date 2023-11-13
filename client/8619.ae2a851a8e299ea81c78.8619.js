"use strict";(this.webpackChunksemaphore=this.webpackChunksemaphore||[]).push([[8619],{8619:(t,e,s)=>{s.r(e),s.d(e,{default:()=>J});var o=s(4178),i=s(9225),r=s(6373);const n=()=>!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement);var l=s(8183),a=s(3609),h=s(1372),c=s(2213),d=s(900);var f={observe:h.N7,setupScroll(){this.scrollListener=(0,r.P)((t=>{const{fullscreen:e}=this.get();e||this.onScroll()}),300,{leading:!0,trailing:!0}),(0,c.Sn)(this.scrollListener)},teardownScroll(){(0,c.KR)(this.scrollListener)},setupFullscreen(){var t;this.onFullscreenChange=this.onFullscreenChange.bind(this),t=this.onFullscreenChange,"onfullscreenchange"in document?document.addEventListener("fullscreenchange",t):"onwebkitfullscreenchange"in document?document.addEventListener("webkitfullscreenchange",t):"onmozfullscreenchange"in document&&document.addEventListener("mozfullscreenchange",t)},teardownFullscreen(){var t;t=this.onFullscreenChange,"onfullscreenchange"in document?document.removeEventListener("fullscreenchange",t):"onwebkitfullscreenchange"in document?document.removeEventListener("webkitfullscreenchange",t):"onmozfullscreenchange"in document&&document.removeEventListener("mozfullscreenchange",t)},onScroll(){const{scrollTop:t,scrollHeight:e}=(0,c.JX)();(0,a.M)((()=>{(0,l.B)("onScroll -> setForRealm()"),this.store.setForRealm({scrollTop:t,scrollHeight:e}),(0,l.s)("onScroll -> setForRealm()")}))},onFullscreenChange(){(0,l.B)("onFullscreenChange"),n(),this.set({fullscreen:n()}),(0,l.s)("onFullscreenChange")},onResize(){this.store.setForRealm({scrollHeight:(0,c.JX)().scrollHeight,offsetHeight:(0,c.Vp)()})}};function u(){(0,l.B)("onCreate VirtualListContainer");const{realm:t}=this.get();this.store.setCurrentRealm(t),this.setupScroll(),this.setupFullscreen(),this.onResize=this.onResize.bind(this);const{scrollTop:e}=this.store.get(),s=(0,c.JX)();e>0?this.observe("allVisibleItemsHaveHeight",(t=>{const{initializedScrollTop:o}=this.get();!o&&t&&(this.set({initializedScrollTop:!0}),requestAnimationFrame((()=>{(0,l.B)("set scrollTop"),s.scrollTop=e,(0,l.s)("set scrollTop"),(0,a.M)((()=>{this.fire("initialized")}))})))})):(this.fire("noNeedToScroll"),this.observe("allVisibleItemsHaveHeight",(t=>{t&&this.fire("initialized")})),this.onResize()),(0,d.p)(this.onResize),(0,l.s)("onCreate VirtualListContainer")}function m(){this.teardownScroll(),this.teardownFullscreen(),this.store.setCurrentRealm(null),(0,d.D)(this.onResize)}function p(t){var e,s,r,n;if((0,o.S1)(this,t),this.store=i.virtualListStore,this._state=(0,o.f0)(this.store._init(["allVisibleItemsHaveHeight"]),t.data),this.store._add(this,["allVisibleItemsHaveHeight"]),this._recompute({$allVisibleItemsHaveHeight:1},this._state),this._intro=!0,this._handlers.destroy=[m,o.iT],this._slotted=t.slots||{},this._fragment=(e=this,this._state,n=e._slotted.default,{c:o.ZT,l:o.ZT,m(t,e){n&&((0,o.$T)(t,s||(s=(0,o.Yr)()),e),(0,o.$T)(t,n,e),(0,o.$T)(t,r||(r=(0,o.Yr)()),e))},p:o.ZT,d(t){n&&((0,o.AV)(s,r,n),(0,o.r2)(s),(0,o.r2)(r))}}),this.root._oncreate.push((()=>{u.call(this),this.fire("update",{changed:(0,o.lZ)({},this._state),current:this._state})})),t.target){var l=(0,o.pI)(t.target);t.hydrate?this._fragment.l(l):this._fragment.c(),l.forEach(o.r2),this._mount(t.target,t.anchor),(0,o.yl)(this)}}(0,o.f0)(p.prototype,o.uS),(0,o.f0)(p.prototype,f),p.prototype._recompute=function(t,e){t.$allVisibleItemsHaveHeight&&this._differs(e.allVisibleItemsHaveHeight,e.allVisibleItemsHaveHeight=function({$allVisibleItemsHaveHeight:t}){return t}(e))&&(t.allVisibleItemsHaveHeight=!0)};const g=p;var v=s(101);var _={observe:h.N7,doRecalculateHeight(){const t=this.refs.node.getBoundingClientRect(),{key:e}=this.get(),{itemHeights:s}=this.store.get();s[e]=t.height,this.store.setForRealm({itemHeights:s})}};function y(){const{key:t}=this.get(),e=this.refs.node;(0,v.b)((()=>{if(!e||!t)return;(0,l.B)("VirtualListItem gBCR");const s=e.getBoundingClientRect();(0,l.s)("VirtualListItem gBCR"),this.store.batchUpdateForRealm("itemHeights",t,s.height)})),this.doRecalculateHeight=this.doRecalculateHeight.bind(this),(0,d.p)(this.doRecalculateHeight),this.observe("shownBeforeRaf",(t=>{(0,a.M)((()=>{this.set({shown:t})}))}))}function w(){(0,d.D)(this.doRecalculateHeight)}function H(t){var e;if((0,o.S1)(this,t),this.store=i.virtualListStore,this.refs={},this._state=(0,o.f0)((0,o.f0)(this.store._init(["itemHeights","length"]),{shown:!1}),t.data),this.store._add(this,["itemHeights","length"]),this._recompute({$itemHeights:1,key:1},this._state),this._intro=!0,this._handlers.destroy=[w,o.iT],document.getElementById("svelte-vf97r5-style")||((e=(0,o.az)("style")).id="svelte-vf97r5-style",e.textContent=".virtual-list-item.svelte-vf97r5{position:absolute;width:100%;opacity:0;pointer-events:none;transition:opacity 0.2s linear;contain:content}.virtual-list-item.shown.svelte-vf97r5{opacity:1;pointer-events:auto}",(0,o.R3)(document.head,e)),this._fragment=function(t,e){var s,i,r,n=e.component;function l(e){var s={virtualProps:e.props,virtualIndex:e.index,virtualLength:e.$length,virtualKey:e.key};return{root:t.root,store:t.store,data:s}}if(n)var a=new n(l(e));function h(e){t.doRecalculateHeight()}return a&&a.on("recalculateHeight",h),{c(){s=(0,o.az)("div"),a&&a._fragment.c(),this.h()},l(t){s=(0,o.d$)(t,"DIV",{class:!0,"aria-hidden":!0,style:!0},!1);var e=(0,o.pI)(s);a&&a._fragment.l(e),e.forEach(o.r2),this.h()},h(){s.className=i="virtual-list-item list-item "+(e.shown?"shown":"")+" svelte-vf97r5",(0,o.P$)(s,"aria-hidden",r=!e.shown),(0,o.A_)(s,"top",e.offset+"px")},m(e,i){(0,o.$T)(e,s,i),a&&a._mount(s,null),t.refs.node=s},p(t,e){var c={};t.props&&(c.virtualProps=e.props),t.index&&(c.virtualIndex=e.index),t.$length&&(c.virtualLength=e.$length),t.key&&(c.virtualKey=e.key),n!==(n=e.component)?(a&&a.destroy(),n?((a=new n(l(e)))._fragment.c(),a._mount(s,null),a.on("recalculateHeight",h)):a=null):n&&a._set(c),t.shown&&i!==(i="virtual-list-item list-item "+(e.shown?"shown":"")+" svelte-vf97r5")&&(s.className=i),t.shown&&r!==(r=!e.shown)&&(0,o.P$)(s,"aria-hidden",r),t.offset&&(0,o.A_)(s,"top",e.offset+"px")},d(e){e&&(0,o.r2)(s),a&&a.destroy(),t.refs.node===s&&(t.refs.node=null)}}}(this,this._state),this.root._oncreate.push((()=>{y.call(this),this.fire("update",{changed:(0,o.lZ)({},this._state),current:this._state})})),t.target){var s=(0,o.pI)(t.target);t.hydrate?this._fragment.l(s):this._fragment.c(),s.forEach(o.r2),this._mount(t.target,t.anchor),(0,o.yl)(this)}}(0,o.f0)(H.prototype,o.uS),(0,o.f0)(H.prototype,_),H.prototype._recompute=function(t,e){(t.$itemHeights||t.key)&&this._differs(e.shownBeforeRaf,e.shownBeforeRaf=function({$itemHeights:t,key:e}){return t[e]>0}(e))&&(t.shownBeforeRaf=!0)};const b=H;var I=s(9970);const $="function"==typeof queueMicrotask?queueMicrotask:function(t){Promise.resolve().then(t).catch((t=>setTimeout((()=>{throw t}))))};var T=s(5233),R=s(5277);const F=function(){const t=[];function e(){if(t.length){const e=t.sort(((t,e)=>t.priority<e.priority?-1:1));for(const t of e)t.resolve();t.length=0}}return function(s){return new Promise((o=>{t.push({priority:s,resolve:o}),$(e)}))}}();function C(){const{makeProps:t,key:e,index:s}=this.get(),{reduceMotion:o}=this.store.get();t&&F(s).then((async()=>{const s=await t(e),i=()=>{(0,l.B)("VirtualListLazyItem set props"),this.set({props:s}),(0,l.s)("VirtualListLazyItem set props")};!(0,T.t)()&&o?i():(0,I.F)(i)}))}function k(t,e){var s={component:e.component,offset:e.offset,props:e.props,key:e.key,index:e.index},o=new b({root:t.root,store:t.store,data:s});return{c(){o._fragment.c()},l(t){o._fragment.l(t)},m(t,e){o._mount(t,e)},p(t,e){var s={};t.component&&(s.component=e.component),t.offset&&(s.offset=e.offset),t.props&&(s.props=e.props),t.key&&(s.key=e.key),t.index&&(s.index=e.index),o._set(s)},d(t){o.destroy(t)}}}function B(t){var e,s,i,r;if((0,o.S1)(this,t),this.store=R.h,this._state=(0,o.f0)({props:void 0},t.data),this._intro=!0,this._fragment=(e=this,s=this._state,r=s.props&&k(e,s),{c(){r&&r.c(),i=(0,o.Yr)()},l(t){r&&r.l(t),i=(0,o.Yr)()},m(t,e){r&&r.m(t,e),(0,o.$T)(t,i,e)},p(t,s){s.props?r?r.p(t,s):((r=k(e,s)).c(),r.m(i.parentNode,i)):r&&(r.d(1),r=null)},d(t){r&&r.d(t),t&&(0,o.r2)(i)}}),this.root._oncreate.push((()=>{C.call(this),this.fire("update",{changed:(0,o.lZ)({},this._state),current:this._state})})),t.target){var n=(0,o.pI)(t.target);t.hydrate?this._fragment.l(n):this._fragment.c(),n.forEach(o.r2),this._mount(t.target,t.anchor),(0,o.yl)(this)}}(0,o.f0)(B.prototype,o.uS);const S=B;function V(){requestAnimationFrame((()=>{const t=this.refs.node;if(!t)return;(0,l.B)("VirtualListFooter gBCR");const e=t.getBoundingClientRect();(0,l.s)("VirtualListFooter gBCR"),this.store.setForRealm({footerHeight:e.height})}))}function z(t){var e;if((0,o.S1)(this,t),this.store=i.virtualListStore,this.refs={},this._state=(0,o.f0)(this.store._init(["heightWithoutFooter"]),t.data),this.store._add(this,["heightWithoutFooter"]),this._intro=!0,this._handlers.destroy=[o.iT],document.getElementById("svelte-164dzep-style")||((e=(0,o.az)("style")).id="svelte-164dzep-style",e.textContent=".virtual-list-footer.svelte-164dzep{position:absolute;top:0;width:100%}",(0,o.R3)(document.head,e)),this._fragment=function(t,e){var s,i=e.component;function r(e){return{root:t.root,store:t.store}}if(i)var n=new i(r());return{c(){s=(0,o.az)("div"),n&&n._fragment.c(),this.h()},l(t){s=(0,o.d$)(t,"DIV",{class:!0,style:!0},!1);var e=(0,o.pI)(s);n&&n._fragment.l(e),e.forEach(o.r2),this.h()},h(){s.className="virtual-list-footer svelte-164dzep",(0,o.A_)(s,"transform","translateY("+e.$heightWithoutFooter+"px)")},m(e,i){(0,o.$T)(e,s,i),n&&n._mount(s,null),t.refs.node=s},p(t,e){i!==(i=e.component)&&(n&&n.destroy(),i?((n=new i(r()))._fragment.c(),n._mount(s,null)):n=null),t.$heightWithoutFooter&&(0,o.A_)(s,"transform","translateY("+e.$heightWithoutFooter+"px)")},d(e){e&&(0,o.r2)(s),n&&n.destroy(),t.refs.node===s&&(t.refs.node=null)}}}(this,this._state),this.root._oncreate.push((()=>{V.call(this),this.fire("update",{changed:(0,o.lZ)({},this._state),current:this._state})})),t.target){var s=(0,o.pI)(t.target);t.hydrate?this._fragment.l(s):this._fragment.c(),s.forEach(o.r2),this._mount(t.target,t.anchor),(0,o.yl)(this)}}(0,o.f0)(z.prototype,o.uS);const L=z;var x={observe:h.N7,doCalculateHeight(){const{heightCalculated:t}=this.get();t||(this.set({heightCalculated:!0}),requestAnimationFrame((()=>{(0,l.B)("VirtualListHeader gBCR");const t=this.refs.node.getBoundingClientRect();(0,l.s)("VirtualListHeader gBCR"),this.store.setForRealm({headerHeight:t.height})})))}};function P(){this.observe("shown",(t=>{t?(this.doCalculateHeight(),(0,a.M)((()=>this.set({fadedIn:!0})))):this.set({fadedIn:!1})}),{init:!1})}function E(t){var e;if((0,o.S1)(this,t),this.store=i.virtualListStore,this.refs={},this._state=(0,o.f0)({fadedIn:!1},t.data),this._intro=!0,document.getElementById("svelte-1dcb4p4-style")||((e=(0,o.az)("style")).id="svelte-1dcb4p4-style",e.textContent=".virtual-list-header.svelte-1dcb4p4{position:absolute;top:0;width:100%;opacity:0;z-index:10;transition:none;display:none}.virtual-list-header.shown.svelte-1dcb4p4{display:block;transition:opacity 0.2s linear}.virtual-list-header.faded-in.svelte-1dcb4p4{opacity:1}",(0,o.R3)(document.head,e)),this._fragment=function(t,e){var s,i,r=e.component;function n(e){var s={virtualProps:e.virtualProps};return{root:t.root,store:t.store,data:s}}if(r)var l=new r(n(e));return{c(){s=(0,o.az)("div"),l&&l._fragment.c(),this.h()},l(t){s=(0,o.d$)(t,"DIV",{class:!0},!1);var e=(0,o.pI)(s);l&&l._fragment.l(e),e.forEach(o.r2),this.h()},h(){s.className=i="virtual-list-header "+(e.shown?"shown":"")+" "+(e.fadedIn?"faded-in":"")+" svelte-1dcb4p4"},m(e,i){(0,o.$T)(e,s,i),l&&l._mount(s,null),t.refs.node=s},p(t,e){var o={};t.virtualProps&&(o.virtualProps=e.virtualProps),r!==(r=e.component)?(l&&l.destroy(),r?((l=new r(n(e)))._fragment.c(),l._mount(s,null)):l=null):r&&l._set(o),(t.shown||t.fadedIn)&&i!==(i="virtual-list-header "+(e.shown?"shown":"")+" "+(e.fadedIn?"faded-in":"")+" svelte-1dcb4p4")&&(s.className=i)},d(e){e&&(0,o.r2)(s),l&&l.destroy(),t.refs.node===s&&(t.refs.node=null)}}}(this,this._state),this.root._oncreate.push((()=>{P.call(this),this.fire("update",{changed:(0,o.lZ)({},this._state),current:this._state})})),t.target){var s=(0,o.pI)(t.target);t.hydrate?this._fragment.l(s):this._fragment.c(),s.forEach(o.r2),this._mount(t.target,t.anchor),(0,o.yl)(this)}}(0,o.f0)(E.prototype,o.uS),(0,o.f0)(E.prototype,x);const N=E;var A=s(4285);var M={observe:h.N7,calculateListOffset(){const t=this.refs.node;if(!t)return;(0,l.B)("calculateListOffset");const{offsetParent:e}=t,s=e?e.offsetTop:0;this.store.setForRealm({listOffset:s}),(0,l.s)("calculateListOffset")}};function Y(){this.fireScrollToBottom=(0,r.P)((()=>{this.fire("scrollToBottom")}),1e3),this.fireScrollToTop=(0,r.P)((()=>{this.fire("scrollToTop")}),1e3),this.observe("showFooter",(t=>{(0,l.B)("set showFooter"),this.store.setForRealm({showFooter:t}),(0,l.B)("set showFooter")})),this.observe("showHeader",(t=>{(0,l.B)("set showHeader"),this.store.setForRealm({showHeader:t}),(0,l.s)("set showHeader")})),this.observe("items",((t,e)=>{t&&!(0,A.Xy)(t,e)&&((0,l.B)("set items"),this.store.setForRealm({items:t}),(0,l.s)("set items"))})),this.observe("allVisibleItemsHaveHeight",(t=>{this.calculateListOffset(),t&&this.fire("initializedVisibleItems")})),this.observe("distanceFromBottom",(t=>{t>=0&&t<=800&&this.fireScrollToBottom()}),{init:!1}),this.observe("scrollTop",(t=>{this.fire("scrollTopChanged",t),0===t&&this.fireScrollToTop(),this.calculateListOffset()}))}function Z(t,e,s){const o=Object.create(t);return o.visibleItem=e[s],o}function O(t,e){var s,i,r=[],n=(0,o.L7)(),l=e.$visibleItems;const a=t=>t.visibleItem.key;for(var h=0;h<l.length;h+=1){let s=Z(e,l,h),o=a(s);r[h]=n[o]=D(t,o,s)}var c=!e.$visibleItems.length&&K(t,e);return{c(){for(h=0;h<r.length;h+=1)r[h].c();s=(0,o.rw)("\n      "),c&&c.c(),i=(0,o.Yr)()},l(t){for(h=0;h<r.length;h+=1)r[h].l(t);s=(0,o.M4)(t,"\n      "),c&&c.l(t),i=(0,o.Yr)()},m(t,e){for(h=0;h<r.length;h+=1)r[h].m(t,e);(0,o.$T)(t,s,e),c&&c.m(t,e),(0,o.$T)(t,i,e)},p(e,l){const h=l.$visibleItems;r=(0,o.$q)(r,t,e,a,1,l,h,n,s.parentNode,o.pp,D,"m",s,Z),l.$visibleItems.length?c&&(c.d(1),c=null):c||((c=K(t,l)).c(),c.m(i.parentNode,i))},d(t){for(h=0;h<r.length;h+=1)r[h].d(t);t&&(0,o.r2)(s),c&&c.d(t),t&&(0,o.r2)(i)}}}function D(t,e,s){var i,r={component:s.component,offset:s.visibleItem.offset,makeProps:s.makeProps,key:s.visibleItem.key,index:s.visibleItem.index},n=new S({root:t.root,store:t.store,data:r});return{key:e,first:null,c(){i=(0,o.Yr)(),n._fragment.c(),this.h()},l(t){i=(0,o.Yr)(),n._fragment.l(t),this.h()},h(){this.first=i},m(t,e){(0,o.$T)(t,i,e),n._mount(t,e)},p(t,e){var s={};t.component&&(s.component=e.component),t.$visibleItems&&(s.offset=e.visibleItem.offset),t.makeProps&&(s.makeProps=e.makeProps),t.$visibleItems&&(s.key=e.visibleItem.key),t.$visibleItems&&(s.index=e.visibleItem.index),n._set(s)},d(t){t&&(0,o.r2)(i),n.destroy(t)}}}function K(t,e){var s,i;return{c(){s=(0,o.az)("div"),i=(0,o.rw)("Nothing to show."),this.h()},l(t){s=(0,o.d$)(t,"DIV",{class:!0},!1);var e=(0,o.pI)(s);i=(0,o.M4)(e,"Nothing to show."),e.forEach(o.r2),this.h()},h(){s.className="nothing-to-show svelte-1gy0wt7"},m(t,e){(0,o.$T)(t,s,e),(0,o.R3)(s,i)},d(t){t&&(0,o.r2)(s)}}}function q(t,e){var s={component:e.footerComponent},o=new L({root:t.root,store:t.store,data:s});return{c(){o._fragment.c()},l(t){o._fragment.l(t)},m(t,e){o._mount(t,e)},p(t,e){var s={};t.footerComponent&&(s.component=e.footerComponent),o._set(s)},d(t){o.destroy(t)}}}function W(t){var e,s,r,n,l,a,h,c,d,f,u,m;if((0,o.S1)(this,t),this.store=i.virtualListStore,this.refs={},this._state=(0,o.f0)((0,o.f0)(this.store._init(["scrollHeight","scrollTop","offsetHeight","allVisibleItemsHaveHeight","visibleItems","height","showHeader","showFooter"]),{component:null}),t.data),this.store._add(this,["scrollHeight","scrollTop","offsetHeight","allVisibleItemsHaveHeight","visibleItems","height","showHeader","showFooter"]),this._recompute({$scrollHeight:1,$scrollTop:1,$offsetHeight:1,$allVisibleItemsHaveHeight:1,$visibleItems:1},this._state),this._intro=!0,this._handlers.destroy=[o.iT],document.getElementById("svelte-1gy0wt7-style")||((e=(0,o.az)("style")).id="svelte-1gy0wt7-style",e.textContent=".virtual-list.svelte-1gy0wt7{position:relative;width:100%}.nothing-to-show.svelte-1gy0wt7{font-size:1.1em;width:100%;padding:20px 0;text-align:center}",(0,o.R3)(document.head,e)),this._fragment=(s=this,r=this._state,h={component:r.headerComponent,virtualProps:r.headerProps,shown:r.$showHeader},c=new N({root:s.root,store:s.store,data:h}),d=r.$visibleItems&&O(s,r),f=r.$showFooter&&q(s,r),u={realm:r.realm},(m=new g({root:s.root,store:s.store,slots:{default:(0,o.xJ)()},data:u})).on("initialized",(function(t){s.fire("initialized",t)})),m.on("noNeedToScroll",(function(t){s.fire("noNeedToScroll",t)})),{c(){n=(0,o.az)("div"),c._fragment.c(),l=(0,o.rw)("\n    "),d&&d.c(),a=(0,o.rw)("\n    "),f&&f.c(),m._fragment.c(),this.h()},l(t){n=(0,o.d$)(t,"DIV",{class:!0,style:!0},!1);var e=(0,o.pI)(n);c._fragment.l(e),l=(0,o.M4)(e,"\n    "),d&&d.l(e),a=(0,o.M4)(e,"\n    "),f&&f.l(e),e.forEach(o.r2),m._fragment.l(t),this.h()},h(){n.className="virtual-list svelte-1gy0wt7",(0,o.A_)(n,"height",r.$height+"px")},m(t,e){(0,o.R3)(m._slotted.default,n),c._mount(n,null),(0,o.R3)(n,l),d&&d.m(n,null),(0,o.R3)(n,a),f&&f.m(n,null),s.refs.node=n,m._mount(t,e)},p(t,e){var i={};t.headerComponent&&(i.component=e.headerComponent),t.headerProps&&(i.virtualProps=e.headerProps),t.$showHeader&&(i.shown=e.$showHeader),c._set(i),e.$visibleItems?d?d.p(t,e):((d=O(s,e)).c(),d.m(n,a)):d&&(d.d(1),d=null),e.$showFooter?f?f.p(t,e):((f=q(s,e)).c(),f.m(n,null)):f&&(f.d(1),f=null),t.$height&&(0,o.A_)(n,"height",e.$height+"px");var r={};t.realm&&(r.realm=e.realm),m._set(r)},d(t){c.destroy(),d&&d.d(),f&&f.d(),s.refs.node===n&&(s.refs.node=null),m.destroy(t)}}),this.root._oncreate.push((()=>{Y.call(this),this.fire("update",{changed:(0,o.lZ)({},this._state),current:this._state})})),t.target){var p=(0,o.pI)(t.target);t.hydrate?this._fragment.l(p):this._fragment.c(),p.forEach(o.r2),this._mount(t.target,t.anchor),(0,o.yl)(this)}}(0,o.f0)(W.prototype,o.uS),(0,o.f0)(W.prototype,M),W.prototype._recompute=function(t,e){(t.$scrollHeight||t.$scrollTop||t.$offsetHeight)&&this._differs(e.distanceFromBottom,e.distanceFromBottom=function({$scrollHeight:t,$scrollTop:e,$offsetHeight:s}){return t-e-s}(e))&&(t.distanceFromBottom=!0),t.$scrollTop&&this._differs(e.scrollTop,e.scrollTop=function({$scrollTop:t}){return t}(e))&&(t.scrollTop=!0),t.$allVisibleItemsHaveHeight&&this._differs(e.allVisibleItemsHaveHeight,e.allVisibleItemsHaveHeight=function({$allVisibleItemsHaveHeight:t}){return t}(e))&&(t.allVisibleItemsHaveHeight=!0),t.$visibleItems&&this._differs(e.visibleItemKeys,e.visibleItemKeys=function({$visibleItems:t}){return(t||[]).map((t=>t.key))}(e))&&(t.visibleItemKeys=!0)};const J=W},5233:(t,e,s)=>{s.d(e,{t:()=>o});const o=(0,s(8978).I)((()=>navigator.userAgent.match(/(?:iPhone|iPod|iPad|Android|KAIOS)/)))}}]);
//# sourceMappingURL=8619.ae2a851a8e299ea81c78.8619.js.map