// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/createStore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createStore = function createStore(reducer, initialState) {
  // create a Store Object which contains everything
  var store = {}; // create state 

  store.state = initialState; // create listeners 

  store.listeners = []; // Create getState Method

  store.getState = function () {
    return store.state;
  }; // Create Subscribers


  store.subscribe = function (listener) {
    return store.listeners.push(listener);
  }; // Create Dispatch Method


  store.dispatch = function (action) {
    store.state = reducer(store.state, action);
    store.listeners.forEach(function (listener) {
      return listener();
    });
  };

  return store;
};

var _default = createStore;
exports.default = _default;
},{}],"scripts/reducer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Define our State
var initialState = [{
  'url': 'https://twitter.com',
  'name': 'twitter',
  'isFav': false,
  'id': 'sldjflasjdf'
}];

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_BOOKMARKS':
      return state.concat(action.payload);
      break;

    case 'REMOVE_BOOKMARKS':
      return state.filter(function (bookmark) {
        return bookmark.id !== action.payload;
      });
      break;

    case 'TOGGLE_FAVOURITE':
      return state.map(function (bookmark) {
        if (bookmark.id === action.payload) {
          bookmark.isFav = !bookmark.isFav;
        }

        return bookmark;
      });
      break;

    default:
      return state;
      break;
  }
};

var _default = reducer;
exports.default = _default;
},{}],"scripts/createListItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = require("./app");

var createListItem = function createListItem(bookmark) {
  var li = document.createElement('li');
  li.className = 'list-group-item d-flex';
  var img = document.createElement('img');
  img.src = "//logo.clearbit.com/".concat(bookmark.name);
  img.alt = bookmark.name;
  img.className = 'avatar';
  var text = document.createElement('p');
  text.className = 'lead ml-4';
  text.innerHTML = bookmark.name;
  text.style.cursor = 'pointer';

  text.onclick = function () {
    window.open(bookmark.name, '_blank');
  };

  var iconContainer = document.createElement('div');
  iconContainer.className = 'ml-auto';
  var favIcon = document.createElement('span');
  var i = document.createElement('i');
  i.className = "".concat(bookmark.isFav ? 'fas' : 'far', " fa-heart");
  favIcon.appendChild(i);

  favIcon.onclick = function () {
    _app.store.dispatch({
      type: 'TOGGLE_FAVOURITE',
      payload: bookmark.id
    });

    localStorage.setItem('bookmarks', JSON.stringify(_app.store.getState()));
  };

  var deleteIcon = document.createElement('span');
  deleteIcon.innerHTML = "<i class=\"fas fa-trash\"></i>";
  deleteIcon.className = 'mx-3';

  deleteIcon.onclick = function () {
    _app.store.dispatch({
      type: 'REMOVE_BOOKMARKS',
      payload: bookmark.id
    });

    localStorage.setItem('bookmarks', JSON.stringify(_app.store.getState()));
  };

  iconContainer.appendChild(deleteIcon);
  iconContainer.appendChild(favIcon);
  li.appendChild(img);
  li.appendChild(text);
  li.appendChild(iconContainer);
  return li;
};

var _default = createListItem;
exports.default = _default;
},{"./app":"scripts/app.js"}],"scripts/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _createStore = _interopRequireDefault(require("./createStore"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _createListItem = _interopRequireDefault(require("./createListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = [];

if (localStorage.getItem('bookmarks')) {
  init = JSON.parse(localStorage.getItem('bookmarks'));
}

var store = (0, _createStore.default)(_reducer.default, init);
exports.store = store;
console.log(store);

window.onload = function () {
  // grab all needed elements
  var inputField = document.querySelector('#urlInput');
  var favouriteBookmarks = document.querySelector('#favouriteBookmarks');
  var allBookmarks = document.querySelector('#allBookmarks'); // render our bookmarks from localstroge

  if (store.getState().length > 0) {
    store.getState().map(function (bookmark) {
      var li = (0, _createListItem.default)(bookmark);
      allBookmarks.appendChild(li); // check if favourite

      if (bookmark.isFav) {
        favouriteBookmarks.appendChild(li);
      }
    });
  }

  inputField.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
      // our desire bookmark object
      var url = e.target.value;
      var name = domainName(url);
      var isFav = false;
      var id = create_UUID(); // create list-item passing our bookmark object

      var li = (0, _createListItem.default)({
        url: url,
        name: name,
        isFav: isFav,
        id: id
      }); // push into our store

      store.dispatch({
        type: 'ADD_BOOKMARKS',
        payload: {
          url: url,
          name: name,
          isFav: isFav,
          id: id
        }
      });
      e.target.value = '';
      localStorage.setItem('bookmarks', JSON.stringify(store.getState()));
    }
  }); // subscribe for all bookmark list

  store.subscribe(function () {
    allBookmarks.innerHTML = null;
    store.getState().map(function (bookmark) {
      var li = (0, _createListItem.default)(bookmark);
      allBookmarks.appendChild(li);
    });
  }); // subscribe for favourite Bookmarks list

  store.subscribe(function () {
    favouriteBookmarks.innerHTML = null;
    store.getState().map(function (bookmark) {
      if (bookmark.isFav) {
        var li = (0, _createListItem.default)(bookmark);
        favouriteBookmarks.appendChild(li);
      }
    });
  });
}; // grab the domain name from url


function domainName(url) {
  return url.match(/:\/\/(.[^/)]+)/)[1];
} // generate a unique id


function create_UUID() {
  var date = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c == 'x' ? r : r & 0 * 3 | 0 * 8).toString(16);
  });
  return uuid;
}
},{"./createStore":"scripts/createStore.js","./reducer":"scripts/reducer.js","./createListItem":"scripts/createListItem.js"}],"../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44713" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/app.js"], null)
//# sourceMappingURL=/app.c09d0a7b.js.map