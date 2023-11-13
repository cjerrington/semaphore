"use strict";
exports.id = 32;
exports.ids = [32];
exports.modules = {

/***/ 2992:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ CLEANUP_DELAY),
/* harmony export */   "f": () => (/* binding */ CLEANUP_TIME_AGO)
/* harmony export */ });
const CLEANUP_TIME_AGO = 5 * 24 * 60 * 60 * 1000 // five days ago
const CLEANUP_DELAY = 5 * 60 * 1000 // five minutes


/***/ }),

/***/ 6032:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/routes/_utils/lodash-lite.js
var lodash_lite = __webpack_require__(2082);
;// CONCATENATED MODULE: ./src/routes/_utils/getIdFromItemSummaries.js
function getFirstIdFromItemSummaries (itemSummaries) {
  return itemSummaries &&
    itemSummaries[0] &&
    itemSummaries[0].id
}

function getLastIdFromItemSummaries (itemSummaries) {
  return itemSummaries &&
    itemSummaries[itemSummaries.length - 1] &&
    itemSummaries[itemSummaries.length - 1].id
}

// EXTERNAL MODULE: ./src/routes/_utils/marks.js
var marks = __webpack_require__(9217);
;// CONCATENATED MODULE: ./src/routes/_store/computations/timelineComputations.js




function computeForTimeline (store, key, defaultValue) {
  store.compute(key,
    ['currentInstance', 'currentTimeline', `timelineData_${key}`],
    (currentInstance, currentTimeline, root) => (
      (0,lodash_lite/* get */.U2)(root, [currentInstance, currentTimeline], defaultValue)
    )
  )
}

function timelineComputations (store) {
  (0,marks/* mark */.B)('timelineComputations')
  computeForTimeline(store, 'timelineItemSummaries', null)
  computeForTimeline(store, 'timelineItemSummariesToAdd', null)
  computeForTimeline(store, 'runningUpdate', false)
  computeForTimeline(store, 'lastFocusedElementId', null)
  computeForTimeline(store, 'ignoreBlurEvents', false)
  computeForTimeline(store, 'showHeader', false)
  computeForTimeline(store, 'shouldShowHeader', false)
  computeForTimeline(store, 'timelineItemSummariesAreStale', false)
  computeForTimeline(store, 'timelineNextPageId', null)

  store.compute('currentTimelineType', ['currentTimeline'], currentTimeline => (
    currentTimeline && currentTimeline.split('/')[0])
  )
  store.compute('currentTimelineValue', ['currentTimeline'], currentTimeline => {
    if (!currentTimeline) {
      return undefined
    }
    const split = currentTimeline.split('/')
    const len = split.length
    if (split[len - 1] === 'with_replies' || split[len - 1] === 'media') {
      return split[len - 2]
    }
    return split[len - 1]
  })
  store.compute('firstTimelineItemId', ['timelineItemSummaries'], (timelineItemSummaries) => (
    getFirstIdFromItemSummaries(timelineItemSummaries)
  ))
  store.compute('lastTimelineItemId', ['timelineItemSummaries'], (timelineItemSummaries) => (
    getLastIdFromItemSummaries(timelineItemSummaries)
  ))
  ;(0,marks/* stop */.s)('timelineComputations')
}

;// CONCATENATED MODULE: ./src/routes/_store/computations/autosuggestComputations.js



const MIN_PREFIX_LENGTH = 2
// Technically mastodon accounts allow dots, but it would be weird to do an autosuggest search if it ends with a dot.
// Also this is rare. https://github.com/tootsuite/mastodon/pull/6844
// However for emoji search we allow some extra things (e.g. :+1:, :white_heart:)
const VALID_CHARS = '[\\w\\+_\\-:]'
const PREFIXES = '(?:@|:|#)'
const REGEX = new RegExp(`(?:\\s|^)(${PREFIXES}${VALID_CHARS}{${MIN_PREFIX_LENGTH},})$`)

function computeForAutosuggest (store, key, defaultValue) {
  store.compute(key,
    ['currentInstance', 'currentComposeRealm', `autosuggestData_${key}`],
    (currentInstance, currentComposeRealm, root) => (
      (0,lodash_lite/* get */.U2)(root, [currentInstance, currentComposeRealm], defaultValue)
    )
  )
}

function autosuggestComputations (store) {
  (0,marks/* mark */.B)('autosuggestComputations')
  computeForAutosuggest(store, 'composeFocused', false)
  computeForAutosuggest(store, 'composeSelectionStart', 0)
  computeForAutosuggest(store, 'autosuggestSelected', 0)
  computeForAutosuggest(store, 'autosuggestSearchResults', [])
  computeForAutosuggest(store, 'autosuggestType', null)

  store.compute(
    'currentComposeText',
    ['currentComposeData', 'currentComposeRealm'],
    (currentComposeData, currentComposeRealm) => (
      (0,lodash_lite/* get */.U2)(currentComposeData, [currentComposeRealm, 'text'], '')
    )
  )

  store.compute(
    'autosuggestSearchText',
    ['currentComposeText', 'composeSelectionStart'],
    (currentComposeText, composeSelectionStart) => {
      const selectionStart = composeSelectionStart
      if (!currentComposeText || selectionStart < MIN_PREFIX_LENGTH) {
        return ''
      }

      const textUpToCursor = currentComposeText.substring(0, selectionStart)
      const match = textUpToCursor.match(REGEX)
      return (match && match[1]) || ''
    }
  )

  store.compute(
    'autosuggestNumSearchResults',
    ['autosuggestSearchResults'],
    (autosuggestSearchResults) => autosuggestSearchResults.length
  )

  store.compute(
    'autosuggestShown',
    ['composeFocused', 'autosuggestSearchText', 'autosuggestNumSearchResults'],
    (composeFocused, autosuggestSearchText, autosuggestNumSearchResults) => (
      !!(composeFocused && autosuggestSearchText && autosuggestNumSearchResults)
    )
  )
  ;(0,marks/* stop */.s)('autosuggestComputations')
}

// EXTERNAL MODULE: ./src/routes/_store/store.js + 27 modules
var store = __webpack_require__(3409);
;// CONCATENATED MODULE: ./src/routes/_utils/createRegexFromFilters.js
// copy-pasta'd from mastodon
// https://github.com/tootsuite/mastodon/blob/2ff01f7/app/javascript/mastodon/selectors/index.js#L40-L63
const escapeRegExp = string =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string

const createRegexFromFilters = filters => {
  return new RegExp(filters.map(filter => {
    let expr = escapeRegExp(filter.phrase)

    if (filter.whole_word) {
      if (/^[\w]/.test(expr)) {
        expr = `\\b${expr}`
      }

      if (/[\w]$/.test(expr)) {
        expr = `${expr}\\b`
      }
    }

    return expr
  }).join('|'), 'i')
}

;// CONCATENATED MODULE: ./src/routes/_static/wordFilters.js
const WORD_FILTER_CONTEXT_HOME = 'home'
const WORD_FILTER_CONTEXT_NOTIFICATIONS = 'notifications'
const WORD_FILTER_CONTEXT_PUBLIC = 'public'
const WORD_FILTER_CONTEXT_THREAD = 'thread'
const WORD_FILTER_CONTEXT_ACCOUNT = 'account'

const WORD_FILTER_CONTEXTS = [
  WORD_FILTER_CONTEXT_HOME,
  WORD_FILTER_CONTEXT_NOTIFICATIONS,
  WORD_FILTER_CONTEXT_PUBLIC,
  WORD_FILTER_CONTEXT_THREAD,
  WORD_FILTER_CONTEXT_ACCOUNT
]

// Someday we can maybe replace this with Intl.DurationFormat
// https://github.com/tc39/proposal-intl-duration-format
const WORD_FILTER_EXPIRY_OPTIONS = [
  {
    value: 0,
    label: "Never"
  },
  {
    value: 1800,
    label: "30 minutes"
  },
  {
    value: 3600,
    label: "1 hour"
  },
  {
    value: 21600,
    label: "6 hours"
  },
  {
    value: 43200,
    label: "12 hours"
  },
  {
    value: 86400,
    label: "1 day"
  },
  {
    value: 604800,
    label: "7 days"
  }
]

const WORD_FILTER_EXPIRY_DEFAULT = 0

;// CONCATENATED MODULE: ./src/routes/_store/computations/wordFilterComputations.js



function wordFilterComputations (store) {
  // unexpiredInstanceFilters is calculated based on `now` and `instanceFilters`,
  // but it's computed with observers rather than compute() to avoid excessive recalcs
  store.compute(
    'currentFilters',
    ['unexpiredInstanceFilters', 'currentInstance'],
    (unexpiredInstanceFilters, currentInstance) => unexpiredInstanceFilters[currentInstance] || []
  )

  store.compute('unexpiredInstanceFilterRegexes', ['unexpiredInstanceFilters'], unexpiredInstanceFilters => {
    return Object.fromEntries(Object.entries(unexpiredInstanceFilters).map(([instanceName, filters]) => {
      const contextsToRegex = Object.fromEntries(WORD_FILTER_CONTEXTS.map(context => {
        const filtersForThisContext = filters.filter(_ => _.context.includes(context))
        if (!filtersForThisContext.length) {
          return undefined // don't bother even adding it to the map
        }
        const regex = createRegexFromFilters(filtersForThisContext)
        return [context, regex]
      }).filter(Boolean))
      return [instanceName, contextsToRegex]
    }))
  })
}

;// CONCATENATED MODULE: ./src/routes/_store/computations/badgeComputations.js


function badgeComputations (store) {
  store.compute('numberOfNotifications',
    ['filteredTimelineNotificationItemSummaries', 'disableNotificationBadge'],
    (filteredTimelineNotificationItemSummaries, disableNotificationBadge) => (
      (!disableNotificationBadge && filteredTimelineNotificationItemSummaries)
        ? filteredTimelineNotificationItemSummaries.length
        : 0
    )
  )
  store.compute('hasNotifications',
    ['numberOfNotifications', 'currentPage'],
    (numberOfNotifications, currentPage) => (
      currentPage !== 'notifications' && !!numberOfNotifications
    )
  )

  store.compute('numberOfFollowRequests',
    ['followRequestCounts', 'currentInstance'],
    (followRequestCounts, currentInstance) => (0,lodash_lite/* get */.U2)(followRequestCounts, [currentInstance], 0)
  )

  store.compute('hasFollowRequests',
    ['numberOfFollowRequests'],
    (numberOfFollowRequests) => !!numberOfFollowRequests
  )

  store.compute('badgeNumber',
    ['numberOfFollowRequests', 'numberOfNotifications'],
    (numberOfFollowRequests, numberOfNotifications) => (numberOfFollowRequests + numberOfNotifications)
  )
}

// EXTERNAL MODULE: ./src/routes/_static/instanceSettings.js
var instanceSettings = __webpack_require__(6606);
;// CONCATENATED MODULE: ./src/routes/_utils/createFilterFunction.js
// create a function for filtering timeline item summaries

