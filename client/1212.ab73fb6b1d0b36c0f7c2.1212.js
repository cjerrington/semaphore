"use strict";(this.webpackChunksemaphore=this.webpackChunksemaphore||[]).push([[1212],{1212:(t,e,i)=>{i.r(e),i.d(e,{default:()=>S});var n=i(4178),a=i(2270),o=i(1975),s=i(7539),r=i(5277),c=i(1172),u=i(3973),l=i(7773),d=i(658),f=i(173),m=i(6633);var h={openAuthorProfile(){const{accountId:t}=this.get();(0,u.E9)(`/accounts/${t}`)},async mentionAuthor(){const{account:t}=this.get();await(0,l.O)(t)}};function p(t,e){var i,a,s,r={notification:e.notification,notificationId:e.notificationId,status:e.status,statusId:e.statusId,timelineType:e.timelineType,account:e.account,accountId:e.accountId,uuid:e.uuid,isStatusInNotification:"true"},c=new o.Z({root:t.root,store:t.store,data:r}),u=e.enableShortcuts&&_(t,e);return{c(){i=(0,n.az)("article"),c._fragment.c(),a=(0,n.rw)("\n    "),u&&u.c(),this.h()},l(t){i=(0,n.d$)(t,"ARTICLE",{id:!0,class:!0,tabindex:!0,"aria-posinset":!0,"aria-setsize":!0,"aria-label":!0},!1);var e=(0,n.pI)(i);c._fragment.l(e),a=(0,n.M4)(e,"\n    "),u&&u.l(e),e.forEach(n.r2),this.h()},h(){i.id=e.elementId,i.className=e.className+" svelte-ndhsoo",i.tabIndex="0",(0,n.P$)(i,"aria-posinset",s=e.index+1),(0,n.P$)(i,"aria-setsize",e.length),(0,n.P$)(i,"aria-label",e.ariaLabel)},m(t,e){(0,n.$T)(t,i,e),c._mount(i,null),(0,n.R3)(i,a),u&&u.m(i,null)},p(e,a){var o={};e.notification&&(o.notification=a.notification),e.notificationId&&(o.notificationId=a.notificationId),e.status&&(o.status=a.status),e.statusId&&(o.statusId=a.statusId),e.timelineType&&(o.timelineType=a.timelineType),e.account&&(o.account=a.account),e.accountId&&(o.accountId=a.accountId),e.uuid&&(o.uuid=a.uuid),c._set(o),a.enableShortcuts?u?u.p(e,a):((u=_(t,a)).c(),u.m(i,null)):u&&(u.d(1),u=null),e.elementId&&(i.id=a.elementId),e.className&&(i.className=a.className+" svelte-ndhsoo"),e.index&&s!==(s=a.index+1)&&(0,n.P$)(i,"aria-posinset",s),e.length&&(0,n.P$)(i,"aria-setsize",a.length),e.ariaLabel&&(0,n.P$)(i,"aria-label",a.ariaLabel)},d(t){t&&(0,n.r2)(i),c.destroy(),u&&u.d()}}}function I(t,e){var i={index:e.index,length:e.length,timelineType:e.timelineType,timelineValue:e.timelineValue,focusSelector:e.focusSelector,status:e.status,notification:e.notification,enableShortcuts:e.enableShortcuts},n=new a.Z({root:t.root,store:t.store,data:i});return n.on("recalculateHeight",(function(e){t.fire("recalculateHeight",e)})),{c(){n._fragment.c()},l(t){n._fragment.l(t)},m(t,e){n._mount(t,e)},p(t,e){var i={};t.index&&(i.index=e.index),t.length&&(i.length=e.length),t.timelineType&&(i.timelineType=e.timelineType),t.timelineValue&&(i.timelineValue=e.timelineValue),t.focusSelector&&(i.focusSelector=e.focusSelector),t.status&&(i.status=e.status),t.notification&&(i.notification=e.notification),t.enableShortcuts&&(i.enableShortcuts=e.enableShortcuts),n._set(i)},d(t){n.destroy(t)}}}function _(t,e){var i,a={scope:e.shortcutScope,key:"p"},o=new s.Z({root:t.root,store:t.store,data:a});o.on("pressed",(function(e){t.openAuthorProfile()}));var r={scope:e.shortcutScope,key:"m"},c=new s.Z({root:t.root,store:t.store,data:r});return c.on("pressed",(function(e){t.mentionAuthor()})),{c(){o._fragment.c(),i=(0,n.rw)("\n      "),c._fragment.c()},l(t){o._fragment.l(t),i=(0,n.M4)(t,"\n      "),c._fragment.l(t)},m(t,e){o._mount(t,e),(0,n.$T)(t,i,e),c._mount(t,e)},p(t,e){var i={};t.shortcutScope&&(i.scope=e.shortcutScope),o._set(i);var n={};t.shortcutScope&&(n.scope=e.shortcutScope),c._set(n)},d(t){o.destroy(t),t&&(0,n.r2)(i),c.destroy(t)}}}function y(t){var e;if((0,n.S1)(this,t),this.store=r.h,this._state=(0,n.f0)((0,n.f0)(this.store._init(["currentInstance","omitEmojiInDisplayNames","underlineLinks"]),{enableShortcuts:null}),t.data),this.store._add(this,["currentInstance","omitEmojiInDisplayNames","underlineLinks"]),this._recompute({notification:1,account:1,status:1,$currentInstance:1,timelineType:1,timelineValue:1,notificationId:1,statusId:1,uuid:1,elementId:1,$omitEmojiInDisplayNames:1,notificationType:1,$underlineLinks:1},this._state),this._intro=!0,this._handlers.destroy=[n.iT],document.getElementById("svelte-ndhsoo-style")||((e=(0,n.az)("style")).id="svelte-ndhsoo-style",e.textContent=".notification-article.svelte-ndhsoo{padding:var(--status-pad-v) var(--status-pad-h);width:560px;max-width:calc(100vw - 40px);border-bottom:1px solid var(--main-border)}@media(max-width: 767px){.notification-article.svelte-ndhsoo{max-width:calc(100vw - 20px);width:580px}}",(0,n.R3)(document.head,e)),this._fragment=function(t,e){var i;function a(t){return t.status?I:p}var o=a(e),s=o(t,e);return{c(){s.c(),i=(0,n.Yr)()},l(t){s.l(t),i=(0,n.Yr)()},m(t,e){s.m(t,e),(0,n.$T)(t,i,e)},p(e,n){o===(o=a(n))&&s?s.p(e,n):(s.d(1),(s=o(t,n)).c(),s.m(i.parentNode,i))},d(t){s.d(t),t&&(0,n.r2)(i)}}}(this,this._state),t.target){var i=(0,n.pI)(t.target);t.hydrate?this._fragment.l(i):this._fragment.c(),i.forEach(n.r2),this._mount(t.target,t.anchor),(0,n.yl)(this)}}(0,n.f0)(y.prototype,n.uS),(0,n.f0)(y.prototype,h),y.prototype._recompute=function(t,e){t.notification&&this._differs(e.account,e.account=function({notification:t}){return t.account}(e))&&(t.account=!0),t.account&&this._differs(e.accountId,e.accountId=function({account:t}){return t.id}(e))&&(t.accountId=!0),t.notification&&(this._differs(e.notificationId,e.notificationId=function({notification:t}){return t.id}(e))&&(t.notificationId=!0),this._differs(e.notificationType,e.notificationType=function({notification:t}){return t.type}(e))&&(t.notificationType=!0),this._differs(e.status,e.status=function({notification:t}){return t.status}(e))&&(t.status=!0)),t.status&&this._differs(e.statusId,e.statusId=function({status:t}){return t&&t.id}(e))&&(t.statusId=!0),(t.$currentInstance||t.timelineType||t.timelineValue||t.notificationId||t.statusId)&&this._differs(e.uuid,e.uuid=function({$currentInstance:t,timelineType:e,timelineValue:i,notificationId:n,statusId:a}){return(0,f.L)(t,e,i,n,a)}(e))&&(t.uuid=!0),t.uuid&&this._differs(e.elementId,e.elementId=function({uuid:t}){return t}(e))&&(t.elementId=!0),t.elementId&&this._differs(e.shortcutScope,e.shortcutScope=function({elementId:t}){return t}(e))&&(t.shortcutScope=!0),(t.status||t.account||t.$omitEmojiInDisplayNames||t.notificationType)&&this._differs(e.ariaLabel,e.ariaLabel=function({status:t,account:e,$omitEmojiInDisplayNames:i,notificationType:n}){if(t)return;const a={name:(0,c.N)(e,i),account:`@${e.acct}`};return"admin.sign_up"===n?(0,m.A)([["name"]," signed up, ",["account"]],a):"follow_request"===n?(0,m.A)([["name"]," requested to follow you, ",["account"]],a):"admin.report"===n?(0,m.A)([["name"]," filed a report, ",["account"]],a):(0,m.A)([["name"]," followed you, ",["account"]],a)}(e))&&(t.ariaLabel=!0),t.$underlineLinks&&this._differs(e.className,e.className=function({$underlineLinks:t}){return(0,d.q)("notification-article","shortcut-list-item","focus-fix",t&&"underline-links")}(e))&&(t.className=!0)};const v=y;function g(t){var e,i,a,o;if((0,n.S1)(this,t),this._state=(0,n.f0)({},t.data),this._intro=!0,this._fragment=(e=this,i=this._state,a={notification:i.virtualProps.notification,timelineType:i.virtualProps.timelineType,timelineValue:i.virtualProps.timelineValue,focusSelector:i.virtualProps.focusSelector,enableShortcuts:!0,index:i.virtualIndex,length:i.virtualLength},(o=new v({root:e.root,store:e.store,data:a})).on("recalculateHeight",(function(t){e.fire("recalculateHeight",t)})),{c(){o._fragment.c()},l(t){o._fragment.l(t)},m(t,e){o._mount(t,e)},p(t,e){var i={};t.virtualProps&&(i.notification=e.virtualProps.notification),t.virtualProps&&(i.timelineType=e.virtualProps.timelineType),t.virtualProps&&(i.timelineValue=e.virtualProps.timelineValue),t.virtualProps&&(i.focusSelector=e.virtualProps.focusSelector),t.virtualIndex&&(i.index=e.virtualIndex),t.virtualLength&&(i.length=e.virtualLength),o._set(i)},d(t){o.destroy(t)}}),t.target){var s=(0,n.pI)(t.target);t.hydrate?this._fragment.l(s):this._fragment.c(),s.forEach(n.r2),this._mount(t.target,t.anchor),(0,n.yl)(this)}}(0,n.f0)(g.prototype,n.uS);const S=g}}]);
//# sourceMappingURL=1212.ab73fb6b1d0b36c0f7c2.1212.js.map