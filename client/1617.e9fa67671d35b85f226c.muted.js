"use strict";(this.webpackChunksemaphore=this.webpackChunksemaphore||[]).push([[1617],{7575:(t,n,e)=>{e.r(n),e.d(n,{default:()=>g});var c=e(4178),o=e(2192),r=e(1728),a=e(8309),s=e(5277),i=e(9419),u=e(1932),h=e(6793);function m(t,n){var e={accountsFetcher:n.accountsFetcher,accountActions:n.accountActions},c=new a.Z({root:t.root,store:t.store,data:e});return{c(){c._fragment.c()},l(t){c._fragment.l(t)},m(t,n){c._mount(t,n)},p(t,n){var e={};t.accountsFetcher&&(e.accountsFetcher=n.accountsFetcher),t.accountActions&&(e.accountActions=n.accountActions),c._set(e)},d(t){c.destroy(t)}}}function l(t){var n,e,o,r,a,i;if((0,c.S1)(this,t),this.store=s.h,this._state=(0,c.f0)((0,c.f0)(this.store._init(["currentInstance","accessToken","isUserLoggedIn"]),{accountActions:[{icon:"#fa-volume-up",label:"Unmute",onclick:t=>(0,h.O)(t,!1,!1,!0)}]}),t.data),this.store._add(this,["currentInstance","accessToken","isUserLoggedIn"]),this._recompute({$currentInstance:1,$accessToken:1},this._state),this._intro=!0,this._handlers.destroy=[c.iT],this._fragment=(n=this,e=this._state,a=new u.Z({root:n.root,store:n.store,data:{title:"Muted users",icon:"#fa-volume-off"}}),i=e.$isUserLoggedIn&&m(n,e),{c(){a._fragment.c(),o=(0,c.rw)("\n"),i&&i.c(),r=(0,c.Yr)()},l(t){a._fragment.l(t),o=(0,c.M4)(t,"\n"),i&&i.l(t),r=(0,c.Yr)()},m(t,n){a._mount(t,n),(0,c.$T)(t,o,n),i&&i.m(t,n),(0,c.$T)(t,r,n)},p(t,e){e.$isUserLoggedIn?i?i.p(t,e):((i=m(n,e)).c(),i.m(r.parentNode,r)):i&&(i.d(1),i=null)},d(t){a.destroy(t),t&&(0,c.r2)(o),i&&i.d(t),t&&(0,c.r2)(r)}}),t.target){var l=(0,c.pI)(t.target);t.hydrate?this._fragment.l(l):this._fragment.c(),l.forEach(c.r2),this._mount(t.target,t.anchor),(0,c.yl)(this)}}(0,c.f0)(l.prototype,c.uS),l.prototype._recompute=function(t,n){(t.$currentInstance||t.$accessToken)&&this._differs(n.accountsFetcher,n.accountsFetcher=function({$currentInstance:t,$accessToken:n}){return()=>(0,i.g)(t,n)}(n))&&(t.accountsFetcher=!0)};const f=l;function p(t){var n,e,a,s,i,u;if((0,c.S1)(this,t),this._state=(0,c.f0)({pageComponent:f},t.data),this._intro=!0,this._fragment=(n=this,e=this._state,s=new o.Z({root:n.root,store:n.store,data:{name:"Muted users"}}),i={pageComponent:e.pageComponent,params:e.params},u=new r.Z({root:n.root,store:n.store,data:i}),{c(){s._fragment.c(),a=(0,c.rw)("\n\n  "),u._fragment.c()},l(t){s._fragment.l(t),a=(0,c.M4)(t,"\n\n  "),u._fragment.l(t)},m(t,n){s._mount(t,n),(0,c.$T)(t,a,n),u._mount(t,n)},p(t,n){var e={};t.pageComponent&&(e.pageComponent=n.pageComponent),t.params&&(e.params=n.params),u._set(e)},d(t){s.destroy(t),t&&(0,c.r2)(a),u.destroy(t)}}),t.target){var h=(0,c.pI)(t.target);t.hydrate?this._fragment.l(h):this._fragment.c(),h.forEach(c.r2),this._mount(t.target,t.anchor),(0,c.yl)(this)}}(0,c.f0)(p.prototype,c.uS);const g=p},9216:(t,n,e)=>{e.d(n,{he:()=>m,hJ:()=>h,Mb:()=>l,r6:()=>f});var c=e(2625),o=e(4886),r=e(385);var a=e(1162),s=e(5277);async function i(t,n,e){const o=a.F.getAccount(n,t),r=(0,c.D)(n,e,t).then((t=>(a.F.setAccount(n,t),t)));try{s.h.set({currentAccountProfile:await o})}catch(i){console.error(i)}try{s.h.set({currentAccountProfile:await r})}catch(i){console.error(i)}}async function u(t,n,e){const c=a.F.getRelationship(n,t),i=async function(t,n,e){const c=`${(0,o.E)(t)}/api/v1/accounts/relationships?${(0,r.pe)({id:e})}`;return(await(0,r.U2)(c,(0,o.I)(n),{timeout:r.EH}))[0]}(n,e,t).then((t=>(a.F.setRelationship(n,t),t)));try{s.h.set({currentAccountRelationship:await c})}catch(u){console.error(u)}try{s.h.set({currentAccountRelationship:await i})}catch(u){console.error(u)}}async function h(t,n,e){await a.F.setRelationship(t,e);try{s.h.set({currentAccountRelationship:e})}catch(c){console.error(c)}}async function m(){s.h.set({currentAccountProfile:null,currentAccountRelationship:null})}async function l(t){const{currentInstance:n,accessToken:e}=s.h.get();await Promise.all([i(t,n,e),u(t,n,e)])}async function f(t){const{currentInstance:n,accessToken:e}=s.h.get();await u(t,n,e)}},6793:(t,n,e)=>{e.d(n,{O:()=>h});var c=e(5277),o=e(4886),r=e(385);var a=e(7031),s=e(9216),i=e(4358),u=e(6633);async function h(t,n,e,h){const{currentInstance:m,accessToken:l}=c.h.get();try{let c;c=n?await async function(t,n,e,c){const a=`${(0,o.E)(t)}/api/v1/accounts/${e}/mute`;return(0,r.v_)(a,{notifications:c},(0,o.I)(n),{timeout:r.$Q})}(m,l,t,e):await async function(t,n,e){const c=`${(0,o.E)(t)}/api/v1/accounts/${e}/unmute`;return(0,r.v_)(c,null,(0,o.I)(n),{timeout:r.$Q})}(m,l,t),await(0,s.hJ)(m,t,c),h&&a.A.say(n?"Muted account":"Unmuted account"),(0,i.j)("refreshAccountsList")}catch(f){console.error(f),a.A.say(n?(0,u.A)(["Unable to mute account: ",["error"]],{error:f.message||""}):(0,u.A)(["Unable to unmute account: ",["error"]],{error:f.message||""}))}}},9419:(t,n,e)=>{e.d(n,{J:()=>r,g:()=>a});var c=e(385),o=e(4886);async function r(t,n,e=80){let r=`${(0,o.E)(t)}/api/v1/blocks`;return r+="?"+(0,c.pe)({limit:e}),(0,c.U2)(r,(0,o.I)(n),{timeout:c.EH})}async function a(t,n,e=80){let r=`${(0,o.E)(t)}/api/v1/mutes`;return r+="?"+(0,c.pe)({limit:e}),(0,c.U2)(r,(0,o.I)(n),{timeout:c.EH})}},2625:(t,n,e)=>{e.d(n,{D:()=>a,Q:()=>r});var c=e(385),o=e(4886);function r(t,n){const e=`${(0,o.E)(t)}/api/v1/accounts/verify_credentials`;return(0,c.U2)(e,(0,o.I)(n),{timeout:c.EH})}function a(t,n,e){const r=`${(0,o.E)(t)}/api/v1/accounts/${e}`;return(0,c.U2)(r,(0,o.I)(n),{timeout:c.EH})}},1162:(t,n,e)=>{e.d(n,{F:()=>c});const c=new Proxy({},{get:function(t,n){return async function(...c){if(!t[n]){const c=await Promise.all([e.e(4285),e.e(4970)]).then(e.bind(e,4970));t[n]=c[n]}return t[n].apply(null,c)}}})}}]);
//# sourceMappingURL=1617.e9fa67671d35b85f226c.muted.js.map