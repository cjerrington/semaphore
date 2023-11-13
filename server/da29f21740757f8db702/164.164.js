"use strict";
exports.id = 164;
exports.ids = [164];
exports.modules = {

/***/ 4164:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "DELETE_AFTER": () => (/* reexport */ DELETE_AFTER),
  "clearDatabaseForInstance": () => (/* reexport */ clearDatabaseForInstance),
  "closeKeyValIDBConnection": () => (/* reexport */ closeKeyValIDBConnection),
  "deleteCachedMediaFile": () => (/* reexport */ deleteCachedMediaFile),
  "deleteStatusesAndNotifications": () => (/* reexport */ deleteStatusesAndNotifications),
  "deleteWebShareData": () => (/* reexport */ deleteWebShareData),
  "getAccount": () => (/* reexport */ getAccount),
  "getAllCachedFileIds": () => (/* reexport */ getAllCachedFileIds),
  "getCachedMediaFile": () => (/* reexport */ getCachedMediaFile),
  "getCustomEmoji": () => (/* reexport */ getCustomEmoji),
  "getFilters": () => (/* reexport */ getFilters),
  "getFollowRequestCount": () => (/* reexport */ getFollowRequestCount),
  "getInstanceInfo": () => (/* reexport */ getInstanceInfo),
  "getInstanceVerifyCredentials": () => (/* reexport */ getInstanceVerifyCredentials),
  "getLists": () => (/* reexport */ getLists),
  "getNotification": () => (/* reexport */ getNotification),
  "getNotificationIdsForStatuses": () => (/* reexport */ getNotificationIdsForStatuses),
  "getPinnedStatuses": () => (/* reexport */ getPinnedStatuses),
  "getReblogsForStatus": () => (/* reexport */ getReblogsForStatus),
  "getRelationship": () => (/* reexport */ getRelationship),
  "getStatus": () => (/* reexport */ getStatus),
  "getTimeline": () => (/* reexport */ getTimeline),
  "getWebShareData": () => (/* reexport */ getWebShareData),
  "insertPinnedStatuses": () => (/* reexport */ insertPinnedStatuses),
  "insertStatus": () => (/* reexport */ insertStatus),
  "insertTimelineItems": () => (/* reexport */ insertTimelineItems),
  "searchAccountsByUsername": () => (/* reexport */ searchAccountsByUsername),
  "setAccount": () => (/* reexport */ setAccount),
  "setCachedMediaFile": () => (/* reexport */ setCachedMediaFile),
  "setCustomEmoji": () => (/* reexport */ setCustomEmoji),
  "setDeleteCachedMediaFilesAfter": () => (/* reexport */ setDeleteCachedMediaFilesAfter),
  "setFilters": () => (/* reexport */ setFilters),
  "setFollowRequestCount": () => (/* reexport */ setFollowRequestCount),
  "setInstanceInfo": () => (/* reexport */ setInstanceInfo),
  "setInstanceVerifyCredentials": () => (/* reexport */ setInstanceVerifyCredentials),
  "setLists": () => (/* reexport */ setLists),
  "setRelationship": () => (/* reexport */ setRelationship),
  "setStatusBookmarked": () => (/* reexport */ setStatusBookmarked),
  "setStatusFavorited": () => (/* reexport */ setStatusFavorited),
  "setStatusMuted": () => (/* reexport */ setStatusMuted),
  "setStatusPinned": () => (/* reexport */ setStatusPinned),
  "setStatusReblogged": () => (/* reexport */ setStatusReblogged),
  "setWebShareData": () => (/* reexport */ setWebShareData),
  "updateStatus": () => (/* reexport */ updateStatus)
});

;// CONCATENATED MODULE: ./src/routes/_database/constants.js
const STATUSES_STORE = 'statuses-v4'
const STATUS_TIMELINES_STORE = 'status_timelines-v4'
const META_STORE = 'meta-v4'
const ACCOUNTS_STORE = 'accounts-v4'
const RELATIONSHIPS_STORE = 'relationships-v4'
const NOTIFICATIONS_STORE = 'notifications-v4'
const NOTIFICATION_TIMELINES_STORE = 'notification_timelines-v4'
const PINNED_STATUSES_STORE = 'pinned_statuses-v4'
const THREADS_STORE = 'threads-v4'

const TIMESTAMP = '__semaphore_ts'
const ACCOUNT_ID = '__semaphore_acct_id'
const STATUS_ID = '__semaphore_status_id'
const REBLOG_ID = '__semaphore_reblog_id'
const USERNAME_LOWERCASE = '__semaphore_acct_lc'

const DB_VERSION_INITIAL = 9
const DB_VERSION_SEARCH_ACCOUNTS = 10
const DB_VERSION_SNOWFLAKE_IDS = 12 // 11 skipped because of mistake deployed to beta.semaphore.social

// Using an object for these so that unit tests can change them
const DB_VERSION_CURRENT = { version: 12 }
const CURRENT_TIME = { now: () => Date.now() }

// EXTERNAL MODULE: ./src/routes/_thirdparty/quick-lru/quick-lru.js
var quick_lru = __webpack_require__(4956);
;// CONCATENATED MODULE: ./src/routes/_database/cache.js


const statusesCache = {
  maxSize: 100,
  caches: {}
}
const accountsCache = {
  maxSize: 50,
  caches: {}
}
const relationshipsCache = {
  maxSize: 20,
  caches: {}
}
const metaCache = {
  maxSize: 20,
  caches: {}
}
const notificationsCache = {
  maxSize: 50,
  caches: {}
}

if (process.browser && "production" !== 'production') {}

function getOrCreateInstanceCache (cache, instanceName) {
  let cached = cache.caches[instanceName]
  if (!cached) {
    cached = cache.caches[instanceName] = new quick_lru/* QuickLRU */.c({ maxSize: cache.maxSize })
  }
  return cached
}

function clearCache (cache, instanceName) {
  delete cache.caches[instanceName]
}
function clearAllCaches (instanceName) {
  const allCaches = [statusesCache, accountsCache, relationshipsCache, metaCache, notificationsCache]
  for (const cache of allCaches) {
    clearCache(cache, instanceName)
  }
}
function setInCache (cache, instanceName, key, value) {
  const instanceCache = getOrCreateInstanceCache(cache, instanceName)
  return instanceCache.set(key, value)
}

function getInCache (cache, instanceName, key) {
  const instanceCache = getOrCreateInstanceCache(cache, instanceName)
  return instanceCache.get(key)
}

