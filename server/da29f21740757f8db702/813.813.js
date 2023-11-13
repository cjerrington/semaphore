"use strict";
exports.id = 813;
exports.ids = [813];
exports.modules = {

/***/ 9813:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "virtualListStore": () => (/* binding */ virtualListStore)
});

// EXTERNAL MODULE: ./src/routes/_utils/marks.js
var marks = __webpack_require__(9217);
// EXTERNAL MODULE: ./src/routes/_thirdparty/quick-lru/quick-lru.js
var quick_lru = __webpack_require__(4956);
// EXTERNAL MODULE: ./src/routes/_utils/requestPostAnimationFrame.js
var requestPostAnimationFrame = __webpack_require__(1709);
// EXTERNAL MODULE: ./node_modules/svelte/store.js
var store = __webpack_require__(7453);
;// CONCATENATED MODULE: ./src/routes/_utils/RealmStore.js
// A store where you can divide data into "realms" that are backed with an LRU cache.
// Each realm has self-contained data that you can set with setForRealm() and compute
// with computeForRealm(). The maxSize determines how many realms to keep in the LRU cache.





const { Store } = store

class RealmStore extends Store {
  constructor (init, maxSize) {
    super(init)
    this.set({ realms: new quick_lru/* QuickLRU */.c({ maxSize }) })
    this._batches = {}
  }

  setCurrentRealm (realm) {
    this.set({ currentRealm: realm })
  }

  setForRealm (obj) {
    const { currentRealm, realms } = this.get()
    realms.set(currentRealm, Object.assign(realms.get(currentRealm) || {}, obj))
    this.set({ realms })
  }

  computeForRealm (key, defaultValue) {
    this.compute(key,
      ['realms', 'currentRealm'],
      (realms, currentRealm) => {
        const realmData = realms.get(currentRealm)
        return (realmData && realmData[key]) || defaultValue
      })
  }

  /*
   * Update several values at once in a realm, assuming the key points
   * to a plain old javascript object.
   */
  batchUpdateForRealm (key, subKey, value) {
    const { currentRealm } = this.get()
    let realmBatches = this._batches[currentRealm]
    if (!realmBatches) {
      realmBatches = this._batches[currentRealm] = {}
    }
    let batch = realmBatches[key]
    if (!batch) {
      batch = realmBatches[key] = {}
    }
    batch[subKey] = value

    ;(0,requestPostAnimationFrame/* requestPostAnimationFrame */.b)(() => {
      const batch = this._batches[currentRealm] && this._batches[currentRealm][key]
      if (!batch) {
        return
      }
      const updatedKeys = Object.keys(batch)
      if (!updatedKeys.length) {
        return
      }
      (0,marks/* mark */.B)('batchUpdate')
      const obj = this.get()[key]
      for (const otherKey of updatedKeys) {
        obj[otherKey] = batch[otherKey]
      }
      delete this._batches[currentRealm][key]
      const { realms } = this.get()
      realms.set(currentRealm, Object.assign(realms.get(currentRealm) || {}, { [key]: obj }))
      this.set({ realms })
      ;(0,marks/* stop */.s)('batchUpdate')
    })
  }
}

// EXTERNAL MODULE: ./src/routes/_thirdparty/lodash/objects.js
var objects = __webpack_require__(5277);
;// CONCATENATED MODULE: ./src/routes/_utils/reselect.js
// Avoid re-renders by caching the most recent value of an array
// or an object, using an approach similar to https://github.com/reactjs/reselect.
// This avoids the issue where Svelte may keep re-rendering because it doesn't
// know if an object/array has changed or not.



if (process.browser && "production" !== 'production') {}

function reselect (store, outputKey, inputKey) {
  let prevValue
  let nextValue
  let count = 0
  const countKey = `${outputKey}_reselectCount`

  store.compute(countKey, [inputKey], input => {
    if (process.browser && "production" !== 'production') {}
    if (!(0,objects/* isEqual */.Xy)(prevValue, input)) {
      nextValue = input
      count++
    }
    return count
  })

  store.compute(outputKey, [countKey], () => {
    if (process.browser && "production" !== 'production') {}
    prevValue = nextValue
    nextValue = null
    return prevValue
  })
}

