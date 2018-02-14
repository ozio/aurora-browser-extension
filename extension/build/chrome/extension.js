/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reconnecting_websocket__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reconnecting_websocket___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reconnecting_websocket__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const WEBSOCKET_PROTOCOL = 'ws';
const WEBSOCKET_PORT = 1337;
const WEBSOCKET_DOMAIN = 'localhost';
const WEBSOCKET_PATH = '';
const WEBSOCKET_URL = `${WEBSOCKET_PROTOCOL}://${WEBSOCKET_DOMAIN}:${WEBSOCKET_PORT}/${WEBSOCKET_PATH}`;
const API_VERSION = 1;
class Extension {
    constructor() {
        this.currentURL = null;
        this.isBrowserFocused = null;
        this.connect(WEBSOCKET_URL);
        this.addListeners();
        this.ws.addEventListener('open', () => __awaiter(this, void 0, void 0, function* () {
            yield this.updateFocus(true);
            yield this.updateCurrentURL(true);
        }));
    }
    static getURLData(url) {
        const urlObject = new URL(url);
        const searchObject = {};
        for (let item of urlObject.searchParams) {
            searchObject[item[0]] = item[1];
        }
        return {
            hash: urlObject.hash,
            host: urlObject.host,
            hostname: urlObject.hostname,
            href: urlObject.href,
            password: urlObject.password,
            pathname: urlObject.pathname,
            port: urlObject.port,
            protocol: urlObject.protocol,
            username: urlObject.username,
            search: urlObject.search,
            searchParams: searchObject,
        };
    }
    connect(path) {
        this.ws = new __WEBPACK_IMPORTED_MODULE_0_reconnecting_websocket__(path);
    }
    sendMessage(type, payload) {
        const message = Object.assign({}, payload, { type, version: API_VERSION });
        try {
            this.ws.send(JSON.stringify(message));
        }
        catch (e) { }
    }
    updateCurrentURL(forceUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.getCurrentURL();
            const urlHasChanged = url !== this.currentURL;
            if (urlHasChanged || forceUpdate) {
                if (url)
                    this.currentURL = url;
                if (!(this.isBrowserFocused === true || forceUpdate))
                    return;
                this.sendMessage('url', Object.assign({}, Extension.getURLData(this.currentURL)));
            }
        });
    }
    updateFocus(forceUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const focused = yield this.getFocused();
            if (!(this.isBrowserFocused !== focused || forceUpdate))
                return;
            this.isBrowserFocused = focused;
            this.sendMessage('focus', { focused });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Extension);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

