(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Archivos del sistema anterio\htdocs\Angular\Angular_Practicas\infoPais\src\styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ":root {\n  --color-red100: #e84545;\n  --color-red50: #903749;\n  --color-red30: #53354a;\n  --color-indigo700: #3d0a91;\n  --color-blueDemon: #2b2e4a;\n  --color-indigo900: #140330;\n  --color-gray700: #495057;\n  --color-gray900: #212529;\n}\nbody {\n  background-color: #f3f3f3;\n}\n.circleLoader {\n  margin: 0px;\n  display: inline-block;\n  width: 8em;\n  height: 8em;\n  border-radius: 50%;\n  border: 6px solid var(--color-gray700);\n  animation: circ-anim 0.8s linear infinite;\n}\n.circle-5 {\n  border: 5px solid var(--color-gray700);\n  position: relative;\n  border-bottom-color: transparent;\n  border-left-color: transparent;\n}\n.circle-5:after {\n  position: absolute;\n  content: \"\";\n  width: 80%;\n  height: 80%;\n  background: transparent;\n  top: 50%;\n  left: 50%;\n  margin-left: -40%;\n  margin-top: -40%;\n  border-radius: 50%;\n  border: 3px solid var(--color-gray900);\n  box-sizing: border-box;\n  border-top-color: transparent;\n  border-right-color: transparent;\n  animation: circ-anim 0.4s reverse linear infinite;\n}\n@keyframes circ-anim {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n/* style card \n.card-flag {\n\tdisplay: inline-block;\n\twidth: 300px;\n\theight: 250px;\n\tbackground-color: #fff;\n\tbackground: linear-gradient(#f8f8f8, #fff);\n\tbox-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);\n\tborder-radius: 6px;\n\toverflow: hidden;\n\tposition: relative;\n\tmargin: 1.5rem;\n}\n\n.card-flag-md {\n\twidth: 450px;\n\theight: 350px;\n\tmargin: 2rem;\n}\n.card-flag-lg {\n\twidth: 600px;\n\theight: 450px;\n\tmargin: 2rem;\n}\n\n.card-flag h3 {\n\ttext-align: center;\n}\n\n.card-flag .additional {\n\tposition: absolute;\n\twidth: 40%;\n\theight: 100%;\n\tbackground: radial-gradient(\n\t\tcircle at 23.5% 81.59%,\n\t\tvar(--color-gray700) 0,\n\t\tvar(--color-gray700) 50%,\n\t\tvar(--color-gray900) 100%\n\t);\n\ttransition: width 0.4s;\n\toverflow: hidden;\n\tz-index: 2;\n}\n\n.card-flag:hover .additional {\n\twidth: 100%;\n\tborder-radius: 0 5px 5px 0;\n}\n\n.card-flag .additional .more-info {\n\twidth: 100%;\n\tfloat: left;\n\tleft: 100%;\n\ttop: 0px;\n\tposition: absolute;\n\theight: 100%;\n\ttransition: all 300ms ease-in-out;\n}\n.card-flag:hover .additional .more-info {\n\tleft: 0%;\n}\n\n.card-flag .additional .more-info h3 {\n\tcolor: #fff;\n\tmargin-top: 1rem;\n\tmargin-bottom: 0;\n}\n\n.card-flag .additional .coords {\n\tmargin: 0rem 2rem;\n\tcolor: #fff;\n\tfont-size: 1.1rem;\n}\n\n.card-flag .additional .coords span + span {\n\tfloat: right;\n}\n\n.stats {\n\tfont-size: 2rem;\n\tdisplay: flex;\n\tposition: absolute;\n\tbottom: 1rem;\n\tleft: 1rem;\n\tright: 1rem;\n\ttop: auto;\n\tcolor: #fff;\n}\n\n.general .stats {\n\tflex-direction: column;\n}\n\n.stats > div {\n\tflex: 1;\n\ttext-align: center;\n}\n\n.stats i {\n\tdisplay: block;\n}\n\n.stats div.title {\n\tfont-size: 0.75rem;\n\tfont-weight: bold;\n\ttext-transform: uppercase;\n}\n.stats div.title a {\n\tfont-size: 1.5rem;\n\tfont-weight: bold;\n\ttext-transform: uppercase;\n\tcolor: #fff;\n}\n\n.stats div.value {\n\tfont-size: 1.2rem;\n\tfont-weight: bold;\n\tline-height: 1.5rem;\n}\n\n.general .stats {\n\tcolor: #222;\n}\n.card-flag .general {\n\twidth: 60%;\n\theight: 100%;\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tz-index: 1;\n\tbox-sizing: border-box;\n\tpadding: 0.5rem;\n}\n\n.img-card-flag {\n\tposition: absolute;\n\n\twidth: 80%;\n\theight: 45%;\n\ttop: 27.5%;\n\tleft: 10%;\n} */\n", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,sBAAsB;EACtB,sBAAsB;EACtB,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,wBAAwB;EACxB,wBAAwB;AAC1B;AACA;EACE,yBAAyB;AAC3B;AAEA;EACE,WAAW;EACX,qBAAqB;EACrB,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,sCAAsC;EACtC,yCAAyC;AAC3C;AAEA;EACE,sCAAsC;EACtC,kBAAkB;EAClB,gCAAgC;EAChC,8BAA8B;AAChC;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,UAAU;EACV,WAAW;EACX,uBAAuB;EACvB,QAAQ;EACR,SAAS;EACT,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,sCAAsC;EACtC,sBAAsB;EACtB,6BAA6B;EAC7B,+BAA+B;EAC/B,iDAAiD;AACnD;AAEA;EACE;IACE,oBAAoB;EACtB;EACA;IACE,yBAAyB;EAC3B;AACF;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;AAClC;AAEA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;GA6IG","sourcesContent":[":root {\n  --color-red100: #e84545;\n  --color-red50: #903749;\n  --color-red30: #53354a;\n  --color-indigo700: #3d0a91;\n  --color-blueDemon: #2b2e4a;\n  --color-indigo900: #140330;\n  --color-gray700: #495057;\n  --color-gray900: #212529;\n}\nbody {\n  background-color: #f3f3f3;\n}\n\n.circleLoader {\n  margin: 0px;\n  display: inline-block;\n  width: 8em;\n  height: 8em;\n  border-radius: 50%;\n  border: 6px solid var(--color-gray700);\n  animation: circ-anim 0.8s linear infinite;\n}\n\n.circle-5 {\n  border: 5px solid var(--color-gray700);\n  position: relative;\n  border-bottom-color: transparent;\n  border-left-color: transparent;\n}\n.circle-5:after {\n  position: absolute;\n  content: \"\";\n  width: 80%;\n  height: 80%;\n  background: transparent;\n  top: 50%;\n  left: 50%;\n  margin-left: -40%;\n  margin-top: -40%;\n  border-radius: 50%;\n  border: 3px solid var(--color-gray900);\n  box-sizing: border-box;\n  border-top-color: transparent;\n  border-right-color: transparent;\n  animation: circ-anim 0.4s reverse linear infinite;\n}\n\n@keyframes circ-anim {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n/* style card \n.card-flag {\n\tdisplay: inline-block;\n\twidth: 300px;\n\theight: 250px;\n\tbackground-color: #fff;\n\tbackground: linear-gradient(#f8f8f8, #fff);\n\tbox-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);\n\tborder-radius: 6px;\n\toverflow: hidden;\n\tposition: relative;\n\tmargin: 1.5rem;\n}\n\n.card-flag-md {\n\twidth: 450px;\n\theight: 350px;\n\tmargin: 2rem;\n}\n.card-flag-lg {\n\twidth: 600px;\n\theight: 450px;\n\tmargin: 2rem;\n}\n\n.card-flag h3 {\n\ttext-align: center;\n}\n\n.card-flag .additional {\n\tposition: absolute;\n\twidth: 40%;\n\theight: 100%;\n\tbackground: radial-gradient(\n\t\tcircle at 23.5% 81.59%,\n\t\tvar(--color-gray700) 0,\n\t\tvar(--color-gray700) 50%,\n\t\tvar(--color-gray900) 100%\n\t);\n\ttransition: width 0.4s;\n\toverflow: hidden;\n\tz-index: 2;\n}\n\n.card-flag:hover .additional {\n\twidth: 100%;\n\tborder-radius: 0 5px 5px 0;\n}\n\n.card-flag .additional .more-info {\n\twidth: 100%;\n\tfloat: left;\n\tleft: 100%;\n\ttop: 0px;\n\tposition: absolute;\n\theight: 100%;\n\ttransition: all 300ms ease-in-out;\n}\n.card-flag:hover .additional .more-info {\n\tleft: 0%;\n}\n\n.card-flag .additional .more-info h3 {\n\tcolor: #fff;\n\tmargin-top: 1rem;\n\tmargin-bottom: 0;\n}\n\n.card-flag .additional .coords {\n\tmargin: 0rem 2rem;\n\tcolor: #fff;\n\tfont-size: 1.1rem;\n}\n\n.card-flag .additional .coords span + span {\n\tfloat: right;\n}\n\n.stats {\n\tfont-size: 2rem;\n\tdisplay: flex;\n\tposition: absolute;\n\tbottom: 1rem;\n\tleft: 1rem;\n\tright: 1rem;\n\ttop: auto;\n\tcolor: #fff;\n}\n\n.general .stats {\n\tflex-direction: column;\n}\n\n.stats > div {\n\tflex: 1;\n\ttext-align: center;\n}\n\n.stats i {\n\tdisplay: block;\n}\n\n.stats div.title {\n\tfont-size: 0.75rem;\n\tfont-weight: bold;\n\ttext-transform: uppercase;\n}\n.stats div.title a {\n\tfont-size: 1.5rem;\n\tfont-weight: bold;\n\ttext-transform: uppercase;\n\tcolor: #fff;\n}\n\n.stats div.value {\n\tfont-size: 1.2rem;\n\tfont-weight: bold;\n\tline-height: 1.5rem;\n}\n\n.general .stats {\n\tcolor: #222;\n}\n.card-flag .general {\n\twidth: 60%;\n\theight: 100%;\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tz-index: 1;\n\tbox-sizing: border-box;\n\tpadding: 0.5rem;\n}\n\n.img-card-flag {\n\tposition: absolute;\n\n\twidth: 80%;\n\theight: 45%;\n\ttop: 27.5%;\n\tleft: 10%;\n} */\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map