const createFilterFunction = (
  showReblogs, showReplies, showFollows, showFavs, showMentions, showPolls,
  showSubscriptions, wordFilterContext
) => {
  return item => {
    if (item.filterContexts && item.filterContexts.includes(wordFilterContext)) {
      return false
    }

    switch (item.type) {
      case 'poll':
        return showPolls
      case 'favourite':
        return showFavs
      case 'reblog':
        return showReblogs
      case 'mention':
        return showMentions
      case 'follow':
        return showFollows
      case 'status':
        return showSubscriptions
    }
    if (item.reblogId) {
      return showReblogs
    } else if (item.replyId) {
      return showReplies
    } else {
      return true
    }
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/computations/timelineFilterComputations.js





// Compute just the boolean, e.g. 'showPolls', so that we can use that boolean as
// the input to the timelineFilterFunction computations. This should reduce the need to
// re-compute the timelineFilterFunction over and over.
function computeTimelineFilter (store, computationName, timelinesToSettingsKeys) {
  store.compute(
    computationName,
    ['currentInstance', 'instanceSettings', 'currentTimeline'],
    (currentInstance, instanceSettings, currentTimeline) => {
      const settingsKey = timelinesToSettingsKeys[currentTimeline]
      return settingsKey ? (0,lodash_lite/* get */.U2)(instanceSettings, [currentInstance, settingsKey], true) : true
    }
  )
}

// Ditto for notifications, which we always have to keep track of due to the notification count.
function computeNotificationFilter (store, computationName, key) {
  store.compute(
    computationName,
    ['currentInstance', 'instanceSettings'],
    (currentInstance, instanceSettings) => {
      return (0,lodash_lite/* get */.U2)(instanceSettings, [currentInstance, key], true)
    }
  )
}

function timelineFilterComputations (store) {
  computeTimelineFilter(store, 'timelineShowReblogs', { home: instanceSettings/* HOME_REBLOGS */.Z3, notifications: instanceSettings/* NOTIFICATION_REBLOGS */.cT })
  computeTimelineFilter(store, 'timelineShowReplies', { home: instanceSettings/* HOME_REPLIES */.B$ })
  computeTimelineFilter(store, 'timelineShowFollows', { notifications: instanceSettings/* NOTIFICATION_FOLLOWS */.dS })
  computeTimelineFilter(store, 'timelineShowFavs', { notifications: instanceSettings/* NOTIFICATION_FAVORITES */.AL })
  computeTimelineFilter(store, 'timelineShowMentions', { notifications: instanceSettings/* NOTIFICATION_MENTIONS */.M9 })
  computeTimelineFilter(store, 'timelineShowPolls', { notifications: instanceSettings/* NOTIFICATION_POLLS */.rs })
  computeTimelineFilter(store, 'timelineShowSubscriptions', { notifications: instanceSettings/* NOTIFICATION_SUBSCRIPTIONS */.sr })

  computeNotificationFilter(store, 'timelineNotificationShowReblogs', instanceSettings/* NOTIFICATION_REBLOGS */.cT)
  computeNotificationFilter(store, 'timelineNotificationShowFollows', instanceSettings/* NOTIFICATION_FOLLOWS */.dS)
  computeNotificationFilter(store, 'timelineNotificationShowFavs', instanceSettings/* NOTIFICATION_FAVORITES */.AL)
  computeNotificationFilter(store, 'timelineNotificationShowMentions', instanceSettings/* NOTIFICATION_MENTIONS */.M9)
  computeNotificationFilter(store, 'timelineNotificationShowPolls', instanceSettings/* NOTIFICATION_POLLS */.rs)
  computeNotificationFilter(store, 'timelineNotificationShowSubscriptions', instanceSettings/* NOTIFICATION_SUBSCRIPTIONS */.sr)

  store.compute(
    'timelineWordFilterContext',
    ['currentTimeline'],
    (currentTimeline) => {
      if (!currentTimeline) {
        return
      }
      if (currentTimeline === 'home' || currentTimeline.startsWith('list/')) {
        return WORD_FILTER_CONTEXT_HOME
      }
      if (currentTimeline === 'notifications' || currentTimeline.startsWith('notifications/')) {
        return WORD_FILTER_CONTEXT_NOTIFICATIONS
      }
      if (currentTimeline === 'federated' || currentTimeline === 'local' || currentTimeline.startsWith('tag/')) {
        return WORD_FILTER_CONTEXT_PUBLIC
      }
      if (currentTimeline.startsWith('account/')) {
        return WORD_FILTER_CONTEXT_ACCOUNT
      }
      if (currentTimeline.startsWith('status/')) {
        return WORD_FILTER_CONTEXT_THREAD
      }
      // return undefined otherwise
    }
  )

  // This one is based on whatever the current timeline is
  store.compute(
    'timelineFilterFunction',
    [
      'timelineShowReblogs', 'timelineShowReplies', 'timelineShowFollows',
      'timelineShowFavs', 'timelineShowMentions', 'timelineShowPolls',
      'timelineShowSubscriptions', 'timelineWordFilterContext'
    ],
    (showReblogs, showReplies, showFollows, showFavs, showMentions, showPolls, showSubscriptions, wordFilterContext) => (
      createFilterFunction(showReblogs, showReplies, showFollows, showFavs, showMentions, showPolls, showSubscriptions, wordFilterContext)
    )
  )

  // The reason there is a completely separate flow just for notifications is that we need to
  // know which notifications are filtered at all times so that the little number badge is correct.
  store.compute(
    'timelineNotificationFilterFunction',
    [
      'timelineNotificationShowReblogs', 'timelineNotificationShowFollows',
      'timelineNotificationShowFavs', 'timelineNotificationShowMentions',
      'timelineNotificationShowPolls', 'timelineNotificationShowSubscriptions'
    ],
    (showReblogs, showFollows, showFavs, showMentions, showPolls, showSubscriptions) => (
      createFilterFunction(showReblogs, true, showFollows, showFavs, showMentions, showPolls, showSubscriptions, WORD_FILTER_CONTEXT_NOTIFICATIONS)
    )
  )

  store.compute(
    'filteredTimelineItemSummaries',
    ['timelineItemSummaries', 'timelineFilterFunction'],
    (timelineItemSummaries, timelineFilterFunction) => {
      return timelineItemSummaries && timelineItemSummaries.filter(timelineFilterFunction)
    }
  )

  store.compute(
    'filteredTimelineItemSummariesToAdd',
    ['timelineItemSummariesToAdd', 'timelineFilterFunction'],
    (timelineItemSummariesToAdd, timelineFilterFunction) => {
      return timelineItemSummariesToAdd && timelineItemSummariesToAdd.filter(timelineFilterFunction)
    }
  )

  store.compute('timelineNotificationItemSummaries',
    ['timelineData_timelineItemSummariesToAdd', 'timelineFilterFunction', 'currentInstance'],
    (root, timelineFilterFunction, currentInstance) => (
      (0,lodash_lite/* get */.U2)(root, [currentInstance, 'notifications'])
    )
  )

  store.compute(
    'filteredTimelineNotificationItemSummaries',
    ['timelineNotificationItemSummaries', 'timelineNotificationFilterFunction'],
    (timelineNotificationItemSummaries, timelineNotificationFilterFunction) => (
      timelineNotificationItemSummaries && timelineNotificationItemSummaries.filter(timelineNotificationFilterFunction)
    )
  )
}

;// CONCATENATED MODULE: ./src/routes/_store/computations/loggedInComputations.js
// like loggedInObservers.js, these can be lazy-loaded once the user is actually logged in








function loggedInComputations () {
  (0,marks/* mark */.B)('loggedInComputations')
  wordFilterComputations(store/* store */.h)
  timelineComputations(store/* store */.h)
  timelineFilterComputations(store/* store */.h)
  badgeComputations(store/* store */.h)
  autosuggestComputations(store/* store */.h)
  ;(0,marks/* stop */.s)('loggedInComputations')
}

// EXTERNAL MODULE: ./src/routes/_actions/instances.js + 3 modules
var instances = __webpack_require__(3352);
// EXTERNAL MODULE: ./src/routes/_actions/lists.js + 1 modules
var lists = __webpack_require__(2026);
;// CONCATENATED MODULE: ./src/routes/_thirdparty/websocket/backoff.js
const MAX_DELAY = 60000 // 60 seconds
const INITIAL_DELAY = 100

class Backoff {
  constructor (onReady) {
    this.attempts = 0
    this.onReady = onReady
  }

  backoff () {
    const delay = this.fibonacci(++this.attempts)
    console.log('websocket delay', delay)
    setTimeout(this.onReady, delay)
  }

  fibonacci (attempt) {
    let current = 1

    if (attempt > current) {
      let prev = 1
      current = 2

      for (let index = 2; index < attempt; index++) {
        const next = prev + current
        prev = current
        current = next
      }
    }

    return Math.min(MAX_DELAY, Math.floor(Math.random() * current * INITIAL_DELAY))
  }

  reset () {
    this.attempts = 0
  }
}

;// CONCATENATED MODULE: ./src/routes/_thirdparty/websocket/websocket.js
// forked from https://github.com/gamestdio/websocket/blob/4111bfa/src/index.js



class WebSocketClient {
  /**
   * @param url DOMString The URL to which to connect; this should be the URL to which the WebSocket server will respond.
   * @param protocols DOMString|DOMString[] Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified protocol). If you don't specify a protocol string, an empty string is assumed.
   * @param options options
   */
  constructor (url, protocols = [], options = {}) {
    this.url = url
    this.protocols = protocols

    this.reconnectEnabled = true
    this.listeners = {}

    this.backoff = new Backoff(this.onBackoffReady.bind(this))

    if (typeof (options.connect) === 'undefined' || options.connect) {
      this.open()
    }
  }

  open (reconnect = false) {
    this.isReconnect = reconnect

    // keep binaryType used on previous WebSocket connection
    const binaryType = this.ws && this.ws.binaryType

    this.ws = new WebSocket(this.url, this.protocols)
    this.ws.onclose = this.onCloseCallback.bind(this)
    this.ws.onerror = this.onErrorCallback.bind(this)
    this.ws.onmessage = this.onMessageCallback.bind(this)
    this.ws.onopen = this.onOpenCallback.bind(this)

    if (binaryType) {
      this.ws.binaryType = binaryType
    }
  }

  /**
   * @ignore
   */
  onBackoffReady () {
    this.open(true)
  }

  /**
   * @ignore
   */
  onCloseCallback (e) {
    if (!this.isReconnect && this.listeners.onclose) {
      this.listeners.onclose.apply(null, arguments)
    }
    if (this.reconnectEnabled && e.code < 3000) {
      this.backoff.backoff()
    }
  }

  /**
   * @ignore
   */
  onErrorCallback () {
    if (this.listeners.onerror) {
      this.listeners.onerror.apply(null, arguments)
    }
  }

  /**
   * @ignore
   */
  onMessageCallback () {
    if (this.listeners.onmessage) {
      this.listeners.onmessage.apply(null, arguments)
    }
  }

  /**
   * @ignore
   */
  onOpenCallback () {
    if (this.listeners.onopen) {
      this.listeners.onopen.apply(null, arguments)
    }

    if (this.isReconnect && this.listeners.onreconnect) {
      this.listeners.onreconnect.apply(null, arguments)
    }

    this.isReconnect = false
  }

  // Unused
  // /**
  //  * The number of bytes of data that have been queued using calls to send()
  //  * but not yet transmitted to the network. This value does not reset to zero
  //  * when the connection is closed; if you keep calling send(), this will
  //  * continue to climb.
  //  *
  //  * @type unsigned long
  //  * @readonly
  //  */
  // get bufferedAmount () { return this.ws.bufferedAmount }
  //
  /**
   * The current state of the connection; this is one of the Ready state constants.
   * @type unsigned short
   * @readonly
   */
  get readyState () { return this.ws.readyState }

  // Unused
  //
  // /**
  //  * A string indicating the type of binary data being transmitted by the
  //  * connection. This should be either "blob" if DOM Blob objects are being
  //  * used or "arraybuffer" if ArrayBuffer objects are being used.
  //  * @type DOMString
  //  */
  // get binaryType () { return this.ws.binaryType }
  //
  // set binaryType (binaryType) { this.ws.binaryType = binaryType }
  //
  // /**
  //  * The extensions selected by the server. This is currently only the empty
  //  * string or a list of extensions as negotiated by the connection.
  //  * @type DOMString
  //  */
  // get extensions () { return this.ws.extensions }
  //
  // set extensions (extensions) { this.ws.extensions = extensions }
  //
  // /**
  //  * A string indicating the name of the sub-protocol the server selected;
  //  * this will be one of the strings specified in the protocols parameter when
  //  * creating the WebSocket object.
  //  * @type DOMString
  //  */
  // get protocol () { return this.ws.protocol }
  //
  // set protocol (protocol) { this.ws.protocol = protocol }

  /**
   * Closes the WebSocket connection or connection attempt, if any. If the
   * connection is already CLOSED, this method does nothing.
   *
   * @param code A numeric value indicating the status code explaining why the connection is being closed. If this parameter is not specified, a default value of 1000 (indicating a normal "transaction complete" closure) is assumed. See the list of status codes on the CloseEvent page for permitted values.
   * @param reason A human-readable string explaining why the connection is closing. This string must be no longer than 123 bytes of UTF-8 text (not characters).
   *
   * @return void
   */
  close (code, reason) {
    if (typeof code === 'undefined') { code = 1000 }

    this.reconnectEnabled = false

    this.ws.close(code, reason)
  }

  /**
   * Transmits data to the server over the WebSocket connection.
   * @param data DOMString|ArrayBuffer|Blob
   * @return void
   */
  send (data) { this.ws.send(data) }

  /**
   * An event listener to be called when the WebSocket connection's readyState changes to CLOSED. The listener receives a CloseEvent named "close".
   * @param listener EventListener
   */
  set onclose (listener) { this.listeners.onclose = listener }

  get onclose () { return this.listeners.onclose }

  /**
   * An event listener to be called when an error occurs. This is a simple event named "error".
   * @param listener EventListener
   */
  set onerror (listener) { this.listeners.onerror = listener }

  get onerror () { return this.listeners.onerror }

  /**
   * An event listener to be called when a message is received from the server. The listener receives a MessageEvent named "message".
   * @param listener EventListener
   */
  set onmessage (listener) { this.listeners.onmessage = listener }

  get onmessage () { return this.listeners.onmessage }

  /**
   * An event listener to be called when the WebSocket connection's readyState changes to OPEN; this indicates that the connection is ready to send and receive data. The event is a simple one with the name "open".
   * @param listener EventListener
   */
  set onopen (listener) { this.listeners.onopen = listener }

  get onopen () { return this.listeners.onopen }

  /**
   * @param listener EventListener
   */
  set onreconnect (listener) { this.listeners.onreconnect = listener }

  get onreconnect () { return this.listeners.onreconnect }

  /**
   * Reset the backoff function back to initial state
   */
  reset () {
    console.log('websocket reset')
    this.backoff.reset()
  }

  /** Reconnect the websocket
   *
   */
  reconnect () {
    console.log('websocket reconnect')
    this.onBackoffReady()
  }
}

/**
 * The connection is not yet open.
 */
WebSocketClient.CONNECTING = WebSocket.CONNECTING

/**
 * The connection is open and ready to communicate.
 */
WebSocketClient.OPEN = WebSocket.OPEN

/**
 * The connection is in the process of closing.
 */
WebSocketClient.CLOSING = WebSocket.CLOSING

/**
 * The connection is closed or couldn't be opened.
 */
WebSocketClient.CLOSED = WebSocket.CLOSED

// EXTERNAL MODULE: ./src/routes/_utils/lifecycle.js + 1 modules
var lifecycle = __webpack_require__(6834);
// EXTERNAL MODULE: ./src/routes/_utils/ajax.js
var ajax = __webpack_require__(1260);
;// CONCATENATED MODULE: ./src/routes/_api/stream/getStreamUrl.js


function getStreamName (timeline) {
  switch (timeline) {
    case 'local':
      return 'public:local'
    case 'federated':
      return 'public'
    case 'home':
      return 'user'
    case 'notifications':
      return 'user:notification'
    case 'direct':
      return 'direct'
  }
  if (timeline.startsWith('tag/')) {
    return 'hashtag'
  }
  if (timeline.startsWith('list/')) {
    return 'list'
  }
}

function getStreamUrl (streamingApi, accessToken, timeline) {
  const url = `${streamingApi}/api/v1/streaming`
  const streamName = getStreamName(timeline)

  const params = {
    stream: streamName
  }

  if (timeline.startsWith('tag/')) {
    params.tag = timeline.split('/').slice(-1)[0]
  } else if (timeline.startsWith('list/')) {
    params.list = timeline.split('/').slice(-1)[0]
  }

  if (accessToken) {
    params.access_token = accessToken
  }

  return url + '?' + (0,ajax/* paramsString */.pe)(params)
}

// EXTERNAL MODULE: external "events-light"
var external_events_light_ = __webpack_require__(1015);
// EXTERNAL MODULE: ./src/routes/_utils/eventBus.js
var eventBus = __webpack_require__(1650);
// EXTERNAL MODULE: ./src/routes/_utils/safeParse.js
var safeParse = __webpack_require__(5861);
;// CONCATENATED MODULE: ./src/routes/_api/stream/TimelineStream.js







class TimelineStream extends external_events_light_.EventEmitter {
  constructor (streamingApi, accessToken, timeline) {
    super()
    this._streamingApi = streamingApi
    this._accessToken = accessToken
    this._timeline = timeline
    this._onStateChange = this._onStateChange.bind(this)
    this._onOnline = this._onOnline.bind(this)
    this._onOffline = this._onOffline.bind(this)
    this._onForcedOnlineStateChange = this._onForcedOnlineStateChange.bind(this)
    this._setupWebSocket()
    this._setupEvents()
  }

  close () {
    this._closed = true
    this._closeWebSocket()
    this._teardownEvents()
    // events-light currently does not support removeAllListeners()
    // https://github.com/patrick-steele-idem/events-light/issues/2
    for (const event of ['open', 'close', 'reconnect', 'message']) {
      this.removeAllListeners(event)
    }
  }

  _closeWebSocket () {
    if (this._ws) {
      this.emit('close')
      this._ws.onopen = null
      this._ws.onmessage = null
      this._ws.onclose = null
      this._ws.close()
      this._ws = null
    }
  }

  _setupWebSocket () {
    const url = getStreamUrl(this._streamingApi, this._accessToken, this._timeline)
    const ws = new WebSocketClient(url)

    ws.onopen = () => {
      if (!this._opened) {
        this.emit('open')
        this._opened = true
      } else {
        // we may close or reopen websockets due to freeze/unfreeze events
        // and we want to fire "reconnect" rather than "open" in that case
        this.emit('reconnect')
      }
    }
    ws.onmessage = (e) => this.emit('message', (0,safeParse/* safeParse */.A)(e.data))
    ws.onclose = () => this.emit('close')
    // The ws "onreconnect" event seems unreliable. When the server goes down and comes back up,
    // it doesn't fire (but "open" does). When we freeze and unfreeze, it fires along with the
    // "open" event. The above is my attempt to normalize it.

    this._ws = ws
  }

  _setupEvents () {
    lifecycle/* lifecycle.addEventListener */.S.addEventListener('statechange', this._onStateChange)
    eventBus/* eventBus.on */.Y.on('forcedOnline', this._onForcedOnlineStateChange) // only happens in tests
    window.addEventListener('online', this._onOnline)
    window.addEventListener('offline', this._onOffline)
  }

  _teardownEvents () {
    lifecycle/* lifecycle.removeEventListener */.S.removeEventListener('statechange', this._onStateChange)
    eventBus/* eventBus.removeListener */.Y.removeListener('forcedOnline', this._onForcedOnlineStateChange) // only happens in tests
    window.removeEventListener('online', this._onOnline)
    window.removeEventListener('offline', this._onOffline)
  }

  _pause () {
    if (this._closed) {
      return
    }
    this._closeWebSocket()
  }

  _unpause () {
    if (this._closed) {
      return
    }
    this._closeWebSocket()
    this._setupWebSocket()
  }

  _onStateChange (event) {
    // when the page enters or exits a frozen state, pause or resume websocket polling
    if (event.newState === 'frozen') { // page is frozen
      console.log('frozen')
      this._pause()
    } else if (event.oldState === 'frozen') { // page is unfrozen
      console.log('unfrozen')
      this._unpause()
    }
    if (event.newState === 'active') { // page is reopened from a background tab
      console.log('active')
      this._tryToReconnect()
    }
  }

  _onOnline () {
    console.log('online')
    this._unpause() // if we're not paused, then this is a no-op
    this._tryToReconnect() // to be safe, try to reset and reconnect
  }

  _onOffline () {
    console.log('offline')
    this._pause() // in testing, it seems to work better to stop polling when we get this event
  }

  _onForcedOnlineStateChange (online) {
    if (online) {
      console.log('online forced')
      this._unpause()
    } else {
      console.log('offline forced')
      this._pause()
    }
  }

  _tryToReconnect () {
    console.log('websocket readyState', this._ws && this._ws.readyState)
    if (this._ws && this._ws.readyState !== WebSocketClient.OPEN) {
      // if a websocket connection is not currently open, then reset the
      // backoff counter to ensure that fresh notifications come in faster
      this._ws.reset()
      this._ws.reconnect()
    }
  }
}

// EXTERNAL MODULE: ./src/routes/_database/database.js + 2 modules
var _database_database = __webpack_require__(705);
;// CONCATENATED MODULE: ./src/routes/_actions/statuses.js


async function getIdThatThisStatusReblogged (instanceName, statusId) {
  const status = await database.getStatus(instanceName, statusId)
  return status.reblog && status.reblog.id
}

async function getIdsThatTheseStatusesReblogged (instanceName, statusIds) {
  const reblogIds = await Promise.all(statusIds.map(async statusId => {
    return getIdThatThisStatusReblogged(instanceName, statusId)
  }))
  return reblogIds.filter(Boolean)
}

async function getIdsThatRebloggedThisStatus (instanceName, statusId) {
  return _database_database/* database.getReblogsForStatus */.F.getReblogsForStatus(instanceName, statusId)
}

async function getNotificationIdsForStatuses (instanceName, statusIds) {
  return _database_database/* database.getNotificationIdsForStatuses */.F.getNotificationIdsForStatuses(instanceName, statusIds)
}

// EXTERNAL MODULE: ./src/routes/_thirdparty/lodash/objects.js
var objects = __webpack_require__(5277);
// EXTERNAL MODULE: ./src/routes/_utils/scheduleIdleTask.js + 1 modules
var scheduleIdleTask = __webpack_require__(8846);
;// CONCATENATED MODULE: ./src/routes/_actions/deleteStatuses.js






function filterItemIdsFromTimelines (instanceName, timelineFilter, idFilter) {
  const keys = ['timelineItemSummaries', 'timelineItemSummariesToAdd']
  const summaryFilter = _ => idFilter(_.id)

  keys.forEach(key => {
    const timelineData = store/* store.getAllTimelineData */.h.getAllTimelineData(instanceName, key)
    Object.keys(timelineData).forEach(timelineName => {
      const summaries = timelineData[timelineName]
      if (!timelineFilter(timelineName)) {
        return
      }
      const filteredSummaries = summaries.filter(summaryFilter)
      if (!(0,objects/* isEqual */.Xy)(summaries, filteredSummaries)) {
        console.log('deleting an item from timelineName', timelineName, 'for key', key)
        store/* store.setForTimeline */.h.setForTimeline(instanceName, timelineName, {
          [key]: filteredSummaries
        })
      }
    })
  })
}

function deleteStatusIdsFromStore (instanceName, idsToDelete) {
  const idsToDeleteSet = new Set(idsToDelete)
  const idWasNotDeleted = id => !idsToDeleteSet.has(id)
  const notNotificationTimeline = timelineName => timelineName !== 'notifications'

  filterItemIdsFromTimelines(instanceName, notNotificationTimeline, idWasNotDeleted)
}

function deleteNotificationIdsFromStore (instanceName, idsToDelete) {
  const idsToDeleteSet = new Set(idsToDelete)
  const idWasNotDeleted = id => !idsToDeleteSet.has(id)
  const isNotificationTimeline = timelineName => timelineName === 'notifications'

  filterItemIdsFromTimelines(instanceName, isNotificationTimeline, idWasNotDeleted)
}

async function deleteStatusesAndNotifications (instanceName, statusIdsToDelete, notificationIdsToDelete) {
  deleteStatusIdsFromStore(instanceName, statusIdsToDelete)
  deleteNotificationIdsFromStore(instanceName, notificationIdsToDelete)
  await _database_database/* database.deleteStatusesAndNotifications */.F.deleteStatusesAndNotifications(instanceName, statusIdsToDelete, notificationIdsToDelete)
}

async function doDeleteStatus (instanceName, statusId) {
  console.log('deleting statusId', statusId)
  const rebloggedIds = await getIdsThatRebloggedThisStatus(instanceName, statusId)
  const statusIdsToDelete = Array.from(new Set([statusId].concat(rebloggedIds).filter(Boolean)))
  const notificationIdsToDelete = Array.from(new Set(await getNotificationIdsForStatuses(instanceName, statusIdsToDelete)))
  await deleteStatusesAndNotifications(instanceName, statusIdsToDelete, notificationIdsToDelete)
}

function deleteStatus (instanceName, statusId) {
  (0,scheduleIdleTask/* scheduleIdleTask */.F)(() => {
    /* no await */ doDeleteStatus(instanceName, statusId)
  })
}

// EXTERNAL MODULE: ./src/routes/_actions/addStatusOrNotification.js + 1 modules
var addStatusOrNotification = __webpack_require__(2534);
;// CONCATENATED MODULE: ./src/routes/_actions/updateStatus.js



async function doUpdateStatus (instanceName, newStatus) {
  console.log('updating status', newStatus)
  await _database_database/* database.updateStatus */.F.updateStatus(instanceName, newStatus)
}

function updateStatus (instanceName, newStatus) {
  (0,scheduleIdleTask/* scheduleIdleTask */.F)(() => {
    /* no await */ doUpdateStatus(instanceName, newStatus)
  })
}

;// CONCATENATED MODULE: ./src/routes/_actions/stream/processMessage.js






const KNOWN_EVENTS = ['update', 'delete', 'notification', 'conversation', 'filters_changed', 'status.update']

function processMessage (instanceName, timelineName, message) {
  let { event, payload } = (message || {})
  if (!KNOWN_EVENTS.includes(event)) {
    console.warn('ignoring message from server', message)
    return
  }
  (0,marks/* mark */.B)('processMessage')
  if (['update', 'notification', 'conversation', 'status.update'].includes(event)) {
    payload = JSON.parse(payload) // only these payloads are JSON-encoded for some reason
  }

  switch (event) {
    case 'delete':
      deleteStatus(instanceName, payload)
      break
    case 'update':
      ;(0,addStatusOrNotification/* addStatusOrNotification */.I)(instanceName, timelineName, payload)
      break
    case 'notification':
      ;(0,addStatusOrNotification/* addStatusOrNotification */.I)(instanceName, 'notifications', payload)
      if (payload.type === 'mention') {
        (0,addStatusOrNotification/* addStatusOrNotification */.I)(instanceName, 'notifications/mentions', payload)
      }
      break
    case 'conversation':
      // This is a hack in order to mostly fit the conversation model into
      // a timeline of statuses. To have a clean implementation we would need to
      // reproduce what is done for statuses for the conversation.
      //
      // It will add new DMs as new conversations instead of updating existing threads
      if (payload.last_status) {
        // If the last_status doesn't exist, just ignore it. There's not much we can do in that case
        (0,addStatusOrNotification/* addStatusOrNotification */.I)(instanceName, timelineName, payload.last_status)
      }
      break
    case 'filters_changed':
      ;(0,eventBus/* emit */.j)('wordFiltersChanged', instanceName)
      break
    case 'status.update':
      updateStatus(instanceName, payload)
      break
  }
  (0,marks/* stop */.s)('processMessage')
}

// EXTERNAL MODULE: ./src/routes/_api/utils.js
var utils = __webpack_require__(6817);
;// CONCATENATED MODULE: ./src/routes/_api/timelines.js



function getTimelineUrlPath (timeline) {
  switch (timeline) {
    case 'local':
    case 'federated':
      return 'timelines/public'
    case 'home':
      return 'timelines/home'
    case 'notifications':
    case 'notifications/mentions':
      return 'notifications'
    case 'favorites':
      return 'favourites'
    case 'direct':
      return 'conversations'
    case 'bookmarks':
      return 'bookmarks'
  }
  if (timeline.startsWith('tag/')) {
    return 'timelines/tag'
  } else if (timeline.startsWith('account/')) {
    return 'accounts'
  } else if (timeline.startsWith('list/')) {
    return 'timelines/list'
  }
  throw new Error(`Invalid timeline type: ${timeline}`)
}

async function getTimeline (instanceName, accessToken, timeline, maxId, since, limit) {
  const timelineUrlName = getTimelineUrlPath(timeline)
  let url = `${(0,utils/* basename */.E)(instanceName)}/api/v1/${timelineUrlName}`

  if (timeline.startsWith('tag/')) {
    url += '/' + timeline.split('/')[1]
  } else if (timeline.startsWith('account/')) {
    url += '/' + timeline.split('/')[1] + '/statuses'
  } else if (timeline.startsWith('list/')) {
    url += '/' + timeline.split('/')[1]
  }

  const params = {}
  if (since) {
    params.since_id = since
  }

  if (maxId) {
    params.max_id = maxId
  }

  if (limit) {
    params.limit = limit
  }

  if (timeline === 'local') {
    params.local = true
  }

  if (timeline.startsWith('account/')) {
    if (timeline.endsWith('media')) {
      params.only_media = true
    } else {
      params.exclude_replies = !timeline.endsWith('/with_replies')
    }
  }

  if (timeline === 'notifications/mentions') {
    params.exclude_types = ['follow', 'favourite', 'reblog', 'poll', 'admin.sign_up', 'update', 'follow_request', 'admin.report']
  }

  url += '?' + (0,ajax/* paramsString */.pe)(params)

  console.log('fetching url', url)
  let { json: items, headers } = await (0,ajax/* getWithHeaders */.SM)(url, (0,utils/* auth */.I)(accessToken), { timeout: ajax/* DEFAULT_TIMEOUT */.EH })

  if (timeline === 'direct') {
    items = items.map(item => item.last_status).filter(Boolean) // ignore falsy last_status'es
  }
  return { items, headers }
}

;// CONCATENATED MODULE: ./src/routes/_actions/stream/fillStreamingGap.js



const TIMELINE_GAP_BATCH_SIZE = 20 // Mastodon timeline API maximum limit
const MAX_NUM_REQUESTS = 15 // to avoid getting caught in an infinite loop somehow

// fill in the "streaming gap" – i.e. fetch the most recent items so that there isn't
// a big gap in the timeline if you haven't looked at it in awhile
async function fillStreamingGap (instanceName, accessToken, timelineName, firstTimelineItemId) {
  let maxId = null
  let numRequests = 0
  let newTimelineItems

  do {
    numRequests++
    newTimelineItems = (await getTimeline(instanceName, accessToken,
      timelineName, maxId, firstTimelineItemId, TIMELINE_GAP_BATCH_SIZE)).items
    if (newTimelineItems.length) {
      (0,addStatusOrNotification/* addStatusesOrNotifications */.b)(instanceName, timelineName, newTimelineItems)
      maxId = newTimelineItems[newTimelineItems.length - 1].id
    }
  } while (numRequests < MAX_NUM_REQUESTS && newTimelineItems.length === TIMELINE_GAP_BATCH_SIZE)
}

;// CONCATENATED MODULE: ./src/routes/_actions/stream/streaming.js





function createStream (api, instanceName, accessToken, timelineName, firstStatusId, firstNotificationId) {
  console.log(`streaming ${instanceName} ${timelineName}: createStream`, 'firstStatusId', firstStatusId,
    'firstNotificationId', firstNotificationId)

  const fillGap = (timelineName, timelineItemId) => {
    if (timelineItemId) {
      console.log(`streaming ${instanceName} ${timelineName}: fillGap since`, timelineItemId)
      /* no await */ fillStreamingGap(instanceName, accessToken, timelineName, timelineItemId)
    }
  }

  const onMessage = message => {
    processMessage(instanceName, timelineName, message)
  }

  const onOpen = () => {
    console.log(`streaming ${instanceName} ${timelineName}: opened`)
    fillGap(timelineName, firstStatusId)
    if (timelineName === 'home') {
      // special case - home timeline stream also handles notifications
      fillGap('notifications', firstNotificationId)
    }
  }

  const onClose = () => {
    console.log(`streaming ${instanceName} ${timelineName}: closed`)
  }

  const onReconnect = () => {
    console.log(`streaming ${instanceName} ${timelineName}: reconnected`)
    // When reconnecting, we recompute the firstStatusId and firstNotificationId because these may have
    // changed since we first started streaming.
    const newFirstStatusId = store/* store.getFirstTimelineItemId */.h.getFirstTimelineItemId(instanceName, timelineName)
    fillGap(timelineName, newFirstStatusId)
    if (timelineName === 'home') {
      // special case - home timeline stream also handles notifications
      const newFirstNotificationId = store/* store.getFirstTimelineItemId */.h.getFirstTimelineItemId(instanceName, 'notifications')
      fillGap('notifications', newFirstNotificationId)
    }
  }

  return new TimelineStream(api, accessToken, timelineName)
    .on('message', onMessage)
    .on('open', onOpen)
    .on('close', onClose)
    .on('reconnect', onReconnect)
}

// EXTERNAL MODULE: ./src/routes/_actions/pushSubscription.js + 2 modules
var pushSubscription = __webpack_require__(8849);
// EXTERNAL MODULE: ./src/routes/_actions/emoji.js + 1 modules
var emoji = __webpack_require__(6716);
// EXTERNAL MODULE: ./src/routes/_actions/followRequests.js
var followRequests = __webpack_require__(9586);
// EXTERNAL MODULE: ./src/routes/_actions/filters.js + 1 modules
var filters = __webpack_require__(8105);
;// CONCATENATED MODULE: ./src/routes/_store/observers/instanceObservers.js











// stream to watch for home timeline updates and notifications
let currentInstanceStream

async function refreshInstanceDataAndStream (store, instanceName) {
  ;(0,marks/* mark */.B)(`refreshInstanceDataAndStream-${instanceName}`)
  await doRefreshInstanceDataAndStream(store, instanceName)
  ;(0,marks/* stop */.s)(`refreshInstanceDataAndStream-${instanceName}`)
}

function currentInstanceChanged (store, instanceName) {
  return store.get().currentInstance !== instanceName
}

async function doRefreshInstanceDataAndStream (store, instanceName) {
  if (currentInstanceChanged(store, instanceName)) {
    return
  }

  await refreshInstanceData(instanceName)

  if (currentInstanceChanged(store, instanceName)) {
    return
  }

  const { currentInstanceInfo } = store.get()
  if (!currentInstanceInfo) {
    return
  }

  stream(store, instanceName, currentInstanceInfo)
}

async function refreshInstanceData (instanceName) {
  // these are all low-priority
  (0,scheduleIdleTask/* scheduleIdleTask */.F)(() => (0,emoji/* setupCustomEmojiForInstance */.ic)(instanceName))
  ;(0,scheduleIdleTask/* scheduleIdleTask */.F)(() => (0,lists/* setupListsForInstance */.L)(instanceName))
  ;(0,scheduleIdleTask/* scheduleIdleTask */.F)(() => (0,filters/* setupFiltersForInstance */.cd)(instanceName))
  ;(0,scheduleIdleTask/* scheduleIdleTask */.F)(() => (0,pushSubscription/* updatePushSubscriptionForInstance */.Z)(instanceName))

  // these are the only critical ones
  await Promise.all([
    (0,instances/* updateInstanceInfo */.Q)(instanceName),
    (0,instances/* updateVerifyCredentialsForInstance */.Ac)(instanceName).then(() => {
      // Once we have the verifyCredentials (so we know if the account is locked), lazily update the follow requests
      ;(0,scheduleIdleTask/* scheduleIdleTask */.F)(() => (0,followRequests/* updateFollowRequestCountIfLockedAccount */.Z)(instanceName))
    })
  ])
}

function stream (store, instanceName, currentInstanceInfo) {
  const { accessToken } = store.get()
  const streamingApi = currentInstanceInfo.urls.streaming_api
  const firstStatusId = store.getFirstTimelineItemId(instanceName, 'home')
  const firstNotificationId = store.getFirstTimelineItemId(instanceName, 'notifications')

  currentInstanceStream = createStream(streamingApi, instanceName, accessToken, 'home',
    firstStatusId, firstNotificationId)

  if (false) {}
}

function instanceObservers () {
  store/* store.observe */.h.observe('currentInstance', async (currentInstance) => {
    if (!process.browser) {
      return
    }
    if (currentInstanceStream) {
      currentInstanceStream.close()
      currentInstanceStream = null
      if (false) {}
    }
    if (!currentInstance) {
      return
    }

    (0,scheduleIdleTask/* scheduleIdleTask */.F)(() => refreshInstanceDataAndStream(store/* store */.h, currentInstance))
  })
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/timelineObservers.js




function timelineObservers () {
  // stream to watch for local/federated/etc. updates. home and notification
  // updates are handled in timelineObservers.js
  let currentTimelineStream

  function shutdownPreviousStream () {
    if (currentTimelineStream) {
      currentTimelineStream.close()
      currentTimelineStream = null
      if (false) {}
    }
  }

  function shouldObserveTimeline (timeline) {
    return timeline &&
      !(
        timeline !== 'local' &&
        timeline !== 'federated' &&
        timeline !== 'direct' &&
        !timeline.startsWith('list/') &&
        !timeline.startsWith('tag/')
      )
  }

  store/* store.observe */.h.observe('currentTimeline', async (currentTimeline) => {
    if (!process.browser) {
      return
    }

    shutdownPreviousStream()

    if (!shouldObserveTimeline(currentTimeline)) {
      return
    }

    const { currentInstance } = store/* store.get */.h.get()
    const { accessToken } = store/* store.get */.h.get()
    await (0,instances/* updateInstanceInfo */.Q)(currentInstance)

    const currentTimelineIsUnchanged = () => {
      const {
        currentInstance: newCurrentInstance,
        currentTimeline: newCurrentTimeline
      } = store/* store.get */.h.get()
      return newCurrentInstance === currentInstance &&
        newCurrentTimeline === currentTimeline
    }

    if (!currentTimelineIsUnchanged()) {
      return
    }

    const firstStatusId = store/* store.getFirstTimelineItemId */.h.getFirstTimelineItemId(currentInstance, currentTimeline)
    const { currentInstanceInfo } = store/* store.get */.h.get()
    const streamingApi = currentInstanceInfo.urls.streaming_api

    currentTimelineStream = createStream(streamingApi, currentInstance, accessToken,
      currentTimeline, firstStatusId)

    if (false) {}
  })
}

;// CONCATENATED MODULE: ./src/routes/_utils/setFavicon.js
// borrowed from https://github.com/HenrikJoreteg/favicon-setter
function setFavicon (href) {
  const faviconId = 'theFavicon'
  const oldLink = document.getElementById(faviconId)

  if (oldLink.getAttribute('href') === href) {
    return
  }

  const link = document.createElement('link')
  link.id = faviconId
  link.rel = 'shortcut icon'
  link.type = 'image/png'
  link.href = href
  document.head.removeChild(oldLink)
  document.head.appendChild(link)
}

// EXTERNAL MODULE: ./src/routes/_utils/thunk.js
var thunk = __webpack_require__(5744);
;// CONCATENATED MODULE: ./src/routes/_utils/userAgent/isMobile.js


const isMobile = (0,thunk/* thunk */.I)(() => process.browser && navigator.userAgent.match(/(?:iPhone|iPod|iPad|Android|KAIOS)/))

;// CONCATENATED MODULE: ./src/routes/_utils/runMediumPriorityTask.js




// Rough guess at whether this is a "mobile" device or not, for the purposes
// of "device class" estimations

// Run a task that doesn't need to be processed immediately, but should
// probably be delayed if we're on a mobile device. Also run it sooner
// if we're in a hidden tab, since browsers throttle or don't run setTimeout/rAF/etc.
function runMediumPriorityTask (fn) {
  if (store/* store.get */.h.get().pageVisibilityHidden) {
    fn()
  } else if (isMobile()) {
    (0,scheduleIdleTask/* scheduleIdleTask */.F)(fn)
  } else {
    requestAnimationFrame(fn)
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/notificationObservers.js




let currentFaviconHasNotifications = false

function notificationObservers () {
  store/* store.observe */.h.observe('hasNotifications', hasNotifications => {
    if (!process.browser) {
      return
    }
    runMediumPriorityTask(() => {
      if (currentFaviconHasNotifications === hasNotifications) {
        return
      }
      setFavicon(hasNotifications ? '/favicon-alert.png' : '/favicon.png')
      currentFaviconHasNotifications = !currentFaviconHasNotifications
    })
  })
}

// EXTERNAL MODULE: ./src/routes/_utils/emojiDatabase.js + 2 modules
var emojiDatabase = __webpack_require__(740);
;// CONCATENATED MODULE: ./src/routes/_static/autosuggest.js
const SEARCH_RESULTS_LIMIT = 4

// EXTERNAL MODULE: external "is-emoji-supported"
var external_is_emoji_supported_ = __webpack_require__(1021);
// EXTERNAL MODULE: ./src/routes/_thirdparty/quick-lru/quick-lru.js
var quick_lru = __webpack_require__(4956);
;// CONCATENATED MODULE: ./src/routes/_utils/testEmojiSupported.js




// avoid recomputing emoji support over and over again
// use our own LRU since the built-in one grows forever, which is a small memory leak, but still
(0,external_is_emoji_supported_.setCacheHandler)(new quick_lru/* QuickLRU */.c({ maxSize: 500 }))

const COUNTRY_FLAG_EMOJI = new Set(
  [
    '🇦🇨',
    '🇦🇩',
    '🇦🇪',
    '🇦🇫',
    '🇦🇬',
    '🇦🇮',
    '🇦🇱',
    '🇦🇲',
    '🇦🇴',
    '🇦🇶',
    '🇦🇷',
    '🇦🇸',
    '🇦🇹',
    '🇦🇺',
    '🇦🇼',
    '🇦🇽',
    '🇦🇿',
    '🇧🇦',
    '🇧🇧',
    '🇧🇩',
    '🇧🇪',
    '🇧🇫',
    '🇧🇬',
    '🇧🇭',
    '🇧🇮',
    '🇧🇯',
    '🇧🇱',
    '🇧🇲',
    '🇧🇳',
    '🇧🇴',
    '🇧🇶',
    '🇧🇷',
    '🇧🇸',
    '🇧🇹',
    '🇧🇻',
    '🇧🇼',
    '🇧🇾',
    '🇧🇿',
    '🇨🇦',
    '🇨🇨',
    '🇨🇩',
    '🇨🇫',
    '🇨🇬',
    '🇨🇭',
    '🇨🇮',
    '🇨🇰',
    '🇨🇱',
    '🇨🇲',
    '🇨🇳',
    '🇨🇴',
    '🇨🇵',
    '🇨🇷',
    '🇨🇺',
    '🇨🇻',
    '🇨🇼',
    '🇨🇽',
    '🇨🇾',
    '🇨🇿',
    '🇩🇪',
    '🇩🇬',
    '🇩🇯',
    '🇩🇰',
    '🇩🇲',
    '🇩🇴',
    '🇩🇿',
    '🇪🇦',
    '🇪🇨',
    '🇪🇪',
    '🇪🇬',
    '🇪🇭',
    '🇪🇷',
    '🇪🇸',
    '🇪🇹',
    '🇪🇺',
    '🇫🇮',
    '🇫🇯',
    '🇫🇰',
    '🇫🇲',
    '🇫🇴',
    '🇫🇷',
    '🇬🇦',
    '🇬🇧',
    '🇬🇩',
    '🇬🇪',
    '🇬🇫',
    '🇬🇬',
    '🇬🇭',
    '🇬🇮',
    '🇬🇱',
    '🇬🇲',
    '🇬🇳',
    '🇬🇵',
    '🇬🇶',
    '🇬🇷',
    '🇬🇸',
    '🇬🇹',
    '🇬🇺',
    '🇬🇼',
    '🇬🇾',
    '🇭🇰',
    '🇭🇲',
    '🇭🇳',
    '🇭🇷',
    '🇭🇹',
    '🇭🇺',
    '🇮🇨',
    '🇮🇩',
    '🇮🇪',
    '🇮🇱',
    '🇮🇲',
    '🇮🇳',
    '🇮🇴',
    '🇮🇶',
    '🇮🇷',
    '🇮🇸',
    '🇮🇹',
    '🇯🇪',
    '🇯🇲',
    '🇯🇴',
    '🇯🇵',
    '🇰🇪',
    '🇰🇬',
    '🇰🇭',
    '🇰🇮',
    '🇰🇲',
    '🇰🇳',
    '🇰🇵',
    '🇰🇷',
    '🇰🇼',
    '🇰🇾',
    '🇰🇿',
    '🇱🇦',
    '🇱🇧',
    '🇱🇨',
    '🇱🇮',
    '🇱🇰',
    '🇱🇷',
    '🇱🇸',
    '🇱🇹',
    '🇱🇺',
    '🇱🇻',
    '🇱🇾',
    '🇲🇦',
    '🇲🇨',
    '🇲🇩',
    '🇲🇪',
    '🇲🇫',
    '🇲🇬',
    '🇲🇭',
    '🇲🇰',
    '🇲🇱',
    '🇲🇲',
    '🇲🇳',
    '🇲🇴',
    '🇲🇵',
    '🇲🇶',
    '🇲🇷',
    '🇲🇸',
    '🇲🇹',
    '🇲🇺',
    '🇲🇻',
    '🇲🇼',
    '🇲🇽',
    '🇲🇾',
    '🇲🇿',
    '🇳🇦',
    '🇳🇨',
    '🇳🇪',
    '🇳🇫',
    '🇳🇬',
    '🇳🇮',
    '🇳🇱',
    '🇳🇴',
    '🇳🇵',
    '🇳🇷',
    '🇳🇺',
    '🇳🇿',
    '🇴🇲',
    '🇵🇦',
    '🇵🇪',
    '🇵🇫',
    '🇵🇬',
    '🇵🇭',
    '🇵🇰',
    '🇵🇱',
    '🇵🇲',
    '🇵🇳',
    '🇵🇷',
    '🇵🇸',
    '🇵🇹',
    '🇵🇼',
    '🇵🇾',
    '🇶🇦',
    '🇷🇪',
    '🇷🇴',
    '🇷🇸',
    '🇷🇺',
    '🇷🇼',
    '🇸🇦',
    '🇸🇧',
    '🇸🇨',
    '🇸🇩',
    '🇸🇪',
    '🇸🇬',
    '🇸🇭',
    '🇸🇮',
    '🇸🇯',
    '🇸🇰',
    '🇸🇱',
    '🇸🇲',
    '🇸🇳',
    '🇸🇴',
    '🇸🇷',
    '🇸🇸',
    '🇸🇹',
    '🇸🇻',
    '🇸🇽',
    '🇸🇾',
    '🇸🇿',
    '🇹🇦',
    '🇹🇨',
    '🇹🇩',
    '🇹🇫',
    '🇹🇬',
    '🇹🇭',
    '🇹🇯',
    '🇹🇰',
    '🇹🇱',
    '🇹🇲',
    '🇹🇳',
    '🇹🇴',
    '🇹🇷',
    '🇹🇹',
    '🇹🇻',
    '🇹🇼',
    '🇹🇿',
    '🇺🇦',
    '🇺🇬',
    '🇺🇲',
    '🇺🇳',
    '🇺🇸',
    '🇺🇾',
    '🇺🇿',
    '🇻🇦',
    '🇻🇨',
    '🇻🇪',
    '🇻🇬',
    '🇻🇮',
    '🇻🇳',
    '🇻🇺',
    '🇼🇫',
    '🇼🇸',
    '🇽🇰',
    '🇾🇪',
    '🇾🇹',
    '🇿🇦',
    '🇿🇲',
    '🇿🇼',
    '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    '🏴󠁧󠁢󠁷󠁬󠁳󠁿'
  ]
)

function testEmojiSupported (unicode) {
  if (store/* store.get */.h.get().polyfilledCountryFlagEmoji && COUNTRY_FLAG_EMOJI.has(unicode)) {
    return true // just assume it's supported; is-emoji-supported doesn't work in this case
  }
  return (0,external_is_emoji_supported_.isEmojiSupported)(unicode)
}

;// CONCATENATED MODULE: ./src/routes/_actions/autosuggestEmojiSearch.js







async function searchEmoji (searchText) {
  let emojis = await emojiDatabase/* findBySearchQuery */.jk(searchText)

  const results = []

  if (searchText.startsWith(':') && searchText.endsWith(':')) {
    // exact shortcode search
    const shortcode = searchText.substring(1, searchText.length - 1).toLowerCase()
    emojis = emojis.filter(_ => _.shortcodes.includes(shortcode))
  }

  (0,marks/* mark */.B)('testEmojiSupported')
  for (const emoji of emojis) {
    if (results.length === SEARCH_RESULTS_LIMIT) {
      break
    }
    if (emoji.url || testEmojiSupported(emoji.unicode)) { // emoji.url is a custom emoji
      results.push(emoji)
    }
  }
  (0,marks/* stop */.s)('testEmojiSupported')
  return results
}

function doEmojiSearch (searchText) {
  let canceled = false

  ;(0,scheduleIdleTask/* scheduleIdleTask */.F)(async () => {
    if (canceled) {
      return
    }
    const results = await searchEmoji(searchText)
    if (canceled) {
      return
    }
    store/* store.setForCurrentAutosuggest */.h.setForCurrentAutosuggest({
      autosuggestType: 'emoji',
      autosuggestSelected: 0,
      autosuggestSearchResults: results
    })
  })

  return {
    cancel: () => {
      canceled = true
    }
  }
}

;// CONCATENATED MODULE: ./src/routes/_api/search.js



function doSearch (version, instanceName, accessToken, query, resolve, limit, excludeUnreviewed, signal) {
  const url = `${(0,utils/* basename */.E)(instanceName)}/api/${version}/search?` + (0,ajax/* paramsString */.pe)({
    q: query,
    resolve,
    limit,
    exclude_unreviewed: !!excludeUnreviewed
  })
  return (0,ajax/* get */.U2)(url, (0,utils/* auth */.I)(accessToken), {
    timeout: ajax/* DEFAULT_TIMEOUT */.EH,
    signal
  })
}

async function doSearchV1 (instanceName, accessToken, query, resolve, limit, excludeUnreviewed, signal) {
  const resp = await doSearch('v1', instanceName, accessToken, query, resolve, limit, excludeUnreviewed, signal)
  resp.hashtags = resp.hashtags && resp.hashtags.map(tag => ({
    name: tag,
    url: `${(0,utils/* basename */.E)(instanceName)}/tags/${tag.toLowerCase()}`,
    history: []
  }))
  return resp
}

async function doSearchV2 (instanceName, accessToken, query, resolve, limit, excludeUnreviewed, signal) {
  return doSearch('v2', instanceName, accessToken, query, resolve, limit, excludeUnreviewed, signal)
}

async function search (instanceName, accessToken, query, resolve = true, limit = 5,
  excludeUnreviewed = false, signal = null) {
  try {
    return (await doSearchV2(instanceName, accessToken, query, resolve, limit, excludeUnreviewed, signal))
  } catch (err) {
    if (err && err.status === 404) { // fall back to old search API
      return doSearchV1(instanceName, accessToken, query, resolve, limit, excludeUnreviewed, signal)
    } else {
      throw err
    }
  }
}

// EXTERNAL MODULE: ./src/routes/_utils/arrays.js
var arrays = __webpack_require__(779);
;// CONCATENATED MODULE: ./src/routes/_utils/PromiseThrottler.js
// Utility for throttling in the Lodash style (assuming leading: true and trailing: true) but
// creates a promise.
class PromiseThrottler {
  constructor (timeout) {
    this._timeout = timeout
    this._promise = Promise.resolve()
  }

  next () {
    const res = this._promise
    // update afterwards, so we get a "leading" XHR
    this._promise = this._promise.then(() => new Promise(resolve => setTimeout(resolve, this._timeout)))
    return res
  }
}

;// CONCATENATED MODULE: ./src/routes/_utils/RequestThrottler.js
// Throttle network requests to be a good citizen and not issue an HTTP request on every keystroke


const promiseThrottler = new PromiseThrottler(200) // Mastodon FE also uses 200ms

class RequestThrottler {
  constructor (fetcher) {
    this._canceled = false
    this._controller = typeof AbortController === 'function' && new AbortController()
    this._fetcher = fetcher
  }

  async request () {
    if (this._canceled) {
      throw new Error('canceled')
    }
    await promiseThrottler.next()
    if (this._canceled) {
      throw new Error('canceled')
    }
    const signal = this._controller && this._controller.signal
    return this._fetcher(signal)
  }

  cancel () {
    this._canceled = true
    if (this._controller) {
      this._controller.abort()
      this._controller = null
    }
  }
}

;// CONCATENATED MODULE: ./src/routes/_actions/autosuggestAccountSearch.js









const DATABASE_SEARCH_RESULTS_LIMIT = 30

function byUsername (a, b) {
  const usernameA = a.acct.toLowerCase()
  const usernameB = b.acct.toLowerCase()

  return usernameA < usernameB ? -1 : usernameA === usernameB ? 0 : 1
}

function byAccountId (a) {
  return a.id
}

function doAccountSearch (searchText) {
  let canceled = false
  let localResults
  let remoteResults
  const { currentInstance, accessToken } = store/* store.get */.h.get()
  const requestThrottler = new RequestThrottler(doSearchAccountsRemotely)

  async function searchAccountsLocally () {
    localResults = await _database_database/* database.searchAccountsByUsername */.F.searchAccountsByUsername(
      currentInstance, searchText.substring(1), DATABASE_SEARCH_RESULTS_LIMIT)
  }

  async function searchAccountsRemotely () {
    remoteResults = await requestThrottler.request()
  }

  async function doSearchAccountsRemotely (signal) {
    return (await search(
      currentInstance, accessToken, searchText, false, SEARCH_RESULTS_LIMIT, false, signal
    )).accounts
  }

  function mergeAndTruncateResults () {
    // Always include local results; they are more likely to be relevant
    // because the user has seen their content before. Otherwise, sort by username.
    let results = (localResults || [])
      .slice()
      .sort(byUsername)
      .slice(0, SEARCH_RESULTS_LIMIT)

    if (results.length < SEARCH_RESULTS_LIMIT) {
      const topRemoteResults = (remoteResults || [])
        .sort(byUsername)
        .slice(0, SEARCH_RESULTS_LIMIT - results.length)
      results = (0,arrays/* concat */.z)(results, topRemoteResults)
      results = (0,objects/* uniqBy */.mN)(results, byAccountId)
    }

    return results
  }

  function onNewResults () {
    if (canceled) {
      return
    }
    const results = mergeAndTruncateResults()
    store/* store.setForCurrentAutosuggest */.h.setForCurrentAutosuggest({
      autosuggestType: 'account',
      autosuggestSelected: 0,
      autosuggestSearchResults: results
    })
  }

  function onError (err) {
    console.warn('ignored autosuggest error', err)
  }

  (0,scheduleIdleTask/* scheduleIdleTask */.F)(() => {
    if (canceled) {
      return
    }
    // run the two searches in parallel
    searchAccountsLocally().then(onNewResults).catch(onError)
    searchAccountsRemotely().then(onNewResults).catch(onError)
  })

  return {
    cancel: () => {
      canceled = true
      requestThrottler.cancel()
    }
  }
}

;// CONCATENATED MODULE: ./src/routes/_actions/autosuggestHashtagSearch.js







const HASHTAG_SEARCH_LIMIT = 10

function getUses (historyItem) {
  return historyItem.uses
}

// Show the most common hashtags first, then sort by name
function byUsesThenName (a, b) {
  if (a.history && b.history && a.history.length && b.history.length) {
    const aCount = (0,lodash_lite/* sum */.Sm)(a.history.map(getUses))
    const bCount = (0,lodash_lite/* sum */.Sm)(b.history.map(getUses))
    return aCount > bCount ? -1 : aCount < bCount ? 1 : 0
  }
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
}

function doHashtagSearch (searchText) {
  const { currentInstance, accessToken } = store/* store.get */.h.get()
  const requestThrottler = new RequestThrottler(searchHashtags)

  async function searchHashtags (signal) {
    const results = await search(
      currentInstance, accessToken, searchText, false, HASHTAG_SEARCH_LIMIT, true, signal
    )
    return results.hashtags.sort(byUsesThenName).slice(0, SEARCH_RESULTS_LIMIT)
  }

  (0,scheduleIdleTask/* scheduleIdleTask */.F)(async () => {
    try {
      const results = await requestThrottler.request()
      store/* store.setForCurrentAutosuggest */.h.setForCurrentAutosuggest({
        autosuggestType: 'hashtag',
        autosuggestSelected: 0,
        autosuggestSearchResults: results
      })
    } catch (err) {
      console.warn('ignored autosuggest error', err)
    }
  })

  return {
    cancel: () => {
      requestThrottler.cancel()
    }
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/autosuggestObservers.js





function resetAutosuggest () {
  store/* store.setForCurrentAutosuggest */.h.setForCurrentAutosuggest({
    autosuggestSelected: 0,
    autosuggestSearchResults: []
  })
}

function autosuggestObservers () {
  let lastSearch

  store/* store.observe */.h.observe('autosuggestSearchText', async autosuggestSearchText => {
    // cancel any inflight XHRs or other operations
    if (lastSearch) {
      lastSearch.cancel()
      lastSearch = null
    }
    // autosuggestSelecting indicates that the user has pressed Enter or clicked on an item
    // and the results are being processed. Returning early avoids a flash of searched content.
    const { composeFocused } = store/* store.get */.h.get()
    const autosuggestSelecting = store/* store.getForCurrentAutosuggest */.h.getForCurrentAutosuggest('autosuggestSelecting')
    if (!composeFocused || !autosuggestSearchText || autosuggestSelecting) {
      resetAutosuggest()
      return
    }

    if (autosuggestSearchText.startsWith(':')) { // emoji
      lastSearch = doEmojiSearch(autosuggestSearchText)
    } else if (autosuggestSearchText.startsWith('#')) { // hashtag
      lastSearch = doHashtagSearch(autosuggestSearchText)
    } else { // account
      lastSearch = doAccountSearch(autosuggestSearchText)
    }
  })
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/notificationPermissionObservers.js


function notificationPermissionObservers () {
  if (!process.browser || !navigator.permissions || !navigator.permissions.query) {
    return
  }

  navigator.permissions.query({ name: 'notifications' }).then(permission => {
    store/* store.set */.h.set({ notificationPermission: permission.state })

    permission.onchange = event => {
      store/* store.set */.h.set({ notificationPermission: event.target.state })
    }
  })
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/customScrollbarObservers.js


const theScrollbarStyle = process.browser && document.getElementById('theScrollbarStyle')

function customScrollbarObservers () {
  store/* store.observe */.h.observe('disableCustomScrollbars', disableCustomScrollbars => {
    if (!process.browser) {
      return
    }

    // disables or enables the style
    theScrollbarStyle.setAttribute('media', disableCustomScrollbars ? 'only x' : 'all')
  }, { init: false }) // init:false because the inline script takes care of it
}

;// CONCATENATED MODULE: ./src/routes/_utils/convertCustomEmojiToEmojiPickerFormat.js
function convertCustomEmojiToEmojiPickerFormat (customEmoji, autoplayGifs) {
  if (!customEmoji) {
    return []
  }
  return customEmoji.filter(emoji => emoji.visible_in_picker).map(emoji => ({
    name: emoji.shortcode,
    shortcodes: [emoji.shortcode],
    url: autoplayGifs ? emoji.url : emoji.static_url,
    category: emoji.category
  }))
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/customEmojiObservers.js




function customEmojiObservers () {
  if (!process.browser) {
    return
  }

  function setEmoji (currentEmoji, autoplayGifs) {
    const customEmojiInEmojiPickerFormat = convertCustomEmojiToEmojiPickerFormat(currentEmoji, autoplayGifs)
    emojiDatabase/* setCustomEmoji */.fK(customEmojiInEmojiPickerFormat)
  }

  store/* store.observe */.h.observe('currentCustomEmoji', currentCustomEmoji => {
    setEmoji(currentCustomEmoji, store/* store.get */.h.get().autoplayGifs)
  }, { init: false })

  store/* store.observe */.h.observe('autoplayGifs', autoplayGifs => {
    setEmoji(store/* store.get */.h.get().currentCustomEmoji, autoplayGifs)
  }, { init: false })
}

// EXTERNAL MODULE: ./src/routes/_static/database.js
var _static_database = __webpack_require__(2992);
// EXTERNAL MODULE: ./src/routes/_utils/scheduleInterval.js
var scheduleInterval = __webpack_require__(8293);
;// CONCATENATED MODULE: ./src/routes/_store/observers/cleanup.js





function doCleanup () {
  // Periodically clean up drafts in localStorage, so they don't grow without bound.
  // Only do this for replies, so not for the home timeline or the compose modal.
  const now = Date.now()
  let changeCount = 0
  const { composeData } = store/* store.get */.h.get()
  for (const instanceComposeData of Object.values(composeData)) {
    for (const [realm, timelineComposeData] of Object.entries(instanceComposeData)) {
      if (realm === 'home' || realm === 'dialog') {
        continue
      }
      const ts = timelineComposeData.ts || 0 // if no timestamp set, just assume it's very old (migration behavior)
      if (now - ts > _static_database/* CLEANUP_TIME_AGO */.f) {
        delete instanceComposeData[realm]
        changeCount++
      }
    }
  }
  console.log('deleted', changeCount, 'old drafts')
  if (changeCount) {
    store/* store.set */.h.set({ composeData })
  }
}

function doCleanupLazily () {
  (0,scheduleIdleTask/* scheduleIdleTask */.F)(doCleanup)
}

function cleanup () {
  (0,scheduleInterval/* scheduleInterval */._)(doCleanupLazily, _static_database/* CLEANUP_DELAY */.P, /* runOnActive */ false)
}

// EXTERNAL MODULE: ./src/routes/_utils/computeFilterContextsForStatusOrNotification.js + 1 modules
var computeFilterContextsForStatusOrNotification = __webpack_require__(9341);
;// CONCATENATED MODULE: ./src/routes/_store/observers/wordFilterObservers.js








function wordFilterObservers () {
  if (!process.browser) {
    return
  }
  (0,eventBus.on)('wordFiltersChanged', instanceName => {
    /* no await */ (0,filters/* updateFiltersForInstance */.A_)(instanceName)
  })

  // compute `unexpiredInstanceFilters` based on `now` and `instanceFilters`. `now` updates every 10 seconds.
  function updateUnexpiredInstanceFiltersIfUnchanged (now, instanceFilters) {
    const unexpiredInstanceFilters = Object.fromEntries(Object.entries(instanceFilters).map(([instanceName, filters]) => {
      const unexpiredFilters = filters.filter(filter => (
        !filter.expires_at || new Date(filter.expires_at).getTime() >= now
      ))
      return [instanceName, unexpiredFilters]
    }))

    // don't force an update/recalc if nothing changed
    if (!(0,objects/* isEqual */.Xy)(store/* store.get */.h.get().unexpiredInstanceFilters, unexpiredInstanceFilters)) {
      console.log('updated unexpiredInstanceFilters', unexpiredInstanceFilters)
      store/* store.set */.h.set({ unexpiredInstanceFilters })
    }
  }

  store/* store.observe */.h.observe('now', now => {
    const { instanceFilters } = store/* store.get */.h.get()
    updateUnexpiredInstanceFiltersIfUnchanged(now, instanceFilters)
  })

  store/* store.observe */.h.observe('instanceFilters', instanceFilters => {
    const { now } = store/* store.get */.h.get()
    updateUnexpiredInstanceFiltersIfUnchanged(now, instanceFilters)
  })

  store/* store.observe */.h.observe('unexpiredInstanceFilterRegexes', async unexpiredInstanceFilterRegexes => {
    console.log('unexpiredInstanceFilterRegexes changed, recomputing filterContexts')
    ;(0,marks/* mark */.B)('update timeline item summary filter contexts')
    // Whenever the filters change, we need to re-compute the filterContexts on the TimelineSummaries.
    // This is a bit of an odd design, but we do it for perf. See timelineItemToSummary.js for details.
    let {
      timelineData_timelineItemSummaries: timelineItemSummaries,
      timelineData_timelineItemSummariesToAdd: timelineItemSummariesToAdd
    } = store/* store.get */.h.get()

    timelineItemSummaries = timelineItemSummaries || {}
    timelineItemSummariesToAdd = timelineItemSummariesToAdd || {}

    let somethingChanged = false

    await Promise.all(Object.entries(unexpiredInstanceFilterRegexes).map(async ([instanceName, contextsToRegex]) => {
      const timelinesToSummaries = timelineItemSummaries[instanceName] || {}
      const timelinesToSummariesToAdd = timelineItemSummariesToAdd[instanceName] || {}
      const summariesToUpdate = [
        ...(Object.values(timelinesToSummaries).flat()),
        ...(Object.values(timelinesToSummariesToAdd).flat())
      ]
      console.log(`Attempting to update filters for ${summariesToUpdate.length} item summaries`)
      await Promise.all(summariesToUpdate.map(async summary => {
        try {
          const isNotification = summary.type
          const item = await (isNotification
            ? _database_database/* database.getNotification */.F.getNotification(instanceName, summary.id)
            : _database_database/* database.getStatus */.F.getStatus(instanceName, summary.id)
          )
          const newFilterContexts = (0,computeFilterContextsForStatusOrNotification/* computeFilterContextsForStatusOrNotification */.b)(item, contextsToRegex)
          if (!(0,objects/* isEqual */.Xy)(summary.filterContexts, newFilterContexts)) {
            somethingChanged = true
            summary.filterContexts = newFilterContexts
          }
        } catch (err) {
          console.error(err)
          // not stored in the database anymore, just ignore
        }
      }))
    }))

    // The previous was an async operation, so the timelinesItemSummaries or timelineItemSummariesToAdd
    // may have changed. But we need to make sure that the filterContexts are updated in the store
    // So just force an update here.
    if (somethingChanged) {
      console.log('Word filters changed, forcing an update')
      // eslint-disable-next-line camelcase
      const { timelineData_timelineItemSummaries, timelineData_timelineItemSummariesToAdd } = store/* store.get */.h.get()
      // eslint-disable-next-line camelcase
      store/* store.set */.h.set({ timelineData_timelineItemSummaries, timelineData_timelineItemSummariesToAdd })
    }
    (0,marks/* stop */.s)('update timeline item summary filter contexts')
  }, { init: false })
}

;// CONCATENATED MODULE: ./src/routes/_components/dialog/asyncDialogs/importShowComposeDialog.js
const importShowComposeDialog = () => __webpack_require__.e(/* import() */ 161).then(__webpack_require__.bind(__webpack_require__, 5161)).then(mod => mod.default)

// EXTERNAL MODULE: ./src/routes/_actions/media.js + 1 modules
var media = __webpack_require__(5464);
;// CONCATENATED MODULE: ./src/routes/_actions/showComposeDialog.js





// show a compose dialog, typically invoked by the Web Share API or a PWA shortcut
async function showComposeDialog () {
  const { isUserLoggedIn } = store/* store.get */.h.get()
  if (!isUserLoggedIn) {
    return
  }
  const importShowComposeDialogPromise = importShowComposeDialog() // start promise early

  const data = await _database_database/* database.getWebShareData */.F.getWebShareData()

  if (data) {
    await _database_database/* database.deleteWebShareData */.F.deleteWebShareData() // only need this data once; it came from Web Share (service worker)
  }

  console.log('share data', data)
  const { title, text, url, file } = (data || {})

  // url is currently ignored on Android, but one can dream
  // https://web.dev/web-share-target/#verifying-shared-content
  const composeText = [title, text, url].filter(Boolean).join('\n\n')

  store/* store.clearComposeData */.h.clearComposeData('dialog')
  store/* store.setComposeData */.h.setComposeData('dialog', { text: composeText })
  store/* store.save */.h.save()

  const showComposeDialog = await importShowComposeDialogPromise
  showComposeDialog()
  if (file) { // start the upload once the dialog is in view so it shows the loading spinner and everything
    /* no await */ (0,media/* doMediaUpload */.m)('dialog', file)
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/showComposeDialogObservers.js



// If the user is logged in, and if the Service Worker handled a POST and set special data
// in IndexedDB, then we want to handle it on the home page.
function showComposeDialogObservers () {
  let observedOnce = false
  store/* store.observe */.h.observe('currentVerifyCredentials', async verifyCredentials => {
    if (verifyCredentials && !observedOnce) {
      // when the verifyCredentials object is available, we can check to see
      // if the user is trying to share something (or we got here from a shortcut), then share it
      observedOnce = true
      const { currentPage } = store/* store.get */.h.get()
      if (currentPage === 'home' && new URLSearchParams(location.search).get('compose') === 'true') {
        await showComposeDialog()
      }
    }
  })
}

// EXTERNAL MODULE: ./src/routes/_utils/userAgent/isChrome.js
var isChrome = __webpack_require__(88);
;// CONCATENATED MODULE: ./src/routes/_utils/userAgent/isChromePre87.js



// https://caniuse.com/cookie-store-api
const isChromePre87 = (0,thunk/* thunk */.I)(() => (process.browser && (0,isChrome/* isChrome */.i)() && typeof cookieStore === 'undefined'))

;// CONCATENATED MODULE: ./src/routes/_store/observers/badgeObservers.js



function badgeObservers () {
  if (!process.browser) {
    return
  }
  // Chrome 86 on Linux in Circle CI seems to hang just by checking for this... not worth supporting.
  if (isChromePre87() || !('setAppBadge' in navigator)) {
    return
  }
  store/* store.observe */.h.observe('badgeNumber', badgeNumber => {
    if (badgeNumber) {
      navigator.setAppBadge(badgeNumber)
    } else {
      navigator.clearAppBadge()
    }
  })
}

// EXTERNAL MODULE: external "country-flag-emoji-polyfill"
var external_country_flag_emoji_polyfill_ = __webpack_require__(5321);
;// CONCATENATED MODULE: ./src/routes/_store/observers/countryFlagEmojiPolyfill.js



let polyfilled = false

const COUNTRY_FLAG_FONT_URL = '/TwemojiCountryFlags.woff2'

function countryFlagEmojiPolyfill () {
  if (!polyfilled) {
    polyfilled = true
    const numStylesBefore = document.head.querySelectorAll('style').length
    ;(0,external_country_flag_emoji_polyfill_.polyfillCountryFlagEmojis)('Twemoji Mozilla', COUNTRY_FLAG_FONT_URL)
    const numStylesAfter = document.head.querySelectorAll('style').length
    // if a style was added, then the polyfill was activated
    const polyfillActivated = numStylesAfter !== numStylesBefore
    if (polyfillActivated) {
      const style = document.createElement('style')
      style.textContent = `
        @font-face {
          font-family: CountryFlagEmojiPolyfill;
          src: url(${JSON.stringify(COUNTRY_FLAG_FONT_URL)});
        }
      `
      document.head.appendChild(style)
      // "Twemoji Mozilla" is for emoji-picker-element, since it lists that font first.
      // "CountryFlagEmojiPolyfill" is for us so we can set it before everything else in our own font family lists.
    }
    store/* store.set */.h.set({ polyfilledCountryFlagEmoji: polyfillActivated })
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/centerNavObservers.js


const centerNavStyle = process.browser && document.getElementById('theCenterNavStyle')

function centerNavObservers () {
  store/* store.observe */.h.observe('centerNav', centerNav => {
    if (!process.browser) {
      return
    }

    // disables or enables the style
    centerNavStyle.setAttribute('media', centerNav ? 'all' : 'only x')
  }, { init: false }) // init:false because the inline script takes care of it
}

;// CONCATENATED MODULE: ./src/routes/_store/observers/loggedInObservers.js














// These observers can be lazy-loaded when the user is actually logged in.
// Prevents circular dependencies and reduces the size of main.js
function loggedInObservers () {
  instanceObservers()
  timelineObservers()
  wordFilterObservers()
  notificationObservers()
  autosuggestObservers()
  notificationPermissionObservers()
  customScrollbarObservers()
  centerNavObservers()
  customEmojiObservers()
  showComposeDialogObservers()
  badgeObservers()
  cleanup()
  countryFlagEmojiPolyfill()
}

;// CONCATENATED MODULE: ./src/routes/_store/mixins/timelineMixins.js



function timelineMixins (Store) {
  Store.prototype.setForTimeline = function (instanceName, timelineName, obj) {
    const valuesToSet = {}
    for (const key of Object.keys(obj)) {
      const rootKey = `timelineData_${key}`
      const root = this.get()[rootKey] || {}
      const instanceData = root[instanceName] = root[instanceName] || {}
      instanceData[timelineName] = obj[key]
      valuesToSet[rootKey] = root
    }

    this.set(valuesToSet)
  }

  Store.prototype.getForTimeline = function (instanceName, timelineName, key) {
    const rootKey = `timelineData_${key}`
    const root = this.get()[rootKey]
    return (0,lodash_lite/* get */.U2)(root, [instanceName, timelineName])
  }

  Store.prototype.getAllTimelineData = function (instanceName, key) {
    const root = this.get()[`timelineData_${key}`] || {}
    return root[instanceName] || {}
  }

  Store.prototype.getFirstTimelineItemId = function (instanceName, timelineName) {
    const summaries = this.getForTimeline(instanceName, timelineName, 'timelineItemSummaries')
    return getFirstIdFromItemSummaries(summaries)
  }

  Store.prototype.setForCurrentTimeline = function (obj) {
    const { currentInstance, currentTimeline } = this.get()
    this.setForTimeline(currentInstance, currentTimeline, obj)
  }

  Store.prototype.getThreads = function (instanceName) {
    const instanceData = this.getAllTimelineData(instanceName, 'timelineItemSummaries')

    return (0,lodash_lite/* pickBy */.D9)(instanceData, (value, key) => {
      return key.startsWith('status/')
    })
  }

  Store.prototype.clearTimelineDataForInstance = function (instanceName) {
    const changes = {}
    Object.entries(this.get()).forEach(([key, value]) => {
      if (key.startsWith('timelineData_') && value) {
        delete value[instanceName]
        changes[key] = value
      }
    })
    this.set(changes)
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/mixins/statusMixins.js
function getStatusModifications (store, instanceName) {
  const { statusModifications } = store.get()
  statusModifications[instanceName] = statusModifications[instanceName] || {
    favorites: {},
    reblogs: {},
    pins: {},
    bookmarks: {}
  }
  return statusModifications
}

function setStatusModification (store, instanceName, statusId, key, value) {
  const statusModifications = getStatusModifications(store, instanceName)
  statusModifications[instanceName][key][statusId] = value
  store.set({ statusModifications })
}

function statusMixins (Store) {
  Store.prototype.setStatusFavorited = function (instanceName, statusId, favorited) {
    setStatusModification(this, instanceName, statusId, 'favorites', favorited)
  }

  Store.prototype.setStatusReblogged = function (instanceName, statusId, reblogged) {
    setStatusModification(this, instanceName, statusId, 'reblogs', reblogged)
  }

  Store.prototype.setStatusPinned = function (instanceName, statusId, pinned) {
    setStatusModification(this, instanceName, statusId, 'pins', pinned)
  }

  Store.prototype.setStatusBookmarked = function (instanceName, statusId, bookmarked) {
    setStatusModification(this, instanceName, statusId, 'bookmarks', bookmarked)
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/mixins/autosuggestMixins.js


function autosuggestMixins (Store) {
  Store.prototype.setForAutosuggest = function (instanceName, realm, obj) {
    const valuesToSet = {}
    for (const key of Object.keys(obj)) {
      const rootKey = `autosuggestData_${key}`
      const root = this.get()[rootKey] || {}
      const instanceData = root[instanceName] = root[instanceName] || {}
      instanceData[realm] = obj[key]
      valuesToSet[rootKey] = root
    }

    this.set(valuesToSet)
  }

  Store.prototype.setForCurrentAutosuggest = function (obj) {
    const { currentInstance, currentComposeRealm } = this.get()
    this.setForAutosuggest(currentInstance, currentComposeRealm, obj)
  }

  Store.prototype.getForCurrentAutosuggest = function (key) {
    const { currentInstance, currentComposeRealm } = this.get()
    return (0,lodash_lite/* get */.U2)(this.get()[`autosuggestData_${key}`], [currentInstance, currentComposeRealm])
  }

  Store.prototype.clearAutosuggestDataForInstance = function (instanceName) {
    const changes = {}
    Object.entries(this.get()).forEach(([key, value]) => {
      if (key.startsWith('autosuggestData_') && value) {
        delete value[instanceName]
        changes[key] = value
      }
    })
    this.set(changes)
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/mixins/composeMixins.js


function composeMixins (Store) {
  Store.prototype.setComposeData = function (realm, obj) {
    const { composeData, currentInstance } = this.get()
    const instanceNameData = composeData[currentInstance] = composeData[currentInstance] || {}
    instanceNameData[realm] = Object.assign(
      instanceNameData[realm] || {},
      { ts: Date.now() },
      obj
    )
    this.set({ composeData })
  }

  Store.prototype.getComposeData = function (realm, key) {
    const { composeData, currentInstance } = this.get()
    return (0,lodash_lite/* get */.U2)(composeData, [currentInstance, realm, key])
  }

  Store.prototype.clearComposeData = function (realm) {
    const { composeData, currentInstance } = this.get()
    if (composeData && composeData[currentInstance]) {
      delete composeData[currentInstance][realm]
    }
    this.set({ composeData })
  }
}

;// CONCATENATED MODULE: ./src/routes/_store/mixins/loggedInMixins.js






function loggedInMixins () {
  composeMixins(store/* SemaphoreStore */.b)
  timelineMixins(store/* SemaphoreStore */.b)
  statusMixins(store/* SemaphoreStore */.b)
  autosuggestMixins(store/* SemaphoreStore */.b)
}

;// CONCATENATED MODULE: ./src/routes/_store/loggedInStoreExtensions.js




console.log('imported logged in observers and computations')
loggedInMixins()
loggedInComputations()
loggedInObservers()


/***/ })

};
;