;
;
;
var isWebSocket = function (constructor) {
    return constructor && constructor.CLOSING === 2;
};
var isGlobalWebSocket = function () {
    return typeof WebSocket !== 'undefined' && isWebSocket(WebSocket);
};
var getDefaultOptions = function () { return ({
    constructor: isGlobalWebSocket() ? WebSocket : null,
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1500,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4000,
    maxRetries: Infinity,
    debug: false,
}); };
var bypassProperty = function (src, dst, name) {
    Object.defineProperty(dst, name, {
        get: function () { return src[name]; },
        set: function (value) { src[name] = value; },
        enumerable: true,
        configurable: true,
    });
};
var initReconnectionDelay = function (config) {
    return (config.minReconnectionDelay + Math.random() * config.minReconnectionDelay);
};
var updateReconnectionDelay = function (config, previousDelay) {
    var newDelay = previousDelay * config.reconnectionDelayGrowFactor;
    return (newDelay > config.maxReconnectionDelay)
        ? config.maxReconnectionDelay
        : newDelay;
};
var LEVEL_0_EVENTS = ['onopen', 'onclose', 'onmessage', 'onerror'];
var reassignEventListeners = function (ws, oldWs, listeners) {
    Object.keys(listeners).forEach(function (type) {
        listeners[type].forEach(function (_a) {
            var listener = _a[0], options = _a[1];
            ws.addEventListener(type, listener, options);
        });
    });
    if (oldWs) {
        LEVEL_0_EVENTS.forEach(function (name) {
            ws[name] = oldWs[name];
        });
    }
};
var ReconnectingWebsocket = function (url, protocols, options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var ws;
    var connectingTimeout;
    var reconnectDelay = 0;
    var retriesCount = 0;
    var shouldRetry = true;
    var savedOnClose = null;
    var listeners = {};
    // require new to construct
    if (!(this instanceof ReconnectingWebsocket)) {
        throw new TypeError("Failed to construct 'ReconnectingWebSocket': Please use the 'new' operator");
    }
    // Set config. Not using `Object.assign` because of IE11
    var config = getDefaultOptions();
    Object.keys(config)
        .filter(function (key) { return options.hasOwnProperty(key); })
        .forEach(function (key) { return config[key] = options[key]; });
    if (!isWebSocket(config.constructor)) {
        throw new TypeError('Invalid WebSocket constructor. Set `options.constructor`');
    }
    var log = config.debug ? function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return console.log.apply(console, ['RWS:'].concat(params));
    } : function () { };
    /**
     * Not using dispatchEvent, otherwise we must use a DOM Event object
     * Deferred because we want to handle the close event before this
     */
    var emitError = function (code, msg) { return setTimeout(function () {
        var err = new Error(msg);
        err.code = code;
        if (Array.isArray(listeners.error)) {
            listeners.error.forEach(function (_a) {
                var fn = _a[0];
                return fn(err);
            });
        }
        if (ws.onerror) {
            ws.onerror(err);
        }
    }, 0); };
    var handleClose = function () {
        log('handleClose', { shouldRetry: shouldRetry });
        retriesCount++;
        log('retries count:', retriesCount);
        if (retriesCount > config.maxRetries) {
            emitError('EHOSTDOWN', 'Too many failed connection attempts');
            return;
        }
        if (!reconnectDelay) {
            reconnectDelay = initReconnectionDelay(config);
        }
        else {
            reconnectDelay = updateReconnectionDelay(config, reconnectDelay);
        }
        log('handleClose - reconnectDelay:', reconnectDelay);
        if (shouldRetry) {
            setTimeout(connect, reconnectDelay);
        }
    };
    var connect = function () {
        if (!shouldRetry) {
            return;
        }
        log('connect');
        var oldWs = ws;
        var wsUrl = (typeof url === 'function') ? url() : url;
        ws = new config.constructor(wsUrl, protocols);
        connectingTimeout = setTimeout(function () {
            log('timeout');
            ws.close();
            emitError('ETIMEDOUT', 'Connection timeout');
        }, config.connectionTimeout);
        log('bypass properties');
        for (var key in ws) {
            // @todo move to constant
            if (['addEventListener', 'removeEventListener', 'close', 'send'].indexOf(key) < 0) {
                bypassProperty(ws, _this, key);
            }
        }
        ws.addEventListener('open', function () {
            clearTimeout(connectingTimeout);
            log('open');
            reconnectDelay = initReconnectionDelay(config);
            log('reconnectDelay:', reconnectDelay);
            retriesCount = 0;
        });
        ws.addEventListener('close', handleClose);
        reassignEventListeners(ws, oldWs, listeners);
        // because when closing with fastClose=true, it is saved and set to null to avoid double calls
        ws.onclose = ws.onclose || savedOnClose;
        savedOnClose = null;
    };
    log('init');
    connect();
    this.close = function (code, reason, _a) {
        if (code === void 0) { code = 1000; }
        if (reason === void 0) { reason = ''; }
        var _b = _a === void 0 ? {} : _a, _c = _b.keepClosed, keepClosed = _c === void 0 ? false : _c, _d = _b.fastClose, fastClose = _d === void 0 ? true : _d, _e = _b.delay, delay = _e === void 0 ? 0 : _e;
        log('close - params:', { reason: reason, keepClosed: keepClosed, fastClose: fastClose, delay: delay, retriesCount: retriesCount, maxRetries: config.maxRetries });
        shouldRetry = !keepClosed && retriesCount <= config.maxRetries;
        if (delay) {
            reconnectDelay = delay;
        }
        ws.close(code, reason);
        if (fastClose) {
            var fakeCloseEvent_1 = {
                code: code,
                reason: reason,
                wasClean: true,
            };
            // execute close listeners soon with a fake closeEvent
            // and remove them from the WS instance so they
            // don't get fired on the real close.
            handleClose();
            ws.removeEventListener('close', handleClose);
            // run and remove level2
            if (Array.isArray(listeners.close)) {
                listeners.close.forEach(function (_a) {
                    var listener = _a[0], options = _a[1];
                    listener(fakeCloseEvent_1);
                    ws.removeEventListener('close', listener, options);
                });
            }
            // run and remove level0
            if (ws.onclose) {
                savedOnClose = ws.onclose;
                ws.onclose(fakeCloseEvent_1);
                ws.onclose = null;
            }
        }
    };
    this.send = function (data) {
        ws.send(data);
    };
    this.addEventListener = function (type, listener, options) {
        if (Array.isArray(listeners[type])) {
            if (!listeners[type].some(function (_a) {
                var l = _a[0];
                return l === listener;
            })) {
                listeners[type].push([listener, options]);
            }
        }
        else {
            listeners[type] = [[listener, options]];
        }
        ws.addEventListener(type, listener, options);
    };
    this.removeEventListener = function (type, listener, options) {
        if (Array.isArray(listeners[type])) {
            listeners[type] = listeners[type].filter(function (_a) {
                var l = _a[0];
                return l !== listener;
            });
        }
        ws.removeEventListener(type, listener, options);
    };
};
module.exports = ReconnectingWebsocket;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adapter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manifest_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manifest_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__manifest_json__);


