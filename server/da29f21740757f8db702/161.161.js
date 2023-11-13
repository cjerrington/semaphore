"use strict";
exports.id = 161;
exports.ids = [161];
exports.modules = {

/***/ 5161:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ showComposeDialog)
});

// EXTERNAL MODULE: ./node_modules/svelte/shared.js
var shared = __webpack_require__(1673);
// EXTERNAL MODULE: ./src/routes/_components/shortcut/Shortcut.html
var Shortcut = __webpack_require__(8237);
// EXTERNAL MODULE: ./src/routes/_components/SvgIcon.html
var SvgIcon = __webpack_require__(8275);
;// CONCATENATED MODULE: ./src/routes/_thirdparty/a11y-dialog/a11y-dialog.js
// Forked from a11y-dialog 4.0.1, adding a small change to element.focus() to work
// around a Chrome bug with sticky positioning (https://github.com/nolanlawson/pinafore/issues/671)
// Now it also works around shadow DOM and video/audio with controls.
// (video/audio with controls is not 100% fixable because we can't focus the elements inside, but
// you can at least tab to the video/audio and use other controls, like space bar and left/right)
// Original: https://unpkg.com/a11y-dialog@4.0.1/a11y-dialog.js

const FOCUSABLE_ELEMENTS_QUERY = 'a[href], area[href], input, select, textarea, ' +
  'button, iframe, object, embed, [contenteditable], [tabindex], ' +
  'video[controls], audio[controls], summary'
const TAB_KEY = 9
const ESCAPE_KEY = 27
const shadowRoots = []
let focusedBeforeDialog

/**
   * Define the constructor to instantiate a dialog
   *
   * @constructor
   * @param {Element} node
   * @param {(NodeList | Element | string)} targets
   */
function A11yDialog (node, targets) {
  // Prebind the functions that will be bound in addEventListener and
  // removeEventListener to avoid losing references
  this._show = this.show.bind(this)
  this._hide = this.hide.bind(this)
  this._maintainFocus = this._maintainFocus.bind(this)
  this._bindKeypress = this._bindKeypress.bind(this)

  // Keep a reference of the node on the instance
  this.node = node

  // Keep an object of listener types mapped to callback functions
  this._listeners = {}

  // Initialise everything needed for the dialog to work properly
  this.create(targets)
}

/**
   * Set up everything necessary for the dialog to be functioning
   *
   * @param {(NodeList | Element | string)} targets
   * @return {this}
   */
A11yDialog.prototype.create = function (targets) {
  // Keep a collection of nodes to disable/enable when toggling the dialog
  this._targets = this._targets || collect(targets) || getSiblings(this.node)

  // Make sure the dialog element is disabled on load, and that the `shown`
  // property is synced with its value
  this.node.setAttribute('aria-hidden', true)
  this.shown = false

  // Keep a collection of dialog openers, each of which will be bound a click
  // event listener to open the dialog
  this._openers = $$('[data-a11y-dialog-show="' + this.node.id + '"]')
  this._openers.forEach(function (opener) {
    opener.addEventListener('click', this._show)
  }.bind(this))

  // Keep a collection of dialog closers, each of which will be bound a click
  // event listener to close the dialog
  this._closers = $$('[data-a11y-dialog-hide]', this.node)
    .concat($$('[data-a11y-dialog-hide="' + this.node.id + '"]'))
  this._closers.forEach(function (closer) {
    closer.addEventListener('click', this._hide)
  }.bind(this))

  // Execute all callbacks registered for the `create` event
  this._fire('create')

  return this
}

/**
   * Show the dialog element, disable all the targets (siblings), trap the
   * current focus within it, listen for some specific key presses and fire all
   * registered callbacks for `show` event
   *
   * @param {Event} event
   * @return {this}
   */
