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
})({"js/lib/viewPort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewPort = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewPort =
/*#__PURE__*/
function () {
  function ViewPort(element) {
    var elementPartTouch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    var bodyPartTouch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bottom';
    var add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, ViewPort);

    this.element = element;
    this.body = {
      bottom: element.getBoundingClientRect().bottom + add,
      left: element.getBoundingClientRect().left + add,
      right: element.getBoundingClientRect().right + add,
      top: element.getBoundingClientRect().top + add
    };
    this.screen = {
      positionScreenBottom: null,
      positionScreenTop: null
    };
    this.elementPartTouch = elementPartTouch;
    this.screenPartTouch = bodyPartTouch;
    this.topNegatif();
  }

  _createClass(ViewPort, [{
    key: "detectViewport",
    value: function detectViewport(callback) {
      var _this = this;

      window.addEventListener('scroll', function (event) {
        _this.screen.positionScreenBottom = window.pageYOffset + window.innerHeight;
        _this.screen.positionScreenTop = window.pageYOffset; // console.log( this.body.top , this.screen.positionScreenTop  )

        if (_this.elementPartTouch === 'top') {
          if (_this.screenPartTouch === 'bottom') {
            if (_this.body.top <= _this.screen.positionScreenBottom) {
              return callback(true);
            } else {
              return callback(false);
            }
          } else {
            if (_this.body.top <= 0) {
              return callback(true);
            } else {
              return callback(false);
            }
          }
        } else {
          if (_this.screenPartTouch === 'bottom') {
            console.log(_this.body.bottom, _this.screen.positionScreenBottom);

            if (_this.body.bottom <= _this.screen.positionScreenBottom) {
              return callback(true);
            } else {
              return callback(false);
            }
          } else {
            if (_this.body.bottom <= _this.screen.positionScreenTop) {
              return callback(true);
            } else {
              return callback(false);
            }
          }
        }
      });
    }
  }, {
    key: "topNegatif",
    value: function topNegatif() {
      if (this.body.top < 0) {
        this.body.top = String(this.body.top);
        this.body.top = this.body.top.substr(1);
        this.body.top = Number(this.body.top);
        this.body.bottom = this.body.bottom + this.body.top;
      }
    }
  }]);

  return ViewPort;
}();

exports.ViewPort = ViewPort;
},{}],"js/function/cursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cursor = void 0;

var _viewPort = require("../lib/viewPort");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var givPotionPointer =
/*#__PURE__*/
function () {
  function givPotionPointer(element, child) {
    _classCallCheck(this, givPotionPointer);

    this.element = element;
    this.x = null;
    this.y = null;
    this.initialisation();
    this.detectMoveCursor();
    this.child = child;
    this.scaleX = 0;
    this.scaleY = 0;
    this.clearDeformatiom();
  }

  _createClass(givPotionPointer, [{
    key: "detectMoveCursor",
    value: function detectMoveCursor() {
      var _this = this;

      window.addEventListener('mousemove', function (event) {
        _this.x = event.clientX - _this.element.getBoundingClientRect().width / 2;
        _this.y = window.pageYOffset + event.clientY - _this.element.getBoundingClientRect().height / 2;

        _this.giveMemoXY();

        if (_this.memoX > _this.x) {
          _this.scaleX++;
        } else {
          _this.scaleX--;
        }

        if (_this.memoY > _this.y) {
          _this.scaleY++;
        } else {
          _this.scaleY--;
        }

        _this.element.style.left = "".concat(_this.x, "px");
        _this.element.style.top = "".concat(_this.y, "px");
        _this.element.style.transform = "skew(".concat(_this.scaleX * 1.5, "deg , ").concat(_this.scaleY * 1.5, "deg)");
      });
    }
  }, {
    key: "giveMemoXY",
    value: function giveMemoXY() {
      if (!this.x && !this.y) {
        this.memoX = this.x;
        this.memoY = this.y;
      }
    }
  }, {
    key: "clearDeformatiom",
    value: function clearDeformatiom() {
      var _this2 = this;

      setInterval(function () {
        if (_this2.scaleY < 0) {
          _this2.scaleY++;
        } else {
          _this2.scaleY--;
        }

        if (_this2.scaleX < 0) {
          _this2.scaleX++;
        } else {
          _this2.scaleX--;
        }
      }, 25);
      setInterval(function () {
        _this2.element.style.transform = "skew(".concat(_this2.scaleX, "deg , ").concat(_this2.scaleY, "deg)");
      }, 10);
      setInterval(function () {
        _this2.memoX = _this2.x;
        _this2.memoY = _this2.y;
      }, 100);
    }
  }, {
    key: "initialisation",
    value: function initialisation() {}
  }]);

  return givPotionPointer;
}();