;// CONCATENATED MODULE: ./src/routes/_components/virtualList/virtualListStore.js




const RENDER_BUFFER_FACTOR = 2.5

class VirtualListStore extends RealmStore {
  constructor (state) {
    super(state, /* maxSize */ 10)
  }

  // TODO: this is hacky
  clearRealmByPrefix (prefix) {
    const { realms } = this.get()
    if (!realms) {
      return
    }
    for (const key of realms.getAllKeys()) {
      if (key.startsWith(prefix)) {
        console.log('deleted realm', key)
        realms.delete(key)
      }
    }
    this.set({ realms })
  }
}

const virtualListStore = new VirtualListStore()

virtualListStore.computeForRealm('items', null)
virtualListStore.computeForRealm('showFooter', false)
virtualListStore.computeForRealm('footerHeight', 0)
virtualListStore.computeForRealm('showHeader', false)
virtualListStore.computeForRealm('headerHeight', 0)
virtualListStore.computeForRealm('scrollTop', 0)
virtualListStore.computeForRealm('scrollHeight', 0)
virtualListStore.computeForRealm('offsetHeight', 0)
virtualListStore.computeForRealm('listOffset', 0)
virtualListStore.computeForRealm('itemHeights', {})

virtualListStore.compute('rawVisibleItems',
  ['items', 'scrollTop', 'itemHeights', 'offsetHeight', 'showHeader', 'headerHeight', 'listOffset'],
  (items, scrollTop, itemHeights, offsetHeight, showHeader, headerHeight, listOffset) => {
    if (process.browser && "production" !== 'production') {}
    (0,marks/* mark */.B)('compute visibleItems')
    if (!items) {
      return null
    }
    const effectiveScrollTop = scrollTop - listOffset
    const renderBuffer = RENDER_BUFFER_FACTOR * offsetHeight
    const visibleItems = []
    let totalOffset = showHeader ? headerHeight : 0
    const len = items.length
    let i = -1
    while (++i < len) {
      const key = items[i]
      const height = itemHeights[key] || 0
      const currentOffset = totalOffset
      totalOffset += height
      const isAboveViewport = (currentOffset < effectiveScrollTop)
      if (isAboveViewport) {
        if ((effectiveScrollTop - height - renderBuffer) > currentOffset) {
          continue // above the area we want to render
        }
      } else {
        if (currentOffset > (effectiveScrollTop + offsetHeight + renderBuffer)) {
          break // below the area we want to render
        }
      }
      visibleItems.push({
        offset: currentOffset,
        key,
        index: i
      })
    }
    (0,marks/* stop */.s)('compute visibleItems')
    return visibleItems
  })

reselect(virtualListStore, 'visibleItems', 'rawVisibleItems')

virtualListStore.compute('heightWithoutFooter',
  ['items', 'itemHeights', 'showHeader', 'headerHeight'],
  (items, itemHeights, showHeader, headerHeight) => {
    if (!items) {
      return 0
    }
    let sum = showHeader ? headerHeight : 0
    let i = -1
    const len = items.length
    while (++i < len) {
      sum += itemHeights[items[i]] || 0
    }
    return sum
  })

virtualListStore.compute('height',
  ['heightWithoutFooter', 'showFooter', 'footerHeight'],
  (heightWithoutFooter, showFooter, footerHeight) => {
    return showFooter ? (heightWithoutFooter + footerHeight) : heightWithoutFooter
  })

virtualListStore.compute('length', ['items'], (items) => items ? items.length : 0)

virtualListStore.compute('allVisibleItemsHaveHeight',
  ['visibleItems', 'itemHeights'],
  (visibleItems, itemHeights) => {
    if (!visibleItems) {
      return false
    }
    for (const visibleItem of visibleItems) {
      if (!itemHeights[visibleItem.key]) {
        return false
      }
    }
    return true
  })

if (process.browser) {
  window.__virtualListStore = virtualListStore // for debugging

  if (false) {}
}




/***/ })

};
;