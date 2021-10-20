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
___CSS_LOADER_EXPORT___.push([module.i, ":root {\r\n  --color-red100: #e84545;\r\n  --color-red50: #903749;\r\n  --color-red30: #53354a;\r\n  --color-indigo700: #3d0a91;\r\n  --color-blueDemon: #2b2e4a;\r\n  --color-indigo900: #140330;\r\n  --color-gray700: #495057;\r\n  --color-gray900: #212529;\r\n}\r\nbody {\r\n  background-color: #f3f3f3;\r\n}\r\n.circleLoader {\r\n  margin: 0px;\r\n  display: inline-block;\r\n  width: 8em;\r\n  height: 8em;\r\n  border-radius: 50%;\r\n  border: 6px solid var(--color-gray700);\r\n  animation: circ-anim 0.8s linear infinite;\r\n}\r\n.circle-5 {\r\n  border: 5px solid var(--color-gray700);\r\n  position: relative;\r\n  border-bottom-color: transparent;\r\n  border-left-color: transparent;\r\n}\r\n.circle-5:after {\r\n  position: absolute;\r\n  content: \"\";\r\n  width: 80%;\r\n  height: 80%;\r\n  background: transparent;\r\n  top: 50%;\r\n  left: 50%;\r\n  margin-left: -40%;\r\n  margin-top: -40%;\r\n  border-radius: 50%;\r\n  border: 3px solid var(--color-gray900);\r\n  box-sizing: border-box;\r\n  border-top-color: transparent;\r\n  border-right-color: transparent;\r\n  animation: circ-anim 0.4s reverse linear infinite;\r\n}\r\n@keyframes circ-anim {\r\n  from {\r\n    transform: rotate(0);\r\n  }\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n.center {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n/* style card \r\n.card-flag {\r\n\tdisplay: inline-block;\r\n\twidth: 300px;\r\n\theight: 250px;\r\n\tbackground-color: #fff;\r\n\tbackground: linear-gradient(#f8f8f8, #fff);\r\n\tbox-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);\r\n\tborder-radius: 6px;\r\n\toverflow: hidden;\r\n\tposition: relative;\r\n\tmargin: 1.5rem;\r\n}\r\n\r\n.card-flag-md {\r\n\twidth: 450px;\r\n\theight: 350px;\r\n\tmargin: 2rem;\r\n}\r\n.card-flag-lg {\r\n\twidth: 600px;\r\n\theight: 450px;\r\n\tmargin: 2rem;\r\n}\r\n\r\n.card-flag h3 {\r\n\ttext-align: center;\r\n}\r\n\r\n.card-flag .additional {\r\n\tposition: absolute;\r\n\twidth: 40%;\r\n\theight: 100%;\r\n\tbackground: radial-gradient(\r\n\t\tcircle at 23.5% 81.59%,\r\n\t\tvar(--color-gray700) 0,\r\n\t\tvar(--color-gray700) 50%,\r\n\t\tvar(--color-gray900) 100%\r\n\t);\r\n\ttransition: width 0.4s;\r\n\toverflow: hidden;\r\n\tz-index: 2;\r\n}\r\n\r\n.card-flag:hover .additional {\r\n\twidth: 100%;\r\n\tborder-radius: 0 5px 5px 0;\r\n}\r\n\r\n.card-flag .additional .more-info {\r\n\twidth: 100%;\r\n\tfloat: left;\r\n\tleft: 100%;\r\n\ttop: 0px;\r\n\tposition: absolute;\r\n\theight: 100%;\r\n\ttransition: all 300ms ease-in-out;\r\n}\r\n.card-flag:hover .additional .more-info {\r\n\tleft: 0%;\r\n}\r\n\r\n.card-flag .additional .more-info h3 {\r\n\tcolor: #fff;\r\n\tmargin-top: 1rem;\r\n\tmargin-bottom: 0;\r\n}\r\n\r\n.card-flag .additional .coords {\r\n\tmargin: 0rem 2rem;\r\n\tcolor: #fff;\r\n\tfont-size: 1.1rem;\r\n}\r\n\r\n.card-flag .additional .coords span + span {\r\n\tfloat: right;\r\n}\r\n\r\n.stats {\r\n\tfont-size: 2rem;\r\n\tdisplay: flex;\r\n\tposition: absolute;\r\n\tbottom: 1rem;\r\n\tleft: 1rem;\r\n\tright: 1rem;\r\n\ttop: auto;\r\n\tcolor: #fff;\r\n}\r\n\r\n.general .stats {\r\n\tflex-direction: column;\r\n}\r\n\r\n.stats > div {\r\n\tflex: 1;\r\n\ttext-align: center;\r\n}\r\n\r\n.stats i {\r\n\tdisplay: block;\r\n}\r\n\r\n.stats div.title {\r\n\tfont-size: 0.75rem;\r\n\tfont-weight: bold;\r\n\ttext-transform: uppercase;\r\n}\r\n.stats div.title a {\r\n\tfont-size: 1.5rem;\r\n\tfont-weight: bold;\r\n\ttext-transform: uppercase;\r\n\tcolor: #fff;\r\n}\r\n\r\n.stats div.value {\r\n\tfont-size: 1.2rem;\r\n\tfont-weight: bold;\r\n\tline-height: 1.5rem;\r\n}\r\n\r\n.general .stats {\r\n\tcolor: #222;\r\n}\r\n.card-flag .general {\r\n\twidth: 60%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tz-index: 1;\r\n\tbox-sizing: border-box;\r\n\tpadding: 0.5rem;\r\n}\r\n\r\n.img-card-flag {\r\n\tposition: absolute;\r\n\r\n\twidth: 80%;\r\n\theight: 45%;\r\n\ttop: 27.5%;\r\n\tleft: 10%;\r\n} */\r\n", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,sBAAsB;EACtB,sBAAsB;EACtB,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,wBAAwB;EACxB,wBAAwB;AAC1B;AACA;EACE,yBAAyB;AAC3B;AAEA;EACE,WAAW;EACX,qBAAqB;EACrB,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,sCAAsC;EACtC,yCAAyC;AAC3C;AAEA;EACE,sCAAsC;EACtC,kBAAkB;EAClB,gCAAgC;EAChC,8BAA8B;AAChC;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,UAAU;EACV,WAAW;EACX,uBAAuB;EACvB,QAAQ;EACR,SAAS;EACT,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,sCAAsC;EACtC,sBAAsB;EACtB,6BAA6B;EAC7B,+BAA+B;EAC/B,iDAAiD;AACnD;AAEA;EACE;IACE,oBAAoB;EACtB;EACA;IACE,yBAAyB;EAC3B;AACF;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;AAClC;AAEA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;GA6IG","sourcesContent":[":root {\r\n  --color-red100: #e84545;\r\n  --color-red50: #903749;\r\n  --color-red30: #53354a;\r\n  --color-indigo700: #3d0a91;\r\n  --color-blueDemon: #2b2e4a;\r\n  --color-indigo900: #140330;\r\n  --color-gray700: #495057;\r\n  --color-gray900: #212529;\r\n}\r\nbody {\r\n  background-color: #f3f3f3;\r\n}\r\n\r\n.circleLoader {\r\n  margin: 0px;\r\n  display: inline-block;\r\n  width: 8em;\r\n  height: 8em;\r\n  border-radius: 50%;\r\n  border: 6px solid var(--color-gray700);\r\n  animation: circ-anim 0.8s linear infinite;\r\n}\r\n\r\n.circle-5 {\r\n  border: 5px solid var(--color-gray700);\r\n  position: relative;\r\n  border-bottom-color: transparent;\r\n  border-left-color: transparent;\r\n}\r\n.circle-5:after {\r\n  position: absolute;\r\n  content: \"\";\r\n  width: 80%;\r\n  height: 80%;\r\n  background: transparent;\r\n  top: 50%;\r\n  left: 50%;\r\n  margin-left: -40%;\r\n  margin-top: -40%;\r\n  border-radius: 50%;\r\n  border: 3px solid var(--color-gray900);\r\n  box-sizing: border-box;\r\n  border-top-color: transparent;\r\n  border-right-color: transparent;\r\n  animation: circ-anim 0.4s reverse linear infinite;\r\n}\r\n\r\n@keyframes circ-anim {\r\n  from {\r\n    transform: rotate(0);\r\n  }\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.center {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n/* style card \r\n.card-flag {\r\n\tdisplay: inline-block;\r\n\twidth: 300px;\r\n\theight: 250px;\r\n\tbackground-color: #fff;\r\n\tbackground: linear-gradient(#f8f8f8, #fff);\r\n\tbox-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);\r\n\tborder-radius: 6px;\r\n\toverflow: hidden;\r\n\tposition: relative;\r\n\tmargin: 1.5rem;\r\n}\r\n\r\n.card-flag-md {\r\n\twidth: 450px;\r\n\theight: 350px;\r\n\tmargin: 2rem;\r\n}\r\n.card-flag-lg {\r\n\twidth: 600px;\r\n\theight: 450px;\r\n\tmargin: 2rem;\r\n}\r\n\r\n.card-flag h3 {\r\n\ttext-align: center;\r\n}\r\n\r\n.card-flag .additional {\r\n\tposition: absolute;\r\n\twidth: 40%;\r\n\theight: 100%;\r\n\tbackground: radial-gradient(\r\n\t\tcircle at 23.5% 81.59%,\r\n\t\tvar(--color-gray700) 0,\r\n\t\tvar(--color-gray700) 50%,\r\n\t\tvar(--color-gray900) 100%\r\n\t);\r\n\ttransition: width 0.4s;\r\n\toverflow: hidden;\r\n\tz-index: 2;\r\n}\r\n\r\n.card-flag:hover .additional {\r\n\twidth: 100%;\r\n\tborder-radius: 0 5px 5px 0;\r\n}\r\n\r\n.card-flag .additional .more-info {\r\n\twidth: 100%;\r\n\tfloat: left;\r\n\tleft: 100%;\r\n\ttop: 0px;\r\n\tposition: absolute;\r\n\theight: 100%;\r\n\ttransition: all 300ms ease-in-out;\r\n}\r\n.card-flag:hover .additional .more-info {\r\n\tleft: 0%;\r\n}\r\n\r\n.card-flag .additional .more-info h3 {\r\n\tcolor: #fff;\r\n\tmargin-top: 1rem;\r\n\tmargin-bottom: 0;\r\n}\r\n\r\n.card-flag .additional .coords {\r\n\tmargin: 0rem 2rem;\r\n\tcolor: #fff;\r\n\tfont-size: 1.1rem;\r\n}\r\n\r\n.card-flag .additional .coords span + span {\r\n\tfloat: right;\r\n}\r\n\r\n.stats {\r\n\tfont-size: 2rem;\r\n\tdisplay: flex;\r\n\tposition: absolute;\r\n\tbottom: 1rem;\r\n\tleft: 1rem;\r\n\tright: 1rem;\r\n\ttop: auto;\r\n\tcolor: #fff;\r\n}\r\n\r\n.general .stats {\r\n\tflex-direction: column;\r\n}\r\n\r\n.stats > div {\r\n\tflex: 1;\r\n\ttext-align: center;\r\n}\r\n\r\n.stats i {\r\n\tdisplay: block;\r\n}\r\n\r\n.stats div.title {\r\n\tfont-size: 0.75rem;\r\n\tfont-weight: bold;\r\n\ttext-transform: uppercase;\r\n}\r\n.stats div.title a {\r\n\tfont-size: 1.5rem;\r\n\tfont-weight: bold;\r\n\ttext-transform: uppercase;\r\n\tcolor: #fff;\r\n}\r\n\r\n.stats div.value {\r\n\tfont-size: 1.2rem;\r\n\tfont-weight: bold;\r\n\tline-height: 1.5rem;\r\n}\r\n\r\n.general .stats {\r\n\tcolor: #222;\r\n}\r\n.card-flag .general {\r\n\twidth: 60%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tz-index: 1;\r\n\tbox-sizing: border-box;\r\n\tpadding: 0.5rem;\r\n}\r\n\r\n.img-card-flag {\r\n\tposition: absolute;\r\n\r\n\twidth: 80%;\r\n\theight: 45%;\r\n\ttop: 27.5%;\r\n\tleft: 10%;\r\n} */\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map