var cursor = function cursor() {
  var elipse = document.querySelector('.cursor.cursor__Two');
  var circle = document.querySelector('.cursor__one');

  if (window.innerWidth > 800) {
    var pointerCircle = new givPotionPointer(circle);
    var pointerEliplse = new givPotionPointer(elipse);
  }
};

exports.cursor = cursor;
cursor();
},{"../lib/viewPort":"js/lib/viewPort.js"}],"assets/images/présentation_project/MontreConnecter.1.svg":[function(require,module,exports) {
module.exports = "/MontreConnecter.1.b29c4f11.svg";
},{}],"js/projet/projects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projects = void 0;
var projects = [{
  title: 'ARMANI',
  type: 'Projet personnel',
  numberProject: '1',
  subTitle: 'Projet : intégration',
  skills: ['xd', 'JavaScript', 'Rellax', 'Html', 'Sass'],
  image: require('../../assets/images/présentation_project/MontreConnecter.1.svg'),
  button: 'VISITER LE SITE',
  modifier: 'armani'
}, {
  title: 'SO’COMPTOIR',
  type: 'Projet école',
  numberProject: '2',
  subTitle: 'Projet : UI / UI',
  skills: ['xd', 'illustrator'],
  image: require('../../assets/images/présentation_project/MontreConnecter.1.svg'),
  button: 'REGARDER LES MAQUETTES',
  modifier: 'so_comptoir'
}, {
  title: 'SPACE-INVADERS',
  type: 'Projet personnel',
  numberProject: '3',
  subTitle: 'Projet : Javascript',
  skills: ['JavaScript', 'Canvas', 'Html', 'Sass'],
  image: require('../../assets/images/présentation_project/MontreConnecter.1.svg'),
  button: 'JOUER AU JEU',
  modifier: 'space_invaders'
}];
exports.projects = projects;
},{"../../assets/images/présentation_project/MontreConnecter.1.svg":"assets/images/présentation_project/MontreConnecter.1.svg"}],"js/projet/projetMV.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeOfProject = changeOfProject;

var _projects = require("./projects");

console.log('ok');
var numberProject = 0;

function changeOfProject() {
  renderChangeOfProject();
}

function renderChangeOfProject() {
  var project = document.querySelector('#home__page .project');
  project.innerHTML = "";
  numberProject++;

  if (numberProject > _projects.projects.length - 1) {
    numberProject = 0;
  }

  var tween = TweenLite.to(".circlesWhite", 15, {
    css: {
      animation: 'rotationCircle 15s infinite , retractation 4s forwards'
    }
  });
  setTimeout(function () {
    var tween = TweenLite.to(".circlesWhite", 15, {
      css: {
        animation: 'rotationCircle 15s infinite'
      }
    });
  }, 2900);
  var view = ChangeOfProjectView(_projects.projects[numberProject]);
  project.appendChild(view.illustrationOfProject);
  project.appendChild(view.titlOfProject);
  renderNavProject(project);
}

