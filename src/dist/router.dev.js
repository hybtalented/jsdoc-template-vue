"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createRouter;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

function createRouter() {
  return new _vueRouter["default"]({
    mode: 'hash',
    routes: [{
      path: '/global'
    }, {
      path: '/template'
    }]
  });
}