A11yDialog.prototype.show = function (event) {
  // If the dialog is already open, abort
  if (this.shown) {
    return this
  }

  this.shown = true
  this.node.removeAttribute('aria-hidden')

  // Iterate over the targets to disable them by setting their `aria-hidden`
  // attribute to `true`; in case they already have this attribute, keep a
  // reference of their original value to be able to restore it later
  this._targets.forEach(function (target) {
    const original = target.getAttribute('aria-hidden')

    if (original) {
      target.setAttribute('data-a11y-dialog-original', original)
    }

    target.setAttribute('aria-hidden', 'true')
  })

  // Keep a reference to the currently focused element to be able to restore
  // it later, then set the focus to the first focusable child of the dialog
  // element
  focusedBeforeDialog = document.activeElement
  setInitialFocus(this.node)

  // Bind a focus event listener to the body element to make sure the focus
  // stays trapped inside the dialog while open, and start listening for some
  // specific key presses (TAB and ESC)
  document.body.addEventListener('focus', this._maintainFocus, true)
  document.addEventListener('keydown', this._bindKeypress)

  // Execute all callbacks registered for the `show` event
  this._fire('show', event)

  return this
}

/**
   * Hide the dialog element, enable all the targets (siblings), restore the
   * focus to the previously active element, stop listening for some specific
   * key presses and fire all registered callbacks for `hide` event
   *
   * @param {Event} event
   * @return {this}
   */
A11yDialog.prototype.hide = function (event) {
  // If the dialog is already closed, abort
  if (!this.shown) {
    return this
  }

  this.shown = false
  this.node.setAttribute('aria-hidden', 'true')

  // Iterate over the targets to enable them by remove their `aria-hidden`
  // attribute or resetting them to their initial value
  this._targets.forEach(function (target) {
    const original = target.getAttribute('data-a11y-dialog-original')

    if (original) {
      target.setAttribute('aria-hidden', original)
      target.removeAttribute('data-a11y-dialog-original')
    } else {
      target.removeAttribute('aria-hidden')
    }
  })

  // If their was a focused element before the dialog was opened, restore the
  // focus back to it
  if (focusedBeforeDialog) {
    // This double rAF is to work around a bug in Chrome when focusing sticky-positioned
    // elements. See https://github.com/nolanlawson/pinafore/issues/671
    requestAnimationFrame(() => requestAnimationFrame(() => focusedBeforeDialog.focus()))
  }

  // Remove the focus event listener to the body element and stop listening
  // for specific key presses
  document.body.removeEventListener('focus', this._maintainFocus, true)
  document.removeEventListener('keydown', this._bindKeypress)

  // Execute all callbacks registered for the `hide` event
  this._fire('hide', event)

  return this
}

/**
   * Destroy the current instance (after making sure the dialog has been hidden)
   * and remove all associated listeners from dialog openers and closers
   *
   * @return {this}
   */
A11yDialog.prototype.destroy = function () {
  // Hide the dialog to avoid destroying an open instance
  this.hide()

  // Remove the click event listener from all dialog openers
  this._openers.forEach(function (opener) {
    opener.removeEventListener('click', this._show)
  }.bind(this))

  // Remove the click event listener from all dialog closers
  this._closers.forEach(function (closer) {
    closer.removeEventListener('click', this._hide)
  }.bind(this))

  // Execute all callbacks registered for the `destroy` event
  this._fire('destroy')

  // Keep an object of listener types mapped to callback functions
  this._listeners = {}

  return this
}

/**
   * Register a new callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
A11yDialog.prototype.on = function (type, handler) {
  if (typeof this._listeners[type] === 'undefined') {
    this._listeners[type] = []
  }

  this._listeners[type].push(handler)

  return this
}

/**
   * Unregister an existing callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
A11yDialog.prototype.off = function (type, handler) {
  const index = this._listeners[type].indexOf(handler)

  if (index > -1) {
    this._listeners[type].splice(index, 1)
  }

  return this
}

/**
   * Iterate over all registered handlers for given type and call them all with
   * the dialog element as first argument, event as second argument (if any).
   *
   * @access private
   * @param {string} type
   * @param {Event} event
   */
A11yDialog.prototype._fire = function (type, event) {
  const listeners = this._listeners[type] || []

  listeners.forEach(function (listener) {
    listener(this.node, event)
  }.bind(this))
}