const extension = new __WEBPACK_IMPORTED_MODULE_0__adapter__["a" /* default */]();


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class ChromeExtension extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {
    addListeners() {
        const updateFocusHandler = () => __awaiter(this, void 0, void 0, function* () {
            yield this.updateFocus();
            if (this.isBrowserFocused) {
                this.updateCurrentURL(true);
            }
        });
        const updateUrlHandler = () => {
            this.updateCurrentURL();
        };
        chrome.windows.onFocusChanged.addListener(updateFocusHandler);
        chrome.tabs.onCreated.addListener(updateUrlHandler);
        chrome.tabs.onUpdated.addListener(updateUrlHandler);
        chrome.tabs.onMoved.addListener(updateUrlHandler);
        chrome.tabs.onActivated.addListener(updateUrlHandler);
        chrome.tabs.onHighlighted.addListener(updateUrlHandler);
        chrome.tabs.onDetached.addListener(updateUrlHandler);
        chrome.tabs.onAttached.addListener(updateUrlHandler);
        chrome.tabs.onRemoved.addListener(updateUrlHandler);
        chrome.tabs.onReplaced.addListener(updateUrlHandler);
    }
    getCurrentURL() {
        return new Promise((resolve) => {
            chrome.tabs.query({
                active: true,
                windowId: chrome.windows.WINDOW_ID_CURRENT
            }, (tabs) => {
                let url;
                if (tabs[0] && tabs[0].url) {
                    url = tabs[0].url;
                }
                else {
                    url = null;
                }
                resolve(url);
            });
        });
    }
    getFocused() {
        return new Promise((resolve) => {
            chrome.windows.getCurrent(null, (window) => {
                const focusedNow = window && window.focused;
                resolve(focusedNow);
            });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ChromeExtension);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./extension/build/chrome/manifest.json";

/***/ })
/******/ ]);
//# sourceMappingURL=extension.js.map