function hasInCache (cache, instanceName, key) {
  const instanceCache = getOrCreateInstanceCache(cache, instanceName)
  const res = instanceCache.has(key)
  if (false) {}
  return res
}

function deleteFromCache (cache, instanceName, key) {
  const instanceCache = getOrCreateInstanceCache(cache, instanceName)
  instanceCache.delete(key)
}

// EXTERNAL MODULE: ./src/routes/_utils/lifecycle.js + 1 modules
var lifecycle = __webpack_require__(6834);
;// CONCATENATED MODULE: ./src/routes/_thirdparty/idb-keyval/idb-keyval.js
// Forked from https://github.com/jakearchibald/idb-keyval/commit/ea7d507
// Adds a function for closing the database, ala https://github.com/jakearchibald/idb-keyval/pull/65
// Also hooks it into the lifecycle frozen event


class Store {
  constructor (dbName = 'keyval-store', storeName = 'keyval') {
    this.storeName = storeName
    this._dbName = dbName
    this._storeName = storeName
    this._init()
  }

  _withIDBStore (type, callback) {
    this._init()
    return this._dbp.then(db => new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, type)
      transaction.oncomplete = () => resolve()
      transaction.onabort = transaction.onerror = () => reject(transaction.error)
      callback(transaction.objectStore(this.storeName))
    }))
  }

  _init () {
    if (this._dbp) {
      return
    }
    this._dbp = new Promise((resolve, reject) => {
      const openreq = indexedDB.open(this._dbName, 1)
      openreq.onerror = () => reject(openreq.error)
      openreq.onsuccess = () => resolve(openreq.result)
      // First time setup: create an empty object store
      openreq.onupgradeneeded = () => {
        openreq.result.createObjectStore(this._storeName)
      }
    })
  }

  _close () {
    this._init()
    return this._dbp.then(db => {
      db.close()
      this._dbp = undefined
    })
  }
}

let store

function getDefaultStore () {
  if (!store) {
    store = new Store()
  }
  return store
}

function get (key) {
  const store = getDefaultStore()
  let req
  return store._withIDBStore('readonly', store => {
    req = store.get(key)
  }).then(() => req.result)
}

function set (key, value) {
  const store = getDefaultStore()
  return store._withIDBStore('readwrite', store => {
    store.put(value, key)
  })
}

function del (key) {
  const store = getDefaultStore()
  return store._withIDBStore('readwrite', store => {
    store.delete(key)
  })
}

function clear () {
  const store = getDefaultStore()
  return store._withIDBStore('readwrite', store => {
    store.clear()
  })
}

function keys () {
  const store = getDefaultStore()
  const keys = []
  return store._withIDBStore('readonly', store => {
    // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
    // And openKeyCursor isn't supported by Safari.
    (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
      if (!this.result) {
        return
      }
      keys.push(this.result.key)
      this.result.continue()
    }
  }).then(() => keys)
}

function idb_keyval_close () {
  const store = getDefaultStore()
  return store._close()
}

if (process.browser) {
  lifecycle/* lifecycle.addEventListener */.S.addEventListener('statechange', async event => {
    if (event.newState === 'frozen') { // page is frozen, close IDB connections
      await idb_keyval_close()
      console.log('closed keyval DB')
    }
  })
}



;// CONCATENATED MODULE: ./src/routes/_database/knownInstances.js


const PREFIX = 'known-instance-'

async function getKnownInstances () {
  return (await keys())
    .filter(_ => _.startsWith(PREFIX))
    .map(_ => _.substring(PREFIX.length))
}

async function addKnownInstance (instanceName) {
  return set(PREFIX + instanceName, true)
}

async function deleteKnownInstance (instanceName) {
  return del(PREFIX + instanceName)
}

// EXTERNAL MODULE: ./src/routes/_utils/lodash-lite.js
var lodash_lite = __webpack_require__(2082);
;// CONCATENATED MODULE: ./src/routes/_utils/statusIdSorting.js
// Pleroma uses base62 IDs, Mastodon uses 0-9 big ints encoded as strings.
// Using base62 for both works, since the first 10 characters of base62
// are 0-9.



// Pleroma uses the 0-9A-Za-z alphabet for base62, which is the same as ASCII, which
// is the same as JavaScript sort order and IndexedDB order.
const MIN_CHAR_CODE = 48 // '0'.charCodeAt(0)
const MAX_CHAR_CODE = 122 // 'z'.charCodeAt(0)
const MAX_ID_LENGTH = 30 // assume that Mastodon/Pleroma IDs won't get any bigger than this

function zeroPad (str, toSize) {
  return (0,lodash_lite/* padStart */.Sk)(str, toSize, '0')
}

function toPaddedBigInt (id) {
  return zeroPad(id, MAX_ID_LENGTH)
}

function toReversePaddedBigInt (id) {
  const padded = toPaddedBigInt(id)
  let reversed = ''
  for (let i = 0; i < padded.length; i++) {
    const charCode = padded.charCodeAt(i)
    const inverseCharCode = MIN_CHAR_CODE + MAX_CHAR_CODE - charCode
    reversed += String.fromCharCode(inverseCharCode)
  }
  return reversed
}

function compareTimelineItemSummaries (left, right) {
  const leftPadded = toPaddedBigInt(left.id)
  const rightPadded = toPaddedBigInt(right.id)
  return leftPadded < rightPadded ? -1 : leftPadded === rightPadded ? 0 : 1
}

;// CONCATENATED MODULE: ./src/routes/_database/migrations.js



function initialMigration (db, tx, done) {
  function createObjectStore (name, init, indexes) {
    const store = init
      ? db.createObjectStore(name, init)
      : db.createObjectStore(name)
    if (indexes) {
      Object.keys(indexes).forEach(indexKey => {
        store.createIndex(indexKey, indexes[indexKey])
      })
    }
  }

  createObjectStore(STATUSES_STORE, { keyPath: 'id' }, {
    [TIMESTAMP]: TIMESTAMP,
    [REBLOG_ID]: REBLOG_ID
  })
  createObjectStore(STATUS_TIMELINES_STORE, null, {
    statusId: ''
  })
  createObjectStore(NOTIFICATIONS_STORE, { keyPath: 'id' }, {
    [TIMESTAMP]: TIMESTAMP,
    [STATUS_ID]: STATUS_ID
  })
  createObjectStore(NOTIFICATION_TIMELINES_STORE, null, {
    notificationId: ''
  })
  createObjectStore(ACCOUNTS_STORE, { keyPath: 'id' }, {
    [TIMESTAMP]: TIMESTAMP
  })
  createObjectStore(RELATIONSHIPS_STORE, { keyPath: 'id' }, {
    [TIMESTAMP]: TIMESTAMP
  })
  createObjectStore(THREADS_STORE, null, {
    statusId: ''
  })
  createObjectStore(PINNED_STATUSES_STORE, null, {
    statusId: ''
  })
  createObjectStore(META_STORE)
  done()
}