/**
   * Private event handler used when listening to some specific key presses
   * (namely ESCAPE and TAB)
   *
   * @access private
   * @param {Event} event
   */
A11yDialog.prototype._bindKeypress = function (event) {
  // If the dialog is shown and the ESCAPE key is being pressed, prevent any
  // further effects from the ESCAPE key and hide the dialog
  if (this.shown && event.which === ESCAPE_KEY) {
    event.preventDefault()
    this.hide()
  }

  // If the dialog is shown and the TAB key is being pressed, make sure the
  // focus stays trapped within the dialog element
  if (this.shown && event.which === TAB_KEY) {
    trapTabKey(this.node, event)
  }
}

/**
   * Private event handler used when making sure the focus stays within the
   * currently open dialog
   *
   * @access private
   * @param {Event} event
   */
A11yDialog.prototype._maintainFocus = function (event) {
  // If the dialog is shown and the focus is not within the dialog element,
  // move it back to its first focusable child
  if (this.shown && !this.node.contains(event.target)) {
    setInitialFocus(this.node)
  }
}

/**
   * Convert a NodeList into an array
   *
   * @param {NodeList} collection
   * @return {Array<Element>}
   */
function toArray (collection) {
  return Array.prototype.slice.call(collection)
}

/**
   * Query the DOM for nodes matching the given selector, scoped to context (or
   * the whole document)
   *
   * @param {String} selector
   * @param {Element} [context = document]
   * @return {Array<Element>}
   */
function $$ (selector, context) {
  return toArray((context || document).querySelectorAll(selector))
}

/**
   * Return an array of Element based on given argument (NodeList, Element or
   * string representing a selector)
   *
   * @param {(NodeList | Element | string)} target
   * @return {Array<Element>}
   */
function collect (target) {
  if (NodeList.prototype.isPrototypeOf(target)) { // eslint-disable-line no-prototype-builtins
    return toArray(target)
  }

  if (Element.prototype.isPrototypeOf(target)) { // eslint-disable-line no-prototype-builtins
    return [target]
  }

  if (typeof target === 'string') {
    return $$(target)
  }
}

/**
   * Set the focus to the first focusable child of the given element
   *
   * @param {Element} node
   */
function setInitialFocus (node) {
  const focusableChildren = getFocusableChildren(node)

  // If there's an element with an autofocus attribute, focus that.
  for (const child of focusableChildren) {
    if (child.getAttribute('autofocus')) {
      child.focus()
      return
    }
  }
  // Otherwise, focus the first focusable element.
  if (focusableChildren.length) {
    focusableChildren[0].focus()
  }
}

function isAncestor (node, ancestor) {
  let parent = node
  while (parent) {
    parent = parent.parentElement
    if (parent === ancestor) {
      return true
    }
  }
  return false
}

/**
   * Get the focusable children of the given element
   *
   * @param {Element} node
   * @return {Array<Element>}
   */
function getFocusableChildren (node) {
  const candidateFocusableChildren = $$(FOCUSABLE_ELEMENTS_QUERY, node)
  for (const shadowRoot of shadowRoots) {
    if (isAncestor(shadowRoot.getRootNode().host, node)) {
      // TODO: technically we should figure out the host's position in the DOM
      // and insert the children there, but this works for the emoji picker dialog well
      // enough, and that's our only shadow root, so it's fine for now.
      candidateFocusableChildren.push(...shadowRoot.querySelectorAll(FOCUSABLE_ELEMENTS_QUERY))
    }
  }
  return candidateFocusableChildren.filter(child => {
    return !child.disabled &&
    !/^-/.test(child.getAttribute('tabindex') || '') &&
    !child.hasAttribute('inert') && // see https://github.com/GoogleChrome/inert-polyfill
    (child.offsetWidth || child.offsetHeight || child.getClientRects().length)
  })
}

/**
   * Trap the focus inside the given element
   *
   * @param {Element} node
   * @param {Event} event
   */
