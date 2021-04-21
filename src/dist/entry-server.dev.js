"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = require("./app");

// class RenderError extends Error {
//   constructor(errstring, code) {
//     super(errstring);
//     this.code = code;
//   }
// }
function getMatchedComponents(router, url) {
  return new Promise(function (resolve) {
    router.push(url);
    router.onReady(function () {
      var matchedComponents = router.getMatchedComponents(); //   if (!matchedComponents.length) {
      //     return reject(new RenderError(`can not found the corrspond page of ${url}`, 404));
      //   }

      resolve(matchedComponents);
    });
  });
}

var _callee = function _callee(context) {
  var _createApp, app, router;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _createApp = (0, _app.createApp)(context.state, context.view), app = _createApp.app, router = _createApp.router;
          _context.next = 3;
          return regeneratorRuntime.awrap(getMatchedComponents(router, context.url));

        case 3:
          return _context.abrupt("return", app);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports["default"] = _callee;