function addSearchAccountsMigration (db, tx, done) {
  tx.objectStore(ACCOUNTS_STORE)
    .createIndex(USERNAME_LOWERCASE, USERNAME_LOWERCASE)
  done()
}

function snowflakeIdsMigration (db, tx, done) {
  const stores = [STATUS_TIMELINES_STORE, NOTIFICATION_TIMELINES_STORE]
  let storeDoneCount = 0

  // Here we have to convert the old "reversePaddedBigInt" format to the new
  // one which is compatible with Pleroma-style snowflake IDs.
  stores.forEach(store => {
    const objectStore = tx.objectStore(store)
    const cursor = objectStore.openCursor()
    cursor.onsuccess = e => {
      const { result } = e.target
      if (result) {
        const { key, value } = result
        // key is timeline name plus delimiter plus reverse padded big int
        const newKey = key.split('\u0000')[0] + '\u0000' + toReversePaddedBigInt(value)

        objectStore.delete(key).onsuccess = () => {
          objectStore.add(value, newKey).onsuccess = () => {
            result.continue()
          }
        }
      } else {
        if (++storeDoneCount === stores.length) {
          done()
        }
      }
    }
  })
}

const migrations = [
  {
    version: DB_VERSION_INITIAL,
    migration: initialMigration
  },
  {
    version: DB_VERSION_SEARCH_ACCOUNTS,
    migration: addSearchAccountsMigration
  },
  {
    version: DB_VERSION_SNOWFLAKE_IDS,
    migration: snowflakeIdsMigration
  }
]

// EXTERNAL MODULE: ./src/routes/_utils/scheduleIdleTask.js + 1 modules
var scheduleIdleTask = __webpack_require__(8846);
;// CONCATENATED MODULE: ./src/routes/_database/databaseLifecycle.js








const openReqs = {}
const databaseCache = {}

function createDatabase (instanceName) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(instanceName, DB_VERSION_CURRENT.version)
    openReqs[instanceName] = req
    req.onerror = reject
    req.onblocked = () => {
      console.error('idb blocked')
    }
    req.onupgradeneeded = (e) => {
      const db = req.result
      const tx = e.currentTarget.transaction

      const migrationsToDo = migrations.filter(({ version }) => e.oldVersion < version)

      function doNextMigration () {
        if (!migrationsToDo.length) {
          return
        }
        const { migration } = migrationsToDo.shift()
        migration(db, tx, doNextMigration)
      }
      doNextMigration()
    }
    req.onsuccess = () => resolve(req.result)
  })
}

async function getDatabase (instanceName) {
  if (!instanceName) {
    throw new Error('instanceName is undefined in getDatabase()')
  }
  if (!databaseCache[instanceName]) {
    databaseCache[instanceName] = await createDatabase(instanceName)
    await addKnownInstance(instanceName)
  }
  return databaseCache[instanceName]
}

async function dbPromise (db, storeName, readOnlyOrReadWrite, cb) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, readOnlyOrReadWrite)
    const store = typeof storeName === 'string'
      ? tx.objectStore(storeName)
      : storeName.map(name => tx.objectStore(name))
    let res
    cb(store, (result) => {
      res = result
    })

    tx.oncomplete = () => resolve(res)
    tx.onerror = () => reject(tx.error)
  })
}

function deleteDatabase (instanceName) {
  return new Promise((resolve, reject) => {
    // close any open requests
    const openReq = openReqs[instanceName]
    if (openReq && openReq.result) {
      openReq.result.close()
    }
    delete openReqs[instanceName]
    delete databaseCache[instanceName]
    const req = indexedDB.deleteDatabase(instanceName)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
    req.onblocked = () => console.error(`database ${instanceName} blocked`)
  }).then(() => deleteKnownInstance(instanceName))
    .then(() => clearAllCaches(instanceName))
}

function closeDatabase (instanceName) {
  // close any open requests
  const openReq = openReqs[instanceName]
  if (openReq && openReq.result) {
    openReq.result.close()
  }
  delete openReqs[instanceName]
  delete databaseCache[instanceName]
  clearAllCaches(instanceName)
}

if (process.browser) {
  lifecycle/* lifecycle.addEventListener */.S.addEventListener('statechange', event => {
    if (event.newState === 'frozen') { // page is frozen, close IDB connections
      Object.keys(openReqs).forEach(instanceName => {
        closeDatabase(instanceName)
        console.log('closed instance DBs')
      })
    }
  })

  // Clean up files that Tesseract.js may have stored. Originally we allowed it to store
  // stuff in IDB, but now we don't.
  // TODO: we can remove this after it's been deployed for a while
  ;(0,scheduleIdleTask/* scheduleIdleTask */.F)(() => del('./eng.traineddata'))
}

;// CONCATENATED MODULE: ./src/routes/_database/helpers.js




async function getGenericEntityWithId (store, cache, instanceName, id) {
  if (hasInCache(cache, instanceName, id)) {
    return getInCache(cache, instanceName, id)
  }
  const db = await getDatabase(instanceName)
  const result = await dbPromise(db, store, 'readonly', (store, callback) => {
    store.get(id).onsuccess = (e) => callback(e.target.result)
  })
  setInCache(cache, instanceName, id, result)
  return result
}

async function setGenericEntityWithId (store, cache, instanceName, entity) {
  setInCache(cache, instanceName, entity.id, entity)
  const db = await getDatabase(instanceName)
  return dbPromise(db, store, 'readwrite', (store) => {
    store.put(entity)
  })
}