function trapTabKey (node, event) {
  const focusableChildren = getFocusableChildren(node)
  let activeElement = document.activeElement
  for (const shadowRoot of shadowRoots) {
    if (shadowRoot.getRootNode().host === activeElement) {
      activeElement = shadowRoot.activeElement
      break
    }
  }
  const focusedItemIndex = focusableChildren.indexOf(activeElement)

  // If the SHIFT key is being pressed while tabbing (moving backwards) and
  // the currently focused item is the first one, move the focus to the last
  // focusable item from the dialog element
  if (event.shiftKey && focusedItemIndex === 0) {
    focusableChildren[focusableChildren.length - 1].focus()
    event.preventDefault()
    // If the SHIFT key is not being pressed (moving forwards) and the currently
    // focused item is the last one, move the focus to the first focusable item
    // from the dialog element
  } else if (!event.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
    focusableChildren[0].focus()
    event.preventDefault()
  }
}

/**
   * Retrieve siblings from given element
   *
   * @param {Element} node
   * @return {Array<Element>}
   */
function getSiblings (node) {
  const nodes = toArray(node.parentNode.childNodes)
  const siblings = nodes.filter(function (node) {
    return node.nodeType === 1
  })

  siblings.splice(siblings.indexOf(node), 1)

  return siblings
}

function registerShadowRoot (shadowRoot) {
  if (!shadowRoots.includes(shadowRoot)) {
    shadowRoots.push(shadowRoot)
  }
}

function unregisterShadowRoot (shadowRoot) {
  const index = shadowRoots.indexOf(shadowRoot)
  if (index !== -1) {
    shadowRoots.splice(index, 1)
  }
}



// EXTERNAL MODULE: ./src/routes/_utils/classname.js
var classname = __webpack_require__(7899);
// EXTERNAL MODULE: ./src/routes/_utils/eventBus.js
var eventBus = __webpack_require__(1650);
// EXTERNAL MODULE: ./src/routes/_utils/shortcuts.js
var shortcuts = __webpack_require__(3024);
;// CONCATENATED MODULE: ./src/routes/_components/dialog/components/ModalDialog.html










function backdropClass({ fadedIn, shouldAnimate }) {
  return (0,classname/* classname */.q)(
    'modal-dialog-backdrop',
    !fadedIn && 'hidden',
    shouldAnimate && 'should-animate'
  )
}

function contentsClass({ fadedIn, muted, shouldAnimate, shrinkWidthToFit, className }) {
  return (0,classname/* classname */.q)(
    'modal-dialog-contents',
    !fadedIn && 'hidden',
    muted && 'muted-style',
    shouldAnimate && 'should-animate',
    shrinkWidthToFit && 'shrink-width-to-fit',
    className
  )
}

function data() {
	return {
  // don't animate if we're showing a modal dialog on top of another modal dialog. it looks ugly
  shouldAnimate: !process.browser || document.getElementsByClassName('modal-dialog').length < 2,
  fadedIn: false,
  muted: false,
  className: undefined,
  title: undefined,
  shrinkWidthToFit: false,
  clickHeaderToClose: false
};
}

var ModalDialog = {};

ModalDialog.filename = "/home/homevm/semaphore/src/routes/_components/dialog/components/ModalDialog.html";

ModalDialog.data = function() {
	return data();
};

ModalDialog.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = ModalDialog._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return html;
		}
	};
}

