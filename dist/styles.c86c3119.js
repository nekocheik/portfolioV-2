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
})({"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"styles/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../assets/fonts/Avenir/AvenirLTStd-BookOblique.woff2":[["AvenirLTStd-BookOblique.2aa40d26.woff2","assets/fonts/Avenir/AvenirLTStd-BookOblique.woff2"],"assets/fonts/Avenir/AvenirLTStd-BookOblique.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-BookOblique.woff":[["AvenirLTStd-BookOblique.b6b230ab.woff","assets/fonts/Avenir/AvenirLTStd-BookOblique.woff"],"assets/fonts/Avenir/AvenirLTStd-BookOblique.woff"],"./../assets/fonts/Avenir/AvenirLTStd-BlackOblique.woff2":[["AvenirLTStd-BlackOblique.33f92660.woff2","assets/fonts/Avenir/AvenirLTStd-BlackOblique.woff2"],"assets/fonts/Avenir/AvenirLTStd-BlackOblique.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-BlackOblique.woff":[["AvenirLTStd-BlackOblique.b83f1a85.woff","assets/fonts/Avenir/AvenirLTStd-BlackOblique.woff"],"assets/fonts/Avenir/AvenirLTStd-BlackOblique.woff"],"./../assets/fonts/Avenir/AvenirLTStd-MediumOblique.woff":[["AvenirLTStd-MediumOblique.f2ada582.woff","assets/fonts/Avenir/AvenirLTStd-MediumOblique.woff"],"assets/fonts/Avenir/AvenirLTStd-MediumOblique.woff"],"./../assets/fonts/Avenir/AvenirLTStd-Book.woff2":[["AvenirLTStd-Book.14066f26.woff2","assets/fonts/Avenir/AvenirLTStd-Book.woff2"],"assets/fonts/Avenir/AvenirLTStd-Book.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-Book.woff":[["AvenirLTStd-Book.561e474f.woff","assets/fonts/Avenir/AvenirLTStd-Book.woff"],"assets/fonts/Avenir/AvenirLTStd-Book.woff"],"./../assets/fonts/Avenir/AvenirLTStd-LightOblique.woff2":[["AvenirLTStd-LightOblique.726d8cd2.woff2","assets/fonts/Avenir/AvenirLTStd-LightOblique.woff2"],"assets/fonts/Avenir/AvenirLTStd-LightOblique.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-LightOblique.woff":[["AvenirLTStd-LightOblique.c6dcb3fd.woff","assets/fonts/Avenir/AvenirLTStd-LightOblique.woff"],"assets/fonts/Avenir/AvenirLTStd-LightOblique.woff"],"./../assets/fonts/Avenir/AvenirLTStd-Roman.woff":[["AvenirLTStd-Roman.72c19c07.woff","assets/fonts/Avenir/AvenirLTStd-Roman.woff"],"assets/fonts/Avenir/AvenirLTStd-Roman.woff"],"./../assets/fonts/Avenir/AvenirLTStd-Heavy.woff2":[["AvenirLTStd-Heavy.3c5d69b1.woff2","assets/fonts/Avenir/AvenirLTStd-Heavy.woff2"],"assets/fonts/Avenir/AvenirLTStd-Heavy.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-Heavy.woff":[["AvenirLTStd-Heavy.0af4a684.woff","assets/fonts/Avenir/AvenirLTStd-Heavy.woff"],"assets/fonts/Avenir/AvenirLTStd-Heavy.woff"],"./../assets/fonts/Avenir/AvenirLTStd-Medium.woff":[["AvenirLTStd-Medium.7a3391b4.woff","assets/fonts/Avenir/AvenirLTStd-Medium.woff"],"assets/fonts/Avenir/AvenirLTStd-Medium.woff"],"./../assets/fonts/Avenir/AvenirLTStd-Light.woff2":[["AvenirLTStd-Light.63f2ec45.woff2","assets/fonts/Avenir/AvenirLTStd-Light.woff2"],"assets/fonts/Avenir/AvenirLTStd-Light.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-Light.woff":[["AvenirLTStd-Light.ac2af951.woff","assets/fonts/Avenir/AvenirLTStd-Light.woff"],"assets/fonts/Avenir/AvenirLTStd-Light.woff"],"./../assets/fonts/Avenir/AvenirLTStd-Black.woff2":[["AvenirLTStd-Black.cefa54cf.woff2","assets/fonts/Avenir/AvenirLTStd-Black.woff2"],"assets/fonts/Avenir/AvenirLTStd-Black.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-Black.woff":[["AvenirLTStd-Black.d9e3b08f.woff","assets/fonts/Avenir/AvenirLTStd-Black.woff"],"assets/fonts/Avenir/AvenirLTStd-Black.woff"],"./../assets/fonts/Avenir/AvenirLTStd-Oblique.woff2":[["AvenirLTStd-Oblique.e8231fd6.woff2","assets/fonts/Avenir/AvenirLTStd-Oblique.woff2"],"assets/fonts/Avenir/AvenirLTStd-Oblique.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-Oblique.woff":[["AvenirLTStd-Oblique.a5044faf.woff","assets/fonts/Avenir/AvenirLTStd-Oblique.woff"],"assets/fonts/Avenir/AvenirLTStd-Oblique.woff"],"./../assets/fonts/Avenir/AvenirLTStd-HeavyOblique.woff2":[["AvenirLTStd-HeavyOblique.ef703afa.woff2","assets/fonts/Avenir/AvenirLTStd-HeavyOblique.woff2"],"assets/fonts/Avenir/AvenirLTStd-HeavyOblique.woff2"],"./../assets/fonts/Avenir/AvenirLTStd-HeavyOblique.woff":[["AvenirLTStd-HeavyOblique.404234c4.woff","assets/fonts/Avenir/AvenirLTStd-HeavyOblique.woff"],"assets/fonts/Avenir/AvenirLTStd-HeavyOblique.woff"],"./../assets/fonts/LemonMilk/LemonMilkbold.woff2":[["LemonMilkbold.66d9e799.woff2","assets/fonts/LemonMilk/LemonMilkbold.woff2"],"assets/fonts/LemonMilk/LemonMilkbold.woff2"],"./../assets/fonts/LemonMilk/LemonMilkbold.woff":[["LemonMilkbold.a9c84fa6.woff","assets/fonts/LemonMilk/LemonMilkbold.woff"],"assets/fonts/LemonMilk/LemonMilkbold.woff"],"./../assets/fonts/LemonMilk/LemonMilklight.woff2":[["LemonMilklight.c5b0a3d8.woff2","assets/fonts/LemonMilk/LemonMilklight.woff2"],"assets/fonts/LemonMilk/LemonMilklight.woff2"],"./../assets/fonts/LemonMilk/LemonMilklight.woff":[["LemonMilklight.b987b550.woff","assets/fonts/LemonMilk/LemonMilklight.woff"],"assets/fonts/LemonMilk/LemonMilklight.woff"],"./../assets/fonts/LemonMilk/LemonMilkbolditalic.woff2":[["LemonMilkbolditalic.7d03a03c.woff2","assets/fonts/LemonMilk/LemonMilkbolditalic.woff2"],"assets/fonts/LemonMilk/LemonMilkbolditalic.woff2"],"./../assets/fonts/LemonMilk/LemonMilkbolditalic.woff":[["LemonMilkbolditalic.3dd2179e.woff","assets/fonts/LemonMilk/LemonMilkbolditalic.woff"],"assets/fonts/LemonMilk/LemonMilkbolditalic.woff"],"./../assets/fonts/LemonMilk/LemonMilkitalic.woff2":[["LemonMilkitalic.edc6277c.woff2","assets/fonts/LemonMilk/LemonMilkitalic.woff2"],"assets/fonts/LemonMilk/LemonMilkitalic.woff2"],"./../assets/fonts/LemonMilk/LemonMilkitalic.woff":[["LemonMilkitalic.cbce27d0.woff","assets/fonts/LemonMilk/LemonMilkitalic.woff"],"assets/fonts/LemonMilk/LemonMilkitalic.woff"],"./../assets/fonts/LemonMilk/LemonMilk.woff2":[["LemonMilk.a1650ff7.woff2","assets/fonts/LemonMilk/LemonMilk.woff2"],"assets/fonts/LemonMilk/LemonMilk.woff2"],"./../assets/fonts/LemonMilk/LemonMilk.woff":[["LemonMilk.16e08b7b.woff","assets/fonts/LemonMilk/LemonMilk.woff"],"assets/fonts/LemonMilk/LemonMilk.woff"],"./../assets/fonts/LemonMilk/LemonMilklightitalic.woff2":[["LemonMilklightitalic.d305a6a1.woff2","assets/fonts/LemonMilk/LemonMilklightitalic.woff2"],"assets/fonts/LemonMilk/LemonMilklightitalic.woff2"],"./../assets/fonts/LemonMilk/LemonMilklightitalic.woff":[["LemonMilklightitalic.e2c7ecff.woff","assets/fonts/LemonMilk/LemonMilklightitalic.woff"],"assets/fonts/LemonMilk/LemonMilklightitalic.woff"],"_css_loader":"../node_modules/parcel/src/builtins/css-loader.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50796" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/styles.c86c3119.js.map