function cloneForStorage (obj) {
  const res = {}
  const keys = Object.keys(obj)
  for (const key of keys) {
    const value = obj[key]
    // save storage space by skipping nulls, 0s, falses, empty strings, and empty arrays
    if (!value || (Array.isArray(value) && value.length === 0)) {
      continue
    }
    switch (key) {
      case 'account':
        res[ACCOUNT_ID] = value.id
        break
      case 'status':
        res[STATUS_ID] = value.id
        break
      case 'reblog':
        res[REBLOG_ID] = value.id
        break
      case 'acct':
        res[key] = value
        res[USERNAME_LOWERCASE] = value.toLowerCase()
        break
      default:
        res[key] = value
        break
    }
  }
  res[TIMESTAMP] = CURRENT_TIME.now()
  return res
}

;// CONCATENATED MODULE: ./src/routes/_database/keys.js


//
// timelines
//

function createTimelineId (timeline, id) {
  // reverse chronological order, prefixed by timeline
  return timeline + '\u0000' + toReversePaddedBigInt(id)
}

function createTimelineKeyRange (timeline, maxId) {
  const negBigInt = maxId && toReversePaddedBigInt(maxId)
  const start = negBigInt ? (timeline + '\u0000' + negBigInt) : (timeline + '\u0000')
  const end = timeline + '\u0000\uffff'
  return IDBKeyRange.bound(start, end, true, true)
}

//
// threads
//

function createThreadId (statusId, i) {
  return statusId + '\u0000' + zeroPad(i, 5)
}

function createThreadKeyRange (statusId) {
  return IDBKeyRange.bound(
    statusId + '\u0000',
    statusId + '\u0000\uffff'
  )
}

//
// pinned statues
//

function createPinnedStatusId (accountId, i) {
  return accountId + '\u0000' + zeroPad(i, 3)
}

function createPinnedStatusKeyRange (accountId) {
  return IDBKeyRange.bound(
    accountId + '\u0000',
    accountId + '\u0000\uffff'
  )
}

//
// accounts
//

function createAccountUsernamePrefixKeyRange (accountUsernamePrefix) {
  return IDBKeyRange.bound(
    accountUsernamePrefix,
    accountUsernamePrefix + '\uffff'
  )
}

;// CONCATENATED MODULE: ./src/routes/_database/accounts.js






async function getAccount (instanceName, accountId) {
  return getGenericEntityWithId(ACCOUNTS_STORE, accountsCache, instanceName, accountId)
}

async function setAccount (instanceName, account) {
  return setGenericEntityWithId(ACCOUNTS_STORE, accountsCache, instanceName, cloneForStorage(account))
}

async function searchAccountsByUsername (instanceName, usernamePrefix, limit) {
  limit = limit || 20
  const db = await getDatabase(instanceName)
  return dbPromise(db, ACCOUNTS_STORE, 'readonly', (accountsStore, callback) => {
    const keyRange = createAccountUsernamePrefixKeyRange(usernamePrefix.toLowerCase())
    accountsStore.index(USERNAME_LOWERCASE).getAll(keyRange, limit).onsuccess = e => {
      callback(e.target.result)
    }
  })
}

;// CONCATENATED MODULE: ./src/routes/_database/clear.js