ModalDialog._render = function(__result, ctx, options) {
	__result.addComponent(ModalDialog);

	ctx = Object.assign(data(), ctx);

	ctx.backdropClass = backdropClass(ctx);
	ctx.contentsClass = contentsClass(ctx);

	return `<div class="${(0,shared/* escape */.YU)(ctx.backdropClass)} svelte-7mij37" tabindex="-1" data-a11y-dialog-hide></div>
<div class="${(0,shared/* escape */.YU)(ctx.contentsClass)} svelte-7mij37" role="dialog"${(v => v == null ? "" : ` aria-label="${(0,shared/* escape */.YU)(ctx.label || '')}"`)(ctx.label || '')}>
  <div class="modal-dialog-document svelte-7mij37" role="document" style="background: ${(0,shared/* escape */.YU)(ctx.background || '#000')};">
    <div class="modal-dialog-header svelte-7mij37">
      ${ ctx.title ? `<h1 class="modal-dialog-title svelte-7mij37">${(0,shared/* escape */.YU)(ctx.title)}</h1>` : `` }
      <div class="close-dialog-button-wrapper svelte-7mij37">
        <button class="close-dialog-button focus-fix svelte-7mij37" data-a11y-dialog-hide aria-label="Close dialog">
          ${(0,shared/* validateSsrComponent */.xM)(SvgIcon/* default */.Z, 'SvgIcon')._render(__result, { className: "close-dialog-button-svg", href: "#fa-times" }, { store: options.store })}
        </button>
      </div>
    </div>
    ${options && options.slotted && options.slotted.default ? options.slotted.default() : ``}
  </div>
</div>
${(0,shared/* validateSsrComponent */.xM)(Shortcut/* default */.Z, 'Shortcut')._render(__result, { scope: `modal-${(0,shared/* escape */.YU)( ctx.id)}`, key: "Backspace" }, { store: options.store })}`;
};