var ChangeOfProjectView = function ChangeOfProjectView(project) {
  var view = {
    img: document.createElement('img'),
    titlOfProject: document.createElement('div'),
    illustrationOfProject: document.createElement('div'),
    a: document.createElement('a'),
    button: document.createElement('button'),
    render: function render() {
      this.a.href = "#hideenDiv";
      this.img.src = project.assets.pesentation;
      view.a.appendChild(this.img);
      this.illustrationOfProject.appendChild(this.a);
      this.titlOfProject.innerHTML = "<h3 class='".concat(project.modifier, "'>").concat(project.title, "</h3> <h4 class=\"type__of__projet\" >").concat(project.subTitle, "</h4>");
    }
  };
  view.illustrationOfProject.className = 'illustration__of__project';
  view.illustrationOfProject.addEventListener('click', function () {
    Theproject(numberProject);
  });
  view.titlOfProject.className = 'title__of__project';
  view.render();
  return view;
};
},{"./projects":"js/projet/projects.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SrollPosition = void 0;

var _cursor = require("./function/cursor");

var _viewPort = require("./lib/viewPort");

var _projetMV = require("./projet/projetMV");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// let requireCusor = require('../assets/images/icons/cursor.svg'); 
// console.log(requireCusor)
var SrollPosition =
/*#__PURE__*/
function () {
  function SrollPosition(element) {
    _classCallCheck(this, SrollPosition);

    this.element = element;
    this.positionX = -100;
    this.numberMove = 0;
    this.memoNumberMove = this.numberMove;
    this.inversion = false;
    this.waitTime = false;
    this.bottomPage = false;
    this.projectStyles = {
      translateZ: 0,
      opacity: 1
    };
  }

  _createClass(SrollPosition, [{
    key: "detectScroll",
    value: function detectScroll() {
      var _this = this;

      this.element.style.transform = "translateX( ".concat(this.positionX, "vw)"); // this.inversionPosition();

      this.detectSwipe();
      document.addEventListener("mousewheel", function (event) {
        if (!_this.checkBottomPage()) {
          return;
        }

        if (_this.positionX < 0) {
          _this.positionX = _this.positionX + event.deltaY / 2.7;
          _this.projectStyles.translateZ = _this.projectStyles.translateZ + event.deltaY / 4.5 * 75;

          if (_this.positionX >= 0) {
            _this.positionX = 0;
            _this.projectStyles.translateZ = 2024;
            (0, _projetMV.changeOfProject)();
            TweenLite.to(".project", 1, {
              css: {
                transform: "translate3d( 0px , 0px , ".concat(_this.projectStyles.translateZ, "px)")
              }
            }); // for restes property for next project

            _this.projectStyles.translateZ = 0;
            _this.projectStyles.opacity = 1;
          }

          if (_this.positionX < -100) {
            _this.positionX = -100;
            _this.projectStyles.translateZ = 0;
          }

          if (_this.positionX >= 0) {
            _this.positionX = 0;
            _this.projectStyles.translateZ = 100;
          }

          _this.element.style.transform = "translateX( ".concat(_this.positionX, "vw)");

          _this.projecTransform3d();

          _this.inversion = true;
        }
      });
    }
  }, {
    key: "detectSwipe",
    value: function detectSwipe() {
      var _this2 = this;

      document.addEventListener('touchstart', function (evnt) {
        var startClientY = evnt.changedTouches[0].clientY;
        document.addEventListener('touchmove', function (event) {
          console.log(event);

          if (!_this2.checkBottomPage()) {
            return;
          }

          _this2.inversion = false;
          var touchDelta = event.changedTouches[0].clientY - startClientY;

          if (touchDelta < 0) {
            touchDelta = touchDelta.toString();
            touchDelta = touchDelta.replace(/-/, ' ');
            touchDelta = Number(touchDelta) / 100 * 100;
          } else {
            return;
          }

          if (_this2.positionX < 0) {
            _this2.positionX = _this2.positionX + touchDelta / 10;

            if (_this2.positionX > 0) {
              _this2.positionX = 0;
              (0, _projetMV.changeOfProject)();
            }

            if (_this2.positionX < -100) {
              _this2.positionX = -100;
            }

            _this2.element.style.transform = "translateX( ".concat(_this2.positionX, "vw)");

            _this2.checkInversionPosition(_this2.positionX);
          }
        });
        document.addEventListener('touchstart', function (event) {
          startClientY = 0;
        });
      });
    }
  }, {
    key: "checkInversionPosition",
    value: function checkInversionPosition(positionX) {
      var _this3 = this;

      var MemoPositionX = positionX;
      setTimeout(function () {
        if (MemoPositionX, _this3.positionX || _this3.positionX === 0) {
          _this3.inversion = true;
        }
      }, 1500);
    }
  }, {
    key: "checkBottomPage",
    value: function checkBottomPage() {
      var _this4 = this;

      var options = {
        root: document.querySelector('body'),
        rootMargin: '0px',
        threshold: 1.0
      };
      var viewPort = new _viewPort.ViewPort(document.querySelector('body'), 'bottom', 'bottom');
      viewPort.detectViewport(function (callback) {
        if (callback) {
          _this4.bottomPage = true;
        } else {
          _this4.bottomPage = false;
        }
      });
      return this.bottomPage;
    }
  }, {
    key: "projecTransform3d",
    value: function projecTransform3d() {
      this.projectStyles.opacity = this.projectStyles.opacity - 0.008;
      TweenLite.to(".project", 3, {
        css: {
          transform: "translate3d( 0px , 0px , -".concat(this.projectStyles.translateZ, "px)"),
          opacity: this.projectStyles.opacity
        },
        ease: Power2.easeOut
      });
    }
  }]);

  return SrollPosition;
}();

exports.SrollPosition = SrollPosition;
var srollPosition = new SrollPosition(document.querySelector('.sroll__barre'));
srollPosition.detectScroll(); // let viewPort = new ViewPort( dom , 'bottom' , 'bottom' , 0  )
// viewPort.detectViewport( (callback)=>{
//   if (callback) {
//   }
// })
},{"./function/cursor":"js/function/cursor.js","./lib/viewPort":"js/lib/viewPort.js","./projet/projetMV":"js/projet/projetMV.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62433" + '/');

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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map