async function clearDatabaseForInstance (instanceName) {
  clearCache(statusesCache, instanceName)
  clearCache(accountsCache, instanceName)
  clearCache(metaCache, instanceName)
  await deleteDatabase(instanceName)
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/lookup.js



async function getReblogsForStatus (instanceName, id) {
  const db = await getDatabase(instanceName)
  await dbPromise(db, STATUSES_STORE, 'readonly', (statusesStore, callback) => {
    statusesStore.index(REBLOG_ID).getAll(IDBKeyRange.only(id)).onsuccess = e => {
      callback(e.target.result)
    }
  })
}

async function getNotificationIdsForStatuses (instanceName, statusIds) {
  const db = await getDatabase(instanceName)
  return dbPromise(db, NOTIFICATIONS_STORE, 'readonly', (notificationsStore, callback) => {
    const res = []
    callback(res)
    statusIds.forEach(statusId => {
      const req = notificationsStore.index(STATUS_ID).getAllKeys(IDBKeyRange.only(statusId))
      req.onsuccess = e => {
        for (const id of e.target.result) {
          res.push(id)
        }
      }
    })
  })
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/cacheStatus.js


function cacheStatus (status, instanceName) {
  setInCache(statusesCache, instanceName, status.id, status)
  setInCache(accountsCache, instanceName, status.account.id, status.account)
  if (status.reblog) {
    setInCache(accountsCache, instanceName, status.reblog.account.id, status.reblog.account)
  }
}

// EXTERNAL MODULE: ./src/routes/_thirdparty/lodash/objects.js
var objects = __webpack_require__(5277);
// EXTERNAL MODULE: ./src/routes/_thirdparty/lodash/timers.js
var timers = __webpack_require__(1506);
// EXTERNAL MODULE: ./src/routes/_utils/marks.js
var marks = __webpack_require__(9217);
;// CONCATENATED MODULE: ./src/routes/_database/utils.js
function deleteAll (store, index, keyRange) {
  index.getAllKeys(keyRange).onsuccess = e => {
    for (const result of e.target.result) {
      store.delete(result)
    }
  }
}

// EXTERNAL MODULE: ./src/routes/_static/database.js
var database = __webpack_require__(2992);
;// CONCATENATED MODULE: ./src/routes/_database/cleanup.js











const BATCH_SIZE = 20

function batchedGetAll (callGetAll, callback) {
  function nextBatch () {
    callGetAll().onsuccess = function (e) {
      const results = e.target.result
      callback(results)
      if (results.length) {
        nextBatch()
      }
    }
  }
  nextBatch()
}

function cleanupStatuses (statusesStore, statusTimelinesStore, threadsStore, cutoff) {
  batchedGetAll(
    () => statusesStore.index(TIMESTAMP).getAllKeys(IDBKeyRange.upperBound(cutoff), BATCH_SIZE),
    results => {
      results.forEach(statusId => {
        statusesStore.delete(statusId)
        deleteAll(
          statusTimelinesStore,
          statusTimelinesStore.index('statusId'),
          IDBKeyRange.only(statusId)
        )
        deleteAll(
          threadsStore,
          threadsStore,
          createThreadKeyRange(statusId)
        )
      })
    }
  )
}

function cleanupNotifications (notificationsStore, notificationTimelinesStore, cutoff) {
  batchedGetAll(
    () => notificationsStore.index(TIMESTAMP).getAllKeys(IDBKeyRange.upperBound(cutoff), BATCH_SIZE),
    results => {
      results.forEach(notificationId => {
        notificationsStore.delete(notificationId)
        deleteAll(
          notificationTimelinesStore,
          notificationTimelinesStore.index('notificationId'),
          IDBKeyRange.only(notificationId)
        )
      })
    }
  )
}

function cleanupAccounts (accountsStore, pinnedStatusesStore, cutoff) {
  batchedGetAll(
    () => accountsStore.index(TIMESTAMP).getAllKeys(IDBKeyRange.upperBound(cutoff), BATCH_SIZE),
    results => {
      results.forEach(accountId => {
        accountsStore.delete(accountId)
        deleteAll(
          pinnedStatusesStore,
          pinnedStatusesStore,
          createPinnedStatusKeyRange(accountId)
        )
      })
    }
  )
}

function cleanupRelationships (relationshipsStore, cutoff) {
  batchedGetAll(
    () => relationshipsStore.index(TIMESTAMP).getAllKeys(IDBKeyRange.upperBound(cutoff), BATCH_SIZE),
    results => {
      results.forEach(relationshipId => {
        relationshipsStore.delete(relationshipId)
      })
    }
  )
}

async function cleanup (instanceName) {
  console.log('cleanup', instanceName)
  ;(0,marks/* mark */.B)(`cleanup:${instanceName}`)
  const db = await getDatabase(instanceName)
  const storeNames = [
    STATUSES_STORE,
    STATUS_TIMELINES_STORE,
    NOTIFICATIONS_STORE,
    NOTIFICATION_TIMELINES_STORE,
    ACCOUNTS_STORE,
    RELATIONSHIPS_STORE,
    THREADS_STORE,
    PINNED_STATUSES_STORE
  ]
  await dbPromise(db, storeNames, 'readwrite', (stores) => {
    const [
      statusesStore,
      statusTimelinesStore,
      notificationsStore,
      notificationTimelinesStore,
      accountsStore,
      relationshipsStore,
      threadsStore,
      pinnedStatusesStore
    ] = stores

    const cutoff = Date.now() - database/* CLEANUP_TIME_AGO */.f

    cleanupStatuses(statusesStore, statusTimelinesStore, threadsStore, cutoff)
    cleanupNotifications(notificationsStore, notificationTimelinesStore, cutoff)
    cleanupAccounts(accountsStore, pinnedStatusesStore, cutoff)
    cleanupRelationships(relationshipsStore, cutoff)
  })
  ;(0,marks/* stop */.s)(`cleanup:${instanceName}`)
}

function doCleanup (instanceName) {
  (0,scheduleIdleTask/* scheduleIdleTask */.F)(() => cleanup(instanceName))
}

async function scheduledCleanup () {
  console.log('scheduledCleanup')
  const knownInstances = await getKnownInstances()
  for (const instance of knownInstances) {
    doCleanup(instance)
  }
}

// we have unit tests that test indexedDB; we don't want this thing to run forever
const scheduleCleanup = process.browser ? (0,timers/* debounce */.D)(scheduledCleanup, database/* CLEANUP_DELAY */.P) : lodash_lite/* noop */.ZT

;// CONCATENATED MODULE: ./src/routes/_database/timelines/insertion.js










function putStatus (statusesStore, status) {
  statusesStore.put(cloneForStorage(status))
}

function putAccount (accountsStore, account) {
  accountsStore.put(cloneForStorage(account))
}

function putNotification (notificationsStore, notification) {
  notificationsStore.put(cloneForStorage(notification))
}

function storeAccount (accountsStore, account) {
  putAccount(accountsStore, account)
}

function storeStatus (statusesStore, accountsStore, status) {
  putStatus(statusesStore, status)
  putAccount(accountsStore, status.account)
  if (status.reblog) {
    putStatus(statusesStore, status.reblog)
    putAccount(accountsStore, status.reblog.account)
  }
}

function storeNotification (notificationsStore, statusesStore, accountsStore, notification) {
  if (notification.status) {
    storeStatus(statusesStore, accountsStore, notification.status)
  }
  storeAccount(accountsStore, notification.account)
  putNotification(notificationsStore, notification)
}

async function insertTimelineNotifications (instanceName, timeline, notifications) {
  for (const notification of notifications) {
    setInCache(notificationsCache, instanceName, notification.id, notification)
    setInCache(accountsCache, instanceName, notification.account.id, notification.account)
    if (notification.status) {
      setInCache(statusesCache, instanceName, notification.status.id, notification.status)
    }
  }
  const db = await getDatabase(instanceName)
  const storeNames = [NOTIFICATION_TIMELINES_STORE, NOTIFICATIONS_STORE, ACCOUNTS_STORE, STATUSES_STORE]
  await dbPromise(db, storeNames, 'readwrite', (stores) => {
    const [timelineStore, notificationsStore, accountsStore, statusesStore] = stores
    for (const notification of notifications) {
      storeNotification(notificationsStore, statusesStore, accountsStore, notification)
      timelineStore.put(notification.id, createTimelineId(timeline, notification.id))
    }
  })
}

async function insertTimelineStatuses (instanceName, timeline, statuses) {
  for (const status of statuses) {
    cacheStatus(status, instanceName)
  }
  const db = await getDatabase(instanceName)
  const storeNames = [STATUS_TIMELINES_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  await dbPromise(db, storeNames, 'readwrite', (stores) => {
    const [timelineStore, statusesStore, accountsStore] = stores
    for (const status of statuses) {
      storeStatus(statusesStore, accountsStore, status)
      timelineStore.put(status.id, createTimelineId(timeline, status.id))
    }
  })
}

async function insertStatusThread (instanceName, statusId, statuses) {
  for (const status of statuses) {
    cacheStatus(status, instanceName)
  }
  const db = await getDatabase(instanceName)
  const storeNames = [THREADS_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  await dbPromise(db, storeNames, 'readwrite', (stores) => {
    const [threadsStore, statusesStore, accountsStore] = stores
    threadsStore.getAllKeys(createThreadKeyRange(statusId)).onsuccess = e => {
      const existingKeys = e.target.result
      const newKeys = (0,lodash_lite/* times */.DZ)(statuses.length, i => createThreadId(statusId, i))
      const keysToDelete = (0,objects/* difference */.e5)(existingKeys, newKeys)
      for (const key of keysToDelete) {
        threadsStore.delete(key)
      }
    }
    statuses.forEach((otherStatus, i) => {
      storeStatus(statusesStore, accountsStore, otherStatus)
      threadsStore.put(otherStatus.id, createThreadId(statusId, i))
    })
  })
}

async function insertTimelineItems (instanceName, timeline, timelineItems) {
  console.log('insertTimelineItems', instanceName, timeline, timelineItems)
  /* no await */ scheduleCleanup()
  if (timeline === 'notifications' || timeline === 'notifications/mentions') {
    return insertTimelineNotifications(instanceName, timeline, timelineItems)
  } else if (timeline.startsWith('status/')) {
    const statusId = timeline.split('/').slice(-1)[0]
    return insertStatusThread(instanceName, statusId, timelineItems)
  } else {
    return insertTimelineStatuses(instanceName, timeline, timelineItems)
  }
}

async function insertStatus (instanceName, status) {
  cacheStatus(status, instanceName)
  const db = await getDatabase(instanceName)
  await dbPromise(db, [STATUSES_STORE, ACCOUNTS_STORE], 'readwrite', ([statusesStore, accountsStore]) => {
    storeStatus(statusesStore, accountsStore, status)
  })
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/fetchAccount.js
function fetchAccount (accountsStore, id, callback) {
  accountsStore.get(id).onsuccess = e => {
    callback(e.target.result)
  }
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/fetchStatus.js



function fetchStatus (statusesStore, accountsStore, id, callback) {
  statusesStore.get(id).onsuccess = e => {
    const status = e.target.result
    callback(status)
    if (!status) {
      return
    }
    fetchAccount(accountsStore, status[ACCOUNT_ID], account => {
      status.account = account
    })
    if (status[REBLOG_ID]) {
      fetchStatus(statusesStore, accountsStore, status[REBLOG_ID], reblog => {
        status.reblog = reblog
      })
    }
  }
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/pinnedStatuses.js







async function insertPinnedStatuses (instanceName, accountId, statuses) {
  for (const status of statuses) {
    cacheStatus(status, instanceName)
  }
  const db = await getDatabase(instanceName)
  const storeNames = [PINNED_STATUSES_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  await dbPromise(db, storeNames, 'readwrite', (stores) => {
    const [pinnedStatusesStore, statusesStore, accountsStore] = stores

    const keyRange = createPinnedStatusKeyRange(accountId)
    pinnedStatusesStore.getAll(keyRange).onsuccess = e => {
      // if there was e.g. 1 pinned status before and 2 now, then we need to delete the old one
      const existingPinnedStatuses = e.target.result
      for (let i = statuses.length; i < existingPinnedStatuses.length; i++) {
        pinnedStatusesStore.delete(createPinnedStatusKeyRange(accountId, i))
      }
      statuses.forEach((status, i) => {
        storeStatus(statusesStore, accountsStore, status)
        pinnedStatusesStore.put(status.id, createPinnedStatusId(accountId, i))
      })
    }
  })
}

async function getPinnedStatuses (instanceName, accountId) {
  const storeNames = [PINNED_STATUSES_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  const db = await getDatabase(instanceName)
  return dbPromise(db, storeNames, 'readonly', (stores, callback) => {
    const [pinnedStatusesStore, statusesStore, accountsStore] = stores
    const keyRange = createPinnedStatusKeyRange(accountId)
    pinnedStatusesStore.getAll(keyRange).onsuccess = e => {
      const pinnedResults = e.target.result
      const res = new Array(pinnedResults.length)
      pinnedResults.forEach((statusId, i) => {
        fetchStatus(statusesStore, accountsStore, statusId, status => {
          res[i] = status
        })
      })
      callback(res)
    }
  })
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/fetchNotification.js




function fetchNotification (notificationsStore, statusesStore, accountsStore, id, callback) {
  notificationsStore.get(id).onsuccess = e => {
    const notification = e.target.result
    callback(notification)
    if (!notification) {
      return
    }
    fetchAccount(accountsStore, notification[ACCOUNT_ID], account => {
      notification.account = account
    })
    if (notification[STATUS_ID]) {
      fetchStatus(statusesStore, accountsStore, notification[STATUS_ID], status => {
        notification.status = status
      })
    }
  }
}

;// CONCATENATED MODULE: ./src/routes/_static/timelines.js
const TIMELINE_BATCH_SIZE = 20

const timelines = {
  home: { name: 'home', label: "Home" },
  local: { name: 'local', label: "Local" },
  federated: { name: 'federated', label: "Federated" }
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/pagination.js







async function getNotificationTimeline (instanceName, timeline, maxId, limit) {
  const storeNames = [NOTIFICATION_TIMELINES_STORE, NOTIFICATIONS_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  const db = await getDatabase(instanceName)
  return dbPromise(db, storeNames, 'readonly', (stores, callback) => {
    const [timelineStore, notificationsStore, statusesStore, accountsStore] = stores
    const keyRange = createTimelineKeyRange(timeline, maxId)

    timelineStore.getAll(keyRange, limit).onsuccess = e => {
      const timelineResults = e.target.result
      const res = new Array(timelineResults.length)
      timelineResults.forEach((notificationId, i) => {
        fetchNotification(notificationsStore, statusesStore, accountsStore, notificationId, notification => {
          res[i] = notification
        })
      })
      callback(res)
    }
  })
}

async function getStatusTimeline (instanceName, timeline, maxId, limit) {
  const storeNames = [STATUS_TIMELINES_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  const db = await getDatabase(instanceName)
  return dbPromise(db, storeNames, 'readonly', (stores, callback) => {
    const [timelineStore, statusesStore, accountsStore] = stores
    const getReq = timelineStore.getAll(createTimelineKeyRange(timeline, maxId), limit)
    getReq.onsuccess = e => {
      const timelineResults = e.target.result
      const res = new Array(timelineResults.length)
      timelineResults.forEach((statusId, i) => {
        fetchStatus(statusesStore, accountsStore, statusId, status => {
          res[i] = status
        })
      })
      callback(res)
    }
  })
}

async function getStatusThread (instanceName, statusId) {
  const storeNames = [THREADS_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  const db = await getDatabase(instanceName)
  return dbPromise(db, storeNames, 'readonly', (stores, callback) => {
    const [threadsStore, statusesStore, accountsStore] = stores
    const keyRange = createThreadKeyRange(statusId)
    threadsStore.getAll(keyRange).onsuccess = e => {
      const thread = e.target.result
      if (thread.length) {
        const res = new Array(thread.length)
        callback(res)
        thread.forEach((otherStatusId, i) => {
          fetchStatus(statusesStore, accountsStore, otherStatusId, status => {
            res[i] = status
          })
        })
      } else {
        // thread not cached; just make a "fake" thread with only one status in it
        fetchStatus(statusesStore, accountsStore, statusId, status => {
          const res = [status]
          callback(res)
        })
      }
    }
  })
}

async function getTimeline (instanceName, timeline, maxId, limit) {
  maxId = maxId || null
  limit = limit || TIMELINE_BATCH_SIZE
  if (timeline === 'notifications' || timeline === 'notifications/mentions') {
    return getNotificationTimeline(instanceName, timeline, maxId, limit)
  } else if (timeline.startsWith('status/')) {
    const statusId = timeline.split('/').slice(-1)[0]
    return getStatusThread(instanceName, statusId)
  } else {
    return getStatusTimeline(instanceName, timeline, maxId, limit)
  }
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/getStatusOrNotification.js






async function getStatus (instanceName, id) {
  if (hasInCache(statusesCache, instanceName, id)) {
    return getInCache(statusesCache, instanceName, id)
  }
  const db = await getDatabase(instanceName)
  const storeNames = [STATUSES_STORE, ACCOUNTS_STORE]
  const result = await dbPromise(db, storeNames, 'readonly', (stores, callback) => {
    const [statusesStore, accountsStore] = stores
    fetchStatus(statusesStore, accountsStore, id, callback)
  })
  setInCache(statusesCache, instanceName, id, result)
  return result
}

async function getNotification (instanceName, id) {
  if (hasInCache(notificationsCache, instanceName, id)) {
    return getInCache(notificationsCache, instanceName, id)
  }
  const db = await getDatabase(instanceName)
  const storeNames = [NOTIFICATIONS_STORE, STATUSES_STORE, ACCOUNTS_STORE]
  const result = await dbPromise(db, storeNames, 'readonly', (stores, callback) => {
    const [notificationsStore, statusesStore, accountsStore] = stores
    fetchNotification(notificationsStore, statusesStore, accountsStore, id, callback)
  })
  setInCache(notificationsCache, instanceName, id, result)
  return result
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/updateStatus.js







//
// update statuses
//

async function doUpdateStatus (instanceName, statusId, updateFunc) {
  const db = await getDatabase(instanceName)
  if (hasInCache(statusesCache, instanceName, statusId)) {
    const status = getInCache(statusesCache, instanceName, statusId)
    updateFunc(status)
    cacheStatus(status, instanceName)
  }
  return dbPromise(db, STATUSES_STORE, 'readwrite', (statusesStore) => {
    statusesStore.get(statusId).onsuccess = e => {
      const status = e.target.result
      updateFunc(status)
      putStatus(statusesStore, status)
    }
  })
}

async function setStatusFavorited (instanceName, statusId, favorited) {
  return doUpdateStatus(instanceName, statusId, status => {
    const delta = (favorited ? 1 : 0) - (status.favourited ? 1 : 0)
    status.favourited = favorited
    status.favourites_count = (status.favourites_count || 0) + delta
  })
}

async function setStatusReblogged (instanceName, statusId, reblogged) {
  return doUpdateStatus(instanceName, statusId, status => {
    const delta = (reblogged ? 1 : 0) - (status.reblogged ? 1 : 0)
    status.reblogged = reblogged
    status.reblogs_count = (status.reblogs_count || 0) + delta
  })
}

async function setStatusPinned (instanceName, statusId, pinned) {
  return doUpdateStatus(instanceName, statusId, status => {
    status.pinned = pinned
  })
}

async function setStatusMuted (instanceName, statusId, muted) {
  return doUpdateStatus(instanceName, statusId, status => {
    status.muted = muted
  })
}

async function setStatusBookmarked (instanceName, statusId, bookmarked) {
  return doUpdateStatus(instanceName, statusId, status => {
    status.bookmarked = bookmarked
  })
}

// For the full list, see https://docs.joinmastodon.org/methods/statuses/#edit
const PROPS_THAT_CAN_BE_EDITED = ['content', 'spoiler_text', 'sensitive', 'language', 'media_ids', 'poll']

async function updateStatus (instanceName, newStatus) {
  const clonedNewStatus = cloneForStorage(newStatus)
  return doUpdateStatus(instanceName, newStatus.id, status => {
    // We can't use a simple Object.assign() to merge because a prop might have been deleted
    for (const prop of PROPS_THAT_CAN_BE_EDITED) {
      if (!(prop in clonedNewStatus)) {
        delete status[prop]
      } else {
        status[prop] = clonedNewStatus[prop]
      }
    }
  })
}

;// CONCATENATED MODULE: ./src/routes/_database/timelines/deletion.js






async function deleteStatusesAndNotifications (instanceName, statusIds, notificationIds) {
  for (const statusId of statusIds) {
    deleteFromCache(statusesCache, instanceName, statusId)
  }
  for (const notificationId of notificationIds) {
    deleteFromCache(notificationsCache, instanceName, notificationId)
  }
  const db = await getDatabase(instanceName)
  const storeNames = [
    STATUSES_STORE,
    STATUS_TIMELINES_STORE,
    NOTIFICATIONS_STORE,
    NOTIFICATION_TIMELINES_STORE,
    PINNED_STATUSES_STORE,
    THREADS_STORE
  ]
  await dbPromise(db, storeNames, 'readwrite', (stores) => {
    const [
      statusesStore,
      statusTimelinesStore,
      notificationsStore,
      notificationTimelinesStore,
      pinnedStatusesStore,
      threadsStore
    ] = stores

    function deleteStatus (statusId) {
      statusesStore.delete(statusId)
      deleteAll(
        pinnedStatusesStore,
        pinnedStatusesStore.index('statusId'),
        IDBKeyRange.only(statusId)
      )
      deleteAll(
        statusTimelinesStore,
        statusTimelinesStore.index('statusId'),
        IDBKeyRange.only(statusId)
      )
      deleteAll(
        threadsStore,
        threadsStore.index('statusId'),
        IDBKeyRange.only(statusId)
      )
      deleteAll(
        threadsStore,
        threadsStore,
        createThreadKeyRange(statusId)
      )
    }

    function deleteNotification (notificationId) {
      notificationsStore.delete(notificationId)
      deleteAll(
        notificationTimelinesStore,
        notificationTimelinesStore.index('notificationId'),
        IDBKeyRange.only(notificationId)
      )
    }

    for (const statusId of statusIds) {
      deleteStatus(statusId)
    }
    for (const notificationId of notificationIds) {
      deleteNotification(notificationId)
    }
  })
}

;// CONCATENATED MODULE: ./src/routes/_database/meta.js




async function getMetaProperty (instanceName, key) {
  if (hasInCache(metaCache, instanceName, key)) {
    return getInCache(metaCache, instanceName, key)
  }
  const db = await getDatabase(instanceName)
  const result = await dbPromise(db, META_STORE, 'readonly', (store, callback) => {
    store.get(key).onsuccess = (e) => {
      callback(e.target.result)
    }
  })
  setInCache(metaCache, instanceName, key, result)
  return result
}

async function setMetaProperty (instanceName, key, value) {
  setInCache(metaCache, instanceName, key, value)
  const db = await getDatabase(instanceName)
  return dbPromise(db, META_STORE, 'readwrite', (store) => {
    store.put(value, key)
  })
}

async function getInstanceVerifyCredentials (instanceName) {
  return getMetaProperty(instanceName, 'verifyCredentials')
}

async function setInstanceVerifyCredentials (instanceName, value) {
  return setMetaProperty(instanceName, 'verifyCredentials', value)
}

async function getInstanceInfo (instanceName) {
  return getMetaProperty(instanceName, 'instance')
}

async function setInstanceInfo (instanceName, value) {
  return setMetaProperty(instanceName, 'instance', value)
}

async function getLists (instanceName) {
  return getMetaProperty(instanceName, 'lists')
}

async function setLists (instanceName, value) {
  return setMetaProperty(instanceName, 'lists', value)
}

async function getCustomEmoji (instanceName) {
  return getMetaProperty(instanceName, 'customEmoji')
}

async function setCustomEmoji (instanceName, value) {
  return setMetaProperty(instanceName, 'customEmoji', value)
}

async function getFollowRequestCount (instanceName) {
  return getMetaProperty(instanceName, 'followRequestCount')
}

async function setFollowRequestCount (instanceName, value) {
  return setMetaProperty(instanceName, 'followRequestCount', value)
}

async function getFilters (instanceName) {
  return getMetaProperty(instanceName, 'filters')
}

async function setFilters (instanceName, value) {
  return setMetaProperty(instanceName, 'filters', value)
}

;// CONCATENATED MODULE: ./src/routes/_database/relationships.js




async function getRelationship (instanceName, accountId) {
  return getGenericEntityWithId(RELATIONSHIPS_STORE, relationshipsCache, instanceName, accountId)
}

async function setRelationship (instanceName, relationship) {
  return setGenericEntityWithId(RELATIONSHIPS_STORE, relationshipsCache, instanceName, cloneForStorage(relationship))
}

;// CONCATENATED MODULE: ./src/routes/_static/share.js
const WEB_SHARE_TARGET_DATA_IDB_KEY = 'web-share-data'

;// CONCATENATED MODULE: ./src/routes/_database/webShare.js



function deleteWebShareData () {
  return del(WEB_SHARE_TARGET_DATA_IDB_KEY)
}

function setWebShareData (data) {
  return set(WEB_SHARE_TARGET_DATA_IDB_KEY, data)
}

function getWebShareData () {
  return get(WEB_SHARE_TARGET_DATA_IDB_KEY)
}

function closeKeyValIDBConnection () {
  return idb_keyval_close()
}

;// CONCATENATED MODULE: ./src/routes/_database/mediaUploadFileCache.js
// Keep an LRU cache of recently-uploaded files for OCR.
// We keep them in IDB to avoid tainted canvas errors after a refresh.
// https://github.com/nolanlawson/pinafore/issues/1901



const mediaUploadFileCache_PREFIX = 'media-cache-'
const DELIMITER = '-cache-'
const LIMIT = 4 // you can upload 4 images per post, this seems reasonable despite cross-instance usage
const DELETE_AFTER = 604800000 // 7 days

let deleteAfter = DELETE_AFTER

function keyToData (key) {
  key = key.substring(mediaUploadFileCache_PREFIX.length)
  const index = key.indexOf(DELIMITER)
  // avoiding str.split() to not have to worry about ids containing the delimiter string somehow
  return [key.substring(0, index), key.substring(index + DELIMITER.length)]
}

function dataToKey (timestamp, id) {
  return `${mediaUploadFileCache_PREFIX}${timestamp}${DELIMITER}${id}`
}

async function getAllKeys () {
  return (await keys()).filter(key => key.startsWith(mediaUploadFileCache_PREFIX)).sort()
}

async function getCachedMediaFile (id) {
  const allKeys = await getAllKeys()

  for (const key of allKeys) {
    const otherId = keyToData(key)[1]
    if (id === otherId) {
      return get(key)
    }
  }
}

async function setCachedMediaFile (id, file) {
  const allKeys = await getAllKeys()

  if (allKeys.map(keyToData).map(_ => _[1]).includes(id)) {
    return // do nothing, it's already in there
  }

  while (allKeys.length >= LIMIT) {
    // already sorted in chronological order, so delete the oldest
    await del(allKeys.shift())
  }

  // delete anything that's too old, while we're at it
  for (const key of allKeys) {
    const timestamp = keyToData(key)[0]
    if (Date.now() - Date.parse(timestamp) >= deleteAfter) {
      await del(key)
    }
  }

  const key = dataToKey(new Date().toISOString(), id)

  await set(key, file)
}

async function deleteCachedMediaFile (id) {
  const allKeys = await getAllKeys()

  for (const key of allKeys) {
    const otherId = keyToData(key)[1]
    if (otherId === id) {
      await del(key)
    }
  }
}

// The following are only used in tests

async function getAllCachedFileIds () {
  return (await getAllKeys()).map(keyToData).map(_ => _[1])
}

function setDeleteCachedMediaFilesAfter (newDeleteAfter) {
  deleteAfter = newDeleteAfter
}

;// CONCATENATED MODULE: ./src/routes/_database/databaseApis.js















/***/ }),

/***/ 2992:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ CLEANUP_DELAY),
/* harmony export */   "f": () => (/* binding */ CLEANUP_TIME_AGO)
/* harmony export */ });
const CLEANUP_TIME_AGO = 5 * 24 * 60 * 60 * 1000 // five days ago
const CLEANUP_DELAY = 5 * 60 * 1000 // five minutes


/***/ })

};
;