ModalDialog.css = {
	code: ".modal-dialog[aria-hidden='true']{display:none}.modal-dialog{position:fixed;z-index:10000;top:0;right:0;bottom:0;left:0;display:flex;justify-content:center;align-items:center}.modal-dialog-backdrop.svelte-7mij37{position:fixed;z-index:10010;left:0;right:0;bottom:0;top:0;background:rgba(51, 51, 51, 0.9)}.modal-dialog-backdrop.should-animate.svelte-7mij37{transition:opacity 0.2s linear}.modal-dialog-contents.svelte-7mij37{z-index:10020;padding:0;border:1px solid var(--main-border);border-radius:2px;display:flex;flex-direction:row;max-height:calc(100% - 20px);max-width:calc(100% - 20px);flex:0 1 580px}.modal-dialog-contents.should-animate.svelte-7mij37{transition:opacity 0.2s linear}.modal-dialog-document.svelte-7mij37{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;max-width:100%;flex:1}.modal-dialog-header.svelte-7mij37{width:100%;background:var(--nav-bg);display:flex;align-items:center}.modal-dialog-title.svelte-7mij37{color:var(--nav-text-color);padding:2px 0 2px 10px;margin:0;font-size:1.5em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.close-dialog-button-wrapper.svelte-7mij37{flex:1;display:flex;justify-content:flex-end}.close-dialog-button.svelte-7mij37{padding:0;background:none;border:none;display:flex;justify-content:center;align-items:center}.close-dialog-button-svg{padding:10px;fill:var(--button-primary-text);width:24px;height:24px;flex:1}.muted-style.svelte-7mij37 .modal-dialog-header.svelte-7mij37{background:var(--muted-modal-bg)}.muted-style.svelte-7mij37 .close-dialog-button.svelte-7mij37:focus{outline:2px solid var(--muted-modal-focus)}.muted-style.svelte-7mij37 .close-dialog-button.svelte-7mij37:hover{background:var(--muted-modal-hover)}.muted-style.modal-dialog-contents.svelte-7mij37{border:none}body.modal-open{overflow-y:hidden}@media(min-width: 480px){.modal-dialog-contents.shrink-width-to-fit.svelte-7mij37{flex:none}}@media(max-width: 320px){.modal-dialog-title.svelte-7mij37{font-size:1.3em}.close-dialog-button-svg{padding:7px;width:18px;height:18px}}@media(max-width: 240px){.modal-dialog-contents.svelte-7mij37{min-width:calc(100% - 20px)}}",
	map: "{\"version\":3,\"file\":\"ModalDialog.html\",\"sources\":[\"ModalDialog.html\"],\"sourcesContent\":[\"<div class={backdropClass}\\n     tabindex=\\\"-1\\\"\\n     data-a11y-dialog-hide\\n></div>\\n<div class={contentsClass}\\n     role=\\\"dialog\\\"\\n     aria-label={label || ''}\\n     ref:node\\n>\\n  <div class=\\\"modal-dialog-document\\\" role=\\\"document\\\" style=\\\"background: {background || '#000'};\\\">\\n    <div class=\\\"modal-dialog-header\\\" on:click=\\\"onClickHeader(event)\\\">\\n      {#if title}\\n        <h1 class=\\\"modal-dialog-title\\\">{title}</h1>\\n      {/if}\\n      <div class=\\\"close-dialog-button-wrapper\\\">\\n        <button class=\\\"close-dialog-button focus-fix\\\"\\n                data-a11y-dialog-hide aria-label=\\\"Close dialog\\\">\\n          <SvgIcon className=\\\"close-dialog-button-svg\\\" href=\\\"#fa-times\\\" />\\n        </button>\\n      </div>\\n    </div>\\n    <slot></slot>\\n  </div>\\n</div>\\n<Shortcut scope=\\\"modal-{id}\\\" key=\\\"Backspace\\\" on:pressed=\\\"closeDialog(id)\\\"/>\\n<style>\\n  :global(.modal-dialog[aria-hidden='true']) {\\n    display: none;\\n  }\\n  :global(.modal-dialog) {\\n    position: fixed;\\n    z-index: 10000;\\n    top: 0;\\n    right: 0;\\n    bottom: 0;\\n    left: 0;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n\\n  .modal-dialog-backdrop {\\n    position: fixed;\\n    z-index: 10010;\\n    left: 0;\\n    right: 0;\\n    bottom: 0;\\n    top: 0;\\n    background: rgba(51, 51, 51, 0.9);\\n  }\\n  .modal-dialog-backdrop.should-animate {\\n    transition: opacity 0.2s linear;\\n  }\\n  .modal-dialog-contents {\\n    z-index: 10020;\\n    padding: 0;\\n    border: 1px solid var(--main-border);\\n    border-radius: 2px;\\n    display: flex;\\n    flex-direction: row;\\n    max-height: calc(100% - 20px);\\n    max-width: calc(100% - 20px);\\n    flex: 0 1 580px;\\n  }\\n  .modal-dialog-contents.should-animate {\\n    transition: opacity 0.2s linear;\\n  }\\n\\n  .modal-dialog-document {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    justify-content: center;\\n    width: 100%;\\n    max-width: 100%;\\n    flex: 1;\\n  }\\n  .modal-dialog-header {\\n    width: 100%;\\n    background: var(--nav-bg);\\n    display: flex;\\n    align-items: center;\\n  }\\n  .modal-dialog-title {\\n    color: var(--nav-text-color);\\n    padding: 2px 0 2px 10px;\\n    margin: 0;\\n    font-size: 1.5em;\\n    white-space: nowrap;\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n  }\\n  .close-dialog-button-wrapper {\\n    flex: 1;\\n    display: flex;\\n    justify-content: flex-end;\\n  }\\n  .close-dialog-button {\\n    padding: 0;\\n    background: none;\\n    border: none;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n  :global(.close-dialog-button-svg) {\\n    padding: 10px;\\n    fill: var(--button-primary-text);\\n    width: 24px;\\n    height: 24px;\\n    flex: 1;\\n  }\\n  .muted-style .modal-dialog-header {\\n    background: var(--muted-modal-bg);\\n  }\\n  .muted-style .close-dialog-button:focus {\\n    outline: 2px solid var(--muted-modal-focus);\\n  }\\n  .muted-style .close-dialog-button:hover {\\n    background: var(--muted-modal-hover);\\n  }\\n  .muted-style.modal-dialog-contents {\\n    border: none;\\n  }\\n  :global(body.modal-open) {\\n    overflow-y: hidden;\\n  }\\n\\n  @media(min-width: 480px) {\\n    /* On desktop, some dialogs look bad if they expand to fit all the way. So we shrink\\n       them to fit if shrinkWidthToFit is true.*/\\n    .modal-dialog-contents.shrink-width-to-fit {\\n      flex: none;\\n    }\\n  }\\n\\n  @media (max-width: 320px) {\\n    .modal-dialog-title {\\n      font-size: 1.3em;\\n    }\\n    :global(.close-dialog-button-svg) {\\n      padding: 7px;\\n      width: 18px;\\n      height: 18px;\\n    }\\n  }\\n\\n  @media (max-width: 240px) {\\n    .modal-dialog-contents {\\n      min-width: calc(100% - 20px);\\n    }\\n  }\\n</style>\\n<script>\\n  import Shortcut from '../../shortcut/Shortcut.html'\\n  import SvgIcon from '../../SvgIcon.html'\\n  import { A11yDialog } from '../../../_thirdparty/a11y-dialog/a11y-dialog.js'\\n  import { classname } from '../../../_utils/classname.js'\\n  import { on, emit } from '../../../_utils/eventBus.js'\\n  import {\\n    pushShortcutScope,\\n    popShortcutScope\\n  } from '../../../_utils/shortcuts.js'\\n\\n  export default {\\n    oncreate () {\\n      const { id } = this.get()\\n      this.onPopState = this.onPopState.bind(this)\\n      const dialogElement = this.refs.node.parentElement\\n      this._a11yDialog = new A11yDialog(dialogElement)\\n      this._a11yDialog.on('hide', () => {\\n        document.body.classList.toggle('modal-open', false)\\n        this.fire('close')\\n        this._a11yDialog.destroy()\\n        emit('destroyDialog', id)\\n        requestAnimationFrame(() => document.body.removeChild(dialogElement))\\n      })\\n      on('showDialog', this, this.showDialog)\\n      on('closeDialog', this, this.closeDialog)\\n      pushShortcutScope(`modal-${id}`)\\n    },\\n    ondestroy () {\\n      window.removeEventListener('popstate', this.onPopState)\\n      const { statePopped, statePushed, id } = this.get()\\n      if (statePushed && !statePopped) {\\n        // If we weren't closed due to popstate, then pop state to ensure the correct history.\\n        window.history.back()\\n      }\\n      popShortcutScope(`modal-${id}`)\\n    },\\n    components: { Shortcut, SvgIcon },\\n    data: () => ({\\n      // don't animate if we're showing a modal dialog on top of another modal dialog. it looks ugly\\n      shouldAnimate: !process.browser || document.getElementsByClassName('modal-dialog').length < 2,\\n      fadedIn: false,\\n      muted: false,\\n      className: undefined,\\n      title: undefined,\\n      shrinkWidthToFit: false,\\n      clickHeaderToClose: false\\n    }),\\n    computed: {\\n      backdropClass: ({ fadedIn, shouldAnimate }) => {\\n        return classname(\\n          'modal-dialog-backdrop',\\n          !fadedIn && 'hidden',\\n          shouldAnimate && 'should-animate'\\n        )\\n      },\\n      contentsClass: ({ fadedIn, muted, shouldAnimate, shrinkWidthToFit, className }) => {\\n        return classname(\\n          'modal-dialog-contents',\\n          !fadedIn && 'hidden',\\n          muted && 'muted-style',\\n          shouldAnimate && 'should-animate',\\n          shrinkWidthToFit && 'shrink-width-to-fit',\\n          className\\n        )\\n      }\\n    },\\n    methods: {\\n      showDialog (otherId) {\\n        const { id } = this.get()\\n        if (otherId !== id) {\\n          return\\n        }\\n        // This setTimeout is dumb, but it fixes issues with modals opening other modals\\n        // due to the popstate/pushstate dance.\\n        setTimeout(() => {\\n          requestAnimationFrame(() => {\\n            window.addEventListener('popstate', this.onPopState)\\n            this.set({ statePushed: true })\\n            window.history.pushState({ modal: id }, null, location.href)\\n            document.body.classList.toggle('modal-open', true)\\n            this._a11yDialog.show()\\n            this.set({ fadedIn: true })\\n            this.fire('show')\\n            emit('dialogDidRender', id)\\n          })\\n        })\\n      },\\n      onPopState (event) {\\n        const { id } = this.get()\\n        if (!(event.state && event.state.modal === id)) {\\n          // If the new state is not us, just assume that we need to be closed.\\n          // This will only fail if modals are ever nested more than 2 levels deep.\\n          this.set({ statePopped: true })\\n          this.closeDialog(id)\\n        }\\n      },\\n      closeDialog (otherId) {\\n        const { id } = this.get()\\n        if (id !== otherId) {\\n          return\\n        }\\n        this._a11yDialog.hide()\\n      },\\n      onClickHeader (e) {\\n        if (this.get().clickHeaderToClose) {\\n          e.preventDefault()\\n          e.stopPropagation()\\n          this._a11yDialog.hide()\\n        }\\n      }\\n    }\\n  }\\n</script>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

var warned = false;
/* harmony default export */ const components_ModalDialog = (ModalDialog);
// EXTERNAL MODULE: ./src/routes/_components/compose/ComposeBox.html + 31 modules
var ComposeBox = __webpack_require__(8030);
;// CONCATENATED MODULE: ./src/routes/_components/dialog/helpers/showDialog.js


function show () {
  const { id } = this.get()
  emit('showDialog', id)
}

;// CONCATENATED MODULE: ./src/routes/_components/dialog/helpers/onCreateDialog.js


function onDestroy (thisId) {
  const { id } = this.get()
  if (id !== thisId) {
    return
  }
  this.destroy()
}

function oncreate () {
  on('destroyDialog', this, onDestroy)
}

;// CONCATENATED MODULE: ./src/routes/_components/dialog/helpers/closeDialog.js


function closeDialog_close () {
  const { id } = this.get()
  emit('closeDialog', id)
}

;// CONCATENATED MODULE: ./src/routes/_components/dialog/components/ComposeDialog.html










function ComposeDialog_data() {
	return {
  title: undefined,
  realm: 'dialog'
};
}

var ComposeDialog = {};

ComposeDialog.filename = "/home/homevm/semaphore/src/routes/_components/dialog/components/ComposeDialog.html";

ComposeDialog.data = function() {
	return ComposeDialog_data();
};

ComposeDialog.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = ComposeDialog._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return html;
		}
	};
}

ComposeDialog._render = function(__result, ctx, options) {
	__result.addComponent(ComposeDialog);

	ctx = Object.assign(ComposeDialog_data(), ctx);

	return `${(0,shared/* validateSsrComponent */.xM)(components_ModalDialog, 'ModalDialog')._render(__result, { id: ctx.id, label: ctx.label, title: ctx.title, background: "var(--main-bg)" }, { store: options.store, slotted: { default: () => `
  ${(0,shared/* validateSsrComponent */.xM)(ComposeBox/* default */.Z, 'ComposeBox')._render(__result, { realm: ctx.realm, autoFocus: true, dialogId: ctx.id }, { store: options.store })}
` } })}`;
};

ComposeDialog.css = {
	code: '',
	map: null
};

var ComposeDialog_warned = false;
/* harmony default export */ const components_ComposeDialog = (ComposeDialog);
;// CONCATENATED MODULE: ./src/routes/_components/dialog/helpers/createDialogElement.js
function createDialogElement () {
  const div = document.createElement('div')
  div.setAttribute('class', 'modal-dialog')
  div.setAttribute('aria-hidden', 'true')
  document.body.appendChild(div)
  return div
}

;// CONCATENATED MODULE: ./src/routes/_components/dialog/helpers/createDialogId.js
let count = -1

function createDialogId () {
  return ++count
}

;// CONCATENATED MODULE: ./src/routes/_components/dialog/creators/showDialog.js



function showDialog (Dialog, data) {
  const dialog = new Dialog({
    target: createDialogElement(),
    data: Object.assign({
      id: createDialogId()
    }, data)
  })
  dialog.show()
  return dialog
}

;// CONCATENATED MODULE: ./src/routes/_components/dialog/creators/showComposeDialog.js



function showComposeDialog () {
  return showDialog(components_ComposeDialog, { label: "Compose toot" })
}


/***/ })

};
;